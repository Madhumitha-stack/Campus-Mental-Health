import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

class TextProcessor:
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
        self.lemmatizer = WordNetLemmatizer()
    
    def preprocess_text(self, text: str) -> str:
        """Preprocess text for analysis"""
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Remove stopwords and lemmatize
        processed_tokens = [
            self.lemmatizer.lemmatize(token) 
            for token in tokens 
            if token not in self.stop_words and len(token) > 2
        ]
        
        return ' '.join(processed_tokens)
    
    def extract_key_phrases(self, text: str, top_n: int = 5) -> list:
        """Extract key phrases from text"""
        processed_text = self.preprocess_text(text)
        words = processed_text.split()
        
        # Simple frequency-based approach
        from collections import Counter
        word_freq = Counter(words)
        
        return [word for word, count in word_freq.most_common(top_n)]
    
    def calculate_readability(self, text: str) -> float:
        """Calculate text readability score"""
        sentences = text.split('.')
        words = text.split()
        
        if len(sentences) == 0 or len(words) == 0:
            return 0
        
        avg_sentence_length = len(words) / len(sentences)
        avg_word_length = sum(len(word) for word in words) / len(words)
        
        # Simple readability score (lower is easier to read)
        readability_score = (avg_sentence_length * 0.4) + (avg_word_length * 0.6)
        return readability_score