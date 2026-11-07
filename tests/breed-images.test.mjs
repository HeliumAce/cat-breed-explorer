import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: 'custom',
});
after(() => server.close());
const service = await server.ssrLoadModule('/src/services/breed-service.ts');
const { calculateBreedMatches } = await server.ssrLoadModule('/src/utils/quiz-matching.ts');
const { withLocalRatings } = await server.ssrLoadModule('/src/data/breed-ratings.ts');

const image = { id: 'api-photo', url: 'https://example.test/api-photo.jpg', width: 400, height: 400 };
const breed = { id: 'abys', name: 'Abyssinian', image };
const answers = [{ questionId: 2, answer: 'high' }];

test('the catalogue excludes missing and empty images without stock-photo exceptions', async (t) => {
  const missing = ['amer', 'mala', 'ebur', 'jbob', 'future-breed'].map(id => ({ id, name: id }));
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify([
    breed, ...missing,
    { id: 'null-image', image: null },
    { id: 'empty-image', image: {} },
    { id: 'empty-url', image: { ...image, url: '' } },
    { id: 'blank-url', image: { ...image, url: '  ' } },
  ])));

  assert.deepEqual((await service.fetchBreeds()).map(breed => breed.id), ['abys']);
});

test('an API reference image is resolved before a breed enters the catalogue and quiz', async (t) => {
  const upstream = { id: 'mala', name: 'Malayan', reference_image_id: 'api-photo' };
  const requests = [];
  t.mock.method(globalThis, 'fetch', async (url) => {
    requests.push(String(url));
    return new Response(JSON.stringify(String(url).endsWith('/breeds') ? [upstream] : image));
  });

  const list = await service.fetchBreeds();
  assert.deepEqual(list.map(breed => breed.id), ['mala']);
  assert.deepEqual(list[0].image, image);
  assert.equal(requests.length, 2);
  assert.ok(requests[1].endsWith('/images/api-photo') || requests[1].endsWith('/breed-image?id=api-photo'));
  assert.equal(calculateBreedMatches(answers, list)[0].imageUrl, image.url);
  assert.equal(upstream.image, undefined, 'the upstream object is not mutated');
});

test('failed or incomplete reference lookups exclude only the affected breeds', async (t) => {
  const upstream = [breed, { id: 'missing', reference_image_id: 'missing-photo' },
    { id: 'incomplete', reference_image_id: 'incomplete-photo' }];
  t.mock.method(globalThis, 'fetch', async (url) => {
    if (String(url).endsWith('/breeds')) return new Response(JSON.stringify(upstream));
    if (String(url).includes('missing-photo')) return new Response('{}', { status: 404 });
    return new Response(JSON.stringify({ id: 'incomplete-photo' }));
  });

  assert.deepEqual((await service.fetchBreeds()).map(breed => breed.id), ['abys']);
});

test('API image additions and removals automatically change catalogue and quiz eligibility', async (t) => {
  let available = false;
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify([
    { id: 'mala', name: 'Malayan', ...(available ? { image } : {}) },
  ])));

  assert.deepEqual(await service.fetchBreeds(), []);
  assert.deepEqual(calculateBreedMatches(answers, await service.fetchBreeds()), []);

  available = true;
  const list = await service.fetchBreeds();
  assert.deepEqual(list.map(breed => breed.id), ['mala']);
  assert.deepEqual(calculateBreedMatches(answers, list).map(breed => breed.id), ['mala']);

  available = false;
  assert.deepEqual(await service.fetchBreeds(), []);
});

test('quiz matching also rejects image-less input passed directly to it', () => {
  const withoutImage = { id: 'ragd', name: 'Ragdoll', reference_image_id: 'unresolved-photo' };
  const list = [breed, withoutImage].map(withLocalRatings);
  assert.deepEqual(calculateBreedMatches(answers, list).map(breed => breed.id), ['abys']);
});

test('detail pages retain API images for breeds previously overridden with stock photos', async (t) => {
  for (const id of ['ebur', 'jbob', 'mala']) {
    t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ ...breed, id })));
    assert.deepEqual((await service.fetchBreedById(id)).image, image);
  }
});

test('direct links still return breed information without inventing a photo', async (t) => {
  const upstream = { id: 'amer', name: 'American Ringtail' };
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify(upstream)));
  const detail = await service.fetchBreedById('amer');
  assert.equal(detail.id, 'amer');
  assert.equal(detail.image, undefined);
});
