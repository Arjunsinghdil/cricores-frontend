import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Production Guideline: Use environment variables for sensitive configuration.
// For Expo, prefix variables with EXPO_PUBLIC_ to make them available in the bundle.
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "cricores-app.firebaseapp.com",
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "cricores-app",
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "cricores-app.appspot.com",
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
