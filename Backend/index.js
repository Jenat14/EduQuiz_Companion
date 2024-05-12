const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const quizdataRoutes = require('./routes/quizdataRoutes');
const quizNamesRoutes = require('./routes/quizNamesRoutes');
const resultUpdatedRoutes = require('./routes/resultupdatedRoutes');
const quizDetailsRoutes =require('./routes/quizdetailsRoutes');
const leaderboardRoutes =require('./routes/leaderboardRoutes');
const deleteRoutes =require('./routes/deleteRoutes');
const chatbotRoutes =require('./routes/chatbotRoutes');
const changePasswordRoutes= require('./routes/changePasswordRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', studentRoutes);
app.use('/facultylogin', facultyRoutes);
app.use('/quiz', quizRoutes);
app.use('/question', questionRoutes);
app.use('/subject', subjectRoutes);
app.use('/quizdata', quizdataRoutes);
app.use('/quizName', quizNamesRoutes);
app.use('/resultUpdatedRoutes', resultUpdatedRoutes);
app.use('/quizDetailsRoutes', quizDetailsRoutes);
app.use('/leaderboardRoutes', leaderboardRoutes);
app.use('/delete', deleteRoutes);
app.use('/chatbot', chatbotRoutes);
app.use('/changePassword',changePasswordRoutes)

app.get('/', (req, res) => {
  res.send('<h1>Hello hi, Express.js Server!</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
