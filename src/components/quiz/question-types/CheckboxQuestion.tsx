
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckSquare, Square } from "lucide-react";
import { QuizOption } from "@/types/quiz";

interface CheckboxQuestionProps {
  options: QuizOption[];
  selectedOption: string | number | string[] | number[];
  onCheckboxChange: (optionValue: string, checked: boolean) => void;
  questionId: number;
}

export function CheckboxQuestion({
  options,
  selectedOption,
  onCheckboxChange,
  questionId,
}: CheckboxQuestionProps) {
  return (
    <div className="grid gap-3">
      {options.map((option) => {
        // Use proper type assertion for selectedOption
        const isChecked = Array.isArray(selectedOption) && 
          (selectedOption as string[]).includes(option.value.toString());
          
        return (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="button"
              variant="outline"
              className={`w-full justify-start text-left h-auto py-3 px-4 ${
                isChecked
                  ? "bg-amber-100 border-amber-300"
                  : ""
              }`}
              onClick={() => onCheckboxChange(option.value.toString(), !isChecked)}
            >
              <span className="mr-2">
                {isChecked ? (
                  <CheckSquare className="h-5 w-5 text-amber-500" />
                ) : (
                  <Square className="h-5 w-5 text-muted-foreground" />
                )}
              </span>
              {option.text}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
