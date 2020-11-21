import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBJF6P-jXLgZo7yGyC_tgDiSh0aDS9p0GU",
  authDomain: "instagram-clone-react-6339d.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-6339d.firebaseio.com",
  projectId: "instagram-clone-react-6339d",
  storageBucket: "instagram-clone-react-6339d.appspot.com",
  messagingSenderId: "406249205746",
  appId: "1:406249205746:web:5ad35d2eaab3c9a84d856b",
  measurementId: "G-0XZBHBM1LC",
});

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const db = firebaseApp.firestore();
const storage = firebase.storage();

export { db, storage };
