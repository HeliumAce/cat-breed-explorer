
import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { QuizImageOption } from "@/types/quiz";

interface ImageSelectionQuestionProps {
  imageOptions: QuizImageOption[];
  selectedOption: string | number | string[] | number[];
  onOptionSelect: (optionValue: string | number) => void;
}

export function ImageSelectionQuestion({
  imageOptions,
  selectedOption,
  onOptionSelect,
}: ImageSelectionQuestionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {imageOptions.map((option) => (
        <motion.div
          key={option.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`cursor-pointer relative rounded-lg overflow-hidden border-2 ${
            selectedOption === option.value
              ? "border-amber-500"
              : "border-transparent"
          }`}
          onClick={() => onOptionSelect(option.value)}
        >
          <img
            src={option.imageUrl}
            alt={option.caption}
            className="w-full h-32 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-sm">
            {option.caption}
          </div>
          {selectedOption === option.value && (
            <div className="absolute top-2 right-2">
              <CircleCheck className="h-6 w-6 text-amber-500" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
