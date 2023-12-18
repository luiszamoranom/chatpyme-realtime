// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmga3tkLsbC0ZKS4ooeHVof661FMNDKJs",
  authDomain: "distribuidos-chat.firebaseapp.com",
  projectId: "distribuidos-chat",
  storageBucket: "distribuidos-chat.appspot.com",
  messagingSenderId: "124935214501",
  appId: "1:124935214501:web:0d9399b37e255821f8444c",
  measurementId: "G-PEKKQRC25Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);