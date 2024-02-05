import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmywEU-vNpMPzBhQEuLPBMcAEN9vsaqhM",
  authDomain: "carbon-sense-3be4f.firebaseapp.com",
  projectId: "carbon-sense-3be4f",
  storageBucket: "carbon-sense-3be4f.appspot.com",
  messagingSenderId: "958220475431",
  appId: "1:958220475431:web:63517c5e13d40b8593c202",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
