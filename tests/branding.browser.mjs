import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
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

for (const width of [1440, 390, 320]) {
  test(`branding keeps one accessible heading and fits without shifting at ${width}px`, async t => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    page.setDefaultTimeout(5000);
    t.after(() => page.close());
    // Branding checks need neither credentials nor live catalogue data.
    await page.route('https://api.thecatapi.com/**', route => route.fulfill({ json: [] }));
    let releaseImages;
    const imagesHeld = new Promise(resolve => { releaseImages = resolve; });
    t.after(() => releaseImages());
    await page.route('**/brand/*.svg', async route => {
      await imagesHeld;
      await route.continue();
    });
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
    const heading = page.getByRole('heading', { level: 1, name: 'Cat Breed Explorer', exact: true });
    await heading.waitFor();
    assert.equal(await page.getByRole('heading', { level: 1 }).count(), 1);
    assert.equal(await page.locator('header img').count(), 2, 'separate hero and wordmark SVGs');
    assert.equal(await page.getByRole('img', { name: /Cat Breed Explorer|Window Cat A/ }).count(), 0, 'the H1 supplies the name once');
    for (const image of await page.locator('header img').all()) {
      assert.equal(await image.getAttribute('alt'), '');
      assert.equal(await image.getAttribute('aria-hidden'), 'true');
    }
    await page.evaluate(() => document.fonts.ready);
    // Wait for the existing entrance animations before comparing geometry.
    await page.waitForFunction(() => [...document.querySelectorAll('header [style]')].every(element => {
      const style = getComputedStyle(element);
      return style.opacity === '1' && style.transform === 'none';
    }));
    const boxes = () => page.locator('header img, header p, header input').evaluateAll(elements =>
      elements.map(element => {
        const { x, y, width, height } = element.getBoundingClientRect();
        return { x, y, width, height };
      }));
    const reserved = await boxes();
    releaseImages();
    await page.waitForFunction(() => [...document.querySelectorAll('header img')]
      .every(image => image.complete && image.naturalWidth > 0));
    const rendered = await boxes();
    for (const [index, box] of rendered.entries()) {
      for (const key of ['x', 'y', 'width', 'height']) {
        assert.ok(Math.abs(box[key] - reserved[index][key]) < 1, `loading must preserve ${key} of element ${index}`);
      }
    }
    const [icon, wordmark] = rendered;
    assert.equal(icon.width, 84);
    assert.equal(icon.height, 84);
    assert.ok(Math.abs(icon.x + icon.width / 2 - width / 2) < 1);
    assert.ok(Math.abs(wordmark.x + wordmark.width / 2 - width / 2) < 1);
    assert.ok(Math.abs(wordmark.y - (icon.y + icon.height) - 12) < 1);
    assert.equal(wordmark.width, Math.min(600, width - 32));
    assert.ok(Math.abs(wordmark.height / wordmark.width - 142 / 1010) < 0.001);
    assert.ok(wordmark.x >= 16 && wordmark.x + wordmark.width <= width - 16);
    assert.equal(await page.locator('header img').first().evaluate(image => getComputedStyle(image).objectFit), 'contain');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  });
}
