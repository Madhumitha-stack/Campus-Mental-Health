import React, { useState } from 'react';

const MoodTracker = ({ onMoodUpdate }) => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { emoji: '😢', label: 'Very Sad', value: 1 },
    { emoji: '😔', label: 'Sad', value: 2 },
    { emoji: '😐', label: 'Neutral', value: 3 },
    { emoji: '😊', label: 'Happy', value: 4 },
    { emoji: '😄', label: 'Very Happy', value: 5 }
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">How are you feeling today?</h2>
      
      <div className="grid grid-cols-5 gap-4 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood)}
            className={`p-4 rounded-lg border-2 text-2xl ${
              selectedMood?.value === mood.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>

      <button
        onClick={() => selectedMood && onMoodUpdate(selectedMood)}
        disabled={!selectedMood}
        className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
      >
        Submit Mood
      </button>
    </div>
  );
};

export default MoodTracker;