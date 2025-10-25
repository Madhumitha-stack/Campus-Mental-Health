import React, { useState } from 'react';

const CalendarAlert = () => {
  const [view, setView] = useState('month');

  const upcomingEvents = [
    {
      id: 1,
      title: 'Final Exams - Computer Science',
      date: '2024-12-15',
      stressLevel: 'high',
      type: 'academic'
    },
    {
      id: 2,
      title: 'Project Submission Deadline',
      date: '2024-12-10',
      stressLevel: 'medium',
      type: 'academic'
    }
  ];

  const getStressLevelColor = (level) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Academic Calendar & Stress Alerts</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div
                key={event.id}
                className={`p-4 border-l-4 rounded-r-lg ${
                  event.stressLevel === 'high' ? 'border-red-500 bg-red-50' :
                  'border-yellow-500 bg-yellow-50'
                }`}
              >
                <h4 className="font-semibold">{event.title}</h4>
                <p className="text-sm text-gray-600">📅 {new Date(event.date).toLocaleDateString()}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium mt-2 inline-block ${
                  event.stressLevel === 'high' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {event.stressLevel.toUpperCase()} STRESS
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Stress Management Tips</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm">💡 Break study sessions into 25-minute chunks</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm">💡 Practice deep breathing exercises</p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm">💡 Schedule time for physical activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarAlert;