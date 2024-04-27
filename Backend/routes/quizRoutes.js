const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/', async (req, res) => {
    try {
      
      const { level, time, numberOfQuestions, facultyId, subjectId, totalMarks } = req.body;
      
      // Create new quiz document
      const newQuizRef = await db.collection('quizzes').add({
        level,
        time,
        numberOfQuestions,
        facultyId,
        subjectId,
        totalMarks,
      });
      res.status(201).json({ message: 'Quiz created successfully', quizId: newQuizRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create quiz', message: error.message });
    }
  });

module.exports = router;
