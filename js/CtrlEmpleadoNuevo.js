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
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
    protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
    if (tieneRol(usuario, ["Administrador"])) {
        forma.addEventListener(
            "submit", guarda);
    }
}

/** @param {Event} evt */
async function guarda(evt) {
    try {
        evt.preventDefault();
        const formData =
            new FormData(forma);
        const idEmpleado = getString(
            formData, "idEmpleado").trim();
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
        add(modelo);
        muestraEmpleados();
    } catch (e) {
        muestraError(e);
    }
}