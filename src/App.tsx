import  { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configStore';
import Header from './components/Header';
import TranslationInterface from './components/TranslationInterface';
import VoiceChat from './components/VoiceChat';
import AccountDashboard from './components/AccountDashboard';
import LanguageSelector from './components/LanguageSelector';
import VoiceList from './components/VoiceList';

function AppContent() {
  const [currentView, setCurrentView] = useState<'translate' | 'voice' | 'account'>('translate');
  const [translationMode, setTranslationMode] = useState<'normal' | 'ai'>('ai');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ];

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        translationMode={translationMode}
        setTranslationMode={setTranslationMode}
      />
      
      {/* MAIN CONTENT */}
      <main className="w-full px-4 py-8 flex justify-center">
        <div className="w-full max-w-6xl">
          {currentView === 'translate' && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Professional Translation Service
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Experience the power of {translationMode === 'ai' ? 'AI-powered' : 'standard'} translation 
                  with real-time voice support and advanced language processing
                </p>
              </div>

              <LanguageSelector
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                setSourceLanguage={setSourceLanguage}
                setTargetLanguage={setTargetLanguage}
                languages={languages}
                onSwap={swapLanguages}
              />

              <TranslationInterface
                mode={translationMode}
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                languages={languages}
              />
            </div>
          )}

          {currentView === 'voice' && (
            
            <div >
              <VoiceList/>
              <VoiceChat
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                languages={languages}
              />
            </div>
          )}

          {currentView === 'account' && (
            <div className="max-w-4xl mx-auto">
              <AccountDashboard />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
