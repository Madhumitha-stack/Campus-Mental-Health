const MoodEntry = require('../models/MoodEntry');
const { analyzeSentiment, detectCrisis, extractTags } = require('../ml/sentimentAnalysis');

exports.createMoodEntry = async (req, res) => {
  try {
    const { mood, intensity, notes, tags, location, weather } = req.body;
    
    // Analyze sentiment and detect crisis
    const sentimentScore = analyzeSentiment(notes);
    const crisisDetection = detectCrisis(notes);
    const extractedTags = tags || extractTags(notes);

    const moodEntry = await MoodEntry.create({
      user: req.user.id,
      mood,
      intensity,
      notes,
      tags: extractedTags,
      sentimentScore,
      crisisLevel: crisisDetection.level,
      location,
      weather
    });

    // If crisis detected, include crisis information in response
    const response = {
      success: true,
      moodEntry: {
        ...moodEntry.toObject(),
        crisisDetected: crisisDetection.isCrisis,
        crisisKeywords: crisisDetection.keywords
      }
    };

    if (crisisDetection.isCrisis) {
      response.crisisAlert = {
        level: crisisDetection.level,
        message: 'We detected concerning content in your entry. Please consider reaching out for support.',
        resources: [
          'Campus Counseling Center',
          'Crisis Hotline: 988',
          'Emergency Services: 911'
        ]
      };
    }

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating mood entry',
      error: error.message
    });
  }
};

exports.getMoodEntries = async (req, res) => {
  try {
    const { startDate, endDate, limit = 50 } = req.query;
    
    let query = { user: req.user.id };
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const moodEntries = await MoodEntry.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: moodEntries.length,
      moodEntries
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching mood entries',
      error: error.message
    });
  }
};

exports.getMoodStats = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const stats = await MoodEntry.aggregate([
      {
        $match: {
          user: req.user._id,
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: '$mood',
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' }
        }
      },
      {
        $project: {
          mood: '$_id',
          count: 1,
          avgIntensity: { $round: ['$avgIntensity', 2] },
          _id: 0
        }
      }
    ]);

    const weeklyTrend = await MoodEntry.aggregate([
      {
        $match: {
          user: req.user._id,
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            week: { $week: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          avgSentiment: { $avg: '$sentimentScore' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.week': 1 }
      }
    ]);

    res.json({
      success: true,
      moodDistribution: stats,
      weeklyTrend,
      totalEntries: stats.reduce((sum, item) => sum + item.count, 0)
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching mood statistics',
      error: error.message
    });
  }
};

exports.deleteMoodEntry = async (req, res) => {
  try {
    const { id } = req.params;
    
    const moodEntry = await MoodEntry.findOneAndDelete({
      _id: id,
      user: req.user.id
    });

    if (!moodEntry) {
      return res.status(404).json({
        message: 'Mood entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Mood entry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting mood entry',
      error: error.message
    });
  }
};