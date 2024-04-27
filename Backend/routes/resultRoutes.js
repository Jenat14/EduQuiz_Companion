const express = require('express');
const router = express.Router();
const { db } = require('../firebase');


router.post('/', async (req, res) => {
    try {
      const { studentId, quizId, score, timestamp, timeTaken } = req.body;
      
      await db.collection('results').add({
        studentId,
        quizId,
        score,
        timestamp,
        timeTaken,
      });
  
      res.status(201).json({ message: 'Result created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create result', message: error.message });
    }
  });

module.exports = router;
