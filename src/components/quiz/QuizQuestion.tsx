
import { useState, useEffect } from "react";
import { QuizQuestion as QuestionType } from "@/types/quiz";
import { useQuiz } from "@/hooks/useQuiz";
import { motion } from "framer-motion";

// Import component for each question type
import { MultipleChoiceQuestion } from "./question-types/MultipleChoiceQuestion";
import { MultiSelectQuestion } from "./question-types/MultiSelectQuestion";
import { SliderQuestion } from "./question-types/SliderQuestion";
import { CheckboxQuestion } from "./question-types/CheckboxQuestion";
import { ImageSelectionQuestion } from "./question-types/ImageSelectionQuestion";
import { QuizQuestionButtons } from "./QuizQuestionButtons";

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
        setHasAnswered(false);
      } else if (question.type === "slider" && question.sliderConfig) {
        // For slider questions, start with midpoint and consider it answered
        const midpoint = Math.round((question.sliderConfig.min + question.sliderConfig.max) / 2);
        setSelectedOption(midpoint);
        setHasAnswered(true);
        saveAnswer(question.id, midpoint);
      } else {
        setSelectedOption("");
        setHasAnswered(false);
      }
    }
  }, [question.id, getAnswerForQuestion, saveAnswer, question.type, question.sliderConfig, question.isMultiSelect]);

  const handleOptionSelect = (optionValue: string | number) => {
    setSelectedOption(optionValue);
    setHasAnswered(true);
    saveAnswer(question.id, optionValue);
  };

  // Fixed handleMultiSelectChange function with proper typing
  const handleMultiSelectChange = (optionValue: string, checked: boolean) => {
    const currentValue = Array.isArray(selectedOption)
      ? [...selectedOption as string[]]
      : [] as string[];
      
    const updatedValue: string[] = checked
      ? [...currentValue, optionValue]
      : currentValue.filter((value) => value !== optionValue);
      
    setSelectedOption(updatedValue);
    setHasAnswered(updatedValue.length > 0);
    saveAnswer(question.id, updatedValue);
  };

  // Fixed handleCheckboxChange function with proper typing
  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    const currentValue = Array.isArray(selectedOption)
      ? [...selectedOption as string[]]
      : [] as string[];
      
    const updatedValue: string[] = checked
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
          <MultipleChoiceQuestion 
            options={question.options}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
          />
        )}

        {question.type === "multiple-choice" && question.options && question.isMultiSelect && (
          <MultiSelectQuestion
            options={question.options}
            selectedOption={selectedOption}
            onMultiSelectChange={handleMultiSelectChange}
          />
        )}

        {question.type === "slider" && question.sliderConfig && (
          <SliderQuestion
            sliderConfig={question.sliderConfig}
            selectedOption={selectedOption}
            onSliderChange={handleSliderChange}
          />
        )}

        {question.type === "checkbox" && question.options && (
          <CheckboxQuestion
            options={question.options}
            selectedOption={selectedOption}
            onCheckboxChange={handleCheckboxChange}
            questionId={question.id}
          />
        )}

        {question.type === "image-selection" && question.imageOptions && (
          <ImageSelectionQuestion
            imageOptions={question.imageOptions}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
          />
        )}
      </div>

      <QuizQuestionButtons
        onNext={onNext}
        onBack={onBack}
        currentQuestionIndex={currentQuestionIndex}
        hasAnswered={hasAnswered}
        isFinalQuestion={isFinalQuestion}
      />
    </div>
  );
}
