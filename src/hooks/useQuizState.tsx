
import { useState, useCallback } from 'react';
import { QuizAnswer, BreedMatch } from '@/types/quiz';
import { quizQuestions } from '@/data/quizData';

export function useQuizState() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [breedMatches, setBreedMatches] = useState<BreedMatch[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

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

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setBreedMatches([]);
    setShowResults(false);
  }, []);

  return {
    // Quiz state
    isOpen,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    answers,
    breedMatches,
    isCalculating,
    showResults,
    
    // Quiz state setters
    setIsOpen,
    setCurrentQuestionIndex,
    setAnswers,
    setBreedMatches,
    setIsCalculating,
    setShowResults,
    
    // Quiz actions
    openQuiz,
    closeQuiz,
    goToNextQuestion,
    goToPreviousQuestion,
    saveAnswer,
    getAnswerForQuestion,
    resetQuiz
  };
}
