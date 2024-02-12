// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import FirebaseConfig from "../model/FirebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyDFJ9EbeiOuEW3UZSWAYN55V-WqsmMiefQ",
    authDomain: "exo6-react-native.firebaseapp.com",
    projectId: "exo6-react-native",
    storageBucket: "exo6-react-native.appspot.com",
    messagingSenderId: "247230646401",
    appId: "1:247230646401:web:a5d0a42baa1e2781db2580",
    measurementId: "G-2VT6TQ6XCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
