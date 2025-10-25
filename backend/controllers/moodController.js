import MoodEntry from '../models/MoodEntry.js';
import { analyzeSentiment } from '../ml/sentimentAnalysis.js';
import { analyzeMoodPattern, generateAlert } from '../ml/crisisDetection.js';

export const logMood = async (req, res) => {
  try {
    const { mood, emoji, journal, voiceNote, tags } = req.body;
    const userId = req.user.id;

    // Analyze sentiment of journal entry
    const sentiment = analyzeSentiment(journal);

    const moodEntry = await MoodEntry.create({
      userId,
      mood,
      emoji,
      journal,
      voiceNote,
      tags,
      sentiment
    });

    // Get user's recent mood history for pattern analysis
    const recentMoods = await MoodEntry.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    // Generate alert if needed
    const alert = generateAlert(req.user, recentMoods, journal);

    // Add wellness credits
    const creditsEarned = 10;

    res.json({
      moodEntry,
      creditsEarned,
      alert,
      message: 'Mood logged successfully'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMoodHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { days = 7 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const moodEntries = await MoodEntry.find({
      userId,
      createdAt: { $gte: startDate }
    }).sort({ createdAt: 1 });

    // Calculate statistics
    const stats = {
      averageMood: moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length || 0,
      totalEntries: moodEntries.length,
      sentimentBreakdown: moodEntries.reduce((acc, entry) => {
        acc[entry.sentiment] = (acc[entry.sentiment] || 0) + 1;
        return acc;
      }, {})
    };

    res.json({
      moodEntries,
      stats,
      trend: analyzeMoodPattern(moodEntries)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};