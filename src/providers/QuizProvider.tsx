
import { createContext, ReactNode, useContext } from "react";
import { useQuizState } from '@/hooks/useQuizState';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useBreeds } from '@/hooks/useBreeds';
import { QuizModal } from "@/components/quiz/QuizModal";

// Create the context with the full type from useQuiz hook
export const QuizContext = createContext<ReturnType<typeof useQuizImplementation> | undefined>(undefined);

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

// Hook for consuming the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  
  return context;
};
