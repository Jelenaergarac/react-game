import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyDeKZ85qiN-l6AAcC6vT9nLm7OhWlj0Rj4",
  authDomain: "game-app-7d512.firebaseapp.com",
  projectId: "game-app-7d512",
  storageBucket: "game-app-7d512.appspot.com",
  messagingSenderId: "1030426381277",
  appId: "1:1030426381277:web:292099f7146e237e680434",
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {db, provider, auth}
