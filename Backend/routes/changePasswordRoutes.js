const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/', async (req, res) => {
    const { id,userRole, current_password, new_password } = req.body;

    try {
        let collectionName;
        if (userRole === 'student') {
            collectionName = 'Student';
        } else if (userRole === 'faculty') {
            collectionName = 'Faculty';
        } else {
            return res.status(400).json({ error: 'Invalid user role' });
        }
        const studentRef = db.collection(collectionName).doc(id);
        const studentDoc = await studentRef.get();
        if (!studentDoc.exists) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const studentData = studentDoc.data();
        if (studentData.password !== current_password) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }
        await studentRef.update({ password: new_password });
        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
