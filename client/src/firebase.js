// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-90ea6.firebaseapp.com",
  projectId: "mern-auth-90ea6",
  storageBucket: "mern-auth-90ea6.appspot.com",
  messagingSenderId: "505645098033",
  appId: "1:505645098033:web:5d57e49e0d7e50ce1c6110",
};

// Initialize Firebase
export const firebasApp = initializeApp(firebaseConfig);
