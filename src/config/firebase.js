import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export default firestore;