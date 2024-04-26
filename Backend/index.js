const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./Firebase/service-account.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: '"https://my-project-EduQuiz-Companion.firebasedatabase.app"' // Replace with your Firebase database URL
});

// Get a reference to the Firebase database
const db = admin.firestore();

// Define a route to fetch data from the "student" collection
app.get('/student', async (req, res) => {
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
app.use(express.json());


app.post('/login', async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id || !password) {
      return res.status(400).json({ error: 'ID and password are required' });
    }
    // Query the database for the user with the provided ID
    const userSnapshot = await db.collection('Student').doc(id).get();
    if (!userSnapshot.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userData = userSnapshot.data();
    // Check if the provided password matches the stored password
    if (userData.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    // If authentication is successful, send a success response
    res.json({ message: 'Login successful', user: userData });
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Failed to authenticate user' });
  }
});
app.post('/facultylogin', async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id || !password) {
      return res.status(400).json({ error: 'ID and password are required' });
    }
    // Query the database for the user with the provided ID
    const userSnapshot = await db.collection('Faculty').doc(id).get();
    if (!userSnapshot.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userData = userSnapshot.data();
    // Check if the provided password matches the stored password
    if (userData.Password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    // If authentication is successful, send a success response
    res.json({ message: 'Login successful', user: userData });
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Failed to authenticate user' });
  }
});

// Example defining a route in Express
app.get('/', (req, res) => {
  res.send('<h1>Hello hi, Express.js Server!</h1>');
});

/*
app.use("/auth",authROute)

auth.routes.js
app.get(/logn, getStudentData)
app.)
*/

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
