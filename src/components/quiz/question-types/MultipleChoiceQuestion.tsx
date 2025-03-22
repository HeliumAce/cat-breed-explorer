
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { QuizOption } from "@/types/quiz";

interface MultipleChoiceQuestionProps {
  options: QuizOption[];
  selectedOption: string | number | string[] | number[];
  onOptionSelect: (optionValue: string | number) => void;
  isMultiSelect?: boolean;
}

export function MultipleChoiceQuestion({
  options,
  selectedOption,
  onOptionSelect,
  isMultiSelect,
}: MultipleChoiceQuestionProps) {
  if (isMultiSelect) {
    return null; // This case is handled by MultiSelectQuestion
  }

  return (
    <div className="grid gap-3">
      {options.map((option) => (
        <motion.div
          key={option.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="button"
            variant="outline"
            className={`w-full justify-start text-left h-auto py-3 px-4 ${
              selectedOption === option.value
                ? "bg-amber-100 border-amber-300"
                : ""
            }`}
            onClick={() => onOptionSelect(option.value)}
          >
            <span className="mr-2">
              {selectedOption === option.value ? (
                <CheckCircle2 className="h-5 w-5 text-amber-500" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
              )}
            </span>
            {option.text}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
