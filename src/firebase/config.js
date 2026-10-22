/* Con esta configuración conecto la app con el proyecto de Firebase. */
//import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Si más adelante uso Auth o Firestore, puedo inicializar esos servicios acá.
//todo: add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries

/* Estos datos identifican la aplicación web en Firebase. */
//
const firebaseConfig = {
  apiKey: "AIzaSyAACrgPzCwxKO7bT3DCYqJ2T6UXrgM59e4",
  authDomain: "icarry-dota.firebaseapp.com",
  projectId: "icarry-dota",
  storageBucket: "icarry-dota.firebasestorage.app",
  messagingSenderId: "102706725861",
  appId: "1:102706725861:web:d60fdb64478ca41d44e50c",
};

/* Creo la instancia principal de Firebase para usarla con sus servicios. */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// para el login y registro de usuarios, uso el servicio de autenticación de Firebase.
const auth = getAuth(app);

export { db, auth };
