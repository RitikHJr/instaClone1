import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRwM0DIn7tG7YcewY9e-fepmd2xbOY_ec",
  authDomain: "insta-3c429.firebaseapp.com",
  projectId: "insta-3c429",
  storageBucket: "insta-3c429.appspot.com",
  messagingSenderId: "136030434457",
  appId: "1:136030434457:web:72a6bf281761076cab3408",
  measurementId: "G-EPFRNDVFNP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
