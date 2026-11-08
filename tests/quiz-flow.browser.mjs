import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

// Reuse an available Playwright installation without adding a production or test dependency.
// PLAYWRIGHT_MODULE_PATH may point to the desktop app's bundled playwright/index.mjs.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
let server, browser, baseURL;

before(async () => {
  server = await createServer({
    server: { host: '127.0.0.1', port: 0 },
  });
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

async function openQuiz(t, viewport) {
  const page = await browser.newPage({ viewport });
  page.setDefaultTimeout(5000);
  page.on('pageerror', error => assert.fail(error.message));
  t.after(() => page.close());
  await page.goto(`${baseURL}/tests/fixtures/quiz-harness.html`);
  await page.getByRole('button', { name: 'Open quiz', exact: true }).click();
  return page;
}

async function question(page, text) {
  await page.getByRole('heading', { name: text, exact: true }).waitFor();
}

async function start(page) {
  await page.getByRole('button', { name: 'Start the Quiz', exact: true }).click();
  await question(page, 'Your idea of a perfect Saturday is...');
}

async function holdCalculations(page) {
  await page.evaluate(() => {
    const set = window.setTimeout.bind(window);
    const clear = window.clearTimeout.bind(window);
    const callbacks = [];
    const pending = new Map();
    window.setTimeout = (callback, delay, ...args) => {
      if (delay !== 2000) return set(callback, delay, ...args);
      const id = 1000000 + callbacks.length;
      const run = () => callback(...args);
      callbacks.push(run);
      pending.set(id, run);
      return id;
    };
    window.clearTimeout = id => { pending.delete(id); clear(id); };
    window.calculationTimers = {
      get count() { return callbacks.length; },
      get pending() { return pending.size; },
      finish() { const runs = [...pending.values()]; pending.clear(); runs.forEach(run => run()); },
      // Simulate a callback that was already queued when cancellation occurred.
      finishCancelled() { callbacks.forEach(run => run()); },
    };
  });
}

const selections = ['homebody', 'low', 50, 'moderate', 'small', ['none'], []];

async function answerThroughFinalQuestion(page) {
  const questions = await page.evaluate(() => window.quizQuestions);
  assert.equal(questions.length, 7);
  for (const [index, configured] of questions.entries()) {
    await question(page, configured.question);
    assert.equal(await page.getByText(`Question ${index + 1} of ${questions.length}`, { exact: true }).count(), 1);
    assert.equal(await page.getByText(`Question ${index + 1} of ${questions.length}`, { exact: true }).evaluate(element => {
      const number = element.getBoundingClientRect();
      const dialog = element.closest('[role="dialog"]').getBoundingClientRect();
      return number.top >= dialog.top && number.bottom <= dialog.bottom;
    }), true, 'the question number must remain visible inside the dialog');
    assert.equal(await page.getByRole('progressbar').getAttribute('aria-valuenow'), String(Math.round((index + 1) / questions.length * 100)));
    assert.equal(await page.getByRole('button', { name: 'Back', exact: true }).count(), index === 0 ? 0 : 1);
    assert.equal(await page.getByText('Calculating your cat-culations...', { exact: true }).count(), 0);
    if (configured.type === 'slider') {
      assert.equal(await page.getByRole('slider').getAttribute('aria-valuenow'), '50');
      assert.equal(await page.getByRole('button', { name: 'Next', exact: true }).isEnabled(), true);
    } else if (configured.id !== 7) {
      const value = Array.isArray(selections[index]) ? selections[index][0] : selections[index];
      const option = configured.options.find(option => option.value === value);
      assert.equal(await page.getByRole('button', { name: 'Next', exact: true }).isEnabled(), false);
      await page.getByRole('button', { name: option.text, exact: true }).click();
    }
    if (index < questions.length - 1) {
      await page.getByRole('button', { name: 'Next', exact: true }).click();
    }
  }
  assert.equal(await page.getByRole('button', { name: 'See Results', exact: true }).isEnabled(), true);
  return questions.map((question, index) => ({ questionId: question.id, answer: selections[index] }));
}

test('starting the quiz shows the configured Saturday question first', async t => {
  const page = await openQuiz(t);
  await page.getByRole('button', { name: 'Start the Quiz', exact: true }).click();
  await question(page, 'Your idea of a perfect Saturday is...');
});

for (const viewport of [{ width: 1280, height: 800 }, { width: 390, height: 844 }]) {
  test(`all seven questions have accurate numbers, progress, slider default and optional dealbreakers at ${viewport.width}px`, async t => {
    const page = await openQuiz(t, viewport);
    assert.equal(await page.getByText("Let's find your feline soulmate in 7 questions!", { exact: true }).count(), 1);
    await start(page);
    const expectedAnswers = await answerThroughFinalQuestion(page);
    await page.getByRole('button', { name: 'See Results', exact: true }).click();
    await page.getByText('Calculating your cat-culations...', { exact: true }).waitFor();
    await page.getByRole('heading', { name: 'Your purr-fect match!', exact: true }).waitFor();
    assert.deepEqual(await page.evaluate(() => window.quiz.breedMatches), await page.evaluate(answers => window.calculateBreedMatches(answers, window.breeds), expectedAnswers));
  });
}

test('Back restores answers; editing replaces them, including a slider value of zero and household selections', async t => {
  const page = await openQuiz(t);
  await start(page);
  await page.getByRole('button', { name: 'Netflix marathon in pajamas', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await question(page, "When it comes to exercise, you're most like...");
  await page.getByRole('button', { name: 'Sloth: Moving is overrated', exact: true }).click();
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await question(page, 'Your idea of a perfect Saturday is...');
  assert.match(await page.getByRole('button', { name: 'Netflix marathon in pajamas', exact: true }).getAttribute('class'), /bg-amber-100/);
  await page.getByRole('button', { name: 'Outdoor adventures and exploration', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await question(page, "When it comes to exercise, you're most like...");
  assert.match(await page.getByRole('button', { name: 'Sloth: Moving is overrated', exact: true }).getAttribute('class'), /bg-amber-100/);
  assert.equal(await page.evaluate(() => window.quiz.getAnswerForQuestion(1)), 'active');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await question(page, 'Your tolerance for chatty companions is...');
  await page.getByRole('slider').focus();
  await page.keyboard.press('Home');
  assert.equal(await page.getByRole('slider').getAttribute('aria-valuenow'), '0');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await question(page, 'Your ideal cuddle buddy would be...');
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await question(page, 'Your tolerance for chatty companions is...');
  assert.equal(await page.getByRole('slider').getAttribute('aria-valuenow'), '0');
  assert.equal(await page.evaluate(() => window.quiz.getAnswerForQuestion(3)), 0);
  await page.getByRole('slider').focus();
  await page.keyboard.press('End');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await question(page, 'Your ideal cuddle buddy would be...');
  await page.getByRole('button', { name: 'Occasional: Enjoys affection but not constantly', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await question(page, 'Your living space is best described as...');
  await page.getByRole('button', { name: 'Tiny: Studio apartment or small space', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await question(page, 'Other than potential cats, your home contains...');
  assert.equal(await page.getByRole('button', { name: 'Next', exact: true }).isEnabled(), false);
  await page.getByRole('button', { name: 'Dogs', exact: true }).click();
  await page.getByRole('button', { name: 'Young children', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await question(page, 'Which would be absolute cat-astrophes for you?');
  await page.getByRole('button', { name: 'Lots of meowing/vocalization', exact: true }).click();
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await question(page, 'Other than potential cats, your home contains...');
  for (const name of ['Dogs', 'Young children']) {
    assert.match(await page.getByRole('button', { name, exact: true }).getAttribute('class'), /bg-amber-100/);
    await page.getByRole('button', { name, exact: true }).click();
  }
  assert.equal(await page.getByRole('button', { name: 'Next', exact: true }).isEnabled(), false);
  await page.getByRole('button', { name: 'No other animals', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await question(page, 'Which would be absolute cat-astrophes for you?');
  assert.match(await page.getByRole('button', { name: 'Lots of meowing/vocalization', exact: true }).getAttribute('class'), /bg-amber-100/);
  await page.getByRole('button', { name: 'Lots of meowing/vocalization', exact: true }).click();
  await page.getByRole('button', { name: 'See Results', exact: true }).click();
  await page.getByRole('heading', { name: 'Your purr-fect match!', exact: true }).waitFor();
  const edited = selections.map((answer, index) => ({ questionId: index + 1, answer: index === 0 ? 'active' : index === 2 ? 100 : answer }));
  assert.deepEqual(await page.evaluate(() => window.quiz.breedMatches), await page.evaluate(answers => window.calculateBreedMatches(answers, window.breeds), edited));
});

test('rapid Next clicks cannot skip questions', async t => {
  const page = await openQuiz(t);
  await start(page);
  await page.getByRole('button', { name: 'Netflix marathon in pajamas', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).evaluate(button => {
    button.click(); button.click(); button.click();
  });
  await question(page, "When it comes to exercise, you're most like...");
  assert.equal(await page.getByText('Question 2 of 7', { exact: true }).count(), 1);
});

test('final submission uses the latest answer and schedules only one calculation', async t => {
  const page = await openQuiz(t);
  await start(page);
  const expected = await answerThroughFinalQuestion(page);
  await holdCalculations(page);
  await page.evaluate(() => {
    const quiz = window.quiz;
    quiz.saveAnswer(7, ['grooming']);
    quiz.goToNextQuestion();
    quiz.goToNextQuestion();
    quiz.goToNextQuestion();
  });
  await page.getByText('Calculating your cat-culations...', { exact: true }).waitFor();
  assert.equal(await page.evaluate(() => window.calculationTimers.count), 1);
  await page.evaluate(() => window.calculationTimers.finish());
  await page.getByRole('heading', { name: 'Your purr-fect match!', exact: true }).waitFor();
  expected[6].answer = ['grooming'];
  assert.deepEqual(await page.evaluate(() => window.quiz.breedMatches), await page.evaluate(answers => window.calculateBreedMatches(answers, window.breeds), expected));
});

for (const action of ['restart', 'close and reopen']) {
  test(`${action} during calculation clears the run and rejects old callbacks`, async t => {
    const page = await openQuiz(t);
    await start(page);
    await answerThroughFinalQuestion(page);
    await holdCalculations(page);
    await page.getByRole('button', { name: 'See Results', exact: true }).click();
    await page.getByText('Calculating your cat-culations...', { exact: true }).waitFor();
    if (action === 'restart') {
      await page.evaluate(() => window.quiz.resetQuiz());
    } else {
      await page.getByRole('button', { name: 'Close', exact: true }).first().click();
      await page.getByRole('button', { name: 'Open quiz', exact: true }).click();
    }
    await page.getByRole('heading', { name: 'The great cat-aptibility quiz', exact: true }).waitFor();
    assert.equal(await page.evaluate(() => window.calculationTimers.pending), 0);
    await page.evaluate(() => window.calculationTimers.finishCancelled());
    assert.equal(await page.getByRole('heading', { name: 'The great cat-aptibility quiz', exact: true }).count(), 1);
    assert.deepEqual(await page.evaluate(() => ({
      answers: window.quizQuestions.map(q => window.quiz.getAnswerForQuestion(q.id)),
      matches: window.quiz.breedMatches,
      calculating: window.quiz.isCalculating,
      results: window.quiz.showResults,
    })), { answers: Array(7).fill(undefined), matches: [], calculating: false, results: false });

    await start(page);
    const expected = await answerThroughFinalQuestion(page);
    await page.getByRole('button', { name: 'High grooming needs', exact: true }).click();
    expected[6].answer = ['grooming'];
    await page.getByRole('button', { name: 'See Results', exact: true }).click();
    await page.getByText('Calculating your cat-culations...', { exact: true }).waitFor();
    assert.equal(await page.evaluate(() => window.calculationTimers.count), 2);
    await page.evaluate(() => window.calculationTimers.finishCancelled());
    await page.getByRole('heading', { name: 'Your purr-fect match!', exact: true }).waitFor();
    assert.deepEqual(await page.evaluate(() => window.quiz.breedMatches), await page.evaluate(answers => window.calculateBreedMatches(answers, window.breeds), expected));

    await page.getByRole('button', { name: 'Retake Quiz', exact: true }).click();
    await start(page);
    assert.equal(await page.getByRole('button', { name: 'Next', exact: true }).isEnabled(), false);
    assert.deepEqual(await page.evaluate(() => window.quiz.breedMatches), []);
  });
}
