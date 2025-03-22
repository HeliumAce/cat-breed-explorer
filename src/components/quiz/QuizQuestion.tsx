
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuizQuestion as QuestionType } from "@/types/quiz";
import { useQuiz } from "@/hooks/useQuiz";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  CircleCheck,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

interface QuizQuestionProps {
  question: QuestionType;
  onNext: () => void;
  onBack: () => void;
  isFinalQuestion: boolean;
}

export function QuizQuestion({
  question,
  onNext,
  onBack,
  isFinalQuestion,
}: QuizQuestionProps) {
  const { saveAnswer, getAnswerForQuestion, currentQuestionIndex } = useQuiz();
  // Properly type the state to handle all possible answer types
  const [selectedOption, setSelectedOption] = useState<
    string | number | string[] | number[]
  >(getAnswerForQuestion(question.id) || (question.type === "checkbox" || question.isMultiSelect ? [] : ""));
  const [hasAnswered, setHasAnswered] = useState(false);

  // Reset selected option when question changes
  useEffect(() => {
    const savedAnswer = getAnswerForQuestion(question.id);
    if (savedAnswer !== undefined) {
      setSelectedOption(savedAnswer);
      setHasAnswered(true);
    } else {
      // Initialize with empty array for checkbox or multi-select questions
      if (question.type === "checkbox" || question.isMultiSelect) {
        setSelectedOption([]);
      } else {
        setSelectedOption("");
      }
      setHasAnswered(false);
    }
  }, [question.id, getAnswerForQuestion]);

  const handleOptionSelect = (optionValue: string | number) => {
    setSelectedOption(optionValue);
    setHasAnswered(true);
    saveAnswer(question.id, optionValue);
  };

  const handleMultiSelectChange = (optionValue: string, checked: boolean) => {
    // Ensure we're working with a string array
    const currentValue = Array.isArray(selectedOption)
      ? [...selectedOption as string[]]
      : [] as string[];
      
    // Now TypeScript knows we're working with string[]
    const updatedValue = checked
      ? [...currentValue, optionValue]
      : currentValue.filter((value) => value !== optionValue);
      
    setSelectedOption(updatedValue);
    setHasAnswered(updatedValue.length > 0);
    saveAnswer(question.id, updatedValue);
  };

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    // Ensure we're working with a string array
    const currentValue = Array.isArray(selectedOption)
      ? [...selectedOption as string[]]
      : [] as string[];
      
    // Now TypeScript knows we're working with string[]
    const updatedValue = checked
      ? [...currentValue, optionValue]
      : currentValue.filter((value) => value !== optionValue);
      
    setSelectedOption(updatedValue);
    
    // Question 7 doesn't require a selection to see results
    if (question.id !== 7) {
      setHasAnswered(updatedValue.length > 0);
    } else {
      // Always consider question 7 as answered, even with no selections
      setHasAnswered(true);
    }
    
    saveAnswer(question.id, updatedValue);
  };

  const handleSliderChange = (value: number[]) => {
    const sliderValue = value[0];
    setSelectedOption(sliderValue);
    setHasAnswered(true);
    saveAnswer(question.id, sliderValue);
  };

  // Special handling for question 7 - mark it as answered immediately
  useEffect(() => {
    if (question.id === 7) {
      setHasAnswered(true);
    }
  }, [question.id]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">{question.question}</h3>
        {question.description && (
          <p className="text-muted-foreground mb-4">{question.description}</p>
        )}
      </div>

      <div className="space-y-4">
        {question.type === "multiple-choice" && question.options && !question.isMultiSelect && (
          <div className="grid gap-3">
            {question.options.map((option) => (
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
                  onClick={() => handleOptionSelect(option.value)}
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
        )}

        {question.type === "multiple-choice" && question.options && question.isMultiSelect && (
          <div className="grid gap-3">
            {question.options.map((option) => {
              const isChecked = Array.isArray(selectedOption) && 
                selectedOption.includes(option.value.toString());
                
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
                      handleMultiSelectChange(option.value.toString(), checked === true)
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
        )}

        {question.type === "slider" && question.sliderConfig && (
          <div className="space-y-6 py-4">
            <Slider
              defaultValue={[
                typeof selectedOption === "number"
                  ? selectedOption
                  : question.sliderConfig.min,
              ]}
              max={question.sliderConfig.max}
              min={question.sliderConfig.min}
              step={question.sliderConfig.step}
              onValueChange={handleSliderChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground pt-2">
              <span>{question.sliderConfig.minLabel}</span>
              <span>{question.sliderConfig.maxLabel}</span>
            </div>
          </div>
        )}

        {question.type === "checkbox" && question.options && (
          <div className="grid gap-3">
            {question.options.map((option) => {
              // Safely check if the option value is in the selected options
              const isChecked = Array.isArray(selectedOption) && 
                selectedOption.includes(option.value.toString());
                
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
                      handleCheckboxChange(option.value.toString(), checked === true)
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
        )}

        {question.type === "image-selection" && question.imageOptions && (
          <div className="grid grid-cols-2 gap-4">
            {question.imageOptions.map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`cursor-pointer relative rounded-lg overflow-hidden border-2 ${
                  selectedOption === option.value
                    ? "border-amber-500"
                    : "border-transparent"
                }`}
                onClick={() => handleOptionSelect(option.value)}
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
        )}
      </div>

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
    </div>
  );
}
