const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.get('/', async (req, res) => {
    try {
        let { quizId } = req.query;
        if (!quizId) {
            return res.status(400).json({ error: 'Missing quizId parameter' });
        }
        const resultsSnapshot = await db.collection('results')
        .where('quizId', '==', quizId)
        .get();
        const resultsData = resultsSnapshot.docs.map(doc => doc.data());

        // Sort the data based on score and timestamp
        resultsData.sort((a, b) => {
            if (a.score !== b.score) {
                return b.score - a.score; // Descending order of score
            } else {
                return new Date(a.timestamp) - new Date(b.timestamp); // Ascending order of timestamp
            }
        });
        const leaderboard = await Promise.all(resultsData.map(async result => {
            const studentDoc = await db.collection('Student').doc(result.studentId).get();
            
            const studentData = studentDoc.data();
            return {
                studentName: studentData.Name, 
                score: result.score,
                timeTaken: result.timeTaken
            };
        }));
        res.json({ leaderboard });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

module.exports = router;
