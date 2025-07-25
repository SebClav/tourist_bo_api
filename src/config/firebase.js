import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfD7-GW5WjbHd2xqWVXa1ycJ6JA8YSkSc",
  authDomain: "tourism-bo.firebaseapp.com",
  projectId: "tourism-bo",
  storageBucket: "tourism-bo.firebasestorage.app",
  messagingSenderId: "800796013293",
  appId: "1:800796013293:web:54ba51895a7e1a972712e4"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export default firestore;