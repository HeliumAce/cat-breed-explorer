import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { createServer } from 'vite';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
let server, browser, baseURL;

before(async () => {
  server = await createServer({ server: { host: '127.0.0.1', port: 0 } });
  await server.listen();
  baseURL = `http://127.0.0.1:${server.httpServer.address().port}`;
  browser = await chromium.launch({
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
    headless: true,
  });
});

after(async () => {
  await browser?.close();
  await server?.close();
});

for (const width of [1440, 390]) {
  for (const [name, path] of [['catalogue', '/'], ['breed', '/breeds/abys'], ['adoption', '/adopt']]) {
    test(`${name} paints the subtle pattern over the warm gradient at ${width}px`, async t => {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      page.setDefaultTimeout(5000);
      t.after(() => page.close());
      const breed = {
        id: 'abys', name: 'Abyssinian', origin: 'Egypt', description: 'A playful companion.',
        life_span: '14–15', weight: { metric: '3–5', imperial: '7–11' },
        image: { id: 'fixture', url: `${baseURL}/placeholder.svg`, width: 400, height: 400 },
      };
      // Keep background checks independent of live data, keys and location access.
      await page.route('https://api.thecatapi.com/**', route => route.fulfill({
        json: new URL(route.request().url()).pathname.endsWith('/breeds/abys') ? breed : [breed],
      }));
      await page.route('**/api/google-maps-key', route => route.fulfill({ json: { apiKey: '' } }));
      await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
      const background = page.locator('.cat-paw-grid');
      await background.waitFor();
      const image = await background.evaluate(element => getComputedStyle(element).backgroundImage);
      assert.match(image, /linear-gradient\((?:to bottom, )?rgb\(255, 251, 235\).*rgb\(255, 255, 255\)/,
        'the rendered background must fade from pale amber to white');
      assert.ok(image.startsWith('url(') && image.indexOf('linear-gradient(') > image.indexOf('url('),
        'the pattern must remain layered above the gradient');

      if (process.env.BACKGROUND_SCREENSHOT_DIR) {
        await page.evaluate(() => document.fonts.ready);
        await page.waitForFunction(() => [...document.querySelectorAll('[style]')]
          .filter(element => element.style.opacity)
          .every(element => getComputedStyle(element).opacity === '1'));
        await mkdir(process.env.BACKGROUND_SCREENSHOT_DIR, { recursive: true });
        await page.screenshot({ path: `${process.env.BACKGROUND_SCREENSHOT_DIR}/${name}-${width}.png` });
      }
    });
  }
}
