import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { after, test } from 'node:test';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: 'custom',
});
after(() => server.close());
const service = await server.ssrLoadModule('/src/services/breed-service.ts');
const { calculateBreedMatches } = await server.ssrLoadModule('/src/utils/quiz-matching.ts');
const { breedRatings, ratingAttributes, hasCompleteRatings, withLocalRatings, excludedBreedRatings, breedRatingAliases, isQuizEligible } = await server.ssrLoadModule('/src/data/breed-ratings.ts');
const { BreedRating } = await server.ssrLoadModule('/src/components/BreedRating.tsx');
const catalogue = JSON.parse(await readFile(new URL('./fixtures/breed-catalogue.json', import.meta.url), 'utf8'));

// Core-field response from the free API: no numerical trait ratings.
const coreBreed = {
  id: 'abys', name: 'Abyssinian', temperament: 'Active, Affectionate',
  description: 'Upstream description', origin: 'Egypt', life_span: '14-17',
  weight: { metric: '3.6-5.4', imperial: '8-12' },
  image: { id: 'cat-image', url: 'https://example.test/cat.jpg', width: 400, height: 400 },
};

test('list and detail requests receive the same local star ratings', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) => new Response(JSON.stringify(
    String(url).endsWith('/breeds') ? [coreBreed] : coreBreed,
  )));
  const list = await service.fetchBreeds();
  const detail = await service.fetchBreedById('abys');

  for (const breed of [list[0], detail]) {
    assert.equal(breed.adaptability, 4);
    assert.equal(breed.affection_level, 4);
    assert.equal(breed.energy_level, 5);
    assert.equal(breed.intelligence, 5);
    assert.equal(breed.child_friendly, 4);
    assert.equal(breed.vocalisation, 2);
    assert.equal(breed.grooming, 1);
    assert.equal(breed.shedding_level, 2);
    assert.equal(breed.dog_friendly, 4);
    assert.equal(breed.social_needs, 4);
    assert.equal(breed.description, coreBreed.description);
    assert.deepEqual(breed.image, coreBreed.image);
  }
  assert.equal(coreBreed.energy_level, undefined, 'upstream data is not mutated');
});

test('every rated breed has all ten valid ratings with sources and explanations', () => {
  assert.equal(Object.keys(breedRatings).length, 106);
  assert.equal(ratingAttributes.length, 10);
  for (const entry of Object.values(breedRatings)) {
    assert.equal(hasCompleteRatings(entry.ratings), true);
    assert.ok(entry.sources.length > 0);
    for (const source of entry.sources) assert.equal(new URL(source).protocol, 'https:');
    assert.ok(['breed-profile', 'related-breed', 'mixed-population', 'limited'].includes(entry.evidenceBasis));
    for (const { key } of ratingAttributes) assert.ok(entry.rationale[key]?.trim());
  }
});

const ratedBreeds = Object.entries(breedRatings).map(([id, entry]) => ({
  ...coreBreed, id, name: entry.name, ...entry.ratings,
}));
const pilotBreeds = ratedBreeds.filter(breed => ['abys', 'ragd', 'pers', 'siam', 'mcoo'].includes(breed.id));

test('the current API catalogue is fully covered or explicitly excluded', () => {
  assert.equal(catalogue.breeds.length, 107);
  assert.deepEqual(Object.keys(excludedBreedRatings), ['kell']);
  const catalogueIds = catalogue.breeds.map(breed => breed.id).sort();
  assert.equal(new Set(catalogueIds).size, catalogueIds.length);
  assert.deepEqual([...Object.keys(breedRatings), ...Object.keys(excludedBreedRatings)].sort(), catalogueIds);
  for (const breed of catalogue.breeds) {
    const entry = breedRatings[breed.id] || excludedBreedRatings[breed.id];
    assert.equal(entry.name, breed.name, breed.id);
  }
});

test('list and detail services enrich every rated catalogue entry consistently', async (t) => {
  const upstream = catalogue.breeds.map(breed => ({ ...coreBreed, ...breed }));
  t.mock.method(globalThis, 'fetch', async (url) => {
    const request = new URL(String(url), 'https://example.test');
    const id = request.searchParams.get('id') || request.pathname.split('/breeds/')[1];
    return new Response(JSON.stringify(id ? upstream.find(breed => breed.id === id) : upstream));
  });
  const list = await service.fetchBreeds();
  assert.equal(list.length, 107);
  for (const breed of list) {
    const detail = await service.fetchBreedById(breed.id);
    for (const { key } of ratingAttributes) {
      assert.equal(breed[key], detail[key], `${breed.id}.${key}`);
      assert.equal(breed[key], breedRatings[breed.id]?.ratings[key], `${breed.id}.${key}`);
    }
    assert.equal(breed.description, coreBreed.description);
  }
  assert.ok(upstream.every(breed => breed.energy_level === undefined));
});

test('Kellas remains unrated and cannot enter the quiz even with upstream ratings', () => {
  const kellas = { ...coreBreed, ...breedRatings.siam.ratings, id: 'kell', name: 'Kellas Cat' };
  assert.equal(isQuizEligible(kellas), false);
  const unrated = withLocalRatings(kellas);
  assert.equal(unrated.description, kellas.description);
  for (const { key } of ratingAttributes) assert.equal(unrated[key], undefined);
  assert.deepEqual(calculateBreedMatches([{ questionId: 2, answer: 'high' }], [kellas]), []);
  assert.equal(kellas.energy_level, 5, 'upstream input is not mutated');
});

test('Chausie aliases agree on ratings and occupy a single recommendation slot', () => {
  for (const [alias, canonicalId] of Object.entries(breedRatingAliases)) {
    assert.deepEqual(breedRatings[alias].ratings, breedRatings[canonicalId].ratings);
    const breeds = ratedBreeds.filter(breed => [alias, canonicalId].includes(breed.id));
    const answers = [{ questionId: 2, answer: 'high' }];
    assert.deepEqual(calculateBreedMatches(answers, breeds).map(breed => breed.id), [canonicalId]);
    assert.deepEqual(calculateBreedMatches(answers, breeds.filter(breed => breed.id === alias)).map(breed => breed.id), [alias]);
  }
});

test('the full catalogue produces distinct, repeatable recommendations for different preferences', () => {
  const calm = [
    { questionId: 2, answer: 'low' }, { questionId: 3, answer: 0 },
    { questionId: 4, answer: 'very-high' }, { questionId: 5, answer: 'small' },
    { questionId: 6, answer: ['children'] }, { questionId: 7, answer: ['energy', 'noise'] },
  ];
  const energetic = [
    { questionId: 2, answer: 'high' }, { questionId: 3, answer: 100 },
    { questionId: 4, answer: 'very-high' }, { questionId: 5, answer: 'large' },
    { questionId: 6, answer: ['none'] }, { questionId: 7, answer: [] },
  ];
  const calmResults = calculateBreedMatches(calm, ratedBreeds);
  const energeticResults = calculateBreedMatches(energetic, ratedBreeds);
  assert.equal(calmResults.length, 105);
  assert.equal(energeticResults.length, 105);
  assert.notEqual(calmResults[0].id, energeticResults[0].id);
  assert.ok(breedRatings[calmResults[0].id].ratings.energy_level <= 2);
  assert.equal(breedRatings[energeticResults[0].id].ratings.energy_level, 5);
  assert.equal(breedRatings[energeticResults[0].id].ratings.vocalisation, 5);
  assert.ok(calmResults.every(result => result.matchPercentage >= 0 && result.matchPercentage <= 100));
  assert.deepEqual(calmResults, calculateBreedMatches(calm, ratedBreeds.toReversed()));
});

test('quiz recommendations change with calm and energetic preferences', () => {
  const calm = [
    { questionId: 2, answer: 'low' }, { questionId: 3, answer: 0 },
    { questionId: 4, answer: 'very-high' }, { questionId: 5, answer: 'small' },
    { questionId: 6, answer: ['children'] }, { questionId: 7, answer: ['energy', 'noise'] },
  ];
  const energetic = [
    { questionId: 2, answer: 'high' }, { questionId: 3, answer: 100 },
    { questionId: 4, answer: 'very-high' }, { questionId: 5, answer: 'large' },
    { questionId: 6, answer: ['none'] }, { questionId: 7, answer: [] },
  ];
  assert.equal(calculateBreedMatches(calm, pilotBreeds)[0].id, 'ragd');
  assert.equal(calculateBreedMatches(energetic, pilotBreeds)[0].id, 'siam');
  assert.deepEqual(calculateBreedMatches(calm, pilotBreeds), calculateBreedMatches(calm, pilotBreeds));
});

test('unrated breeds cannot become fabricated quiz recommendations', () => {
  const answers = [{ questionId: 2, answer: 'high' }];
  assert.deepEqual(calculateBreedMatches(answers, [coreBreed]), []);
  assert.deepEqual(calculateBreedMatches([], pilotBreeds), []);
  const results = calculateBreedMatches(answers, [coreBreed, ...pilotBreeds.slice(1)]);
  assert.equal(results.some(breed => breed.id === coreBreed.id), false);
});

test('multiple household members cannot produce a score above 100', () => {
  const results = calculateBreedMatches([{ questionId: 6, answer: ['dogs', 'children'] }], pilotBreeds);
  assert.ok(results.every(result => result.matchPercentage >= 0 && result.matchPercentage <= 100));
  assert.equal(results.find(result => result.id === 'ragd').matchPercentage, 90);
});

test('star cards fill the supplied score and expose an accessible label', () => {
  const markup = renderToStaticMarkup(createElement(BreedRating, { label: 'Affection', value: 4 }));
  assert.equal((markup.match(/fill-amber-500/g) || []).length, 4);
  assert.equal((markup.match(/<svg/g) || []).length, 5);
  assert.match(markup, /aria-label="Affection: 4 out of 5 stars"/);
});

test('need scales show Low to High with a meter instead of stars', () => {
  const scaleAttributes = ratingAttributes.filter(attribute => attribute.display === 'scale');
  assert.deepEqual(scaleAttributes.map(attribute => attribute.key).sort(), ['grooming', 'shedding_level', 'social_needs']);
  for (const { label } of scaleAttributes) {
    for (const value of [1, 3, 5]) {
      const markup = renderToStaticMarkup(createElement(BreedRating, { label, value, display: 'scale' }));
      assert.match(markup, /role="meter"/);
      assert.match(markup, new RegExp(`aria-valuenow="${value}"`));
      assert.equal((markup.match(/bg-amber-500/g) || []).length, value);
      assert.ok(markup.includes('Low') && markup.includes('High'));
      assert.equal(markup.includes('<svg'), false);
    }
  }
});

test('missing and invalid ratings show unavailable without implying a zero score', () => {
  for (const value of [undefined, null, 0, 6, NaN, Infinity, 2.5, '4']) {
    for (const display of ['stars', 'scale']) {
      const markup = renderToStaticMarkup(createElement(BreedRating, { label: 'Energy', value, display }));
      assert.match(markup, /Rating unavailable/);
      assert.equal(markup.includes('<svg') || markup.includes('role="meter"'), false);
    }
  }
});

test('grooming and shedding dealbreakers use the same 1–5 direction as the need bars', () => {
  const answers = [{ questionId: 2, answer: 'low' }];
  const baseline = calculateBreedMatches(answers, pilotBreeds).find(result => result.id === 'pers');
  const penalized = calculateBreedMatches([...answers, { questionId: 7, answer: ['grooming', 'shedding'] }], pilotBreeds)
    .find(result => result.id === 'pers');
  assert.equal(baseline.matchPercentage, 100);
  assert.equal(penalized.matchPercentage, 40);
});

test('new unknown breeds do not silently receive generic ratings', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ ...coreBreed, id: 'new-breed' })));
  const breed = await service.fetchBreedById('new-breed');
  assert.equal(breed.adaptability, undefined);
  assert.equal(breed.energy_level, undefined);
});
