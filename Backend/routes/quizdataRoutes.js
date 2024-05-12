const express = require('express');
const router = express.Router();
const { db } = require('../firebase');
router.get('/quizd', async (req, res) => {
    const { subjectId, level, name } = req.query;
    let levelnum =parseInt(level);
    try {
        const quizSnapshot = await db.collection('quizzes')
            .where('subjectId', '==', subjectId)
            .where('level', '==', levelnum)
            .where('name', '==', name)
            .get();
        if (quizSnapshot.empty) {
            return res.status(404).json({ message: 'No quizzes found with the provided details.' });
        }
        const quizData = quizSnapshot.docs[0].data();
        const quizId = quizSnapshot.docs[0].id;
        return res.status(200).json({ id: quizId, ...quizData });
    } catch (error) {
        console.error('Error retrieving quiz details:', error);
        return res.status(500).json({ error: 'An error occurred while fetching quiz details.' });
    }
});
router.post('/questions', async (req, res) => {
    try {
        const { quizId } = req.body;
        if (!quizId || typeof quizId !== 'string') {
            return res.status(400).json({ error: 'Invalid input parameter: quizId' });
        }
        const questionsSnapshot = await db.collection('questions')
            .where('quizId', '==', quizId)
            .get();
        if (questionsSnapshot.empty) {
            return res.status(404).json({ error: 'No questions found for the given quiz ID' });
        }
        const questions = questionsSnapshot.docs.map(doc => doc.data());
        res.json({ questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});
module.exports = router;