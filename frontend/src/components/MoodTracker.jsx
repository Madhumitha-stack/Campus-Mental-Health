import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { moodService } from '../services/authService';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const moods = [
    { emoji: '😢', label: 'Very Sad', value: 1, color: 'red' },
    { emoji: '😔', label: 'Sad', value: 2, color: 'orange' },
    { emoji: '😐', label: 'Neutral', value: 3, color: 'yellow' },
    { emoji: '😊', label: 'Happy', value: 4, color: 'lightgreen' },
    { emoji: '😄', label: 'Very Happy', value: 5, color: 'green' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    setLoading(true);
    try {
      const moodData = {
        mood: selectedMood.value,
        emoji: selectedMood.emoji,
        journal: journalEntry,
        tags: getTagsFromJournal(journalEntry)
      };

      const response = await moodService.logMood(moodData, user.token);
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSelectedMood(null);
        setJournalEntry('');
      }, 3000);
    } catch (error) {
      console.error('Error logging mood:', error);
      alert('Failed to log mood. Please try again.');
    }
    setLoading(false);
  };

  const getTagsFromJournal = (text) => {
    const tags = [];
    if (text.toLowerCase().includes('anxious') || text.toLowerCase().includes('stress')) tags.push('anxiety');
    if (text.toLowerCase().includes('sad') || text.toLowerCase().includes('depress')) tags.push('depression');
    if (text.toLowerCase().includes('happy') || text.toLowerCase().includes('good')) tags.push('positive');
    if (text.toLowerCase().includes('tired') || text.toLowerCase().includes('exhaust')) tags.push('fatigue');
    return tags;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">How are you feeling today?</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Mood Selection - Mobile Optimized */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 sm:mb-4">
            Select your current mood:
          </label>
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {moods.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => setSelectedMood(mood)}
                className={`p-2 sm:p-4 rounded-lg border-2 text-xl sm:text-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  selectedMood?.value === mood.value
                    ? 'border-blue-500 bg-blue-50 scale-105 sm:scale-110'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {mood.emoji}
                <div className="text-xs mt-1 sm:mt-2 text-gray-600 hidden xs:block">
                  {mood.label}
                </div>
              </button>
            ))}
          </div>
          {/* Mobile labels below grid */}
          <div className="grid grid-cols-5 gap-2 sm:gap-4 mt-2 xs:hidden">
            {moods.map((mood) => (
              <div key={mood.value} className="text-xs text-gray-500 text-center truncate">
                {mood.label.split(' ')[0]}
              </div>
            ))}
          </div>
        </div>

        {/* Journal Entry */}
        <div>
          <label htmlFor="journal" className="block text-sm font-medium text-gray-700 mb-2">
            Journal Entry (Optional)
          </label>
          <textarea
            id="journal"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            placeholder="How was your day? What's on your mind?"
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
          />
        </div>

        {/* Voice Input - Mobile Optimized */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-base">🎤</span>
            <span className="hidden sm:inline">Voice Input</span>
          </button>
          <span className="text-xs sm:text-sm text-gray-500">Or use voice to journal</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedMood || loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm sm:text-base font-semibold"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Logging Mood...
            </span>
          ) : (
            'Submit Mood Check-in'
          )}
        </button>
      </form>

      {/* Success Message */}
      {submitted && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">
          ✅ Mood recorded successfully! +10 wellness credits
        </div>
      )}

      {/* Mood History Preview */}
      <div className="mt-6 sm:mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Recent Mood History</h3>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-xl sm:text-2xl">{moods[Math.floor(Math.random() * moods.length)].emoji}</span>
                <span className="text-xs sm:text-sm text-gray-600">Today - {i + 1} hours ago</span>
              </div>
              <span className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">+10</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;