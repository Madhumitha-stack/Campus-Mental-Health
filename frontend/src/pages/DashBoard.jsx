import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MoodTracker from '../components/MoodTracker';
import ChatBot from '../components/ChatBot';
import PeerSupport from '../components/PeerSupport';
import SafeSpacesMap from '../components/SafeSpacesMap';
import CalendarAlert from '../components/CalendarAlert';
import AccessibilitySettings from '../components/AccessibilitySettings';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [wellnessCredits, setWellnessCredits] = useState(150);
  const [currentMood, setCurrentMood] = useState(null);

  // Mock data for demonstration
  const moodData = [
    { date: 'Mon', mood: 4 },
    { date: 'Tue', mood: 3 },
    { date: 'Wed', mood: 5 },
    { date: 'Thu', mood: 2 },
    { date: 'Fri', mood: 4 },
    { date: 'Sat', mood: 5 },
    { date: 'Sun', mood: 3 }
  ];

  const upcomingEvents = [
    { title: 'Final Exams', date: 'Dec 15', stressLevel: 'High' },
    { title: 'Project Submission', date: 'Dec 10', stressLevel: 'Medium' },
    { title: 'Group Presentation', date: 'Dec 12', stressLevel: 'Medium' }
  ];

  const handleMoodUpdate = (mood) => {
    setCurrentMood(mood);
    // Add wellness credits for mood check-in
    setWellnessCredits(prev => prev + 10);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Wellness Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-700">Wellness Score</h3>
                <p className="text-2xl font-bold text-blue-600">78/100</p>
                <p className="text-sm text-gray-600">Good</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-700">Wellness Credits</h3>
                <p className="text-2xl font-bold text-green-600">{wellnessCredits}</p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-700">Check-in Streak</h3>
                <p className="text-2xl font-bold text-purple-600">7 days</p>
                <p className="text-sm text-gray-600">Keep going!</p>
              </div>
            </div>

            {/* Mood Chart */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Mood Trends</h2>
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => setActiveTab('mood')}
                >
                  Track Mood
                </button>
              </div>
              <div className="h-48 flex items-end justify-between space-x-2">
                {moodData.map((day, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-700"
                      style={{ height: `${day.mood * 20}%` }}
                    />
                    <span className="text-sm text-gray-600 mt-2">{day.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setActiveTab('chatbot')}
              >
                <div className="text-blue-500 text-lg font-semibold">AI Support</div>
                <div className="text-sm text-gray-600">24/7 Help</div>
              </button>
              <button 
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() => setActiveTab('peers')}
              >
                <div className="text-green-500 text-lg font-semibold">Peer Support</div>
                <div className="text-sm text-gray-600">Connect</div>
              </button>
              <button 
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
                onClick={() => setActiveTab('spaces')}
              >
                <div className="text-purple-500 text-lg font-semibold">Safe Spaces</div>
                <div className="text-sm text-gray-600">Find Peace</div>
              </button>
              <button 
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-orange-500"
                onClick={() => setActiveTab('calendar')}
              >
                <div className="text-orange-500 text-lg font-semibold">Calendar</div>
                <div className="text-sm text-gray-600">Plan Ahead</div>
              </button>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.stressLevel === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.stressLevel} Stress
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'mood':
        return <MoodTracker onMoodUpdate={handleMoodUpdate} />;
      
      case 'chatbot':
        return <ChatBot />;
      
      case 'peers':
        return <PeerSupport />;
      
      case 'spaces':
        return <SafeSpacesMap />;
      
      case 'calendar':
        return <CalendarAlert />;
      
      case 'accessibility':
        return <AccessibilitySettings />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                Campus Mental Health Hub
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name || 'Student'}</span>
              <button
                onClick={() => setActiveTab('accessibility')}
                className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                aria-label="Accessibility Settings"
              >
                ♿
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'mood', label: 'Mood Tracker', icon: '😊' },
              { id: 'chatbot', label: 'AI Support', icon: '🤖' },
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderTabContent()}
        </div>
      </main>

      {/* Emergency SOS Button */}
      <div className="fixed bottom-6 right-6">
        <button
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-200"
          aria-label="Emergency SOS Help"
        >
          <span className="font-bold text-lg">SOS</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;