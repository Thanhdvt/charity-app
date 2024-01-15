import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyDMchEmbrBR69MGGOswDK_YqbqOENHsUtg",
    authDomain: "charity-70c6d.firebaseapp.com",
    databaseURL: "https://charity-70c6d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "charity-70c6d",
    storageBucket: "charity-70c6d.appspot.com",
    messagingSenderId: "582471099265",
    appId: "1:582471099265:web:6b1b3cb36b51b8eab2be80",
    measurementId: "G-HZ9XK0H432"
};

if (!firebaseConfig.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase}

