import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isDark: boolean;
}

export const SearchBar = ({ value, onChange, placeholder = "Buscar preguntas...", isDark }: SearchBarProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-12 pr-12 py-3 backdrop-blur-sm border rounded-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent ${
          isDark 
            ? 'bg-gray-800/80 border-gray-700/50 text-gray-100 placeholder-gray-400 hover:bg-gray-800' 
            : 'bg-white/80 border-gray-200/50 text-gray-900 placeholder-gray-500 hover:bg-white'
        }`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className={`absolute inset-y-0 right-0 pr-4 flex items-center transition-colors duration-200 ${
            isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'
          }`}
        >
          <X className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        </button>
      )}
    </div>
  );
};