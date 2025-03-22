
import { createContext, ReactNode, useContext } from "react";
import { useQuiz } from "@/hooks/useQuiz";

// Create the context
export const QuizContext = createContext<ReturnType<typeof useQuiz> | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

// Create provider component
export function QuizProvider({ children }: QuizProviderProps) {
  const quiz = useQuiz();
  
  return <QuizContext.Provider value={quiz}>{children}</QuizContext.Provider>;
}

// Hook for consuming the quiz context
export const useQuizContext = () => {
  const context = useContext(QuizContext);
  
  if (context === undefined) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  
  return context;
};
