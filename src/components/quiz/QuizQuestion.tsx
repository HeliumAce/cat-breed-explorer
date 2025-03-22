
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuiz } from "@/hooks/useQuiz";
import { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onNext: () => void;
  onBack: () => void;
  isFinalQuestion: boolean;
}

export function QuizQuestion({ question, onNext, onBack, isFinalQuestion }: QuizQuestionProps) {
  const { saveAnswer, getAnswerForQuestion } = useQuiz();
  const [answer, setAnswer] = useState<string | number | string[] | number[]>(
    getAnswerForQuestion(question.id) || 
    (question.type === "checkbox" ? [] : 
      question.type === "slider" ? question.sliderConfig?.min || 1 : "")
  );
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Check if there's an existing answer
    const currentAnswer = getAnswerForQuestion(question.id);
    if (currentAnswer !== undefined) {
      setAnswer(currentAnswer);
      setIsAnswered(true);
    } else {
      // Set default values for sliders
      if (question.type === "slider" && question.sliderConfig) {
        setAnswer(question.sliderConfig.min);
      }
      // Set empty array for checkboxes
      else if (question.type === "checkbox") {
        setAnswer([]);
      } else {
        setAnswer("");
      }
      setIsAnswered(false);
    }
  }, [question.id, getAnswerForQuestion, question.type, question.sliderConfig]);

  const handleNext = () => {
    saveAnswer(question.id, answer);
    onNext();
  };

  const handleMultipleChoiceChange = (value: string) => {
    setAnswer(value);
    setIsAnswered(true);
  };

  const handleSliderChange = (value: number[]) => {
    setAnswer(value[0]);
    setIsAnswered(true);
  };

  const handleCheckboxChange = (checked: boolean, value: string) => {
    if (question.type === "checkbox") {
      setAnswer(prev => {
        const prevArray = Array.isArray(prev) ? prev : [];
        if (checked) {
          return [...prevArray, value];
        } else {
          return prevArray.filter(item => item !== value);
        }
      });
      setIsAnswered(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          {question.question}
        </motion.h2>
        {question.description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            className="text-muted-foreground"
          >
            {question.description}
          </motion.p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        className="py-4"
      >
        {question.type === "multiple-choice" && (
          <RadioGroup
            value={answer as string}
            onValueChange={handleMultipleChoiceChange}
            className="space-y-3"
          >
            {question.options?.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 bg-white/70 hover:bg-white rounded-lg p-4 transition-colors cursor-pointer"
                onClick={() => handleMultipleChoiceChange(option.value as string)}
              >
                <RadioGroupItem value={option.value as string} id={option.id} />
                <label htmlFor={option.id} className="flex-1 cursor-pointer font-medium">
                  {option.text}
                </label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === "slider" && question.sliderConfig && (
          <div className="space-y-6 px-4">
            <div className="pt-6">
              <Slider
                value={[answer as number]}
                min={question.sliderConfig.min}
                max={question.sliderConfig.max}
                step={question.sliderConfig.step}
                onValueChange={handleSliderChange}
                className="mt-6"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{question.sliderConfig.minLabel}</span>
              <span>{question.sliderConfig.maxLabel}</span>
            </div>
          </div>
        )}

        {question.type === "checkbox" && (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div 
                key={option.id}
                className="flex items-center space-x-2 bg-white/70 hover:bg-white rounded-lg p-4 transition-colors"
              >
                <Checkbox
                  id={option.id}
                  checked={(answer as string[]).includes(option.value as string)}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange(checked as boolean, option.value as string)
                  }
                />
                <label htmlFor={option.id} className="flex-1 cursor-pointer font-medium">
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.4 } }}
        className="flex justify-between pt-4"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isAnswered && question.type !== "slider" && question.type !== "checkbox"}
          className="gap-1 bg-amber-600 hover:bg-amber-700"
        >
          {isFinalQuestion ? "See Results" : "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
