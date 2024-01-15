// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/storage";
// import { getStorage } from "firebase/storage";
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCgQzKzlWPeOLlsNNJzL2Fty_3xZm_9Fw",
  authDomain: "business-app-firebase-ef09e.firebaseapp.com",
  projectId: "business-app-firebase-ef09e",
  storageBucket: "business-app-firebase-ef09e.appspot.com",
  messagingSenderId: "388106220721",
  appId: "1:388106220721:web:76acbd91b4d61c0e929e90",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const firebaseStorage = getStorage(app);


firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };

