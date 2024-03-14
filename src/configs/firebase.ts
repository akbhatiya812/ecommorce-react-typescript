import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWUI4r8II3Ak_gq1IoMGf9A926bZxlrWY",
  authDomain: "archittam-ccce6.firebaseapp.com",
  projectId: "archittam-ccce6",
  storageBucket: "archittam-ccce6.appspot.com",
  messagingSenderId: "100257831745",
  appId: "1:100257831745:web:480960c57d1f14bac09fc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db,auth};