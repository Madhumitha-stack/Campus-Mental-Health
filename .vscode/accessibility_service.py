import speech_recognition as sr
import pyttsx3
import logging

class AccessibilityService:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.tts_engine = pyttsx3.init()
        self.logger = logging.getLogger(__name__)
        
        # Configure TTS
        self.tts_engine.setProperty('rate', 150)
        self.tts_engine.setProperty('volume', 0.8)
    
    def text_to_speech(self, text: str):
        """Convert text to speech"""
        try:
            self.tts_engine.say(text)
            self.tts_engine.runAndWait()
            return {'status': 'success', 'text_length': len(text)}
        except Exception as e:
            self.logger.error(f"TTS error: {str(e)}")
            return {'status': 'error', 'error': str(e)}
    
    def speech_to_text(self, audio_file_path: str = None):
        """Convert speech to text"""
        try:
            if audio_file_path:
                with sr.AudioFile(audio_file_path) as source:
                    audio = self.recognizer.record(source)
            else:
                # Use microphone
                with sr.Microphone() as source:
                    self.recognizer.adjust_for_ambient_noise(source)
                    audio = self.recognizer.listen(source)
            
            text = self.recognizer.recognize_google(audio)
            return {'status': 'success', 'text': text}
            
        except sr.UnknownValueError:
            return {'status': 'error', 'error': 'Could not understand audio'}
        except sr.RequestError as e:
            return {'status': 'error', 'error': f'Speech recognition error: {e}'}
        except Exception as e:
            self.logger.error(f"Speech to text error: {str(e)}")
            return {'status': 'error', 'error': str(e)}
    
    def get_voice_settings(self):
        """Get current voice settings"""
        voices = self.tts_engine.getProperty('voices')
        return {
            'rate': self.tts_engine.getProperty('rate'),
            'volume': self.tts_engine.getProperty('volume'),
            'available_voices': [voice.id for voice in voices]
        }
    
    def update_voice_settings(self, rate: int = None, volume: float = None, voice_id: str = None):
        """Update voice settings"""
        try:
            if rate:
                self.tts_engine.setProperty('rate', rate)
            if volume:
                self.tts_engine.setProperty('volume', volume)
            if voice_id:
                self.tts_engine.setProperty('voice', voice_id)
            
            return {'status': 'success', 'message': 'Voice settings updated'}
        except Exception as e:
            self.logger.error(f"Voice settings update error: {str(e)}")
            return {'status': 'error', 'error': str(e)}