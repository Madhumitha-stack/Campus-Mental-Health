const natural = require('natural');
const compromise = require('compromise');

// Initialize sentiment analyzer
const analyzer = new natural.SentimentAnalyzer();
const stemmer = natural.PorterStemmer;
const lexicon = new natural.Lexicon('EN', 'N', 'NNP');
const ruleSet = new natural.RuleSet('EN');
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

// Sentiment words database
const positiveWords = new Set(['happy', 'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'positive', 'joy', 'love', 'excited']);
const negativeWords = new Set(['sad', 'bad', 'terrible', 'awful', 'horrible', 'negative', 'hate', 'angry', 'anxious', 'stressed', 'depressed', 'lonely']);
const crisisWords = new Set(['suicide', 'kill', 'die', 'end it all', 'give up', 'cant go on', 'harm myself', 'hurt myself', 'better off dead']);

function analyzeSentiment(text) {
  if (!text || text.trim().length === 0) return 0;

  const tokens = text.toLowerCase().split(/\s+/);
  let score = 0;
  let wordCount = 0;

  tokens.forEach(token => {
    const cleanToken = token.replace(/[^a-z]/g, '');
    if (cleanToken.length > 2) {
      if (positiveWords.has(cleanToken)) score += 1;
      if (negativeWords.has(cleanToken)) score -= 1;
      wordCount++;
    }
  });

  // Normalize score between -1 and 1
  const normalizedScore = wordCount > 0 ? score / wordCount : 0;
  return Math.max(-1, Math.min(1, normalizedScore));
}

function detectCrisis(text) {
  if (!text) return { isCrisis: false, level: 'low', keywords: [] };

  const lowerText = text.toLowerCase();
  const foundKeywords = [];

  crisisWords.forEach(word => {
    if (lowerText.includes(word)) {
      foundKeywords.push(word);
    }
  });

  // Simple crisis detection logic
  let crisisLevel = 'low';
  if (foundKeywords.length > 0) {
    const highSeverityWords = ['suicide', 'kill', 'die', 'harm myself', 'hurt myself'];
    const hasHighSeverity = foundKeywords.some(keyword => 
      highSeverityWords.includes(keyword)
    );
    
    crisisLevel = hasHighSeverity ? 'critical' : 'high';
  }

  return {
    isCrisis: foundKeywords.length > 0,
    level: crisisLevel,
    keywords: foundKeywords
  };
}

function extractTags(text) {
  const tags = [];
  const doc = compromise(text);
  
  // Extract topics based on context
  const topics = ['academic', 'social', 'family', 'health', 'financial', 'relationship', 'work'];
  
  topics.forEach(topic => {
    if (text.toLowerCase().includes(topic)) {
      tags.push(topic);
    }
  });

  return tags;
}

module.exports = {
  analyzeSentiment,
  detectCrisis,
  extractTags
};