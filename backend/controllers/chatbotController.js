import { analyzeSentiment, detectCrisis } from '../ml/sentimentAnalysis.js';

const RESPONSES = {
  greeting: [
    "Hello! I'm here to support you. How are you feeling today?",
    "Hi there! I'm your mental health assistant. What's on your mind?",
    "Welcome! I'm here to listen and help. How can I support you today?"
  ],
  stress: [
    "I understand you're feeling stressed. Try taking deep breaths - inhale for 4 seconds, hold for 4, exhale for 6.",
    "Stress can be overwhelming. Remember to take breaks and practice mindfulness.",
    "It's okay to feel stressed. Would you like to try some relaxation techniques?"
  ],
  sad: [
    "I'm sorry you're feeling this way. Remember it's okay to not be okay.",
    "Your feelings are valid. Would you like to talk about what's bothering you?",
    "I'm here for you. Sometimes sharing our feelings can help lighten the load."
  ],
  crisis: [
    "🚨 I'm really concerned about what you're sharing. Please contact campus counseling immediately at (555) 123-HELP.",
    "🚨 Your safety is important. Please reach out to a crisis counselor now at (555) 123-HELP.",
    "🚨 I'm here for you, but this sounds serious. Please contact emergency services or campus counseling right away."
  ],
  default: [
    "Thank you for sharing. Remember that your feelings are valid and important.",
    "I'm listening. Would you like to explore some coping strategies together?",
    "Thank you for trusting me with this. How can I best support you right now?"
  ]
};

export const chat = async (req, res) => {
  try {
    const { message, userId } = req.body;

    // Analyze sentiment and detect crisis
    const sentiment = analyzeSentiment(message);
    const isCrisis = detectCrisis(message);

    // Determine response category
    let category = 'default';
    if (isCrisis) {
      category = 'crisis';
    } else if (message.toLowerCase().includes('stress') || message.toLowerCase().includes('anxious')) {
      category = 'stress';
    } else if (message.toLowerCase().includes('sad') || message.toLowerCase().includes('depress')) {
      category = 'sad';
    } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      category = 'greeting';
    }

    // Get random response from category
    const responses = RESPONSES[category];
    const response = responses[Math.floor(Math.random() * responses.length)];

    // Add wellness credits for engagement
    if (userId && !isCrisis) {
      // In a real app, you'd update user credits here
    }

    res.json({
      response,
      sentiment,
      isCrisis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};