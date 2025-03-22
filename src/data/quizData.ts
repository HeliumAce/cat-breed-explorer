
import { QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    question: "Your idea of a perfect Saturday is...",
    options: [
      { id: "homebodySaturday", text: "Netflix marathon in pajamas", value: "homebody" },
      { id: "moderateSaturday", text: "A mix of relaxation and social activities", value: "moderate" },
      { id: "activeSaturday", text: "Outdoor adventures and exploration", value: "active" },
      { id: "socialSaturday", text: "Hosting a dinner party or social gathering", value: "social" }
    ],
    weight: 1.5
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "When it comes to exercise, you're most like...",
    options: [
      { id: "slothEnergy", text: "Sloth: Moving is overrated", value: "low" },
      { id: "koalaEnergy", text: "Koala: Short bursts of energy followed by long naps", value: "moderate-low" },
      { id: "dogEnergy", text: "Dog: Regular play sessions and walks", value: "moderate-high" },
      { id: "squirrelEnergy", text: "Squirrel: CONSTANT MOTION!", value: "high" }
    ],
    weight: 2
  },
  {
    id: 3,
    type: "slider",
    question: "Your tolerance for chatty companions is...",
    sliderConfig: {
      min: 1,
      max: 5,
      step: 1,
      minLabel: "Blessed silence please",
      maxLabel: "Tell me EVERYTHING"
    },
    weight: 1.5
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "Your ideal cuddle buddy would be...",
    options: [
      { id: "independentCuddle", text: "Independent: Only cuddles on their terms", value: "low" },
      { id: "occasionalCuddle", text: "Occasional: Enjoys affection but not constantly", value: "moderate" },
      { id: "frequentCuddle", text: "Frequent: Regular cuddle sessions required", value: "high" },
      { id: "velcroCuddle", text: "Velcro: Attached to you at all times", value: "very-high" }
    ],
    weight: 2
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "Your living space is best described as...",
    options: [
      { id: "tinySpace", text: "Tiny: Studio apartment or small space", value: "small" },
      { id: "moderateSpace", text: "Moderate: Apartment with some room to roam", value: "medium" },
      { id: "largeSpace", text: "Spacious: House with multiple rooms", value: "large" },
      { id: "outdoorSpace", text: "Indoor/Outdoor: Access to secured outdoor areas", value: "outdoor" }
    ],
    weight: 1
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "Other than potential cats, your home contains...",
    isMultiSelect: true,
    options: [
      { id: "noPets", text: "No other animals", value: "none" },
      { id: "dogs", text: "Dogs", value: "dogs" },
      { id: "smallPets", text: "Small pets (birds, hamsters, etc.)", value: "small-pets" },
      { id: "children", text: "Young children", value: "children" }
    ],
    weight: 1.5
  },
  {
    id: 7,
    type: "checkbox",
    question: "Which would be absolute cat-astrophes for you?",
    options: [
      { id: "shedding", text: "Excessive shedding", value: "shedding" },
      { id: "noise", text: "Lots of meowing/vocalization", value: "noise" },
      { id: "energy", text: "High energy levels/zoomies", value: "energy" },
      { id: "grooming", text: "High grooming needs", value: "grooming" },
      { id: "independence", text: "Too independent/aloof", value: "independence" },
      { id: "clinginess", text: "Too clingy/demanding", value: "clinginess" }
    ],
    weight: 2.5
  }
];

export const mockBreedMatches = [
  {
    id: "ragdoll",
    name: "Ragdoll",
    matchPercentage: 98,
    matchReasons: [
      "Matches your cuddly preferences",
      "Quiet demeanor fits your noise tolerance",
      "Moderate energy level matches your lifestyle"
    ]
  },
  {
    id: "maine-coon",
    name: "Maine Coon",
    matchPercentage: 91,
    matchReasons: [
      "Social nature matches your interaction style",
      "Good with other pets in your home",
      "Playful without being too energetic"
    ]
  },
  {
    id: "british-shorthair",
    name: "British Shorthair",
    matchPercentage: 87,
    matchReasons: [
      "Independent but affectionate on their terms",
      "Low maintenance grooming",
      "Calm energy levels match your preferences"
    ]
  }
];
