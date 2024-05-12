const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/', async (req, res) => {
    try {
      
      const { name, level, time, numberOfQuestions,reattempt,facultyId, subjectId, totalMarks } = req.body;
      const newQuizRef = await db.collection('quizzes').add({
        name,
        level,
        time,
        numberOfQuestions,
        reattempt,
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
