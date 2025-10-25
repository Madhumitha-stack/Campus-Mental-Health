import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, TrendingUp, AlertTriangle } from 'lucide-react';

const CalendarAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockAlerts = [
      {
        id: 1,
        type: 'academic',
        title: 'Final Exams Week',
        message: 'High stress period detected based on academic calendar',
        severity: 'high',
        date: '2024-12-10',
        actions: ['Schedule study sessions', 'Plan self-care breaks', 'Connect with tutoring']
      },
      {
        id: 2,
        type: 'wellness',
        title: 'Consistent Low Mood Pattern',
        message: 'We noticed your mood entries have been lower this week',
        severity: 'medium',
        date: '2024-12-05',
        actions: ['Try mindfulness exercises', 'Reach out to peer support', 'Schedule counseling']
      },
      {
        id: 3,
        type: 'balance',
        title: 'Work-Life Balance Alert',
        message: 'You have logged many study hours without breaks',
        severity: 'medium',
        date: '2024-12-03',
        actions: ['Schedule downtime', 'Try the Pomodoro technique', 'Join a recreation activity']
      }
    ];

    const mockEvents = [
      {
        id: 1,
        title: 'Mindfulness Workshop',
        type: 'wellness',
        date: '2024-12-06',
        time: '3:00 PM - 4:30 PM',
        location: 'Student Center Room 301',
        description: 'Learn meditation techniques for stress reduction'
      },
      {
        id: 2,
        title: 'Study Skills Seminar',
        type: 'academic',
        date: '2024-12-08',
        time: '2:00 PM - 3:30 PM',
        location: 'Library Learning Commons',
        description: 'Effective study strategies for finals'
      },
      {
        id: 3,
        title: 'Yoga for Stress Relief',
        type: 'wellness',
        date: '2024-12-10',
        time: '5:00 PM - 6:00 PM',
        location: 'Recreation Center Studio A',
        description: 'Gentle yoga practice focused on relaxation'
      },
      {
        id: 4,
        title: 'Peer Support Group',
        type: 'support',
        date: '2024-12-12',
        time: '6:00 PM - 7:30 PM',
        location: 'Counseling Center Group Room',
        description: 'Weekly support group for students'
      }
    ];

    setAlerts(mockAlerts);
    setUpcomingEvents(mockEvents);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-blue-100 border-blue-300 text-blue-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'academic': return <TrendingUp className="w-4 h-4" />;
      case 'wellness': return <Bell className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
          <Calendar className="w-8 h-8 mr-3 text-primary-600" />
          Wellness Calendar & Alerts
        </h1>
        <p className="text-gray-600 mt-2">
          Proactive support based on your schedule and mood patterns
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alerts Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
            Important Alerts
          </h2>
          
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border-l-4 rounded-r-lg p-4 ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getTypeIcon(alert.type)}
                    <div>
                      <h3 className="font-semibold">{alert.title}</h3>
                      <p className="text-sm mt-1 opacity-90">{alert.message}</p>
                      
                      {/* Suggested Actions */}
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2">Suggested Actions:</p>
                        <div className="flex flex-wrap gap-2">
                          {alert.actions.map((action, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs font-medium"
                            >
                              {action}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center text-xs mt-3 opacity-75">
                  <Clock className="w-3 h-3 mr-1" />
                  Detected on {new Date(alert.date).toLocaleDateString()}
                </div>
              </div>
            ))}
            
            {alerts.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">No Active Alerts</h3>
                <p className="text-gray-600 text-sm mt-1">
                  You're all caught up! We'll notify you of any important patterns.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary-600" />
            Upcoming Wellness Events
          </h2>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-2">
                      📍 {event.location}
                    </p>
                  </div>
                  
                  <button className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                    RSVP
                  </button>
                </div>
              </div>
            ))}
            
            {upcomingEvents.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">No Upcoming Events</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Check back later for wellness events and workshops.
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
            <h3 className="font-semibold text-primary-900 mb-3">Wellness Planning</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-white rounded-lg border border-primary-200 hover:bg-primary-100 transition-colors">
                <div className="font-medium text-primary-900">Schedule Counseling Session</div>
                <div className="text-sm text-primary-700">Book an appointment with campus counseling</div>
              </button>
              <button className="w-full text-left p-3 bg-white rounded-lg border border-primary-200 hover:bg-primary-100 transition-colors">
                <div className="font-medium text-primary-900">Set Study Reminders</div>
                <div className="text-sm text-primary-700">Plan study sessions with built-in breaks</div>
              </button>
              <button className="w-full text-left p-3 bg-white rounded-lg border border-primary-200 hover:bg-primary-100 transition-colors">
                <div className="font-medium text-primary-900">Join Wellness Challenge</div>
                <div className="text-sm text-primary-700">Participate in daily wellness activities</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month's Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-blue-700">Mood Entries</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-green-700">Wellness Events</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-yellow-700">Active Alerts</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-purple-700">Wellness Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarAlert;