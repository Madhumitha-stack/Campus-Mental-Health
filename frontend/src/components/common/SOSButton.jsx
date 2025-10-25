import React, { useState } from 'react';
import { Phone, X, AlertTriangle } from 'lucide-react';

const SOSButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', description: 'Immediate emergency assistance' },
    { name: 'Suicide Prevention Lifeline', number: '988', description: '24/7 crisis support' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Text-based crisis support' },
    { name: 'Campus Security', number: '(555) 123-4567', description: '24/7 campus safety' },
    { name: 'Counseling Center', number: '(555) 123-4568', description: 'Mental health support' },
  ];

  const handleCall = (number) => {
    if (number.includes('Text')) {
      // For text lines, show message
      alert(`Please ${number} for crisis support`);
    } else {
      // For phone numbers, initiate call
      window.open(`tel:${number}`, '_self');
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* SOS Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50 flex items-center justify-center animate-pulse"
        aria-label="Emergency SOS"
      >
        <AlertTriangle className="w-6 h-6" />
      </button>

      {/* Emergency Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-red-600 bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-red-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  <h2 className="text-xl font-bold">Emergency Support</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-red-200 transition-colors"
                  aria-label="Close emergency panel"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="mt-2 text-red-100">
                You are not alone. Help is available 24/7.
              </p>
            </div>

            {/* Emergency Contacts */}
            <div className="p-6 space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{contact.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-mono text-primary-600">
                      {contact.number}
                    </span>
                    <button
                      onClick={() => handleCall(contact.number)}
                      className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety Message */}
            <div className="px-6 py-4 bg-yellow-50 border-t border-yellow-200">
              <p className="text-sm text-yellow-800 text-center">
                Your safety is important. Please reach out if you're in crisis.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton;