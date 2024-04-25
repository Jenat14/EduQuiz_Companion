

// Authenticate a student (for example, during login)
async function authenticateStudent(username, password) {
  try {
    // Authenticate the student using their username and password
    const userRecord = await admin.auth().getUserByUsername(username);
    // You can compare the provided password with the stored hashed password from the userRecord
    // If authentication is successful, return the user record
    return userRecord;
  } catch (error) {
    // Handle authentication errors
    throw error;
  }
}

// Retrieve student data
async function getStudentData(username) {
  try {
    // Retrieve the student data from the database based on the username
    const studentSnapshot = await admin.database().ref(`/students/${username}`).once('value');
    // Extract and return the student data
    return studentSnapshot.val();
  } catch (error) {
    // Handle errors
    throw error;
  }
}

module.exports = {
  authenticateStudent,
  getStudentData
};
