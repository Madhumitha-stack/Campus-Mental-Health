import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import AccessibilitySettings from '../components/common/AccessibilitySettings';
import SOSButton from '../components/common/SOSButton';
import ChatBot from '../components/ChatBot';
import MoodTracker from '../components/MoodTracker';
import PeerSupport from '../components/PeerSupport';
import SafeSpacesMap from '../components/SafeSpacesMap';
import CalendarAlert from '../components/CalendarAlert';
import { 
  MessageCircle, 
  Heart, 
  Users, 
  MapPin, 
  Calendar,
  TrendingUp,
  Smile
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeComponent, setActiveComponent] = useState('chatbot');
  const [wellnessScore, setWellnessScore] = useState(0);

  // Mock wellness score calculation
  useEffect(() => {
    // In a real app, this would be calculated based on user data
    setWellnessScore(78);
  }, []);

  const components = {
    chatbot: {
      name: 'Chat Support',
      icon: MessageCircle,
      component: ChatBot
    },
    mood: {
      name: 'Mood Tracker',
      icon: Heart,
      component: MoodTracker
    },
    peers: {
      name: 'Peer Support',
      icon: Users,
      component: PeerSupport
    },
    spaces: {
      name: 'Safe Spaces',
      icon: MapPin,
      component: SafeSpacesMap
    },
    calendar: {
      name: 'Wellness Calendar',
      icon: Calendar,
      component: CalendarAlert
    }
  };

  const ActiveComponent = components[activeComponent].component;
  const ActiveIcon = components[activeComponent].icon;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {getGreeting()}, {user?.profile?.firstName || user?.username}!
          </h1>
          <p className="text-gray-600 mt-2">
            How are you feeling today? We're here to support you.
          </p>
        </div>

        {/* Wellness Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Smile className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Wellness Score</p>
                <p className="text-2xl font-bold text-gray-900">{wellnessScore}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Mood Entries</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Chat Sessions</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Support Network</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Support Tools
              </h3>
              <nav className="space-y-2">
                {Object.entries(components).map(([key, { name, icon: Icon }]) => (
                  <button
                    key={key}
                    onClick={() => setActiveComponent(key)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                      activeComponent === key
                        ? 'bg-primary-100 text-primary-700 border border-primary-300'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{name}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Resources */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Quick Resources</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-sm text-primary-600 hover:text-primary-700">
                    Crisis Hotlines
                  </a>
                  <a href="#" className="block text-sm text-primary-600 hover:text-primary-700">
                    Self-Care Tips
                  </a>
                  <a href="#" className="block text-sm text-primary-600 hover:text-primary-700">
                    Counseling Services
                  </a>
                  <a href="#" className="block text-sm text-primary-600 hover:text-primary-700">
                    Wellness Workshops
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <ActiveIcon className="w-6 h-6 mr-3 text-primary-600" />
                  {components[activeComponent].name}
                </h2>
              </div>
              <div className="p-6">
                <ActiveComponent />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Components */}
      <AccessibilitySettings />
      <SOSButton />
    </div>
  );
};

export default Dashboard;