import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Your Firebase config from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBcQ72kxcNL3Ts70W9fzvCHWCZ6QRvHdXQ",
    authDomain: "medicheckf-3fdec.firebaseapp.com",
    projectId: "medicheckf-3fdec",
    storageBucket: "medicheckf-3fdec.firebasestorage.app",
    messagingSenderId: "250853813007",
    appId: "1:250853813007:web:d75953a90a808dd4486c7a",
    measurementId: "G-L9PTKEN06Y"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword};
