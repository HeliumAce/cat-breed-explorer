import { ReactNode } from 'react';
import { QuizContext } from '@/hooks/useQuiz';
import { useQuizState } from '@/hooks/useQuizState';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useBreeds } from '@/hooks/useBreeds';
import { QuizModal } from '@/components/quiz/QuizModal';

export function QuizProvider({ children }: { children: ReactNode }) {
  const { breeds } = useBreeds();
  const quiz = useQuizState();
  useQuizResults({
    answers: quiz.answers,
    breeds,
    isCalculating: quiz.isCalculating,
    runId: quiz.runId,
    completeCalculation: quiz.completeCalculation,
    failCalculation: quiz.failCalculation,
  });

  return (
    <QuizContext.Provider value={quiz}>
      {children}
      <QuizModal />
    </QuizContext.Provider>
  );
}
