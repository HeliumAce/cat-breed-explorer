
import { useState, useCallback } from 'react';
import { QuizAnswer, BreedMatch } from '@/types/quiz';
import { quizQuestions, mockBreedMatches } from '@/data/quizData';
import { BreedWithImage } from '@/types/breeds';
import { useBreeds } from '@/hooks/useBreeds';
import { toast } from 'sonner';

export function useQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [breedMatches, setBreedMatches] = useState<BreedMatch[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { breeds } = useBreeds();

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = Math.round(((currentQuestionIndex) / totalQuestions) * 100);

  const openQuiz = useCallback(() => {
    setIsOpen(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setBreedMatches([]);
    setShowResults(false);
  }, []);

  const closeQuiz = useCallback(() => {
    setIsOpen(false);
  }, []);

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults();
    }
  }, [currentQuestionIndex, totalQuestions]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const saveAnswer = useCallback((questionId: number, answer: string | number | string[] | number[]) => {
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
      if (existingAnswerIndex >= 0) {
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = { questionId, answer };
        return newAnswers;
      } else {
        return [...prev, { questionId, answer }];
      }
    });
  }, []);

  const getAnswerForQuestion = useCallback((questionId: number) => {
    return answers.find(a => a.questionId === questionId)?.answer;
  }, [answers]);

  const calculateResults = useCallback(() => {
    setIsCalculating(true);
    
    // Simulate calculation time for UX
    setTimeout(() => {
      try {
        if (!breeds || breeds.length === 0) {
          // If we don't have real breeds data, use mock data
          setBreedMatches(mockBreedMatches);
        } else {
          // Here we would implement the actual matching algorithm using the real breeds data
          // For now, implement a simple matching algorithm
          const matches = calculateBreedMatches(answers, breeds);
          setBreedMatches(matches);
        }
        
        setShowResults(true);
        setIsCalculating(false);
      } catch (error) {
        console.error("Error calculating matches:", error);
        toast.error("Something went wrong calculating your matches. Please try again.");
        setIsCalculating(false);
      }
    }, 3000); // 3 second delay for the loading animation
  }, [answers, breeds]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setBreedMatches([]);
    setShowResults(false);
  }, []);

  return {
    isOpen,
    openQuiz,
    closeQuiz,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    goToNextQuestion,
    goToPreviousQuestion,
    saveAnswer,
    getAnswerForQuestion,
    isCalculating,
    showResults,
    breedMatches,
    resetQuiz
  };
}

// Helper function to calculate breed matches
function calculateBreedMatches(answers: QuizAnswer[], breeds: BreedWithImage[]): BreedMatch[] {
  // This is a simplified algorithm - in a real application this would be more sophisticated
  
  // Create a scoring map for each breed
  const breedScores = breeds.map(breed => {
    let score = 0;
    let maxScore = 0;
    const matchReasons: string[] = [];

    // Example scoring logic (simplified)
    answers.forEach(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId);
      if (!question) return;
      
      const questionWeight = question.weight;
      maxScore += 5 * questionWeight; // Assuming maximum score of 5 per question
      
      // Sample logic for different questions - in a real app, this would be more sophisticated
      switch (answer.questionId) {
        case 1: // Activity level
          if ((answer.answer === "homebody" && breed.energy_level <= 3) ||
              (answer.answer === "active" && breed.energy_level >= 4)) {
            score += 5 * questionWeight;
            matchReasons.push(`Activity level aligns with your lifestyle`);
          } else {
            score += 2 * questionWeight;
          }
          break;
        case 2: // Energy
          if ((answer.answer === "low" && breed.energy_level <= 2) ||
              (answer.answer === "moderate-low" && breed.energy_level === 3) ||
              (answer.answer === "moderate-high" && breed.energy_level === 4) ||
              (answer.answer === "high" && breed.energy_level === 5)) {
            score += 5 * questionWeight;
            matchReasons.push(`Energy level is a great match for you`);
          } else {
            score += 2 * questionWeight;
          }
          break;
        case 3: // Noise tolerance
          if ((typeof answer.answer === 'number' && answer.answer >= 3 && breed.vocalisation >= 3) ||
              (typeof answer.answer === 'number' && answer.answer <= 2 && breed.vocalisation <= 2)) {
            score += 5 * questionWeight;
            matchReasons.push(`Vocalization level matches your preference`);
          } else {
            score += 2 * questionWeight;
          }
          break;
        case 4: // Affection
          if ((answer.answer === "low" && breed.affection_level <= 2) ||
              (answer.answer === "moderate" && breed.affection_level === 3) ||
              (answer.answer === "high" && breed.affection_level === 4) ||
              (answer.answer === "very-high" && breed.affection_level === 5)) {
            score += 5 * questionWeight;
            matchReasons.push(`Matches your cuddling preferences perfectly`);
          } else {
            score += 2 * questionWeight;
          }
          break;
        // Add more cases for other questions
      }
    });

    // Check for dealbreakers (question 7)
    const dealbreakers = answers.find(a => a.questionId === 7)?.answer as string[] || [];
    if (dealbreakers.includes("shedding") && breed.shedding_level > 3) {
      score = score * 0.5; // Significantly reduce score for dealbreakers
    }
    if (dealbreakers.includes("noise") && breed.vocalisation > 3) {
      score = score * 0.5;
    }
    if (dealbreakers.includes("energy") && breed.energy_level > 4) {
      score = score * 0.5;
    }
    if (dealbreakers.includes("grooming") && breed.grooming > 3) {
      score = score * 0.5;
    }
    
    // Select top 3 match reasons (or fewer if we don't have enough)
    const selectedReasons = matchReasons.slice(0, Math.min(3, matchReasons.length));
    
    // If we don't have enough reasons, add some generic ones based on breed traits
    if (selectedReasons.length < 2) {
      if (breed.child_friendly >= 4) {
        selectedReasons.push(`Great with children and families`);
      }
      if (breed.dog_friendly >= 4) {
        selectedReasons.push(`Gets along well with dogs`);
      }
      if (breed.intelligence >= 4) {
        selectedReasons.push(`Intelligent and can learn tricks`);
      }
      if (breed.social_needs <= 3) {
        selectedReasons.push(`Independent and low-maintenance`);
      }
    }

    // Calculate match percentage (0-100)
    const matchPercentage = Math.round((score / maxScore) * 100);
    
    // Add a small random factor for variety (±5%)
    const randomFactor = Math.floor(Math.random() * 11) - 5;
    const adjustedPercentage = Math.min(100, Math.max(0, matchPercentage + randomFactor));
    
    return {
      id: breed.id,
      name: breed.name,
      matchPercentage: adjustedPercentage,
      imageUrl: breed.image?.url,
      description: breed.description || '',
      matchReasons: selectedReasons.length > 0 ? selectedReasons : ["This breed has qualities that match your preferences"]
    };
  });

  // Sort by match percentage (descending)
  return breedScores.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
