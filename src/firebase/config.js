import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBGTUkE9PGKR-Wj7KoKxzr_13vCCxJqR6Q",
    authDomain: "notion-inspired.firebaseapp.com",
    projectId: "notion-inspired",
    storageBucket: "notion-inspired.appspot.com",
    messagingSenderId: "622644706136",
    appId: "1:622644706136:web:bdbe60899ddf79656c032d"
};

//initialize firebase
initializeApp(firebaseConfig);

//initialize firestore
const db = getFirestore();
//initialize auth
const auth = getAuth();

export {db, auth};