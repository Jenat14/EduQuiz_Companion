const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const resultRoutes = require('./routes/resultRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount route handlers
app.use('/api', studentRoutes);
app.use('/facultylogin', facultyRoutes);
app.use('/quiz', quizRoutes);
app.use('/question', questionRoutes);
app.use('/result', resultRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Hello hi, Express.js Server!</h1>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
