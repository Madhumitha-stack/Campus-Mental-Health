const express = require('express');
const chatbotController = require('../controllers/chatbotController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/message', auth, chatbotController.processMessage);
router.get('/history', auth, chatbotController.getConversationHistory);

module.exports = router;