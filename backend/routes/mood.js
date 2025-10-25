import express from 'express';
import { logMood, getMoodHistory } from '../controllers/moodController.js';

const router = express.Router();

router.post('/log', logMood);
router.get('/history', getMoodHistory);

export default router;