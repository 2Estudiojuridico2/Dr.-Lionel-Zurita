// js/firebase.js (VERSION CORRECTA Y COMPLETA)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js"; // <-- Necesario para la base de datos de mensajes y expedientes
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";     // <-- Necesario para autenticación (aunque tu login actual no lo use directamente)
import { getStorage } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js"; // <-- Necesario para subir archivos PDF de expedientes
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js"; // <-- Para Google Analytics (si lo quieres usar)


// ** TU NUEVA CONFIGURACIÓN DE FIREBASE **
const firebaseConfig = {
  apiKey: "AIzaSyDjq9AxKQDyG-pw455YYP7F2p85lBl3lbA",
  authDomain: "estudiozuritaagenda-ae2bb.firebaseapp.com",
  projectId: "estudiozuritaagenda-ae2bb",
  storageBucket: "estudiozuritaagenda-ae2bb.firebasestorage.app",
  messagingSenderId: "1012425886579",
  appId: "1:1012425886579:web:83d43f9270290ebb239306",
  measurementId: "G-GKSM6JJ2LR"
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig); // Exportamos la app
export const db = getFirestore(app);             // Exportamos la instancia de Firestore
export const auth = getAuth(app);                 // Exportamos la instancia de Auth
export const storage = getStorage(app);           // Exportamos la instancia de Storage
export const analytics = getAnalytics(app);       // Exportamos la instancia de Analytics (si la necesitas)

console.log("Firebase inicializado con la nueva configuración."); // Mensaje de depuración
