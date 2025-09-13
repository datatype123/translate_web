import { Copy, Loader, Mic, MicOff, Star, Volume2, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { TranslateRequest } from '../services/types.d';
import { useAppSelector } from '../store/hooks';
import { textActions } from '../store/text';
import type { RootState } from '../store/types';
import { translateService } from '../services/translate.services';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface TranslationInterfaceProps {
  mode: 'normal' | 'ai';
  sourceLanguage: string;
  targetLanguage: string;
  languages: Language[];
}

const TranslationInterface: React.FC<TranslationInterfaceProps> = ({
  mode,
  sourceLanguage,
  targetLanguage,
  languages
}) => {
  const dispatch = useDispatch();
  const [sourceText, setSourceText] = useState('');
  const translatedText = useAppSelector((state: RootState) => state.text.translatedText);
  const isTranslating = useAppSelector((state: RootState) => state.text.isTranslating);
  const voiceId = useAppSelector((state: RootState) => state.text.voice_id);
  const isSpeechingOrigin = useAppSelector((state: RootState) => state.text.isSpeeching['origin']);
  const isSpeechingTranslated = useAppSelector((state: RootState) => state.text.isSpeeching['translated']);
  const [isRecording, setIsRecording] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Simulate translation
  const translateText = async (payload: TranslateRequest) => {
    try {
      dispatch(textActions.translateText(payload));
    } catch (error) {
      console.error('Error dispatching translateText:', error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (sourceText) {
        translateText({ input: sourceText, origin: sourceLanguage, target: targetLanguage });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [sourceText, sourceLanguage, targetLanguage, mode]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSpeak = (text: string, lang: string, audio_format: string,type:string) => {
    try {
      dispatch(textActions.speechText({ input: text, voice_id: lang, audio_format: audio_format, type:type }));
    }catch(error){
      console.error('Error in speech synthesis:', error);
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = sourceLanguage;
      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSourceText(transcript);
      };
      recognition.start();
    }
  };

  const getLanguageName = (code: string) => {
    return languages.find(l => l.code === code)?.name || code;
  };

  return (
    <div className="space-y-6">
      {/* AI Features Bar */}
      {mode === 'ai' && (
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-200 rounded-lg">
                <Zap className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">AI-Powered Translation</h3>
                <p className="text-sm text-purple-700">Enhanced accuracy with context understanding</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-purple-700">
              <span className="text-sm font-medium">Premium</span>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Translation Interface */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Source Text */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{getLanguageName(sourceLanguage)}</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-lg transition-all duration-200 ${isRecording
                      ? 'bg-red-100 text-red-600 animate-pulse'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  title="Voice input"
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleSpeak(sourceText, 'henry', 'mp3','origin')}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Listen"
                  disabled={!translatedText}
                >
                  {isSpeechingOrigin ? <Loader className="w-5 h-5 animate-spin" />:<Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full h-40 resize-none border-0 outline-none text-lg leading-relaxed placeholder-gray-400"
            />
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{sourceText.length} characters</span>
              {sourceText && (
                <button
                  onClick={() => handleCopy(sourceText)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Translated Text */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{getLanguageName(targetLanguage)}</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`p-2 rounded-lg transition-all duration-200 ${isFavorited
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
                    }`}
                  title="Add to favorites"
                  disabled={!translatedText}
                >
                  <Star className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => handleSpeak(translatedText, 'henry', 'mp3','translated')}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Listen"
                  disabled={!translatedText}
                >
                  {isSpeechingTranslated ? <Loader className="w-5 h-5 animate-spin" />:<Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="w-full h-40 flex items-start">
              {isTranslating ? (
                <div className="flex items-center space-x-2 text-gray-500">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Translating...</span>
                </div>
              ) : (
                <div className="text-lg leading-relaxed text-gray-900">
                  {translatedText || (
                    <span className="text-gray-400">Translation will appear here...</span>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{translatedText.length} characters</span>
              {translatedText && (
                <button
                  onClick={() => handleCopy(translatedText)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Phrases */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Phrases</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Hello', 'How are you?', 'Good morning', 'Thank you', 'Goodbye', 'Please', 'Excuse me', 'Help'].map((phrase) => (
            <button
              key={phrase}
              onClick={() => setSourceText(phrase)}
              className="px-4 py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TranslationInterface;