/* -------------------------------------------------------------------------- */
/*     CON ESTA CONFIGURACIÓN CONECTO LA APP CON EL PROYECTO DE FIREBASE      */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*            IMPORT THE FUNCTIONS YOU NEED FROM THE SDKS YOU NEED            */
/* -------------------------------------------------------------------------- */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

/* -------------------------------------------------------------------------- */
/* SI MÁS ADELANTE USO AUTH O FIRESTORE, PUEDO INICIALIZAR ESOS SERVICIOS ACÁ */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*         TODO: ADD SDKS FOR FIREBASE PRODUCTS THAT YOU WANT TO USE          */
/* -------------------------------------------------------------------------- */
//https://firebase.google.com/docs/web/setup#available-libraries

/* -------------------------------------------------------------------------- */
/*           ESTOS DATOS IDENTIFICAN LA APLICACIÓN WEB EN FIREBASE            */
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
/*   CREO LA INSTANCIA PRINCIPAL DE FIREBASE PARA USARLA CON SUS SERVICIOS    */
/* -------------------------------------------------------------------------- */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
/* -------------------------------------------------------------------------- */
/*                PARA EL LOGIN Y REGISTRO DE USUARIOS, USO EL                */
/*                   SERVICIO DE AUTENTICACIÓN DE FIREBASE                    */
/* -------------------------------------------------------------------------- */
const auth = getAuth(app);

export { db, auth };
