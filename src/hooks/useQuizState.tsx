import { useReducer, useCallback } from 'react';
import { QuizAnswer, BreedMatch } from '@/types/quiz';
import { quizQuestions } from '@/data/quizData';

interface QuizState {
  isOpen: boolean;
  phase: 'welcome' | 'questions' | 'calculating' | 'results';
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  breedMatches: BreedMatch[];
  runId: number;
}

type QuizAction =
  | { type: 'open' | 'close' | 'reset' }
  | { type: 'start'; runId: number }
  | { type: 'next' | 'previous'; runId: number; questionIndex: number }
  | { type: 'answer'; runId: number; questionId: number; answer: QuizAnswer['answer'] }
  | { type: 'calculated'; runId: number; matches: BreedMatch[] }
  | { type: 'failed'; runId: number };

const initialState: QuizState = {
  isOpen: false,
  phase: 'welcome',
  currentQuestionIndex: 0,
  answers: [],
  breedMatches: [],
  runId: 0,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'open':
    case 'close':
    case 'reset':
      return {
        ...initialState,
        isOpen: action.type === 'reset' ? state.isOpen : action.type === 'open',
        runId: state.runId + 1,
      };
  }

  // Reject actions or delayed results from an earlier run.
  if (!state.isOpen || action.runId !== state.runId) return state;

  switch (action.type) {
    case 'start':
      return state.phase === 'welcome' ? { ...state, phase: 'questions' } : state;
    case 'calculated':
      return state.phase === 'calculating'
        ? { ...state, phase: 'results', breedMatches: action.matches }
        : state;
    case 'failed':
      return state.phase === 'calculating' ? { ...state, phase: 'questions' } : state;
  }

  if (state.phase !== 'questions') return state;
  const question = quizQuestions[state.currentQuestionIndex];

  if (action.type === 'answer') {
    if (action.questionId !== question.id) return state;
    const saved = { questionId: action.questionId, answer: action.answer };
    const answers = state.answers.some(answer => answer.questionId === question.id)
      ? state.answers.map(answer => answer.questionId === question.id ? saved : answer)
      : [...state.answers, saved];
    return { ...state, answers };
  }

  // An exiting question's button can still receive clicks during its animation.
  if (action.questionIndex !== state.currentQuestionIndex) return state;
  if (action.type === 'previous') {
    return { ...state, currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1) };
  }

  const answer = state.answers.find(answer => answer.questionId === question.id)?.answer;
  if (question.id !== 7 && (answer === undefined || answer === '' || (Array.isArray(answer) && !answer.length))) {
    return state;
  }
  if (state.currentQuestionIndex < quizQuestions.length - 1) {
    return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
  }
  return {
    ...state,
    phase: 'calculating',
    // The final dealbreaker question is optional; an untouched selection is empty.
    answers: answer === undefined ? [...state.answers, { questionId: question.id, answer: [] }] : state.answers,
  };
}

export function useQuizState() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { runId, currentQuestionIndex, answers } = state;
  const totalQuestions = quizQuestions.length;
  const isWelcome = state.phase === 'welcome';

  const openQuiz = useCallback(() => dispatch({ type: 'open' }), []);
  const closeQuiz = useCallback(() => dispatch({ type: 'close' }), []);
  const resetQuiz = useCallback(() => dispatch({ type: 'reset' }), []);
  const startQuiz = useCallback(() => dispatch({ type: 'start', runId }), [runId]);
  const goToNextQuestion = useCallback(() => {
    dispatch({ type: 'next', runId, questionIndex: currentQuestionIndex });
  }, [runId, currentQuestionIndex]);
  const goToPreviousQuestion = useCallback(() => {
    dispatch({ type: 'previous', runId, questionIndex: currentQuestionIndex });
  }, [runId, currentQuestionIndex]);
  const saveAnswer = useCallback((questionId: number, answer: QuizAnswer['answer']) => {
    dispatch({ type: 'answer', runId, questionId, answer });
  }, [runId]);
  const getAnswerForQuestion = useCallback((questionId: number) => {
    return answers.find(answer => answer.questionId === questionId)?.answer;
  }, [answers]);
  const completeCalculation = useCallback((runId: number, matches: BreedMatch[]) => {
    dispatch({ type: 'calculated', runId, matches });
  }, []);
  const failCalculation = useCallback((runId: number) => dispatch({ type: 'failed', runId }), []);

  return {
    ...state,
    isWelcome,
    isCalculating: state.phase === 'calculating',
    showResults: state.phase === 'results',
    currentQuestion: quizQuestions[currentQuestionIndex],
    totalQuestions,
    progress: isWelcome ? 0 : Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100),
    openQuiz,
    closeQuiz,
    resetQuiz,
    startQuiz,
    goToNextQuestion,
    goToPreviousQuestion,
    saveAnswer,
    getAnswerForQuestion,
    completeCalculation,
    failCalculation,
  };
}
