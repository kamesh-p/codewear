
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAegnz7rFJV3LFLGOBFGiMgAwnli7EeRYQ",
  authDomain: "codewear-d4a3e.firebaseapp.com",
  databaseURL: "https://codewear-d4a3e-default-rtdb.firebaseio.com",
  projectId: "codewear-d4a3e",
  storageBucket: "codewear-d4a3e.appspot.com",
  messagingSenderId: "179392442084",
  appId: "1:179392442084:web:cfafc411f5e36e563ac6f1"
};




const  app = initializeApp(firebaseConfig);
export  {app}
export const auth=getAuth()
