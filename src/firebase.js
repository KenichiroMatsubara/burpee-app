import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite"
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBwpwDw3do_ydxn6zxtihkRssdEHTMafhI",
    authDomain: "burpee-app.firebaseapp.com",
    projectId: "burpee-app",
    storageBucket: "burpee-app.appspot.com",
    messagingSenderId: "993649879263",
    appId: "1:993649879263:web:2b94a88956823003b0616a",
    measurementId: "G-CPR2PSE2JL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const analytics = getAnalytics(app);

export {auth,db,provider};