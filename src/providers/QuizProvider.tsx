
import { createContext, ReactNode, useContext } from "react";
import { useQuiz as useQuizHook } from "@/hooks/useQuiz";
import { QuizModal } from "@/components/quiz/QuizModal";

// Create the context
export const QuizContext = createContext<ReturnType<typeof useQuizHook> | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

// Create provider component
export function QuizProvider({ children }: QuizProviderProps) {
  const quiz = useQuizHook();
  
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
