import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC6mtfRIQVRTd1ozBrc8EvLwtTw7hBo88s",
    authDomain: "chatgpt-messanger-137b2.firebaseapp.com",
    projectId: "chatgpt-messanger-137b2",
    storageBucket: "chatgpt-messanger-137b2.appspot.com",
    messagingSenderId: "986445231259",
    appId: "1:986445231259:web:bf18ac63c993928f08823e"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}