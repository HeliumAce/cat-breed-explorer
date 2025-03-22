
import { createContext, ReactNode, useContext } from "react";

// Create the context with proper typing for the context value
type QuizContextType = {
  isOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
  currentQuestion: any;
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  saveAnswer: (questionId: number, answer: string | number | string[] | number[]) => void;
  getAnswerForQuestion: (questionId: number) => string | number | string[] | number[] | undefined;
  isCalculating: boolean;
  showResults: boolean;
  breedMatches: any[];
  resetQuiz: () => void;
} | undefined;

// Create the context with undefined as default value
export const QuizContext = createContext<QuizContextType>(undefined);

// Hook for consuming the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  
  return context;
};
