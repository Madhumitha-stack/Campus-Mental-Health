import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import ChatBot from '../components/ChatBot';
import MoodTracker from '../components/MoodTracker';
import PeerSupport from '../components/PeerSupport';
import SafeSpacesMap from '../components/SafeSpacesMap';
import CalendarAlert from '../components/CalendarAlert';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [wellnessCredits, setWellnessCredits] = useState(150);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">Your personalized wellness dashboard</p>
            </div>

            {/* Quick Stats - Mobile Optimized */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-700 text-xs sm:text-sm">Wellness Score</h3>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">78/100</p>
                <p className="text-xs text-gray-600">Good</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-700 text-xs sm:text-sm">Wellness Credits</h3>
                <p className="text-lg sm:text-2xl font-bold text-green-600">{wellnessCredits}</p>
                <p className="text-xs text-gray-600">Available</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md border-l-4 border-purple-500 col-span-2 md:col-span-1">
                <h3 className="font-semibold text-gray-700 text-xs sm:text-sm">Check-in Streak</h3>
                <p className="text-lg sm:text-2xl font-bold text-purple-600">7 days</p>
                <p className="text-xs text-gray-600">Keep going!</p>
              </div>
            </div>

            {/* Quick Actions - Mobile Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button 
                className="p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                onClick={() => setActiveTab('chatbot')}
              >
                <div className="text-blue-500 text-base sm:text-lg font-semibold">💬 AI Support</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">24/7 Help Available</div>
              </button>
              <button 
                className="p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-green-500 text-left"
                onClick={() => setActiveTab('mood')}
              >
                <div className="text-green-500 text-base sm:text-lg font-semibold">📊 Mood Track</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Daily Check-in</div>
              </button>
              <button 
                className="p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-purple-500 text-left"
                onClick={() => setActiveTab('peers')}
              >
                <div className="text-purple-500 text-base sm:text-lg font-semibold">👥 Peer Support</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Connect & Share</div>
              </button>
              <button 
                className="p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-orange-500 text-left"
                onClick={() => setActiveTab('spaces')}
              >
                <div className="text-orange-500 text-base sm:text-lg font-semibold">🏛️ Safe Spaces</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Find Peace Nearby</div>
              </button>
            </div>

            {/* Daily Reminder */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-blue-500 text-lg">💡</span>
                <div>
                  <h3 className="font-semibold text-blue-800 text-sm sm:text-base">Daily Wellness Tip</h3>
                  <p className="text-blue-700 text-xs sm:text-sm mt-1">
                    Take 5 minutes today for deep breathing. It can help reduce stress and improve focus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'chatbot':
        return <ChatBot />;
      
      case 'mood':
        return <MoodTracker />;
      
      case 'peers':
        return <PeerSupport />;
      
      case 'spaces':
        return <SafeSpacesMap />;
      
      case 'calendar':
        return <CalendarAlert />;
      
      default:
        return null;
    }
  };

  // Mobile tab navigation
  const MobileTabBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 safe-area-inset-bottom">
      <div className="grid grid-cols-4 gap-1">
        {[
          { id: 'overview', icon: '📊', label: 'Home' },
          { id: 'chatbot', icon: '💬', label: 'AI Help' },
          { id: 'mood', icon: '😊', label: 'Mood' },
          { id: 'peers', icon: '👥', label: 'Peers' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-16 sm:pb-0"> {/* Padding for mobile tab bar */}
      <Navbar />
      
      {/* Desktop Navigation */}
      {!isMobile && (
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'chatbot', label: 'AI Support', icon: '🤖' },
                { id: 'mood', label: 'Mood Tracker', icon: '😊' },
                { id: 'peers', label: 'Peer Support', icon: '👥' },
                { id: 'spaces', label: 'Safe Spaces', icon: '🗺️' },
                { id: 'calendar', label: 'Calendar', icon: '📅' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-6 lg:px-8">
        <div className={`${isMobile ? 'px-0' : 'px-4'} py-4 sm:px-0`}>
          {renderTabContent()}
        </div>
      </main>

      {/* Mobile Tab Bar */}
      {isMobile && <MobileTabBar />}
    </div>
  );
};

export default Dashboard;