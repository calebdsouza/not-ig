import Firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/storage';

const FireApp = Firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PRODJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export default FireApp;
export const FireAuth = FireApp.auth();
export const FireStorage = FireApp.storage(`gs://${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/`);
