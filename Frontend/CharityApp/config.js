import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyDW1X5WGzKRR-L2WRXnaOTe80jRsRU_uJY",
    authDomain: "charity-app-9a8ed.firebaseapp.com",
    projectId: "charity-app-9a8ed",
    storageBucket: "charity-app-9a8ed.appspot.com",
    messagingSenderId: "403380094991",
    appId: "1:403380094991:web:1972fd69bc63006a5f3b7a",
    measurementId: "G-56PBH83EGZ",
    databaseURL: 'https://charity-app-9a8ed-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

if (!firebaseConfig.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase}

