const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/', async (req, res) => {
    try {
        let { subjectId, level, studentId } = req.body;
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
        const quizResults = [];
        for (const doc of quizSnapshot.docs) {
            const quizData = doc.data();
            const quizId = doc.id;

            const { name, numberOfQuestions, time,reattempt } = quizData;

            const resultSnapshot = await db.collection('results')
                .where('studentId', '==', studentId)
                .where('quizId', '==', quizId)
                .get();

            let score = null;
            let noofattempts = null;

            if (!resultSnapshot.empty) {
                const resultData = resultSnapshot.docs[0].data();
                score = resultData.score;
                noofattempts = resultData.noofattempts;
            }

            quizResults.push({
                quizId,
                name,
                numberOfQuestions,
                reattempt,
                time,
                score,
                noofattempts
            });
        }
        res.json({ quizResults });
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
});

module.exports = router;
