import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: 'custom',
});
after(() => server.close());
const { calculateBreedMatches } = await server.ssrLoadModule('/src/utils/quiz-matching.ts');
const { withLocalBreedTraits } = await server.ssrLoadModule('/src/data/breed-ratings.ts');

// A quiz-eligible breed with known values at each existing scoring boundary.
const breed = {
  ...withLocalBreedTraits({ id: 'abys', name: 'Test breed' }),
  energy_level: 5, vocalisation: 3, affection_level: 4, adaptability: 4,
  image: { id: 'photo', url: 'https://example.test/cat.jpg', width: 400, height: 400 },
};
const otherAnswers = [
  { questionId: 2, answer: 'high' },
  { questionId: 3, answer: 50 },
  { questionId: 4, answer: 'high' },
  { questionId: 5, answer: 'small' },
  { questionId: 6, answer: ['none'] },
  { questionId: 7, answer: [] },
];

test('Saturday contributes its existing weight exactly once to the seven-question score', () => {
  const score = answer => calculateBreedMatches([{ questionId: 1, answer }, ...otherAnswers], [breed])[0].matchPercentage;
  assert.equal(score('active'), 100);
  // Other answers: 40/40 points. Saturday homebody: 1.5/7.5 points, total 41.5/47.5.
  assert.equal(score('homebody'), 87);
  assert.equal(calculateBreedMatches(otherAnswers, [breed])[0].matchPercentage, 100);
});

test('optional dealbreakers add no points and selected dealbreakers retain the existing penalty', () => {
  const answers = [{ questionId: 1, answer: 'active' }, ...otherAnswers];
  const score = values => calculateBreedMatches(values, [breed])[0].matchPercentage;
  assert.equal(score(answers), 100);
  assert.equal(score(answers.filter(answer => answer.questionId !== 7)), 100);
  assert.equal(score(answers.map(answer => answer.questionId === 7 ? { ...answer, answer: ['energy'] } : answer)), 40);
});
