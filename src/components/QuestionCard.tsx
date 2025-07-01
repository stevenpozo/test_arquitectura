import { Check, X } from 'lucide-react';
import { Question } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: number;
  onSelectAnswer: (answerIndex: number) => void;
  isAnswered: boolean;
  isDark: boolean;
}

export const QuestionCard = ({ question, selectedAnswer, onSelectAnswer, isAnswered, isDark }: QuestionCardProps) => {
  const getOptionClassName = (index: number) => {
    const baseClasses = "w-full p-4 text-left rounded-xl border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]";
    
    if (!isAnswered) {
      return `${baseClasses} ${
        isDark 
          ? 'bg-gray-800/80 border-gray-700/50 hover:bg-gray-800 hover:border-blue-600 text-gray-100' 
          : 'bg-white/80 border-gray-200/50 hover:bg-white hover:border-blue-300 text-gray-900'
      } backdrop-blur-sm`;
    }

    if (index === question.correctAnswer) {
      return `${baseClasses} ${
        isDark 
          ? 'bg-green-900/20 border-green-600 text-green-300' 
          : 'bg-green-50 border-green-300 text-green-800'
      }`;
    }

    if (index === selectedAnswer && index !== question.correctAnswer) {
      return `${baseClasses} ${
        isDark 
          ? 'bg-red-900/20 border-red-600 text-red-300' 
          : 'bg-red-50 border-red-300 text-red-800'
      }`;
    }

    return `${baseClasses} ${
      isDark 
        ? 'bg-gray-800/50 border-gray-700 text-gray-400' 
        : 'bg-gray-50 border-gray-200 text-gray-600'
    }`;
  };

  const getOptionIcon = (index: number) => {
    if (!isAnswered) return null;

    if (index === question.correctAnswer) {
      return <Check className="h-5 w-5 text-green-600 dark:text-green-400" />;
    }

    if (index === selectedAnswer && index !== question.correctAnswer) {
      return <X className="h-5 w-5 text-red-600 dark:text-red-400" />;
    }

    return null;
  };

  return (
    <div className={`backdrop-blur-sm rounded-2xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 ${
      isDark 
        ? 'bg-gray-800/90 border-gray-700/50' 
        : 'bg-white/90 border-gray-200/50'
    }`}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            isDark 
              ? 'bg-blue-900/30 text-blue-300' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {question.category}
          </span>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Pregunta #{question.id}
          </span>
        </div>
        <h3 className={`text-xl font-semibold leading-relaxed ${
          isDark ? 'text-gray-100' : 'text-gray-900'
        }`}>
          {question.question}
        </h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            disabled={isAnswered}
            className={getOptionClassName(index)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option}</span>
              {getOptionIcon(index)}
            </div>
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className={`mt-4 p-4 rounded-xl border ${
          isDark 
            ? 'bg-blue-900/20 border-blue-800' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <p className={`text-sm ${
            isDark ? 'text-blue-300' : 'text-blue-800'
          }`}>
            {selectedAnswer === question.correctAnswer ? (
              <span className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-600" />
                ¡Respuesta correcta! Bien hecho.
              </span>
            ) : (
              <span className="flex items-center">
                <X className="h-4 w-4 mr-2 text-red-600" />
                Respuesta incorrecta. La respuesta correcta es: {question.options[question.correctAnswer]}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};