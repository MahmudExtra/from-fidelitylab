import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const initFirebase = () => {
  initializeApp(firebaseConfig);
};
export default initFirebase;
