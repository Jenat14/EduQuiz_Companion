const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.get('/name', async (req, res) => {
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

router.post('/add', async (req, res) => {
    try {
        let { id, Name, imageUrl } = req.body;
        Name = Name.toString();
        await db.collection('Subject').doc(id).set({
            Name,
            imageUrl
        });

        res.status(201).json({ message: 'Subject entry created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create subject entry', message: error.message });
    }
});

module.exports = router;
