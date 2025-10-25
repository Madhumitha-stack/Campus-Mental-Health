from flask import Blueprint, request, jsonify
from src.services.prediction_service import PredictionService
from src.services.chat_service import ChatService
import logging

api_bp = Blueprint('api', __name__)
logger = logging.getLogger(__name__)

# Initialize services
prediction_service = PredictionService()
chat_service = ChatService()

@api_bp.route('/predict/risk', methods=['POST'])
async def predict_risk():
    try:
        data = request.json
        user_data = data.get('user_data', {})
        
        prediction = await prediction_service.predict_mental_health_risk(user_data)
        return jsonify(prediction)
        
    except Exception as e:
        logger.error(f"Risk prediction error: {str(e)}")
        return jsonify({'error': 'Prediction failed'}), 500

@api_bp.route('/predict/mood', methods=['POST'])
async def predict_mood():
    try:
        data = request.json
        user_data = data.get('user_data', {})
        recent_messages = data.get('recent_messages', [])
        
        from src.models.mental_health_model import MentalHealthPredictor
        predictor = MentalHealthPredictor()
        prediction = predictor.predict_mood(user_data, recent_messages)
        
        return jsonify(prediction)
        
    except Exception as e:
        logger.error(f"Mood prediction error: {str(e)}")
        return jsonify({'error': 'Mood prediction failed'}), 500

@api_bp.route('/analyze/text', methods=['POST'])
def analyze_text():
    try:
        data = request.json
        text = data.get('text', '')
        
        from src.models.chatbot_engine import MentalHealthChatbot
        chatbot = MentalHealthChatbot()
        sentiment = chatbot._analyze_sentiment(text)
        crisis_risk = chatbot._assess_crisis_risk(text)
        
        return jsonify({
            'sentiment': sentiment,
            'crisis_risk': crisis_risk,
            'word_count': len(text.split())
        })
        
    except Exception as e:
        logger.error(f"Text analysis error: {str(e)}")
        return jsonify({'error': 'Text analysis failed'}), 500

@api_bp.route('/user/<user_id>/history', methods=['GET'])
def get_user_history(user_id):
    try:
        from src.models.chatbot_engine import MentalHealthChatbot
        chatbot = MentalHealthChatbot()
        history = chatbot.get_conversation_history(user_id)
        
        return jsonify({
            'user_id': user_id,
            'conversation_history': history,
            'total_messages': len(history)
        })
        
    except Exception as e:
        logger.error(f"History retrieval error: {str(e)}")
        return jsonify({'error': 'History retrieval failed'}), 500