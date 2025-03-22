
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuizQuestionButtonsProps {
  onNext: () => void;
  onBack: () => void;
  currentQuestionIndex: number;
  hasAnswered: boolean;
  isFinalQuestion: boolean;
}

export function QuizQuestionButtons({
  onNext,
  onBack,
  currentQuestionIndex,
  hasAnswered,
  isFinalQuestion,
}: QuizQuestionButtonsProps) {
  return (
    <div className="flex justify-between pt-6">
      {currentQuestionIndex > 1 ? (
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
      ) : (
        <div></div>
      )}

      <Button
        type="button"
        onClick={onNext}
        disabled={!hasAnswered}
        className={`gap-1 ${
          isFinalQuestion
            ? "bg-green-600 hover:bg-green-700"
            : "bg-amber-500 hover:bg-amber-600"
        }`}
      >
        {isFinalQuestion ? "See Results" : "Next"}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
