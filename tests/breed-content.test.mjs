import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { after, test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: 'custom',
});
after(() => server.close());
const { breedContent, breedContentSources, breedContentReviewGaps, getBreedContent } = await server.ssrLoadModule('/src/data/breed-content.ts');
const { ratingAttributes, excludedBreedRatings, breedRatingAliases, withLocalBreedTraits } = await server.ssrLoadModule('/src/data/breed-ratings.ts');
const { BreedEditorialContent } = await server.ssrLoadModule('/src/components/BreedEditorialContent.tsx');
const { default: BreedDetail } = await server.ssrLoadModule('/src/pages/BreedDetail.tsx');
const catalogue = JSON.parse(await readFile(new URL('./fixtures/breed-catalogue.json', import.meta.url), 'utf8'));
const pilotIds = ['abys', 'beng', 'birm', 'pers', 'siam'];
const escapeHtml = value => renderToStaticMarkup(createElement('span', null, value)).slice(6, -7);

function renderDetail(id, extra = {}) {
  const client = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity, retry: false } } });
  client.setQueryData(['breed', id], withLocalBreedTraits({
    id, name: getBreedContent(id)?.name ?? 'New API breed', description: 'Overview supplied by the API.',
    origin: 'API origin', life_span: '12-16', temperament: 'API temperament',
    weight: { metric: '3-5', imperial: '7-11' }, ...extra,
  }));
  try {
    return renderToStaticMarkup(createElement(QueryClientProvider, { client },
      createElement(StaticRouter, { location: `/breeds/${id}` },
        createElement(Routes, null,
          createElement(Route, { path: '/breeds/:breedId', element: createElement(BreedDetail) })))));
  } finally {
    client.clear();
  }
}

test('curated entries cover real catalogue IDs with distinct items and evidence-limited counts', () => {
  assert.ok(pilotIds.every(id => getBreedContent(id)));
  for (const [id, entry] of Object.entries(breedContent)) {
    assert.equal(entry.name, catalogue.breeds.find(breed => breed.id === id)?.name, id);
    assert.match(entry.reviewedOn, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(entry.reviewedOn).toISOString().slice(0, 10), entry.reviewedOn);
    for (const section of ['facts', 'bondingTips']) {
      assert.ok(entry[section].length >= 3 && entry[section].length <= 5, `${id}.${section}: author 3–5 items`);
      if (entry[section].length < 5) {
        assert.ok(entry.coverageNotes?.[section]?.trim(), `${id}.${section}: explain the evidence or substance limit`);
      }
    }
    assert.ok(new Set(entry.facts.map(fact => fact.category)).size >= 2);

    const items = [...entry.facts, ...entry.bondingTips];
    assert.equal(new Set(items.map(item => item.id)).size, items.length, `${id}: duplicate item IDs`);
    assert.equal(new Set(items.map(item => item.text)).size, items.length, `${id}: duplicate prose`);
  }
});

test('every item has a resolvable source and section; tips record their editorial basis', () => {
  const usedSources = new Set();
  for (const entry of Object.values(breedContent)) {
    for (const item of [...entry.facts, ...entry.bondingTips]) {
      assert.ok(item.text.trim());
      assert.ok(item.citations.length > 0, item.id);
      assert.equal(new Set(item.citations.map(citation => citation.source)).size, item.citations.length);
      for (const citation of item.citations) {
        const source = breedContentSources[citation.source];
        assert.ok(source, `${item.id}: missing source ${citation.source}`);
        assert.ok(citation.section.trim());
        assert.ok(source.label.trim() && source.title.trim());
        assert.equal(new URL(source.url).protocol, 'https:');
        usedSources.add(citation.source);
      }
    }
    for (const tip of entry.bondingTips) {
      assert.equal(tip.basis, 'editorial');
      assert.ok(tip.relatedTraits.length > 0);
      for (const trait of tip.relatedTraits) assert.ok(ratingAttributes.some(attribute => attribute.key === trait));
    }
  }
  assert.equal(usedSources.size, Object.keys(breedContentSources).length, 'no unused source records');
});

test('every curated detail page and alias renders all authored items and accessible source links', () => {
  for (const id of catalogue.breeds.map(breed => breed.id).filter(id => getBreedContent(id))) {
    const entry = getBreedContent(id);
    const html = renderDetail(id);
    assert.match(html, /Overview supplied by the API\./);
    assert.match(html, />Fun facts<\/h2>/);
    assert.match(html, />Bonding tips<\/h2>/);
    assert.equal((html.match(/<li /g) ?? []).length, entry.facts.length + entry.bondingTips.length);
    for (const item of [...entry.facts, ...entry.bondingTips]) {
      assert.ok(html.includes(escapeHtml(item.text)), `${id}: ${item.id}`);
      for (const { source: sourceId } of item.citations) {
        const source = breedContentSources[sourceId];
        assert.ok(html.includes(`href="${source.url}"`));
        assert.ok(html.includes(`aria-label="Source: ${escapeHtml(source.title)}, `));
      }
    }
    assert.equal((html.match(/aria-label="Source:/g) ?? []).length,
      [...entry.facts, ...entry.bondingTips].reduce((count, item) => count + item.citations.length, 0));
  }
});

test('the reviewed catalogue is covered by content, an explicit evidence gap, or an existing exclusion', () => {
  for (const { id, name } of catalogue.breeds) {
    const entry = getBreedContent(id);
    const gap = breedContentReviewGaps[id];
    const excluded = Object.hasOwn(excludedBreedRatings, id);
    assert.equal(Number(Boolean(entry)) + Number(Boolean(gap)) + Number(excluded), 1, `${id}: missing or overlapping review`);
    if (gap) assert.equal(gap.name, name);
  }
  for (const [id, gap] of Object.entries(breedContentReviewGaps)) {
    assert.ok(catalogue.breeds.some(breed => breed.id === id));
    assert.ok(gap.reason.trim() && gap.sources.length);
    assert.match(gap.reviewedOn, /^\d{4}-\d{2}-\d{2}$/);
    for (const url of gap.sources) assert.equal(new URL(url).protocol, 'https:');
    const html = renderDetail(id);
    assert.match(html, /Overview supplied by the API\./);
    assert.doesNotMatch(html, /Fun facts|Bonding tips|Source:/);
  }
  for (const [alias, canonical] of Object.entries(breedRatingAliases)) {
    assert.equal(getBreedContent(alias), getBreedContent(canonical));
  }
});

test('unreviewed and new API breeds keep their overview without fabricated facts or tips', () => {
  const unreviewed = catalogue.breeds.find(breed => !getBreedContent(breed.id) && breed.id !== 'kell');
  for (const id of [...(unreviewed ? [unreviewed.id] : []), 'new-api-breed', 'kell', 'toString', '__proto__']) {
    assert.equal(getBreedContent(id), undefined);
    assert.equal(renderToStaticMarkup(createElement(BreedEditorialContent, { content: getBreedContent(id) })), '');
    const html = renderDetail(id, { intelligence: 5, affection_level: 5, energy_level: 5, dog_friendly: 5 });
    assert.match(html, /Overview supplied by the API\./);
    assert.match(html, /Rating unavailable/);
    assert.doesNotMatch(html, /Fun facts|Bonding tips|exceptional intelligence|one of the most affectionate|Source:/);
  }
});

test('partial entries render only available items without empty sections or padding', () => {
  const entry = getBreedContent('birm');
  for (const content of [
    { ...entry, facts: entry.facts.slice(0, 1), bondingTips: [] },
    { ...entry, facts: [], bondingTips: entry.bondingTips.slice(0, 1) },
    { ...entry, facts: [], bondingTips: [] },
  ]) {
    const html = renderToStaticMarkup(createElement(BreedEditorialContent, { content }));
    assert.equal(html.includes('>Fun facts</h2>'), content.facts.length > 0);
    assert.equal(html.includes('>Bonding tips</h2>'), content.bondingTips.length > 0);
    assert.equal((html.match(/<li /g) ?? []).length, content.facts.length + content.bondingTips.length);
  }
});

test('facts and tips independently support three, four, or five authored items', () => {
  const entry = getBreedContent('birm');
  for (const [facts, tips] of [[3, 5], [4, 3], [5, 4]]) {
    const content = { ...entry, facts: entry.facts.slice(0, facts), bondingTips: entry.bondingTips.slice(0, tips) };
    const html = renderToStaticMarkup(createElement(BreedEditorialContent, { content }));
    assert.equal((html.match(/<li /g) ?? []).length, facts + tips);
    assert.ok(html.includes(content.facts.at(-1).text));
    assert.ok(html.includes(content.bondingTips.at(-1).text));
    for (const omitted of [...entry.facts.slice(facts), ...entry.bondingTips.slice(tips)]) {
      assert.equal(html.includes(omitted.text), false);
    }
  }
});

test('nearly hairless profiles keep skin care instead of inheriting a brushing template', () => {
  for (const id of ['sphy', 'dons', 'pete', 'bamb', 'dwel', 'elfc', 'mins', 'ukra']) {
    const tips = getBreedContent(id).bondingTips.map(tip => tip.text).join(' ');
    assert.match(tips, /skin/i, id);
    // A Peterbald can have several coat types; explaining that distinction is
    // valid. Reject the former blanket recommendation, not the word itself.
    assert.doesNotMatch(tips, /learn to enjoy brushing/i, id);
  }
  assert.match(getBreedContent('pers').bondingTips.map(tip => tip.text).join(' '), /daily combing/i);
});
