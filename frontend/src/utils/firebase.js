import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexai-fb281.firebaseapp.com",
  projectId: "cortexai-fb281",
  storageBucket: "cortexai-fb281.firebasestorage.app",
  messagingSenderId: "160799648008",
  appId: "1:160799648008:web:3a2c0e9fa30f6abd7d24bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
