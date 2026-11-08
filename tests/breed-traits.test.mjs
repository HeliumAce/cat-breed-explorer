import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom',
});
after(() => server.close());
const { breedRatings, ratingAttributes, temperamentLabelVocabulary, withLocalBreedTraits, isQuizEligible } =
  await server.ssrLoadModule('/src/data/breed-ratings.ts');
const { breedContentReviewGaps } = await server.ssrLoadModule('/src/data/breed-content.ts');
const { calculateBreedMatches } = await server.ssrLoadModule('/src/utils/quiz-matching.ts');
const { default: BreedDetail } = await server.ssrLoadModule('/src/pages/BreedDetail.tsx');
const { BreedCard } = await server.ssrLoadModule('/src/components/BreedCard.tsx');
const service = await server.ssrLoadModule('/src/services/breed-service.ts');
const image = { id: 'photo', url: 'https://example.test/cat.jpg', width: 400, height: 400 };
const upstream = id => ({ id, name: breedRatings[id]?.name ?? id, temperament: 'Daily brushing to prevent mats',
  description: 'API overview', origin: 'API origin', life_span: '12-16', weight: { metric: '3-5' }, image });

test('labels have explicit evidence and agree with supported low/high attributes', () => {
  const checks = {
    Active: ['energy_level', 4, 5], Calm: ['energy_level', 1, 3],
    Quiet: ['vocalisation', 1, 2], Talkative: ['vocalisation', 4, 5],
    Affectionate: ['affection_level', 4, 5], Independent: ['social_needs', 1, 3],
    Sociable: ['social_needs', 4, 5], Interactive: ['social_needs', 4, 5],
    Adaptable: ['adaptability', 4, 5],
    Intelligent: ['intelligence', 4, 5],
  };
  // Reserve with unfamiliar people does not imply poor adaptability; gentle
  // behaviour likewise does not establish child or dog compatibility.
  for (const [id, entry] of Object.entries(breedRatings)) {
    assert.ok(entry.temperamentLabels.length <= 5, id);
    assert.equal(new Set(entry.temperamentLabels).size, entry.temperamentLabels.length, id);
    const evidence = entry.temperamentEvidence;
    assert.ok(evidence.summary.trim() && evidence.section.trim(), id);
    assert.ok(entry.sources.includes(evidence.source), id);
    assert.equal(new URL(evidence.source).protocol, 'https:');
    if (!entry.temperamentLabels.length) assert.ok(entry.notes?.trim(), `${id}: explain the evidence gap`);
    for (const label of entry.temperamentLabels) {
      assert.ok(temperamentLabelVocabulary.includes(label), `${id}: ${label}`);
      if (!checks[label]) continue;
      const [key, min, max] = checks[label];
      const value = entry.ratings[key];
      assert.ok(value !== null && value >= min && value <= max, `${id}: ${label} conflicts with ${key}=${value}`);
    }
  }
});

test('coat and colour variants share behaviour without coupling their coat-care scores', () => {
  const behaviour = ratingAttributes.map(({ key }) => key).filter(key => !['grooming', 'shedding_level'].includes(key));
  for (const [variant, canonical] of [
    ['brit', 'bsho'], ['bslo', 'bsho'], ['cymr', 'manx'], ['exlh', 'esho'],
    ['java', 'bali'], ['napo', 'minu'], ['ori1', 'orie'], ['sinp', 'sing'], ['chas', 'chau'],
  ]) {
    for (const key of behaviour) assert.equal(breedRatings[variant].ratings[key], breedRatings[canonical].ratings[key], `${variant}/${canonical}.${key}`);
    assert.deepEqual(breedRatings[variant].temperamentLabels, breedRatings[canonical].temperamentLabels);
  }
  assert.ok(breedRatings.exlh.ratings.grooming > breedRatings.esho.ratings.grooming);
  assert.ok(breedRatings.bslo.ratings.grooming > breedRatings.bsho.ratings.grooming);
});

test('evidence gaps, mixed populations and sparse hybrids do not acquire invented personalities', () => {
  const behaviour = ratingAttributes.map(({ key }) => key).filter(key => !['grooming', 'shedding_level'].includes(key));
  for (const id of [...Object.keys(breedContentReviewGaps), 'aphr', 'kana', 'raas', 'bamb', 'dwel', 'elfc', 'mins', 'skoo', 'doms', 'domm', 'doml', 'poly']) {
    const breed = withLocalBreedTraits({ ...upstream(id), ...breedRatings.siam.ratings });
    for (const key of behaviour) assert.equal(breed[key], null, `${id}.${key}`);
    assert.equal(breed.temperament, '', id);
    assert.equal(isQuizEligible(breed), false, id);
    assert.deepEqual(calculateBreedMatches([{ questionId: 2, answer: 'high' }], [breed]), [], id);
    // Calling the matcher with un-enriched upstream numbers must not bypass the review.
    assert.equal(isQuizEligible({ ...upstream(id), ...breedRatings.siam.ratings }), false, id);
  }
  assert.equal(withLocalBreedTraits(upstream('elfc')).grooming, 4);
  assert.equal(withLocalBreedTraits(upstream('elfc')).shedding_level, 1);
  assert.equal(withLocalBreedTraits(upstream('poly')).grooming, null);
  for (const id of ['new-api-breed', 'toString', '__proto__']) {
    const raw = { ...upstream(id), ...breedRatings.siam.ratings };
    assert.equal(withLocalBreedTraits(raw).temperament, '');
    assert.equal(isQuizEligible(raw), false);
  }
});

test('list and detail replace raw temperament with the same reviewed labels without mutating API input', async t => {
  const raw = upstream('acur');
  t.mock.method(globalThis, 'fetch', async url => new Response(JSON.stringify(
    String(url).endsWith('/breeds') ? [raw] : raw,
  )));
  const [list, detail] = await Promise.all([service.fetchBreeds(), service.fetchBreedById('acur')]);
  const expected = 'Affectionate, Curious, Playful, Adaptable';
  assert.equal(list[0].temperament, expected);
  assert.equal(detail.temperament, expected);
  assert.equal(detail.description, raw.description);
  assert.equal(raw.temperament, 'Daily brushing to prevent mats');
});

test('cards and detail chips use reviewed labels, and evidence gaps have no blank or care-instruction chips', () => {
  for (const id of ['acur', 'birm', 'sphy', 'khao', 'exlh', 'napo', 'sinp', 'doms', 'elfc', 'pant']) {
    const breed = withLocalBreedTraits(upstream(id));
    const client = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity, retry: false } } });
    client.setQueryData(['breed', id], breed);
    try {
      const detail = renderToStaticMarkup(createElement(QueryClientProvider, { client },
        createElement(StaticRouter, { location: `/breeds/${id}` },
          createElement(Routes, null, createElement(Route, { path: '/breeds/:breedId', element: createElement(BreedDetail) })))));
      const card = renderToStaticMarkup(createElement(StaticRouter, null, createElement(BreedCard, { breed, index: 0 })));
      for (const html of [card, detail]) assert.doesNotMatch(html, /Daily brushing to prevent mats/);
      if (breedRatings[id].temperamentLabels.length) {
        assert.match(detail, /aria-label="Temperament"/);
        for (const label of breedRatings[id].temperamentLabels) assert.ok(detail.includes(`>${label}</div>`), `${id}: ${label}`);
        assert.ok(card.includes(breed.temperament));
      } else {
        assert.doesNotMatch(detail, /aria-label="Temperament"/);
        assert.match(detail, /Rating unavailable/);
      }
      assert.match(detail, /API overview/);
    } finally { client.clear(); }
  }
});
