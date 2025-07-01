import { Question } from '../types/quiz';

// Importa las preguntas desde el archivo JSON
import questionsData from '../data/questions.json';

// Convierte las preguntas JSON a un tipo `Question[]` usando `as`
export const questions: Question[] = questionsData as Question[];
