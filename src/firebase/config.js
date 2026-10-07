/* Con esta configuración conecto la app con el proyecto de Firebase. */

import { initializeApp } from "firebase/app"
// Si más adelante uso Auth o Firestore, puedo inicializar esos servicios acá.

/* Estos datos identifican la aplicación web en Firebase. */
const firebaseConfig = {
  apiKey: "AIzaSyAACrgPzCwxKO7bT3DCYqJ2T6UXrgM59e4",
  authDomain: "icarry-dota.firebaseapp.com",
  projectId: "icarry-dota",
  storageBucket: "icarry-dota.firebasestorage.app",
  messagingSenderId: "102706725861",
  appId: "1:102706725861:web:d60fdb64478ca41d44e50c",
}

/* Creo la instancia principal de Firebase para usarla con sus servicios. */
const app = initializeApp(firebaseConfig)