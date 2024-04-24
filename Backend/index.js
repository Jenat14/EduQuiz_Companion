// Example using Express.js
const express = require('express');
const app = express();
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('../Firebase/service-account.json'); // Path to your service account key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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

// Example specifying the port and starting the server
const port = process.env.PORT || 3000; // You can use environment variables for port configuration
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});