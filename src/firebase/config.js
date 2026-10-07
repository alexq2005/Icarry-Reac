/*------------------------------------------------------------*/
/*                     configuracion de firebase                */
/*------------------------------------------------------------*/
/* Inicializa la app de Firebase con la config del proyecto.
   Los valores vienen del console de Firebase; no hardcodees secretos
   adicionales aca (las reglas de seguridad van en el backend de Firebase). */

// Importo solo lo necesario del SDK
import { initializeApp } from "firebase/app";
// TODO: agregar otros SDKs (Auth, Firestore, etc.) cuando el curso los use
// https://firebase.google.com/docs/web/setup#available-libraries

/*------------------------------------------------------------*/
/*                     datos del proyecto                       */
/*------------------------------------------------------------*/
const firebaseConfig = {
apiKey: "AIzaSyAACrgPzCwxKO7bT3DCYqJ2T6UXrgM59e4",
authDomain: "icarry-dota.firebaseapp.com",
projectId: "icarry-dota",
storageBucket: "icarry-dota.firebasestorage.app",
messagingSenderId: "102706725861",
appId: "1:102706725861:web:d60fdb64478ca41d44e50c"
};

/*------------------------------------------------------------*/
/*                     instancia de la app                      */
/*------------------------------------------------------------*/
// Esta app se puede importar desde otros modulos (Firestore, Auth, etc.)
const app = initializeApp(firebaseConfig);
