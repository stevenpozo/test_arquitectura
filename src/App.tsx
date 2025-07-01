import React from 'react';
import { RotateCcw, Filter } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import { useQuiz } from './hooks/useQuiz';
import { questions } from './data/questions';
import { ThemeToggle } from './components/ThemeToggle';
import { SearchBar } from './components/SearchBar';
import { StatsCard } from './components/StatsCard';
import { QuestionCard } from './components/QuestionCard';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const {
    quizState,
    stats,
    searchTerm,
    setSearchTerm,
    filteredQuestions,
    selectAnswer,
    resetQuiz,
    toggleResults
  } = useQuiz(questions);

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}>
      {/* Header con barra de búsqueda */}
      <header className={`sticky top-0 z-10 backdrop-blur-lg border-b transition-all duration-300 ${isDark
        ? 'bg-gray-900/80 border-gray-700/50'
        : 'bg-white/80 border-gray-200/50'
        }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-xl">
                <Filter className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                  UwU Company
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Pruebiña uwu
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={resetQuiz}
                className={`inline-flex items-center px-4 py-2 backdrop-blur-sm border rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${isDark
                  ? 'bg-gray-800/80 border-gray-700/50 text-gray-300 hover:bg-gray-800'
                  : 'bg-white/80 border-gray-200/50 text-gray-700 hover:bg-white'
                  }`}
                aria-label="Reiniciar quiz"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reiniciar
              </button>
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            </div>
          </div>
        </div>
      </header>

      {/* Barra de búsqueda fija */}
      <div className="fixed top-[80px] left-0 w-full z-20 bg-white/80 dark:bg-gray-900/80 py-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar"
            isDark={isDark}
          />
        </div>
      </div>


      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[120px]">

        {/* Stats */}
        <StatsCard stats={stats} isDark={isDark} />

        {/* Questions */}
        <div className="space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12">
              <div className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'
                }`}>
                No se encontraron preguntas
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Intenta con otros términos de búsqueda o reinicia el filtro.
              </p>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                selectedAnswer={quizState.selectedAnswers.get(question.id)}
                onSelectAnswer={(answerIndex) => selectAnswer(question.id, answerIndex)}
                isAnswered={quizState.answeredQuestions.has(question.id)}
                isDark={isDark}
              />
            ))
          )}
        </div>

        {/* Results Summary */}
        {stats.total > 0 && (
          <div className={`mt-12 rounded-2xl p-8 border ${isDark
            ? 'bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-800/50'
            : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/50'
            }`}>
            <div className="text-center">
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-900'
                }`}>
                Resumen de Resultados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stats.total}
                  </div>
                  <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Preguntas Respondidas
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {stats.percentage}%
                  </div>
                  <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Precisión
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {stats.correct}/{stats.total}
                  </div>
                  <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Respuestas Correctas
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t backdrop-blur-sm ${isDark
        ? 'border-gray-700/50 bg-gray-900/50'
        : 'border-gray-200/50 bg-white/50'
        }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
              © 2025 Quiz Interactivo. Diseño minimalista y responsivo.
            </p>
            <div className={`flex items-center space-x-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
              <span>{questions.length} preguntas disponibles</span>
              <span>•</span>
              <span>Múltiples categorías</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;