const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/', async (req, res) => {
    try {
      const { id, password } = req.body;
      if (!id || !password) {
        return res.status(400).json({ error: 'ID and password are required' });
      }
      
      const userSnapshot = await db.collection('Faculty').doc(id).get();
      if (!userSnapshot.exists) {
        return res.status(404).json({ error: 'User not found' });
      }
      const userData = userSnapshot.data();
      if (userData.Password !== password) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      res.json({ message: 'Login successful', user: userData });
    } catch (error) {
      console.error('Error authenticating user:', error);
      res.status(500).json({ error: 'Failed to authenticate user' });
    }
  });

module.exports = router;
