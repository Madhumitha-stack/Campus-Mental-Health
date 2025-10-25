import React, { useState } from 'react';

const AccessibilitySettings = ({ onClose }) => {
  const [settings, setSettings] = useState({
    highContrast: false,
    fontSize: 'medium',
    textToSpeech: false,
    reducedMotion: false,
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));

    // Apply settings immediately
    if (key === 'highContrast') {
      document.body.classList.toggle('high-contrast', value);
    }
    if (key === 'fontSize') {
      document.documentElement.style.fontSize = 
        value === 'large' ? '18px' : value === 'xlarge' ? '20px' : '16px';
    }
    if (key === 'reducedMotion') {
      document.body.classList.toggle('reduced-motion', value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Accessibility Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="Close settings"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">High Contrast Mode</h3>
                <p className="text-sm text-gray-600">Enhanced color contrast</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Font Size */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Font Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {['Small', 'Medium', 'Large'].map(size => (
                  <button
                    key={size}
                    onClick={() => handleSettingChange('fontSize', size.toLowerCase())}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      settings.fontSize === size.toLowerCase()
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Text-to-Speech */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Text-to-Speech</h3>
                <p className="text-sm text-gray-600">Read content aloud</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.textToSpeech}
                  onChange={(e) => handleSettingChange('textToSpeech', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Reduced Motion</h3>
                <p className="text-sm text-gray-600">Minimize animations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.reducedMotion}
                  onChange={(e) => handleSettingChange('reducedMotion', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="mt-8 flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                // Reset all settings
                setSettings({
                  highContrast: false,
                  fontSize: 'medium',
                  textToSpeech: false,
                  reducedMotion: false,
                });
                document.body.classList.remove('high-contrast', 'reduced-motion');
                document.documentElement.style.fontSize = '16px';
              }}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Reset All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;