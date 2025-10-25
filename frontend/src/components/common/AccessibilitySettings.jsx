import React, { useState, useEffect } from 'react';
import { accessibility } from '../../utils/accessibility';
import { Settings, Type, Eye, Zap } from 'lucide-react';

const AccessibilitySettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    highContrast: false,
    fontSize: 'medium',
    reducedMotion: false
  });

  useEffect(() => {
    // Load saved settings
    const highContrast = localStorage.getItem('highContrast') === 'enabled';
    const fontSize = localStorage.getItem('fontSize') || 'medium';
    const reducedMotion = localStorage.getItem('reducedMotion') === 'enabled';

    setSettings({
      highContrast,
      fontSize,
      reducedMotion
    });
  }, []);

  const toggleHighContrast = () => {
    const newValue = !settings.highContrast;
    setSettings(prev => ({ ...prev, highContrast: newValue }));
    
    if (newValue) {
      accessibility.enableHighContrast();
    } else {
      accessibility.disableHighContrast();
    }
  };

  const changeFontSize = (size) => {
    setSettings(prev => ({ ...prev, fontSize: size }));
    accessibility.setFontSize(size);
  };

  const toggleReducedMotion = () => {
    const newValue = !settings.reducedMotion;
    setSettings(prev => ({ ...prev, reducedMotion: newValue }));
    
    if (newValue) {
      accessibility.reduceMotion();
    } else {
      accessibility.restoreMotion();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
        aria-label="Open accessibility settings"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Accessibility Settings
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close settings"
              >
                ✕
              </button>
            </div>

            {/* Settings Options */}
            <div className="p-6 space-y-6">
              {/* Font Size */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  <Type className="w-4 h-4 mr-2" />
                  Font Size
                </label>
                <div className="flex space-x-2">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => changeFontSize(size)}
                      className={`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                        settings.fontSize === size
                          ? 'bg-primary-100 border-primary-500 text-primary-700'
                          : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Eye className="w-4 h-4 mr-2" />
                  High Contrast
                </label>
                <button
                  onClick={toggleHighContrast}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.highContrast ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Zap className="w-4 h-4 mr-2" />
                  Reduced Motion
                </label>
                <button
                  onClick={toggleReducedMotion}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.reducedMotion ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Apply Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilitySettings;