const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/', async (req, res) => {
    try {
        const { studentId, quizId, score, timestamp, timeTaken } = req.body;
        let noofattempts=1;
        const querySnapshot = await db.collection('results')
            .where('studentId', '==', studentId)
            .where('quizId', '==', quizId)
            .get();

        if (!querySnapshot.empty) {
            
            const existingResult = querySnapshot.docs[0].data();
            noofattempts=existingResult.noofattempts+1;
            if (score > existingResult.score) {
                await db.collection('results')
                    .doc(querySnapshot.docs[0].id)
                    .update({
                        score,
                        timestamp,
                        timeTaken,
                        noofattempts
                    });
                res.status(200).json({ message: 'Result updated successfully' });
            } else {
                await db.collection('results')
                    .doc(querySnapshot.docs[0].id)
                    .update({
                        noofattempts
                    });
                res.status(200).json({ message: 'Score is not greater, noofattempts updated needed' });
            }
        } else {
            await db.collection('results').add({
                studentId,
                quizId,
                score,
                timestamp,
                timeTaken,
                noofattempts
            });
            res.status(201).json({ message: 'Result created successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to create/update result', message: error.message });
    }
});

module.exports = router;
