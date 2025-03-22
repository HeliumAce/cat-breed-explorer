
import { useQuizState } from './useQuizState';
import { useQuizResults } from './useQuizResults';
import { useBreeds } from '@/hooks/useBreeds';

export function useQuiz() {
  const { breeds } = useBreeds();
  
  const {
    // Quiz state
    isOpen,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    answers,
    breedMatches,
    isCalculating,
    showResults,
    
    // Quiz state setters
    setBreedMatches,
    setIsCalculating,
    setShowResults,
    
    // Quiz actions
    openQuiz,
    closeQuiz,
    goToNextQuestion,
    goToPreviousQuestion,
    saveAnswer,
    getAnswerForQuestion,
    resetQuiz
  } = useQuizState();

  const { calculateResults } = useQuizResults({
    answers,
    breeds,
    setBreedMatches,
    setShowResults,
    setIsCalculating
  });

  // Override goToNextQuestion to calculate results when reaching the end
  const handleGoToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      goToNextQuestion();
    } else {
      calculateResults();
    }
  };

  return {
    isOpen,
    openQuiz,
    closeQuiz,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    goToNextQuestion: handleGoToNextQuestion,
    goToPreviousQuestion,
    saveAnswer,
    getAnswerForQuestion,
    isCalculating,
    showResults,
    breedMatches,
    resetQuiz
  };
}
