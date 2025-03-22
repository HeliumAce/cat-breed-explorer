
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { QuizOption } from "@/types/quiz";

interface MultiSelectQuestionProps {
  options: QuizOption[];
  selectedOption: string | number | string[] | number[];
  onMultiSelectChange: (optionValue: string, checked: boolean) => void;
}

export function MultiSelectQuestion({
  options,
  selectedOption,
  onMultiSelectChange,
}: MultiSelectQuestionProps) {
  return (
    <div className="grid gap-3">
      {options.map((option) => {
        // Type assertion to ensure selectedOption is treated as string[] when it's an array
        const isChecked = Array.isArray(selectedOption) && 
          (selectedOption as string[]).includes(option.value.toString());
          
        return (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2"
          >
            <Checkbox
              id={option.id}
              checked={isChecked}
              onCheckedChange={(checked) =>
                onMultiSelectChange(option.value.toString(), checked === true)
              }
              className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
            />
            <label
              htmlFor={option.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {option.text}
            </label>
          </motion.div>
        );
      })}
    </div>
  );
}
