
import { useEffect } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QuizWelcome } from "./QuizWelcome";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResults } from "./QuizResults";
import { QuizProgress } from "./QuizProgress";
import { Cat, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function QuizModal() {
  const { 
    isOpen, 
    closeQuiz, 
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    showResults,
    isCalculating,
    goToNextQuestion,
    goToPreviousQuestion,
    resetQuiz
  } = useQuiz();

  // Disable scrolling on the main page when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeQuiz()}>
      <DialogContent className="sm:max-w-xl md:max-w-2xl p-0 bg-amber-50 border-amber-200 overflow-hidden">
        <div className="relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-amber-200/40 rounded-full -translate-x-12 -translate-y-12" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-200/30 rounded-full translate-x-16 translate-y-16" />
          
          <div className="relative z-10 px-6 py-6 sm:p-10">
            <AnimatePresence mode="wait">
              {currentQuestionIndex === 0 && !showResults && !isCalculating && (
                <QuizWelcome key="welcome" onStart={goToNextQuestion} />
              )}
              
              {currentQuestionIndex > 0 && !showResults && !isCalculating && (
                <motion.div
                  key={`question-${currentQuestionIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <QuizProgress progress={progress} currentStep={currentQuestionIndex} totalSteps={totalQuestions} />
                  </div>
                  
                  <QuizQuestion 
                    question={currentQuestion} 
                    onNext={goToNextQuestion}
                    onBack={goToPreviousQuestion}
                    isFinalQuestion={currentQuestionIndex === totalQuestions - 1}
                  />
                </motion.div>
              )}
              
              {isCalculating && (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <Cat className="h-16 w-16 text-amber-600 animate-bounce mb-4" />
                  <h2 className="text-2xl font-bold text-center mb-2">Calculating your cat-culations...</h2>
                  <p className="text-muted-foreground text-center mb-6">Finding your purr-fect match!</p>
                  <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
                </motion.div>
              )}
              
              {showResults && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <QuizResults onReset={resetQuiz} onClose={closeQuiz} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
