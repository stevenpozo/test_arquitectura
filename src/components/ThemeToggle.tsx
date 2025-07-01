import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <div className="relative">
        {isDark ? (
          <Sun className="h-5 w-5 text-yellow-500 transition-all duration-300" />
        ) : (
          <Moon className="h-5 w-5 text-blue-600 transition-all duration-300" />
        )}
      </div>
    </button>
  );
};