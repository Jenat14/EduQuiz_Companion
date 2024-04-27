const express = require('express');
const router = express.Router(); // Create a router object
const { db } = require('../firebase');

router.get('/student', async (req, res) => {
  try {
    const studentsSnapshot = await db.collection('Student').get();
    const students = [];
    studentsSnapshot.forEach(doc => {
      students.push({
        id: doc.id,
        data: doc.data()
      });
    });
    res.json(students);
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id || !password) {
      return res.status(400).json({ error: 'ID and password are required' });
    }
    
    const userSnapshot = await db.collection('Student').doc(id).get();
    if (!userSnapshot.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userData = userSnapshot.data();
    if (userData.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
   
    res.json({ message: 'Login successful', user: userData });
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Failed to authenticate user' });
  }
});

module.exports = router; // Export the router object
