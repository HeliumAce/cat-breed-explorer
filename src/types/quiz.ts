
export interface QuizQuestion {
  id: number;
  type: "multiple-choice" | "slider" | "image-selection" | "checkbox";
  question: string;
  description?: string;
  options?: QuizOption[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    minLabel: string;
    maxLabel: string;
  };
  imageOptions?: QuizImageOption[];
  isMultiSelect?: boolean;
  weight: number; // Importance factor for this question in matching
}

export interface QuizOption {
  id: string;
  text: string;
  value: number | string;
  icon?: string;
}

export interface QuizImageOption {
  id: string;
  imageUrl: string;
  caption: string;
  value: number | string;
}

export interface QuizAnswer {
  questionId: number;
  answer: string | number | string[] | number[];
}

export interface BreedMatch {
  id: string;
  name: string;
  matchPercentage: number;
  imageUrl?: string;
  description: string;
  matchReasons: string[];
}
