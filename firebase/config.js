import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsgXXhEtmx5kEZaHFyIkk6lw5J7EILZvs",
  authDomain: "rn-social-e736b.firebaseapp.com",
  projectId: "rn-social-e736b",
  storageBucket: "rn-social-e736b.appspot.com",
  messagingSenderId: "474078737619",
  appId: "1:474078737619:web:14b186ceae717526a25026",
};

const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
