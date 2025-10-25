const express = require('express');
const { 
  createMoodEntry, 
  getMoodEntries, 
  getMoodStats, 
  deleteMoodEntry 
} = require('../controllers/moodController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/entries', auth, createMoodEntry);
router.get('/entries', auth, getMoodEntries);
router.get('/stats', auth, getMoodStats);
router.delete('/entries/:id', auth, deleteMoodEntry);

module.exports = router;