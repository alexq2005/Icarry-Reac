/* -------------------------------------------------------------------------- */
/*                           CONEXION CON FIREBASE                            */
/* -------------------------------------------------------------------------- */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

/* -------------------------------------------------------------------------- */
/*                     SERVICIOS DISPONIBLES DE FIREBASE                      */
/* -------------------------------------------------------------------------- */
//https://firebase.google.com/docs/web/setup#available-libraries

/* -------------------------------------------------------------------------- */
/*                       DATOS DEL PROYECTO EN FIREBASE                       */
/* -------------------------------------------------------------------------- */
//
const firebaseConfig = {
  apiKey: "AIzaSyAACrgPzCwxKO7bT3DCYqJ2T6UXrgM59e4",
  authDomain: "icarry-dota.firebaseapp.com",
  projectId: "icarry-dota",
  storageBucket: "icarry-dota.firebasestorage.app",
  messagingSenderId: "102706725861",
  appId: "1:102706725861:web:d60fdb64478ca41d44e50c",
};

/* -------------------------------------------------------------------------- */
/*                    ARRANCO FIREBASE Y LA BASE DE DATOS                     */
/* -------------------------------------------------------------------------- */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
/* -------------------------------------------------------------------------- */
/*                             AUTH PARA EL LOGIN                             */
/* -------------------------------------------------------------------------- */
const auth = getAuth(app);

export { db, auth };
