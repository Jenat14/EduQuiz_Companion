const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.get('/', async (req, res) => {
    try {
        const id = req.query.id.toString(); // Retrieve subject ID from query parameters
        if (!id  || typeof id !== 'string') {
            return res.status(400).json({ error: 'Subject ID is required' });
        }
        const subjectSnapshot = await db.collection('Subject').doc(id).get();
        if (!subjectSnapshot.exists) {
            return res.status(404).json({ error: 'Subject not found' });
        }
        const subjectData = subjectSnapshot.data();
        res.json({ name: subjectData.Name});
    } catch (error) {
        console.error('Error fetching subject:', error);
        res.status(500).json({ error: 'Failed to fetch subject' });
    }
});

module.exports = router;
