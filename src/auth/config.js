// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9fJwB4tZitury53sV5yv3H5PEQJGHCs8",
  authDomain: "g-gallery-9cbf8.firebaseapp.com",
  projectId: "g-gallery-9cbf8",
  storageBucket: "g-gallery-9cbf8.appspot.com",
  messagingSenderId: "590737990368",
  appId: "1:590737990368:web:00957a10e1a1c327cbe685",
  measurementId: "G-Q883WSRYV4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = app.storage();
