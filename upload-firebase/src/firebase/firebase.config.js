import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, PhoneAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDonuYunifnMV04JQkcJuDtz8fU7vsvtUg",
  authDomain: "upload-auth-reactjs.firebaseapp.com",
  projectId: "upload-auth-reactjs",
  storageBucket: "upload-auth-reactjs.appspot.com",
  messagingSenderId: "277731805039",
  appId: "1:277731805039:web:9f49f268bbf098123a8a9a",
};

const app = initializeApp(firebaseConfig);
// tao store
export const storage = getStorage(app);
export const auth = getAuth(app);

// cung cấp cơ chế đăng nhập với google
export const GoogleProvider = new GoogleAuthProvider();
