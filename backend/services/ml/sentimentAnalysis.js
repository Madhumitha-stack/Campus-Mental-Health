import natural from 'natural';

// Initialize sentiment analyzer
const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

// Crisis keywords for detection
const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end it all', 'want to die', 'self harm',
  'hurt myself', 'no reason to live', 'better off dead', 'suicidal'
];

export const analyzeSentiment = (text) => {
  if (!text) return 'neutral';
  
  const tokens = text.toLowerCase().split(' ');
  
  // Check for crisis keywords first
  const hasCrisisKeywords = CRISIS_KEYWORDS.some(keyword => 
    text.toLowerCase().includes(keyword)
  );
  
  if (hasCrisisKeywords) {
    return 'crisis';
  }
  
  // Basic sentiment analysis
  const score = analyzer.getSentiment(tokens);
  
  if (score > 0.1) return 'positive';
  if (score < -0.1) return 'negative';
  return 'neutral';
};

export const detectCrisis = (text) => {
  const sentiment = analyzeSentiment(text);
  return sentiment === 'crisis';
};