import React, { useState } from 'react';
import { Play, Pause, Volume2, Globe, Mic } from 'lucide-react';


interface Voice {
  id: string;
  display_name: string;
  type:string;
  language: string;
  accent: string;
  locale:string;
  preview_audio:string;
  gender: 'male' | 'female';
  age: string;
  category: 'natural' | 'neural' | 'premium';
  description: string;
  isPlaying?: boolean;
  avatar_image?:string;
  tags:string[];
}

const fakeVoices: Voice[] = [
  
];

const VoiceList: React.FC = () => {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handlePlayPause = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      // Simulate stopping after 3 seconds
      setTimeout(() => {
        setPlayingVoice(null);
      }, 3000);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'premium': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'neural': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'natural': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'premium': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'neural': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'natural': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const filteredVoices = selectedCategory === 'all' 
    ? fakeVoices 
    : fakeVoices.filter(voice => voice.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Mic className="w-6 h-6 text-white" />
          </div>
          Voice Library
        </h1>
        <p className="text-gray-600 text-lg">Choose from our collection of high-quality voices</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {['all', 'premium', 'neural', 'natural'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:transform hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVoices.map((voice) => (
          <div
            key={voice.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
          >
            {/* Voice Header */}
            <div className={`h-2 w-full ${getCategoryColor(voice.category)}`}></div>
            
            <div className="p-6">
              {/* Voice Info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryColor(voice.category)}`}>
                    {voice.avatar_image ? <img src={voice.avatar_image} alt={voice.display_name} className="w-12 h-12 rounded-full" />: <Globe className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{voice.display_name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      {voice.language}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(voice.category)}`}>
                  {voice.category}
                </span>
              </div>

              {/* Voice Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Accent:</span>
                  <span className="text-gray-900 font-medium">{voice.accent}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Gender:</span>
                  <span className="text-gray-900 font-medium capitalize">{voice.gender}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Age:</span>
                  <span className="text-gray-900 font-medium">{voice.age}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">{voice.description}</p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handlePlayPause(voice.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    playingVoice === voice.id
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:transform hover:scale-105'
                  }`}
                >
                  {playingVoice === voice.id ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Preview
                    </>
                  )}
                </button>
                <button className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:transform hover:scale-105 transition-all duration-200">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h4 className="text-2xl font-bold text-indigo-600">{fakeVoices.length}</h4>
            <p className="text-gray-600">Total Voices</p>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-purple-600">
              {new Set(fakeVoices.map(v => v.language)).size}
            </h4>
            <p className="text-gray-600">Languages</p>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-pink-600">
              {fakeVoices.filter(v => v.category === 'premium').length}
            </h4>
            <p className="text-gray-600">Premium Voices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceList;