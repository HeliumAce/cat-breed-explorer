
import { createContext, useContext } from "react";
import { BreedMatch, QuizAnswer, QuizQuestion } from '@/types/quiz';

// Create the context with proper typing for the context value
type QuizContextType = {
  isOpen: boolean;
  isWelcome: boolean;
  startQuiz: () => void;
  openQuiz: () => void;
  closeQuiz: () => void;
  currentQuestion: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  saveAnswer: (questionId: number, answer: QuizAnswer['answer']) => void;
  getAnswerForQuestion: (questionId: number) => QuizAnswer['answer'] | undefined;
  isCalculating: boolean;
  showResults: boolean;
  breedMatches: BreedMatch[];
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
