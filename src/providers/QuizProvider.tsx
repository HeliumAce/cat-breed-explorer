
import { ReactNode } from "react";
import { QuizContext } from '@/hooks/useQuiz';
import { useQuizState } from '@/hooks/useQuizState';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useBreeds } from '@/hooks/useBreeds';
import { QuizModal } from "@/components/quiz/QuizModal";

// Internal implementation of the quiz logic
function useQuizImplementation() {
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

interface QuizProviderProps {
  children: ReactNode;
}

// Create provider component
export function QuizProvider({ children }: QuizProviderProps) {
  const quiz = useQuizImplementation();
  
  return (
    <QuizContext.Provider value={quiz}>
      {children}
      <QuizModal />
    </QuizContext.Provider>
  );
}
