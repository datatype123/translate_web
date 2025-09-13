import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageSelectorProps {
  sourceLanguage: string;
  targetLanguage: string;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  languages: Language[];
  onSwap: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  sourceLanguage,
  targetLanguage,
  setSourceLanguage,
  setTargetLanguage,
  languages,
  onSwap
}) => {
  // const sourceLanguage = useSelector()
  const getLanguageDisplay = (code: string) => {
    const lang = languages.find(l => l.code === code);
    return lang ? `${lang.flag} ${lang.name}` : code;
  };

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 flex items-center space-x-4 max-w-2xl w-full">
        {/* Source Language */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-900 font-medium"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <button
          onClick={onSwap}
          className="mt-7 p-3 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-600 transition-all duration-200 hover:scale-105 active:scale-95"
          title="Swap languages"
        >
          <ArrowLeftRight className="w-5 h-5" />
        </button>

        {/* Target Language */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-900 font-medium"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;