const admin = require('firebase-admin');
const serviceAccount = require('./Firebase/service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my-project-EduQuiz-Companion.firebasedatabase.app' 
});

const db = admin.firestore();

module.exports = { db };
