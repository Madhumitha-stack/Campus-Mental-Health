import React, { useState } from 'react';

const AccessibilitySettings = () => {
  const [settings, setSettings] = useState({
    highContrast: false,
    fontSize: 'medium',
    textToSpeech: false
  });

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Accessibility Settings</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">High Contrast Mode</h3>
            <p className="text-sm text-gray-600">Enhanced color contrast</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => setSettings({...settings, highContrast: e.target.checked})}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Font Size</h3>
          <div className="flex space-x-2">
            {['Small', 'Medium', 'Large'].map(size => (
              <button
                key={size}
                className={`px-4 py-2 border rounded-lg ${
                  settings.fontSize === size.toLowerCase() ? 'bg-blue-600 text-white' : 'border-gray-300'
                }`}
                onClick={() => setSettings({...settings, fontSize: size.toLowerCase()})}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Text-to-Speech</h3>
            <p className="text-sm text-gray-600">Read content aloud</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.textToSpeech}
              onChange={(e) => setSettings({...settings, textToSpeech: e.target.checked})}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;