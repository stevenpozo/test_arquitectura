export interface Question {
  id: number; 
  question: string;
  options: string[];
  correctAnswer: number;
  answered: boolean;
}



export interface QuizState {
  currentQuestion: number;
  score: number;
  incorrectAnswers: number;
  answeredQuestions: Set<number>;
  selectedAnswers: Map<number, number>;
  showResults: boolean;
}

export interface QuizStats {
  total: number;
  correct: number;
  incorrect: number;
  percentage: number;
}