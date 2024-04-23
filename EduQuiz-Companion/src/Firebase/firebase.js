// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvwccDtOwsxKGje_f6hJGkDfTLbia1KBA",
  authDomain: "eduquiz-companion.firebaseapp.com",
  projectId: "eduquiz-companion",
  storageBucket: "eduquiz-companion.appspot.com",
  messagingSenderId: "166603197305",
  appId: "1:166603197305:web:b2ef4ba5873770395d7da8",
  measurementId: "G-BJM0WC6CZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);



