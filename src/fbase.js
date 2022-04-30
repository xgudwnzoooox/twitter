//import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC92q8xG5_aHg94aEJevQPVy5oSu37n8GM",
  authDomain: "twitter-e3a6c.firebaseapp.com",
  projectId: "twitter-e3a6c",
  storageBucket: "twitter-e3a6c.appspot.com",
  messagingSenderId: "173994890848",
  appId: "1:173994890848:web:eeea069505ff0a78621505"
};

// Initialize Firebase
//export const app = initializeApp(firebaseConfig);


const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();