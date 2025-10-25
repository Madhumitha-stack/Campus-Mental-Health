const CrisisDetector = require('../ml/crisisDetection');
const crisisDetector = new CrisisDetector();

class ChatbotController {
  constructor() {
    this.responses = {
      greeting: [
        "Hello! I'm here to listen and support you. How are you feeling today?",
        "Hi there! I'm glad you reached out. What's on your mind?",
        "Welcome! I'm here to help you through whatever you're experiencing."
      ],
      stress: [
        "Stress can be overwhelming. Try taking deep breaths - inhale for 4 counts, hold for 4, exhale for 6.",
        "When stressed, breaking tasks into smaller steps can help make them more manageable.",
        "Remember to take breaks and practice self-care. Even 5 minutes of quiet time can help."
      ],
      anxiety: [
        "Anxiety can feel intense. Try the 5-4-3-2-1 grounding technique: notice 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.",
        "Progressive muscle relaxation can help - tense and then relax each muscle group from toes to head.",
        "Remember that anxiety is temporary, and this feeling will pass."
      ],
      depression: [
        "It takes courage to acknowledge these feelings. You're not alone in this.",
        "Even small activities like getting out of bed or taking a shower are accomplishments worth recognizing.",
        "Consider reaching out to someone you trust, or your campus counseling center for additional support."
      ],
      academic: [
        "Academic pressure can be intense. Remember that your worth isn't defined by grades.",
        "Try breaking study sessions into 25-minute blocks with 5-minute breaks (Pomodoro technique).",
        "Your campus likely has academic support services and tutoring available."
      ],
      general: [
        "Thank you for sharing that with me. How has that been affecting you?",
        "I hear you. That sounds really challenging.",
        "Would you like to talk more about what you're experiencing?",
        "It's okay to feel this way. Your feelings are valid."
      ]
    };
  }

  async processMessage(req, res) {
    try {
      const { message, context = {} } = req.body;
      
      if (!message || message.trim().length === 0) {
        return res.status(400).json({
          message: 'Message is required'
        });
      }

      // Analyze for crisis detection
      const crisisAnalysis = crisisDetector.analyzeMessage(message, context.moodData);

      // Generate response based on content and crisis level
      let response = this.generateResponse(message, crisisAnalysis.crisisLevel);
      
      // If crisis detected, override with crisis response
      if (crisisAnalysis.isEmergency) {
        response = {
          text: crisisAnalysis.recommendedAction,
          type: 'crisis',
          urgent: true
        };
      }

      // Log interaction (in a real app, you'd save this to a database)
      const interaction = {
        userId: req.user.id,
        userMessage: message,
        botResponse: response.text,
        crisisLevel: crisisAnalysis.crisisLevel,
        sentiment: crisisAnalysis.sentimentScore,
        timestamp: new Date()
      };

      res.json({
        success: true,
        response: {
          text: response.text,
          type: response.type || 'general',
          urgent: response.urgent || false,
          crisisLevel: crisisAnalysis.crisisLevel,
          resources: crisisAnalysis.emergencyContacts,
          sentiment: crisisAnalysis.sentimentScore
        },
        analysis: {
          crisisDetected: crisisAnalysis.isEmergency,
          level: crisisAnalysis.crisisLevel,
          keywords: crisisAnalysis.detectedKeywords
        }
      });

    } catch (error) {
      res.status(500).json({
        message: 'Error processing message',
        error: error.message
      });
    }
  }

  generateResponse(message, crisisLevel) {
    const lowerMessage = message.toLowerCase();

    // Crisis responses take priority
    if (crisisLevel === 'critical' || crisisLevel === 'high') {
      return {
        text: "I'm really concerned about what you're sharing. Please contact emergency services (911) or the suicide prevention hotline (988) immediately. You don't have to go through this alone.",
        type: 'crisis',
        urgent: true
      };
    }

    // Categorize and respond based on content
    if (/(hello|hi|hey|greetings)/i.test(lowerMessage)) {
      return {
        text: this.getRandomResponse('greeting'),
        type: 'greeting'
      };
    }

    if (/(stress|overwhelmed|pressure|burnout)/i.test(lowerMessage)) {
      return {
        text: this.getRandomResponse('stress'),
        type: 'stress'
      };
    }

    if (/(anxious|anxiety|worry|nervous|panic)/i.test(lowerMessage)) {
      return {
        text: this.getRandomResponse('anxiety'),
        type: 'anxiety'
      };
    }

    if (/(depress|sad|hopeless|empty|numb)/i.test(lowerMessage)) {
      return {
        text: this.getRandomResponse('depression'),
        type: 'depression'
      };
    }

    if (/(study|exam|test|grade|assignment|academic)/i.test(lowerMessage)) {
      return {
        text: this.getRandomResponse('academic'),
        type: 'academic'
      };
    }

    return {
      text: this.getRandomResponse('general'),
      type: 'general'
    };
  }

  getRandomResponse(category) {
    const responses = this.responses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  async getConversationHistory(req, res) {
    try {
      // In a real implementation, you'd fetch from a database
      // For now, return empty array as placeholder
      res.json({
        success: true,
        conversations: []
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching conversation history',
        error: error.message
      });
    }
  }
}

module.exports = new ChatbotController();