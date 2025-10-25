import React, { useState } from 'react';

const SOSButton = () => {
  const [showEmergency, setShowEmergency] = useState(false);

  const handleSOS = () => {
    setShowEmergency(true);
    // In a real app, this would trigger emergency protocols
    console.log('SOS triggered - emergency protocols activated');
  };

  const emergencyContacts = [
    { name: 'Campus Counseling', number: '(555) 123-HELP', available: '24/7' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', available: '24/7' },
    { name: 'National Suicide Prevention', number: '988', available: '24/7' },
    { name: 'Emergency Services', number: '911', available: '24/7' }
  ];

  return (
    <>
      <button
        onClick={handleSOS}
        className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 flex items-center space-x-2 shadow-lg"
        aria-label="Emergency SOS Help"
      >
        <span className="text-lg">🆘</span>
        <span>SOS</span>
      </button>

      {showEmergency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">🆘</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Emergency Support</h2>
                <p className="text-gray-600">Help is available. Please reach out to one of these resources:</p>
              </div>

              <div className="space-y-3 mb-6">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                    <div className="font-semibold text-gray-800">{contact.name}</div>
                    <div className="text-lg font-bold text-red-600">{contact.number}</div>
                    <div className="text-sm text-gray-500">{contact.available}</div>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-700 text-center">
                  Your safety is important. Please reach out for help if you're in crisis.
                </p>
              </div>

              <button
                onClick={() => setShowEmergency(false)}
                className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton;