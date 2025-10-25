const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    enum: ['very_happy', 'happy', 'neutral', 'sad', 'very_sad', 'anxious', 'stressed', 'angry'],
    required: true
  },
  intensity: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  notes: {
    type: String,
    maxlength: 500
  },
  tags: [{
    type: String,
    enum: ['academic', 'social', 'family', 'health', 'financial', 'relationship', 'work']
  }],
  sentimentScore: {
    type: Number,
    min: -1,
    max: 1
  },
  crisisLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'low'
  },
  location: {
    type: String
  },
  weather: {
    type: String
  }
}, {
  timestamps: true
});

// Index for efficient querying
moodEntrySchema.index({ user: 1, createdAt: -1 });
moodEntrySchema.index({ crisisLevel: 1 });

module.exports = mongoose.model('MoodEntry', moodEntrySchema);