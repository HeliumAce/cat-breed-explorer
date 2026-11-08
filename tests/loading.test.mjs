import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: 'custom',
});
after(() => server.close());
const { Loading, LoadingInline } = await server.ssrLoadModule('/src/components/Loading.tsx');

test('shared loaders announce the existing text once and keep their icon footprints', () => {
  for (const [Component, size] of [[LoadingInline, 32], [Loading, 40]]) {
    const html = renderToStaticMarkup(createElement(Component));
    assert.match(html, /role="status"/);
    assert.match(html, /aria-live="polite"/);
    assert.match(html, /aria-atomic="true"/);
    assert.equal((html.match(/Loading\.\.\./g) ?? []).length, 1);
    const svg = html.match(/<svg\b[^>]*>/)?.[0];
    assert.ok(svg, 'a vector icon accompanies the status text');
    assert.match(svg, new RegExp(`width="${size}" height="${size}"`));
    assert.match(svg, /aria-hidden="true"/);
    assert.match(svg, /focusable="false"/);
  }
});
