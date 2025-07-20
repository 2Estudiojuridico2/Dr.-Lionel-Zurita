// js/expedientes.js
import { db, storage } from "./firebase.js"; // Importa db para Firestore y storage para Cloud Storage
import { collection, addDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formExpediente");
    const tabla = document.querySelector("#tablaExpedientes tbody");

    // Función para cargar expedientes desde Firestore
    async function cargarExpedientes() {
        tabla.innerHTML = ""; // Limpia la tabla
        try {
            const querySnapshot = await getDocs(collection(db, "expedientes"));
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ id: doc.id, ...doc.data() }); // Guarda el ID del documento de Firestore
            });

            if (lista.length === 0) {
                const filaVacia = tabla.insertRow();
                filaVacia.innerHTML = `<td colspan="6" class="text-center">No hay expedientes cargados.</td>`;
                return;
            }

            lista.forEach((exp) => {
                const fila = tabla.insertRow();
                fila.innerHTML = `
                    <td>${exp.numero}</td>
                    <td>${exp.caratula}</td>
                    <td>${exp.juzgado}</td>
                    <td>${exp.fecha}</td>
                    <td>${exp.archivoURL ? `<a href="${exp.archivoURL}" target="_blank">Ver Archivo</a>` : "-"}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="eliminar('${exp.id}', '${exp.archivoRef || ''}')">Eliminar</button>
                    </td>
                `;
            });
        } catch (e) {
            console.error("Error al cargar expedientes: ", e);
            alert("Error al cargar los expedientes. Consulta la consola para más detalles.");
        }
    }

    // Evento al enviar el formulario
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const numero = document.getElementById("numero").value;
        const caratula = document.getElementById("caratula").value;
        const juzgado = document.getElementById("juzgado").value;
        const fecha = document.getElementById("fecha").value;
        const fileInput = document.getElementById("archivo");
        const archivo = fileInput.files[0]; // Obtiene el archivo seleccionado

        const expediente = {
            numero,
            caratula,
            juzgado,
            fecha,
            archivoURL: "", // Aquí guardaremos la URL de descarga del archivo
            archivoRef: "" // Aquí guardaremos la referencia al archivo en Storage para poder eliminarlo
        };

        try {
            // 1. Subir el archivo a Cloud Storage (si existe)
            if (archivo) {
                const storageRef = ref(storage, `expedientes/${numero}_${archivo.name}`); // Crea una referencia única
                const uploadTask = await uploadBytes(storageRef, archivo);
                expediente.archivoURL = await getDownloadURL(uploadTask.ref); // Obtiene la URL de descarga
                expediente.archivoRef = storageRef.fullPath; // Guarda la referencia completa para futuras eliminaciones
            }

            // 2. Guardar los datos del expediente (y la URL del archivo) en Firestore
            await addDoc(collection(db, "expedientes"), expediente);

            form.reset(); // Limpia el formulario
            alert("Expediente agregado con éxito!");
            cargarExpedientes(); // Recarga la tabla
        } catch (e) {
            console.error("Error al agregar expediente: ", e);
            alert("Error al agregar el expediente. Revisa la consola para más detalles.");
        }
    });

    // Función global para eliminar expediente (llamada desde el HTML)
    window.eliminar = async function (id, archivoRef) {
        if (!confirm("¿Estás seguro de que quieres eliminar este expediente?")) {
            return;
        }
        try {
            // 1. Eliminar el archivo de Cloud Storage (si existe)
            if (archivoRef) {
                const fileRef = ref(storage, archivoRef);
                await deleteObject(fileRef);
                console.log("Archivo de Storage eliminado:", archivoRef);
            }

            // 2. Eliminar el documento de Firestore
            await deleteDoc(doc(db, "expedientes", id));

            alert("Expediente eliminado con éxito.");
            cargarExpedientes(); // Recarga la tabla
        } catch (e) {
            console.error("Error al eliminar expediente: ", e);
            alert("Error al eliminar el expediente. Revisa la consola para más detalles.");
        }
    };

    // Carga los expedientes al iniciar la página
    cargarExpedientes();
});
