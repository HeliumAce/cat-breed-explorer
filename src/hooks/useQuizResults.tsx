import { useEffect } from 'react';
import { QuizAnswer, BreedMatch } from '@/types/quiz';
import { Breed } from '@/types/breeds';
import { calculateBreedMatches } from '@/utils/quiz-matching';
import { toast } from 'sonner';

interface UseQuizResultsProps {
  answers: QuizAnswer[];
  breeds: Breed[];
  isCalculating: boolean;
  runId: number;
  completeCalculation: (runId: number, matches: BreedMatch[]) => void;
  failCalculation: (runId: number) => void;
}

export function useQuizResults({
  answers,
  breeds,
  isCalculating,
  runId,
  completeCalculation,
  failCalculation,
}: UseQuizResultsProps) {
  useEffect(() => {
    if (!isCalculating) return;
    let cancelled = false;
    // Keep the existing loading animation; calculate from the committed final answers.
    const timer = setTimeout(() => {
      if (cancelled) return;
      try {
        completeCalculation(runId, calculateBreedMatches(answers, breeds));
      } catch (error) {
        console.error('Error calculating matches:', error);
        toast.error('Something went wrong calculating your matches. Please try again.');
        failCalculation(runId);
      }
    }, 2000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [answers, breeds, isCalculating, runId, completeCalculation, failCalculation]);
}
