/// <reference types="node" />

export const firebaseConfig = {
  projectId: (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project") as string,
  appId: (process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456") as string,
  apiKey: (process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForFrontendDisplayOnly0") as string,
  authDomain: (process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com") as string,
  measurementId: (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "") as string,
  messagingSenderId: (process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890") as string
};
