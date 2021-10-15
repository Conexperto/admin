import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import { getApp, getApps, initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { readyApp } from "utils";

// Firebase Admin
const firebaseConfigAdmin: FirebaseOptions = {
  apiKey: "AIzaSyD4uyFMfi35s6nae3gjZfB_Wd1hMmNF7_w",
  authDomain: "conexperto-admin.firebaseapp.com",
  projectId: "conexperto-admin",
  storageBucket: "conexperto-admin.appspot.com",
  messagingSenderId: "40989086504",
  appId: "1:40989086504:web:e2035160b51bcc9089b61d",
  measurementId: "G-DG3JG3635L",
};

const adminApp: FirebaseApp = readyApp("admin", getApps())
  ? getApp("admin")
  : initializeApp(firebaseConfigAdmin, "admin");
const adminAuth: Auth = getAuth(adminApp);
try {
  if (!process.env.REACT_APP_EMULATOR_ADMIN_HOST) {
    throw new Error("Not declarated REACT_APP_EMULATOR_ADMIN_HOST");
  }
  connectAuthEmulator(adminAuth, process.env.REACT_APP_EMULATOR_ADMIN_HOST);
} catch (err) {
  console.error(err);
}
export const admin = { app: adminApp, auth: adminAuth };
