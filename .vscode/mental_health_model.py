import numpy as np
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import tensorflow as tf
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import Dense, LSTM, Embedding, Dropout, Input, Bidirectional
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from textblob import TextBlob
from sentence_transformers import SentenceTransformer
import re
import logging

class MentalHealthPredictor:
    def __init__(self):
        self.sia = SentimentIntensityAnalyzer()
        self.sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Initialize models
        self.risk_classifier = None
        self.mood_predictor = None
        self.crisis_detector = None
        self.tokenizer = Tokenizer(num_words=5000)
        self.vectorizer = TfidfVectorizer(max_features=1000)
        self.scaler = StandardScaler()
        
        # Training data
        self.training_data = self._create_training_data()
        self._train_models()
        
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    def _create_training_data(self):
        """Create comprehensive training data for mental health prediction"""
        np.random.seed(42)
        n_samples = 5000
        
        data = []
        for i in range(n_samples):
            # Simulate student mental health data
            features = {
                'phq9_score': np.random.randint(0, 27),
                'gad7_score': np.random.randint(0, 21),
                'sleep_quality': np.random.randint(1, 11),
                'social_interaction': np.random.randint(1, 11),
                'academic_stress': np.random.randint(1, 11),
                'physical_activity': np.random.randint(0, 8),
                'nutrition_quality': np.random.randint(1, 11),
                'screen_time': np.random.randint(2, 15),
                'social_support': np.random.randint(1, 11),
                'sentiment_score': np.random.uniform(-1, 1)
            }
            
            # Calculate risk level
            risk_score = (
                features['phq9_score'] * 0.15 +
                features['gad7_score'] * 0.15 +
                (10 - features['sleep_quality']) * 0.12 +
                (10 - features['social_interaction']) * 0.10 +
                features['academic_stress'] * 0.12 +
                (7 - features['physical_activity']) * 0.08 +
                (10 - features['nutrition_quality']) * 0.08 +
                features['screen_time'] * 0.05 +
                (10 - features['social_support']) * 0.10 +
                (1 - features['sentiment_score']) * 0.05
            )
            
            if risk_score < 3:
                risk_level = 'low'
                mood = np.random.choice(['excellent', 'good'], p=[0.2, 0.8])
            elif risk_score < 7:
                risk_level = 'moderate'
                mood = np.random.choice(['good', 'neutral', 'poor'], p=[0.3, 0.5, 0.2])
            else:
                risk_level = 'high'
                mood = np.random.choice(['neutral', 'poor', 'crisis'], p=[0.2, 0.6, 0.2])
            
            features['risk_level'] = risk_level
            features['mood'] = mood
            features['crisis_risk'] = 1 if risk_level == 'high' and mood == 'crisis' else 0
            
            data.append(features)
        
        return pd.DataFrame(data)
    
    def _train_models(self):
        """Train all ML models"""
        try:
            # Prepare features
            feature_columns = ['phq9_score', 'gad7_score', 'sleep_quality', 'social_interaction', 
                             'academic_stress', 'physical_activity', 'nutrition_quality', 
                             'screen_time', 'social_support', 'sentiment_score']
            
            X = self.training_data[feature_columns]
            y_risk = self.training_data['risk_level']
            y_mood = self.training_data['mood']
            y_crisis = self.training_data['crisis_risk']
            
            # Train risk classifier
            self.risk_classifier = RandomForestClassifier(
                n_estimators=200,
                max_depth=15,
                random_state=42
            )
            self.risk_classifier.fit(X, y_risk)
            
            # Train mood predictor
            self.mood_predictor = GradientBoostingClassifier(
                n_estimators=100,
                random_state=42
            )
            self.mood_predictor.fit(X, y_mood)
            
            # Train crisis detector
            self.crisis_detector = LogisticRegression(random_state=42)
            self.crisis_detector.fit(X, y_crisis)
            
            self.logger.info("All ML models trained successfully")
            
        except Exception as e:
            self.logger.error(f"Error training models: {str(e)}")
    
    def predict_risk(self, user_data):
        """Predict mental health risk level"""
        try:
            features = self._extract_features_from_user_data(user_data)
            prediction = self.risk_classifier.predict([features])[0]
            probability = np.max(self.risk_classifier.predict_proba([features]))
            
            return {
                'risk_level': prediction,
                'confidence': float(probability),
                'recommendations': self._get_risk_recommendations(prediction),
                'timestamp': pd.Timestamp.now().isoformat()
            }
        except Exception as e:
            self.logger.error(f"Risk prediction error: {str(e)}")
            return self._fallback_risk_prediction(user_data)
    
    def predict_mood(self, user_data, recent_messages=[]):
        """Predict current mood with text analysis"""
        try:
            features = self._extract_features_from_user_data(user_data)
            
            # Add text sentiment from recent messages
            if recent_messages:
                text_sentiment = self._analyze_text_sentiment(' '.join(recent_messages))
                features = np.append(features, text_sentiment)
            
            prediction = self.mood_predictor.predict([features])[0]
            probability = np.max(self.mood_predictor.predict_proba([features]))
            
            return {
                'mood': prediction,
                'confidence': float(probability),
                'mood_score': self._calculate_mood_score(prediction),
                'suggestions': self._get_mood_suggestions(prediction)
            }
        except Exception as e:
            self.logger.error(f"Mood prediction error: {str(e)}")
            return {'mood': 'neutral', 'confidence': 0.5, 'mood_score': 5}
    
    def detect_crisis(self, user_data, text_input=""):
        """Detect potential crisis situations"""
        try:
            features = self._extract_features_from_user_data(user_data)
            
            # Enhanced crisis detection with text analysis
            if text_input:
                crisis_indicators = self._analyze_crisis_indicators(text_input)
                features = np.append(features, crisis_indicators)
            
            prediction = self.crisis_detector.predict([features])[0]
            probability = self.crisis_detector.predict_proba([features])[0][1]
            
            return {
                'is_crisis': bool(prediction),
                'confidence': float(probability),
                'urgency_level': 'high' if probability > 0.7 else 'medium' if probability > 0.4 else 'low',
                'immediate_actions': self._get_crisis_actions(probability)
            }
        except Exception as e:
            self.logger.error(f"Crisis detection error: {str(e)}")
            return {'is_crisis': False, 'confidence': 0.0, 'urgency_level': 'low'}
    
    def _extract_features_from_user_data(self, user_data):
        """Extract features from user data"""
        return np.array([
            user_data.get('phq9_score', 5),
            user_data.get('gad7_score', 5),
            user_data.get('sleep_quality', 6),
            user_data.get('social_interaction', 6),
            user_data.get('academic_stress', 5),
            user_data.get('physical_activity', 3),
            user_data.get('nutrition_quality', 6),
            user_data.get('screen_time', 8),
            user_data.get('social_support', 7),
            user_data.get('sentiment_score', 0)
        ])
    
    def _analyze_text_sentiment(self, text):
        """Analyze sentiment from text"""
        sentiment_scores = self.sia.polarity_scores(text)
        blob = TextBlob(text)
        return np.array([
            sentiment_scores['compound'],
            sentiment_scores['pos'],
            sentiment_scores['neg'],
            blob.sentiment.polarity,
            blob.sentiment.subjectivity
        ])
    
    def _analyze_crisis_indicators(self, text):
        """Analyze text for crisis indicators"""
        crisis_keywords = [
            'suicide', 'kill myself', 'end it all', 'want to die', 'harm myself',
            'better off dead', 'can\'t go on', 'no way out', 'hopeless'
        ]
        
        text_lower = text.lower()
        keyword_count = sum(1 for keyword in crisis_keywords if keyword in text_lower)
        sentiment = self.sia.polarity_scores(text)['compound']
        
        return np.array([keyword_count, sentiment])
    
    def _calculate_mood_score(self, mood):
        """Convert mood to numerical score"""
        mood_scores = {
            'excellent': 9,
            'good': 7,
            'neutral': 5,
            'poor': 3,
            'crisis': 1
        }
        return mood_scores.get(mood, 5)
    
    def _get_risk_recommendations(self, risk_level):
        """Get recommendations based on risk level"""
        recommendations = {
            'low': [
                "Continue maintaining healthy habits",
                "Regular mindfulness practice",
                "Stay connected with social support"
            ],
            'moderate': [
                "Schedule wellness check-in",
                "Join campus support group",
                "Practice stress management techniques"
            ],
            'high': [
                "Contact campus counseling immediately",
                "Reach out to trusted person",
                "Use crisis resources if needed"
            ]
        }
        return recommendations.get(risk_level, [])
    
    def _get_mood_suggestions(self, mood):
        """Get mood-specific suggestions"""
        suggestions = {
            'excellent': ["Share your positive energy!", "Help others feel good"],
            'good': ["Keep up the good work!", "Maintain your routines"],
            'neutral': ["Try a new activity", "Connect with friends"],
            'poor': ["Reach out for support", "Practice self-care"],
            'crisis': ["Use emergency resources", "Contact help immediately"]
        }
        return suggestions.get(mood, [])
    
    def _get_crisis_actions(self, probability):
        """Get crisis intervention actions"""
        if probability > 0.7:
            return [
                "Call campus emergency: (555) 911-911",
                "Text crisis line: HOME to 741741",
                "Go to nearest emergency room"
            ]
        elif probability > 0.4:
            return [
                "Contact campus counseling",
                "Reach out to trusted person",
                "Use mental health resources"
            ]
        else:
            return ["Monitor your feelings", "Practice self-care"]
    
    def _fallback_risk_prediction(self, user_data):
        """Fallback prediction when ML fails"""
        phq9 = user_data.get('phq9_score', 5)
        if phq9 <= 4:
            return {'risk_level': 'low', 'confidence': 0.6}
        elif phq9 <= 14:
            return {'risk_level': 'moderate', 'confidence': 0.7}
        else:
            return {'risk_level': 'high', 'confidence': 0.8}