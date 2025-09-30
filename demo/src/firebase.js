
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC5qjtOOspeYWeVuf8T-Qr1rcsJ-kPr21Q",
  authDomain: "evaluation3-2bc66.firebaseapp.com",
  projectId: "evaluation3-2bc66",
  storageBucket: "evaluation3-2bc66.firebasestorage.app",
  messagingSenderId: "374932392921",
  appId: "1:374932392921:web:59bb5db119b9445dd3e7c8",
  measurementId: "G-LP0W3T0VLX"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const provider = new GoogleAuthProvider();

export { auth  , provider };

