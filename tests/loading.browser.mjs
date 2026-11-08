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

async function sampleIcon(icon, milliseconds) {
  return icon.evaluate((svg, time) => {
    for (const animation of svg.getAnimations({ subtree: true })) {
      animation.pause();
      animation.currentTime = time;
    }
    const styles = element => {
      const style = getComputedStyle(element);
      return { opacity: Number(style.opacity), offset: parseFloat(style.strokeDashoffset), transform: style.transform };
    };
    return {
      letter: styles(svg.querySelector(':scope > path')),
      accents: styles(svg.querySelector('g')),
      strokes: [...svg.querySelectorAll('g path')].map(styles),
    };
  }, milliseconds);
}

for (const [variant, path, size, width] of [['inline', '/', 32, 1440], ['overlay', '/breeds/abys', 40, 390]]) {
  for (const reducedMotion of ['no-preference', 'reduce']) {
    test(`${variant} loader at ${size}px preserves status and fetch completion with motion=${reducedMotion}`, async t => {
      const page = await browser.newPage({ viewport: { width, height: 844 }, reducedMotion });
      page.setDefaultTimeout(5000);
      let releaseRequests;
      const pending = new Promise(resolve => { releaseRequests = resolve; });
      t.after(async () => { releaseRequests(); await page.close(); });
      const breed = {
        id: 'abys', name: 'Abyssinian', origin: 'Egypt', description: 'A test breed.',
        life_span: '14–15', weight: { metric: '3–5', imperial: '7–11' },
        image: { id: 'fixture', url: `${baseURL}/placeholder.svg`, width: 400, height: 400 },
      };
      await page.route('https://api.thecatapi.com/**', async route => {
        await pending;
        if (!page.isClosed()) await route.fulfill({
          json: new URL(route.request().url()).pathname.endsWith('/breeds/abys') ? breed : [breed],
        });
      });
      await page.goto(`${baseURL}${path}`, { waitUntil: 'domcontentloaded' });
      const status = page.getByRole('status');
      await status.waitFor();
      await page.evaluate(() => document.fonts.ready);
      if (variant === 'inline') {
        await page.waitForFunction(() => [...document.querySelectorAll('header [style]')].every(element => {
          const style = getComputedStyle(element);
          return style.opacity === '1' && style.transform === 'none';
        }));
      }
      assert.equal((await status.innerText()).trim(), 'Loading...');
      assert.equal(await status.getAttribute('aria-live'), 'polite');
      assert.equal(await status.getAttribute('aria-atomic'), 'true');
      assert.equal(await status.getByRole('img').count(), 0, 'decorative artwork must not duplicate the announcement');
      const icon = status.locator('svg');
      const box = await icon.boundingBox();
      assert.equal(box.width, size);
      assert.equal(box.height, size);
      assert.equal(await status.locator('div').evaluate(label => getComputedStyle(label).animationName), 'none');

      if (reducedMotion === 'reduce') {
        assert.equal(await icon.evaluate(svg => svg.getAnimations({ subtree: true }).length), 0);
        const complete = await sampleIcon(icon, 0);
        assert.equal(complete.accents.opacity, 1);
        assert.ok(complete.strokes.every(stroke => stroke.offset === 0 && stroke.opacity === 1));
        assert.deepEqual(await sampleIcon(icon, 1200), complete, 'the complete reduced-motion icon stays still');
      } else {
        assert.equal(await icon.evaluate(svg => svg.getAnimations({ subtree: true }).every(animation =>
          animation.playState === 'running' && animation.effect.getTiming().iterations === Infinity)), true);
        const start = await sampleIcon(icon, 0);
        assert.ok(start.strokes.every(stroke => stroke.offset === 1 && stroke.opacity === 0));
        const firstWhisker = await sampleIcon(icon, 120);
        assert.ok(firstWhisker.strokes[0].offset > 0 && firstWhisker.strokes[0].offset < 1);
        assert.ok(firstWhisker.strokes.slice(1).every(stroke => stroke.opacity === 0));
        const ears = await sampleIcon(icon, 840);
        assert.ok(ears.strokes.slice(0, 3).every(stroke => stroke.offset === 0 && stroke.opacity === 1));
        assert.ok(ears.strokes[3].offset > 0 && ears.strokes[3].offset < 1);
        const complete = await sampleIcon(icon, 1680);
        assert.ok(complete.strokes.every(stroke => stroke.offset === 0 && stroke.opacity === 1));
        const reset = await sampleIcon(icon, 2300);
        assert.equal(reset.accents.opacity, 0);
        assert.deepEqual((await sampleIcon(icon, 2520)).strokes, firstWhisker.strokes, 'the supplied 2.4-second cycle repeats');
        for (const frame of [firstWhisker, ears, complete, reset]) {
          assert.deepEqual(frame.letter, start.letter, 'the C stays fixed and visible throughout');
        }
        await sampleIcon(icon, 1680);
      }
      if (process.env.LOADING_SCREENSHOT_DIR) {
        await mkdir(process.env.LOADING_SCREENSHOT_DIR, { recursive: true });
        await page.screenshot({ path: `${process.env.LOADING_SCREENSHOT_DIR}/loading-${variant}-${reducedMotion}.png` });
      }
      releaseRequests();
      await page.getByRole('heading', { name: 'Abyssinian', exact: true }).waitFor();
      await status.waitFor({ state: 'detached' });
    });
  }
}
