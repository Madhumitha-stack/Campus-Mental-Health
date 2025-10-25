import mongoose from 'mongoose';

const moodEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mood: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  emoji: {
    type: String,
    required: true,
  },
  journal: {
    type: String,
    default: '',
  },
  voiceNote: {
    type: String,
    default: '',
  },
  tags: [{
    type: String,
  }],
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative', 'crisis'],
    default: 'neutral',
  },
}, {
  timestamps: true,
});

export default mongoose.model('MoodEntry', moodEntrySchema);