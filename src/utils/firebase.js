import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Your Firebase config from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCyfTSKJ1ZsTbdvWkIPekJrdp8VjG7YlCg",
    authDomain: "medicheck-4ab95.firebaseapp.com",
    projectId: "medicheck-4ab95",
    storageBucket: "medicheck-4ab95.appspot.com",
    messagingSenderId: "388747719771",
    appId: "1:388747719771:web:755798c184858c80d3fb7e",
    measurementId: "G-Q3SFNRTTYT"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
