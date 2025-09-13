import React, { useState } from 'react';
import { Globe, Mic, User, Zap, Menu, X, Volume2 } from 'lucide-react';

interface HeaderProps {
  currentView: 'translate' | 'voice' | 'account';
  setCurrentView: (view: 'translate' | 'voice' | 'account') => void;
  translationMode: 'normal' | 'ai';
  setTranslationMode: (mode: 'normal' | 'ai') => void;
}

const Header: React.FC<HeaderProps> = ({    
  currentView,
  setCurrentView,
  translationMode,
  setTranslationMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'translate', label: 'Translate', icon: Globe },
    { id: 'voice', label: 'Voice Chat', icon: Mic },
    { id: 'account', label: 'Account', icon: User }
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TranslatePro
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Translation Mode Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setTranslationMode('ai')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
                  translationMode === 'ai'
                    ? 'bg-white shadow-sm text-purple-700'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">AI</span>
              </button>
              <button
                onClick={() => setTranslationMode('normal')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
                  translationMode === 'normal'
                    ? 'bg-white shadow-sm text-blue-700'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span className="text-sm font-medium">Standard</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Mobile Translation Mode Toggle */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Translation Mode</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTranslationMode('ai')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-all duration-200 ${
                    translationMode === 'ai'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">AI</span>
                </button>
                <button
                  onClick={() => setTranslationMode('normal')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-all duration-200 ${
                    translationMode === 'normal'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Standard</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;