import {
    getAuth,
    getFirestore
} from "../lib/fabrica.js";
import {
    getString,
    muestraError
} from "../lib/util.js";
import {
    muestraEmpleados
} from "./navegacion.js";
import {
    tieneRol
} from "./seguridad.js";

const daoEmpleado =
    getFirestore().
collection("Empleado");
const params =
    new URL(location.href).
searchParams;
const id = params.get("id");
/** @type {HTMLFormElement} */
const forma = document["forma"];

getAuth().onAuthStateChanged(
    protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
    if (tieneRol(usuario, ["Administrador"])) {
        busca();
    }
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
    try {
        const doc =
            await daoEmpleado.
        doc(id).
        get();
        if (doc.exists) {
            /**
             * @type {
                import("./tipos.js").
                        Empleado} */
            const data = doc.data();
            forma.idEmpleado.value = data.idEmpleado;
            forma.nombre.value = data.nombre || "";
            forma.sueldo.value = data.sueldo || "";
            forma.edad.value = data.edad || "";
            forma.addEventListener(
                "submit", guarda);
            forma.eliminar.
            addEventListener(
                "click", elimina);
        } else {
            throw new Error(
                "No se encontró.");
        }
    } catch (e) {
        muestraError(e);
        muestraEmpleados();
    }
}

/** @param {Event} evt */
async function guarda(evt) {
    try {
        evt.preventDefault();
        const formData =
            new FormData(forma);
        const idEmpleado = getString(formData, "idEmpleado").trim();
        const nombre = getString(formData, "nombre").trim();
        const sueldo = getString(formData, "sueldo").trim();
        const edad = getString(formData, "edad").trim();
        const descanso = getString(formData, "descanso").trim();
        /**
         * @type {
            import("./tipos.js").
                    Empleado} */
        const modelo = {
            idEmpleado,
            nombre,
            sueldo,
            edad,
            descanso
        };
        await daoEmpleado.
        doc(id).
        set(modelo);
        muestraEmpleados();
    } catch (e) {
        muestraError(e);
    }
}

async function elimina() {
    try {
        if (confirm("Confirmar la " +
                "eliminación")) {
            await daoEmpleado.
            doc(id).
            delete();
            muestraEmpleados();
        }
    } catch (e) {
        muestraError(e);
    }
}