from flask import Blueprint, request, jsonify
from src.services.chat_service import ChatService
import logging

chat_bp = Blueprint('chat', __name__)
logger = logging.getLogger(__name__)

chat_service = ChatService()

@chat_bp.route('/message', methods=['POST'])
async def chat_message():
    try:
        data = request.json
        user_id = data.get('user_id', 'anonymous')
        message = data.get('message', '')
        user_context = data.get('user_context', {})
        
        response = await chat_service.process_chat_message(user_id, message, user_context)
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Chat message error: {str(e)}")
        return jsonify({
            'chat_response': "I'm having trouble processing your message. Please try again.",
            'resources': [],
            'analysis': {'intent': 'fallback', 'sentiment': 0, 'crisis_risk': 0}
        }), 500

@chat_bp.route('/session/<user_id>', methods=['GET'])
def get_session(user_id):
    try:
        session_data = chat_service.active_sessions.get(user_id, {})
        return jsonify({
            'user_id': user_id,
            'session_data': session_data
        })
    except Exception as e:
        logger.error(f"Session retrieval error: {str(e)}")
        return jsonify({'error': 'Session retrieval failed'}), 500

@chat_bp.route('/session/<user_id>/clear', methods=['DELETE'])
def clear_session(user_id):
    try:
        from src.models.chatbot_engine import MentalHealthChatbot
        chatbot = MentalHealthChatbot()
        chatbot.clear_conversation_history(user_id)
        
        if user_id in chat_service.active_sessions:
            del chat_service.active_sessions[user_id]
            
        return jsonify({'message': 'Session cleared successfully'})
    except Exception as e:
        logger.error(f"Session clear error: {str(e)}")
        return jsonify({'error': 'Session clear failed'}), 500