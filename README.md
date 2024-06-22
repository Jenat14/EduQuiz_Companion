
# EDUQUIZ COMPANION

## Overview
EDUQUIZ COMPANION is a web-based educational quiz platform specifically designed for B.Tech students in Computer Science and Engineering. The platform addresses the need for centralized assessment, revision tools, and personalized learning experiences, thereby enhancing academic progress and proficiency.

## Features

### Frontend
- **Quiz Interface**: Intuitive and interactive interface for students to take quizzes. Monitors tab shifts during quizzes and alerts users.
- **Result Calculation**: Automatically calculates results after quiz completion and presents them to the user.
- **Leaderboard**: Displays student rankings for each quiz and provides detailed statistics for faculty.
- **Quiz Creation**: Faculty can upload quizzes using an Excel template, which is converted to JSON and transferred to the backend.
- **Add New Subject**: Allows the addition of new subject names and generates subject IDs, which are then sent to the backend.

### Backend
- **Login**: Authenticates users by comparing submitted credentials with stored values.
- **New Subject Route**: Adds new subjects to the database with ID, name, and image location.
- **Result Table Updation**: Manages creation and updating of quiz results, updating scores if the current score is higher, and tracking the number of attempts.
- **Quiz Addition Route**: Creates new quizzes and adds questions to the database with relevant parameters.
- **Leaderboard Route**: Fetches and sorts quiz results to generate a leaderboard.
- **Change Password Route**: Allows users to update their passwords after verifying the current one.

### Database Setup
- **Firebase**: Used for its scalability and real-time capabilities.
  - **Collections**: Student, faculty, quiz, question, subject, and result entities.
  - **Firebase Admin SDK**: Establishes a secure connection between the backend and Firebase services.
  - **Firebase Console**: Used for monitoring database operations, managing data, and troubleshooting issues.

### Chatbot Integration
- **Gemini AI**: Integrated for advanced natural language processing capabilities.
  - **Google API**: Connects the backend to Gemini AI for seamless communication.
  - **Frontend**: Facilitates user interaction with the chatbot.
  - **Backend**: Forwards user queries to Gemini AI API and processes responses.

## Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)
- Firebase account
- Google API access for Gemini AI

### Steps
1. **Clone the repository**:
   ```sh
   git clone https://github.com/abitha0020/Eduquiz-companion.git
   cd Eduquiz-companion
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up Firebase**:
   - Create a Firebase project and configure the Firebase Admin SDK.
   - Update your Firebase configuration in the project.

4. **Configure Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add necessary environment variables (e.g., Firebase credentials, API keys).

5. **Run the application**:
   ```sh
   npm start
   ```

## Usage
- **Frontend**: Accessible at `http://localhost:3000`.
- **Backend**: API endpoints available at `http://localhost:5000`.

