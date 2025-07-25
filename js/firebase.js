// js/firebase.js (VERSION CORRECTA Y COMPLETA)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js"; // <-- Necesario para la base de datos de mensajes y expedientes
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";     // <-- Necesario para autenticación (aunque tu login actual no lo use directamente)
import { getStorage } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js"; // <-- Necesario para subir archivos PDF de expedientes
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js"; // <-- Para Google Analytics (si lo quieres usar)


// ** TU NUEVA CONFIGURACIÓN DE FIREBASE **
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBl0_3ObNFjDV39epPSE0ldAQaLA4HEPvs",
    authDomain: "estudio-juridico-f0733.firebaseapp.com",
    projectId: "estudio-juridico-f0733",
    storageBucket: "estudio-juridico-f0733.firebasestorage.app",
    messagingSenderId: "488460649562",
    appId: "1:488460649562:web:196d32365bea40c3748463",
    measurementId: "G-DWY680S3KD"
  };

// Inicializa Firebase
export const app = initializeApp(firebaseConfig); // Exportamos la app
export const db = getFirestore(app);             // Exportamos la instancia de Firestore
export const auth = getAuth(app);                 // Exportamos la instancia de Auth
export const storage = getStorage(app);           // Exportamos la instancia de Storage
export const analytics = getAnalytics(app);       // Exportamos la instancia de Analytics (si la necesitas)

console.log("Firebase inicializado con la nueva configuración."); // Mensaje de depuración
