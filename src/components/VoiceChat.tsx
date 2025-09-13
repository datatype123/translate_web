import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Send, MessageCircle } from 'lucide-react';
import { textActions } from '../store/text';
import { useDispatch } from 'react-redux';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface VoiceChatProps {
  sourceLanguage: string;
  targetLanguage: string;
  languages: Language[];
}

interface ChatMessage {
  id: string;
  text: string;
  translation: string;
  language: string;
  timestamp: Date;
  isUser: boolean;
}

const VoiceChat: React.FC<VoiceChatProps> = ({
  sourceLanguage,
  targetLanguage,
  languages
}) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      translation: '¡Hola! ¿Cómo puedo ayudarte hoy?',
      language: 'en',
      timestamp: new Date(),
      isUser: false
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [selectedVoice] = useState('henry'); // 👈 Thêm state cho voice


  const getLanguageName = (code: string) => {
    return languages.find(l => l.code === code)?.name || code;
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = sourceLanguage;
      recognition.continuous = false;
      
      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentInput(transcript);
        sendMessage(transcript);
      };
      
      recognition.start();
    }
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text,
      translation: `[Translated to ${getLanguageName(targetLanguage)}] ${text}`,
      language: sourceLanguage,
      timestamp: new Date(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');

    // Simulate response
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: `Thank you for your message: "${text}"`,
        translation: `[Translated to ${getLanguageName(sourceLanguage)}] Gracias por tu mensaje: "${text}"`,
        language: targetLanguage,
        timestamp: new Date(),
        isUser: false
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleSpeak = (text: string, lang: string, audio_format: string, type: string) => {
    try {
      dispatch(textActions.speechText({ input: text, voice_id: lang, audio_format: audio_format, type: type }));
    } catch (error) {
      console.error('Error in speech synthesis:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden h-[70vh] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Voice Translation Chat
            </h2>
            <p className="text-blue-100 text-sm">
              {getLanguageName(sourceLanguage)} ↔ {getLanguageName(targetLanguage)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Live</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.isUser
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-900 rounded-bl-md'
              }`}
            >
              <div className="space-y-2">
                <div className="font-medium">{message.text}</div>
                <div className={`text-sm ${message.isUser ? 'text-blue-100' : 'text-gray-600'}`}>
                  {message.translation}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${message.isUser ? 'text-blue-200' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button
                    onClick={() => handleSpeak(message.text, selectedVoice, 'mp3', message.isUser ? 'origin' : 'translated')}
                    className={`p-1 rounded ${
                      message.isUser 
                        ? 'hover:bg-blue-500 text-blue-100' 
                        : 'hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input + Voice Selector */}
      <div className="border-t border-gray-200 p-4 space-y-3">
        {/* Input Row */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleVoiceInput}
            className={`p-3 rounded-full transition-all duration-200 ${
              isRecording
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(currentInput)}
              placeholder={isRecording ? 'Listening...' : 'Type your message or use voice input...'}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isRecording}
            />
          </div>
          
          <button
            onClick={() => sendMessage(currentInput)}
            disabled={!currentInput.trim()}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500">
            {isRecording ? 
              'Recording... Speak clearly in ' + getLanguageName(sourceLanguage) : 
              'Click the microphone to start voice input'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;
