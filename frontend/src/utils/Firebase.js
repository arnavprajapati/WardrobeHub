// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "shoptrack-d0da3.firebaseapp.com",
    projectId: "shoptrack-d0da3",
    storageBucket: "shoptrack-d0da3.firebasestorage.app",
    messagingSenderId: "466082297451",
    appId: "1:466082297451:web:47f3491c17fe13bbeca32e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}
