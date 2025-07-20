// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js"; // Añadimos esta línea para el almacenamiento de archivos

const firebaseConfig = {
  apiKey: "AIzaSyBQ_OrIkI0whutfHXZRAZEl4IyOaX_8DXE",
  authDomain: "estudiozuritaagenda.firebaseapp.com",
  projectId: "estudiozuritaagenda",
  storageBucket: "estudiozuritaagenda.firebasestorage.app",
  messagingSenderId: "55134660545",
  appId: "1:55134660545:web:107ce7f27588e32f8a7140"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // Exportamos storage también
