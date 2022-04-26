// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNjSBQJt18E6k6eUVLZfG_TVHOUEVrSRk",
  authDomain: "taller2bnp.firebaseapp.com",
  projectId: "taller2bnp",
  storageBucket: "taller2bnp.appspot.com",
  messagingSenderId: "563014987903",
  appId: "1:563014987903:web:15b67f465ba7e6f67d8f4a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}