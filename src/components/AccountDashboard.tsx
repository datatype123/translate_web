import React, { useState,useEffect } from 'react';
import { User, Settings, History, Star, CreditCard, Globe, Shield, Bell } from 'lucide-react';

const AccountDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'favorites' | 'settings'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'history', label: 'Translation History', icon: History },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const translationHistory = [
    { id: 1, source: 'Hello world', target: 'Hola mundo', from: 'English', to: 'Spanish', date: '2025-01-02 14:30' },
    { id: 2, source: 'Good morning', target: 'Bonjour', from: 'English', to: 'French', date: '2025-01-02 13:15' },
    { id: 3, source: 'Thank you', target: 'Grazie', from: 'English', to: 'Italian', date: '2025-01-02 12:00' },
    { id: 4, source: 'How are you?', target: 'Wie geht es dir?', from: 'English', to: 'German', date: '2025-01-02 11:45' },
  ];

  const favorites = [
    { id: 1, source: 'I love you', target: 'Te amo', from: 'English', to: 'Spanish' },
    { id: 2, source: 'Where is the bathroom?', target: 'Où sont les toilettes?', from: 'English', to: 'French' },
    { id: 3, source: 'Help me', target: 'Aiutami', from: 'English', to: 'Italian' },
  ];


  useEffect(() => {
    // getSystemConfig().then((config) => {
    //   console.log('System config:', config);
    // }).catch((err) => {
    //   console.error('Error loading system config:', err);
    // });
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-blue-100">Premium Member since January 2024</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">1,247 translations</span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">15 languages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value="john.doe@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Languages</label>
                      <input
                        type="text"
                        value="English, Spanish, French"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Usage Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-gray-600">Total Translations</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mt-1">1,247</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-purple-600" />
                        <span className="text-sm text-gray-600">Favorites</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600 mt-1">23</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">This Month's Usage</span>
                      <span className="text-sm text-green-600 font-medium">89/1000</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '8.9%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Update Profile
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Translations</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Clear History</button>
              </div>
              
              <div className="space-y-3">
                {translationHistory.map((item) => (
                  <div key={item.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                          <span>{item.from}</span>
                          <span>→</span>
                          <span>{item.to}</span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">{item.source}</p>
                          <p className="text-gray-700">{item.target}</p>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-yellow-600">
                        <Star className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Favorite Translations</h3>
                <span className="text-sm text-gray-500">{favorites.length} favorites</span>
              </div>
              
              <div className="space-y-3">
                {favorites.map((item) => (
                  <div key={item.id} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                          <span>{item.from}</span>
                          <span>→</span>
                          <span>{item.to}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">{item.source}</p>
                          <p className="text-gray-700">{item.target}</p>
                        </div>
                      </div>
                      <button className="p-2 text-yellow-600">
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Translation Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">Auto-detect language</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">Sound notifications</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">Save translation history</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Account & Billing</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900">Premium Plan</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">Next billing: Feb 1, 2025</p>
                      <button className="mt-2 text-green-700 hover:text-green-800 text-sm font-medium">
                        Manage Subscription
                      </button>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">API Usage</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>This month</span>
                          <span>89 / 1,000</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '8.9%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-3">
                  Save Settings
                </button>
                <button className="text-gray-600 hover:text-gray-700 px-6 py-2">
                  Reset to Defaults
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;