const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/', async (req, res) => {
  try {
    const { quizId } = req.body;

    if (!quizId) {
      return res.status(400).json({ error: 'Quiz ID is required' });
    }

    const batch = db.batch();

    // Delete all questions associated with the quiz
    const questionsSnapshot = await db.collection('questions').where('quizId', '==', quizId).get();
    questionsSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete the quiz itself
    await db.collection('quizzes').doc(quizId).delete();

    // Commit the batched write operation
    await batch.commit();

    res.status(200).json({ message: 'Quiz and associated questions deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz and questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
