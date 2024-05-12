const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/', async (req, res) => {
    try {
      const { quizId, questionNumber, question, option1, option2, option3, option4, correctAnswer, mark } = req.body;
      await db.collection('questions').add({
        quizId,
        questionNumber,
        question,
        option1,
        option2,
        option3,
        option4,
        correctAnswer,
        mark,
      });
  
      res.status(201).json({ message: 'Question created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create question', message: error.message });
    }
  });

module.exports = router;
