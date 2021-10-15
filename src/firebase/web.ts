import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import { getApp, getApps, initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { readyApp } from "utils";

// Firebase Admin
const firebaseConfigWeb: FirebaseOptions = {
  apiKey: "AIzaSyAe2EVtNNEZ8QZ9WKoGkPqFENCsajQeai4",
  authDomain: "conexperto-6b5e7.firebaseapp.com",
  projectId: "conexperto-6b5e7",
  storageBucket: "conexperto-6b5e7.appspot.com",
  messagingSenderId: "473114429364",
  appId: "1:473114429364:web:d46cf4a9838141b3ac54e1",
  measurementId: "G-FXQEXR0HVV",
};

const webApp: FirebaseApp = readyApp("web", getApps())
  ? getApp("web")
  : initializeApp(firebaseConfigWeb, "web");
const webAuth: Auth = getAuth(webApp);
try {
  if (!process.env.REACT_APP_EMULATOR_WEB_HOST) {
    throw new Error("Not declarated REACT_APP_EMULATOR_WEB_HOST");
  }
  connectAuthEmulator(webAuth, process.env.REACT_APP_EMULATOR_WEB_HOST);
} catch (err) {
  console.error(err);
}
export const web = { app: webApp, auth: webAuth };
