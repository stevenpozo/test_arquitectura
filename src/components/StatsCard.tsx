import { Trophy, X, Target, TrendingUp } from 'lucide-react';
import { QuizStats } from '../types/quiz';

interface StatsCardProps {
  stats: QuizStats;
  isDark: boolean;
}

export const StatsCard = ({ stats, isDark }: StatsCardProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className={`backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800/80 border-gray-700/50 hover:bg-gray-800' 
          : 'bg-white/80 border-gray-200/50 hover:bg-white'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
            <p className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{stats.total}</p>
          </div>
        </div>
      </div>

      <div className={`backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800/80 border-gray-700/50 hover:bg-gray-800' 
          : 'bg-white/80 border-gray-200/50 hover:bg-white'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Correctas</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.correct}</p>
          </div>
        </div>
      </div>

      <div className={`backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800/80 border-gray-700/50 hover:bg-gray-800' 
          : 'bg-white/80 border-gray-200/50 hover:bg-white'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Incorrectas</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.incorrect}</p>
          </div>
        </div>
      </div>

      <div className={`backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800/80 border-gray-700/50 hover:bg-gray-800' 
          : 'bg-white/80 border-gray-200/50 hover:bg-white'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Precisión</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.percentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};