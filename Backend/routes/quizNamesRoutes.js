const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/', async (req, res) => {
    try {
        let { subjectId, level } = req.body;
        let levelNumber = parseInt(level);
        subjectId = subjectId.toString();
        if (!subjectId || typeof subjectId !== 'string' || isNaN(levelNumber)) {
            return res.status(400).json({ error: 'Invalid input parameters' });
        }
        const quizSnapshot = await db.collection('quizzes')
            .where('subjectId', '==', subjectId)
            .where('level', '==', levelNumber)
            .get();
        if (quizSnapshot.empty) {
            return res.status(404).json({ error: 'No quizzes found for the given subject and level' });
        }
        const quizNames = quizSnapshot.docs.map(doc => doc.data().name);
        res.json({ quizNames });
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
});

module.exports = router;
