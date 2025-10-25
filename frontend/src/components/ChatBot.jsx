import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle } from 'lucide-react';
import { chatbotService } from "../services/chatbotServices";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [crisisAlert, setCrisisAlert] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm here to listen and support you. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'greeting'
      }
    ]);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatbotService.sendMessage(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response.response.text,
        sender: 'bot',
        timestamp: new Date(),
        type: response.response.type,
        urgent: response.response.urgent,
        resources: response.response.resources
      };

      setMessages(prev => [...prev, botMessage]);

      // Handle crisis alerts
      if (response.analysis.crisisDetected) {
        setCrisisAlert({
          level: response.analysis.level,
          message: response.response.text,
          resources: response.response.resources
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble responding right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const closeCrisisAlert = () => {
    setCrisisAlert(null);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg">
      {/* Crisis Alert */}
      {crisisAlert && (
        <div className={`p-4 border-l-4 ${
          crisisAlert.level === 'critical' 
            ? 'bg-red-50 border-red-500' 
            : 'bg-yellow-50 border-yellow-500'
        }`}>
          <div className="flex items-start">
            <AlertTriangle className={`w-5 h-5 mt-0.5 mr-3 ${
              crisisAlert.level === 'critical' ? 'text-red-500' : 'text-yellow-500'
            }`} />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Important Notice</h3>
              <p className="text-sm text-gray-700 mt-1">{crisisAlert.message}</p>
              {crisisAlert.resources && crisisAlert.resources.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-900">Emergency Resources:</p>
                  <ul className="text-sm text-gray-700 mt-1 list-disc list-inside">
                    {crisisAlert.resources.map((resource, index) => (
                      <li key={index}>{resource.name}: {resource.number}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button
              onClick={closeCrisisAlert}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-primary-600 text-white rounded-br-none'
                  : message.urgent
                  ? 'bg-red-100 text-red-900 border border-red-300'
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'bot' && (
                  <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm">{message.text}</p>
                  {message.resources && message.resources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-xs font-semibold mb-1">Resources:</p>
                      {message.resources.map((resource, index) => (
                        <div key={index} className="text-xs">
                          <strong>{resource.name}:</strong> {resource.number}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {message.sender === 'user' && (
                  <User className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs opacity-70 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 input-field"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This chat is anonymous and secure. In crisis situations, please contact emergency services.
        </p>
      </form>
    </div>
  );
};

export default ChatBot;