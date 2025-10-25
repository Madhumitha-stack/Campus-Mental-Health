const { analyzeSentiment, detectCrisis } = require('./sentimentAnalysis');

class CrisisDetector {
  constructor() {
    this.crisisPatterns = [
      {
        pattern: /(want to die|end my life|kill myself)/i,
        level: 'critical',
        response: 'This sounds very serious. Please contact emergency services immediately or call the suicide prevention hotline at 988.'
      },
      {
        pattern: /(can't go on|give up|better off dead)/i,
        level: 'high',
        response: 'I\'m really concerned about what you\'re saying. Please reach out to a mental health professional or call 988 for immediate support.'
      },
      {
        pattern: /(harm myself|hurt myself|self harm)/i,
        level: 'high',
        response: 'Your safety is important. Please contact a mental health professional or call 988 right now.'
      },
      {
        pattern: /(depressed|hopeless|empty|numb)/i,
        level: 'medium',
        response: 'It sounds like you\'re going through a difficult time. Would you like to talk to a campus counselor?'
      },
      {
        pattern: /(anxious|panic|overwhelmed|stressed)/i,
        level: 'medium',
        response: 'I understand this is stressful. Let me help you find some coping strategies or connect you with support.'
      }
    ];
  }

  analyzeMessage(message, moodData = {}) {
    const sentiment = analyzeSentiment(message);
    const crisisDetection = detectCrisis(message);
    
    let crisisLevel = crisisDetection.level;
    let recommendedAction = '';
    let emergencyContacts = [];

    // Check against patterns
    for (const pattern of this.crisisPatterns) {
      if (pattern.pattern.test(message)) {
        crisisLevel = pattern.level;
        recommendedAction = pattern.response;
        break;
      }
    }

    // Adjust based on sentiment and mood intensity
    if (moodData.intensity >= 8 && sentiment < -0.5) {
      crisisLevel = this.escalateCrisisLevel(crisisLevel);
    }

    // Set emergency contacts based on crisis level
    if (crisisLevel === 'critical' || crisisLevel === 'high') {
      emergencyContacts = [
        { name: 'Emergency Services', number: '911' },
        { name: 'Suicide Prevention', number: '988' },
        { name: 'Crisis Text Line', number: 'Text HOME to 741741' }
      ];
    }

    return {
      crisisLevel,
      sentimentScore: sentiment,
      isEmergency: crisisLevel === 'critical',
      recommendedAction: recommendedAction || this.getDefaultResponse(crisisLevel),
      emergencyContacts,
      detectedKeywords: crisisDetection.keywords,
      timestamp: new Date()
    };
  }

  escalateCrisisLevel(currentLevel) {
    const levels = ['low', 'medium', 'high', 'critical'];
    const currentIndex = levels.indexOf(currentLevel);
    return levels[Math.min(currentIndex + 1, levels.length - 1)];
  }

  getDefaultResponse(crisisLevel) {
    const responses = {
      critical: 'This is an emergency situation. Please contact emergency services immediately or call 988.',
      high: 'Please reach out for professional help immediately. Your campus counseling center is available to support you.',
      medium: 'Consider speaking with a mental health professional about what you\'re experiencing.',
      low: 'Remember that it\'s okay to not be okay. Consider tracking your moods and reaching out for support when needed.'
    };
    return responses[crisisLevel];
  }
}

module.exports = CrisisDetector;