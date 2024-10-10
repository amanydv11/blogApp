// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-12add.firebaseapp.com",
  projectId: "blog-app-12add",
  storageBucket: "blog-app-12add.appspot.com",
  messagingSenderId: "61652573535",
  appId: "1:61652573535:web:67c7f58ad3384234fdeaea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);