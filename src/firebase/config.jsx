import { initializeApp } from 'firebase/app';
import {Firestore, getFirestore} from 'firebase/firestore'
import 'firebase/storage'
import { getStorage,ref } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAcZ4nfZZH-_cyx1OYiOndQu_PXXgdgX5I",
  authDomain: "olx-demo-2ef8e.firebaseapp.com",
  projectId: "olx-demo-2ef8e",
  storageBucket: "olx-demo-2ef8e.appspot.com",
  messagingSenderId: "114463994278",
  appId: "1:114463994278:web:21202c4a67c462173f1f67",
  measurementId: "G-TNEHR37QWR"
};

const firebase=initializeApp(firebaseConfig)
const db = getFirestore(firebase)
const storage = getStorage(firebase)
export{firebase,db,storage}