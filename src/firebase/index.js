// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyCvILfBHFhc1Bi-MXuBzVPrV0ItIrRa94E",
    authDomain: "react-tasklist-a50eb.firebaseapp.com",
    projectId: "react-tasklist-a50eb",
    storageBucket: "react-tasklist-a50eb.appspot.com",
    messagingSenderId: "199425101198",
    appId: "1:199425101198:web:f61a9f193eaf74a064e8df"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore();