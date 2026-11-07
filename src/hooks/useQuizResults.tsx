
import { useCallback } from 'react';
import { QuizAnswer, BreedMatch } from '@/types/quiz';
import { Breed } from '@/types/breeds';
import { calculateBreedMatches } from '@/utils/quiz-matching';
import { toast } from 'sonner';

interface UseQuizResultsProps {
  answers: QuizAnswer[];
  breeds: Breed[] | undefined;
  setBreedMatches: (matches: BreedMatch[]) => void;
  setShowResults: (show: boolean) => void;
  setIsCalculating: (calculating: boolean) => void;
}

export function useQuizResults({
  answers,
  breeds,
  setBreedMatches,
  setShowResults,
  setIsCalculating
}: UseQuizResultsProps) {
  
  const calculateResults = useCallback(() => {
    setIsCalculating(true);
    
    // Simulate calculation time for UX
    setTimeout(() => {
      try {
        const calculatedMatches = calculateBreedMatches(answers, breeds || []);
        
        setBreedMatches(calculatedMatches);
        setShowResults(true);
        setIsCalculating(false);
      } catch (error) {
        console.error("Error calculating matches:", error);
        toast.error("Something went wrong calculating your matches. Please try again.");
        setIsCalculating(false);
      }
    }, 2000); // 2 second delay for the loading animation
  }, [answers, breeds, setBreedMatches, setIsCalculating, setShowResults]);

  return { calculateResults };
}
