import { useState, useMemo } from 'react';
import { Question, QuizState, QuizStats } from '../types/quiz';

export const useQuiz = (questions: Question[]) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    incorrectAnswers: 0,
    answeredQuestions: new Set(),
    selectedAnswers: new Map(),
    showResults: false
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Función para normalizar el texto y eliminar tildes
  const normalizeText = (text: string) => {
    return text
      .normalize("NFD") // Divide los caracteres combinados
      .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
      .toLowerCase(); // Convierte a minúsculas
  };

  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return questions;

    const normalizedSearchTerm = normalizeText(searchTerm);

    return questions.filter((question) => {
      const normalizedQuestionText = normalizeText(question.question);
      const normalizedOptions = question.options.map(normalizeText);

      return (
        normalizedQuestionText.includes(normalizedSearchTerm) ||
        normalizedOptions.some((option) =>
          option.includes(normalizedSearchTerm)
        )
      );
    });
  }, [questions, searchTerm]);

  const stats: QuizStats = useMemo(() => {
    const total = quizState.answeredQuestions.size;
    const correct = quizState.score;
    const incorrect = quizState.incorrectAnswers;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    return { total, correct, incorrect, percentage };
  }, [quizState]);

  const selectAnswer = (questionId: number, answerIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question || quizState.answeredQuestions.has(questionId)) return;

    const isCorrect = answerIndex === question.correctAnswer;
    
    setQuizState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      incorrectAnswers: isCorrect ? prev.incorrectAnswers : prev.incorrectAnswers + 1,
      answeredQuestions: new Set([...prev.answeredQuestions, questionId]),
      selectedAnswers: new Map([...prev.selectedAnswers, [questionId, answerIndex]])
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      incorrectAnswers: 0,
      answeredQuestions: new Set(),
      selectedAnswers: new Map(),
      showResults: false
    });
    setSearchTerm('');
  };

  const toggleResults = () => {
    setQuizState(prev => ({ ...prev, showResults: !prev.showResults }));
  };

  return {
    quizState,
    stats,
    searchTerm,
    setSearchTerm,
    filteredQuestions,
    selectAnswer,
    resetQuiz,
    toggleResults
  };
};