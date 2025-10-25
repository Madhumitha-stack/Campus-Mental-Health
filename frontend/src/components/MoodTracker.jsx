import React, { useState, useEffect } from 'react';
import { 
  Smile, 
  Frown, 
  Meh, 
  Laugh, 
  Angry, 
  Heart, 
  Calendar,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { moodService } from '../services/moodService';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);
  const [recentEntries, setRecentEntries] = useState([]);
  const [stats, setStats] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moodOptions = [
    { value: 'very_happy', label: 'Very Happy', icon: Laugh, color: 'text-green-500' },
    { value: 'happy', label: 'Happy', icon: Smile, color: 'text-green-400' },
    { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-yellow-500' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-400' },
    { value: 'very_sad', label: 'Very Sad', icon: Frown, color: 'text-blue-600' },
    { value: 'anxious', label: 'Anxious', icon: AlertTriangle, color: 'text-orange-500' },
    { value: 'stressed', label: 'Stressed', icon: TrendingUp, color: 'text-red-400' },
    { value: 'angry', label: 'Angry', icon: Angry, color: 'text-red-600' },
  ];

  const tagOptions = ['academic', 'social', 'family', 'health', 'financial', 'relationship', 'work'];

  useEffect(() => {
    loadRecentEntries();
    loadStats();
  }, []);

  const loadRecentEntries = async () => {
    try {
      const response = await moodService.getMoodEntries({ limit: 10 });
      setRecentEntries(response.moodEntries);
    } catch (error) {
      console.error('Error loading mood entries:', error);
    }
  };

  const loadStats = async () => {
    try {
      const response = await moodService.getMoodStats();
      setStats(response);
    } catch (error) {
      console.error('Error loading mood stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood) return;

    setIsSubmitting(true);
    try {
      await moodService.createMoodEntry({
        mood: selectedMood,
        intensity,
        notes,
        tags
      });

      // Reset form
      setSelectedMood('');
      setIntensity(5);
      setNotes('');
      setTags([]);

      // Reload data
      await loadRecentEntries();
      await loadStats();

      alert('Mood entry saved successfully!');
    } catch (error) {
      console.error('Error saving mood entry:', error);
      alert('Error saving mood entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tag) => {
    setTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getMoodIcon = (moodValue) => {
    const mood = moodOptions.find(m => m.value === moodValue);
    const Icon = mood ? mood.icon : Meh;
    return <Icon className="w-5 h-5" />;
  };

  const getMoodColor = (moodValue) => {
    const mood = moodOptions.find(m => m.value === moodValue);
    return mood ? mood.color : 'text-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Mood Entry Form */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Heart className="w-6 h-6 mr-2 text-primary-600" />
          How are you feeling?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mood Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select your mood
            </label>
            <div className="grid grid-cols-4 gap-3">
              {moodOptions.map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                      selectedMood === mood.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${mood.color}`} />
                    <span className="text-xs mt-2 text-gray-700">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intensity Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Intensity: {intensity}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What's affecting your mood? (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    tags.includes(tag)
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind? You can share as much or as little as you'd like..."
              rows="4"
              className="input-field resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedMood || isSubmitting}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Mood Entry'}
          </button>
        </form>
      </div>

      {/* Recent Entries */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-primary-600" />
          Recent Entries
        </h3>
        <div className="space-y-3">
          {recentEntries.map((entry) => (
            <div
              key={entry._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={getMoodColor(entry.mood)}>
                  {getMoodIcon(entry.mood)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {entry.mood.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Intensity: {entry.intensity}/10
                  </p>
                  {entry.notes && (
                    <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(entry.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {recentEntries.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No mood entries yet. Track your first mood above!
            </p>
          )}
        </div>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
            Your Mood Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{stats.totalEntries}</p>
              <p className="text-sm text-blue-700">Total Entries</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {stats.moodDistribution.length}
              </p>
              <p className="text-sm text-green-700">Different Moods</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;