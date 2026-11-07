import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: 'custom',
});
after(() => server.close());
const { BreedCard } = await server.ssrLoadModule('/src/components/BreedCard.tsx');

test('cards throughout a long catalogue are visible without waiting for entrance animations', () => {
  for (const index of [0, 8, 65, 106]) {
    const breed = {
      id: `breed-${index}`, name: `Breed ${index}`, origin: 'Canada', temperament: 'Playful',
      image: { id: `photo-${index}`, url: `https://example.test/${index}.jpg`, width: 400, height: 400 },
    };
    const html = renderToStaticMarkup(createElement(StaticRouter, { location: '/' },
      createElement(BreedCard, { breed, index })));
    const rootTag = html.slice(0, html.indexOf('>') + 1);

    assert.doesNotMatch(rootTag, /opacity:\s*0(?:[;"\s])/, `card ${index} starts hidden`);
    assert.doesNotMatch(rootTag, /transform:/, `card ${index} moves into place after scrolling`);
    assert.ok(html.includes(`href="/breeds/${breed.id}"`));
    assert.ok(html.includes(`width="400" height="400"`), 'images reserve their space before loading');
    assert.ok(html.includes(`loading="${index < 8 ? 'eager' : 'lazy'}"`));
  }
});
