// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4e8monPoNry-IBzFy2U2lQ0oR8cvmRT8",
  authDomain: "belu-cart.firebaseapp.com",
  projectId: "belu-cart",
  storageBucket: "belu-cart.appspot.com",
  messagingSenderId: "931870046396",
  appId: "1:931870046396:web:d8b2b57c307c08959ab8b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();