import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { QuizProvider } from '@/providers/QuizProvider';
import { useQuiz } from '@/hooks/useQuiz';
import { quizQuestions } from '@/data/quizData';
import { withLocalBreedTraits } from '@/data/breed-ratings';
import { calculateBreedMatches } from '@/utils/quiz-matching';
import '@/index.css';

const breeds = ['abys', 'pers', 'siam', 'ragd'].map(id => withLocalBreedTraits({
  id, name: id, description: `${id} test breed`, origin: 'Test',
  weight: { metric: '3–5', imperial: '7–11' }, temperament: '',
  country_codes: '', country_code: '', life_span: '10–15', indoor: 0,
  health_issues: 0, stranger_friendly: 0, experimental: 0, hairless: 0,
  natural: 0, rare: 0, rex: 0, suppressed_tail: 0, short_legs: 0, hypoallergenic: 0,
  image: { id, url: '/favicon.svg', width: 400, height: 400 },
}));
const client = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } });
client.setQueryData(['breeds'], breeds);

export function Harness() {
  const quiz = useQuiz();
  // Only this test entry point exposes the public context for batched-event and lifecycle checks.
  Object.assign(window, { quiz, quizQuestions, breeds, calculateBreedMatches });
  return <button onClick={quiz.openQuiz}>Open quiz</button>;
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <MemoryRouter>
      <QuizProvider><Harness /></QuizProvider>
    </MemoryRouter>
  </QueryClientProvider>,
);
