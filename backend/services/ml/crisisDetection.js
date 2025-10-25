import { analyzeSentiment, detectCrisis } from './sentimentAnalysis.js';

export const analyzeMoodPattern = (moodEntries) => {
  if (moodEntries.length < 3) return 'stable';
  
  const recentMoods = moodEntries.slice(-7).map(entry => entry.mood);
  const averageMood = recentMoods.reduce((a, b) => a + b, 0) / recentMoods.length;
  
  if (averageMood <= 2) return 'high_risk';
  if (averageMood <= 3) return 'medium_risk';
  return 'low_risk';
};

export const generateAlert = (user, moodEntries, journalText) => {
  const sentiment = analyzeSentiment(journalText);
  const pattern = analyzeMoodPattern(moodEntries);
  
  if (sentiment === 'crisis') {
    return {
      level: 'CRITICAL',
      message: 'Immediate support needed - crisis detected',
      action: 'contact_counselor',
      user: user._id
    };
  }
  
  if (pattern === 'high_risk' || sentiment === 'negative') {
    return {
      level: 'HIGH',
      message: 'Signs of distress detected',
      action: 'check_in',
      user: user._id
    };
  }
  
  return null;
};