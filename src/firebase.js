// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEbbbf68w3NZfrJmoLbT_shIpIf667NaY",
  authDomain: "roadsafety-e83ac.firebaseapp.com",
  projectId: "roadsafety-e83ac",
  storageBucket: "roadsafety-e83ac.appspot.com",
  messagingSenderId: "697629854281",
  appId: "1:697629854281:web:e0d4622c70ee24a9c84d98",
  measurementId: "G-BWHRWCKHDP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
// export default app;
