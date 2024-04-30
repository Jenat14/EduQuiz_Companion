const express = require('express');
const router = express.Router();
const { db } = require('../firebase');
router.get('/quizd', async (req, res) => {
    const { subjectId, level, name } = req.query;
    let levelnum =parseInt(level);
    try {
        // Query Firestore to retrieve the quiz details
        const quizSnapshot = await db.collection('quizzes')
            .where('subjectId', '==', subjectId)
            .where('level', '==', levelnum)
            .where('name', '==', name)
            .get();

        // Check if any quizzes were found
        if (quizSnapshot.empty) {
            return res.status(404).json({ message: 'No quizzes found with the provided details.' });
        }

        // Assuming there's only one quiz with the provided details
        const quizData = quizSnapshot.docs[0].data();
        const quizId = quizSnapshot.docs[0].id;

        // Return the quiz details along with the quiz ID
        return res.status(200).json({ id: quizId, ...quizData });
    } catch (error) {
        console.error('Error retrieving quiz details:', error);
        return res.status(500).json({ error: 'An error occurred while fetching quiz details.' });
    }
});

module.exports = router;