
import { useCallback } from 'react';
import { QuizAnswer, BreedMatch } from '@/types/quiz';
import { mockBreedMatches } from '@/data/quizData';
import { calculateBreedMatches } from '@/utils/quiz-matching';
import { toast } from 'sonner';

interface UseQuizResultsProps {
  answers: QuizAnswer[];
  breeds: any[] | undefined;
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
        let calculatedMatches: BreedMatch[] = [];
        
        if (!breeds || breeds.length === 0) {
          // If no real breeds data, use mock data with required fields
          calculatedMatches = mockBreedMatches.map(match => ({
            ...match,
            description: match.description || `The ${match.name} is a wonderful breed that matches your preferences.`,
            matchReasons: match.matchReasons || ["Great personality match", "Fits your lifestyle preferences"]
          }));
        } else {
          // Use the actual matching algorithm with real breeds data
          calculatedMatches = calculateBreedMatches(answers, breeds);
        }
        
        // Ensure we have at least one match
        if (calculatedMatches.length === 0) {
          // If no matches found, create a fallback match
          const fallbackMatch: BreedMatch = {
            id: "domestic-shorthair",
            name: "Domestic Shorthair",
            matchPercentage: 85,
            description: "The Domestic Shorthair is a versatile and adaptable cat that suits many lifestyles.",
            imageUrl: breeds && breeds.length > 0 ? breeds[0].image?.url : undefined,
            matchReasons: [
              "Adaptable to various lifestyles",
              "Generally friendly and sociable",
              "Low maintenance requirements"
            ]
          };
          calculatedMatches = [fallbackMatch];
        }
        
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
