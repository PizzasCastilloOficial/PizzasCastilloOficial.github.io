import {
    getAuth,
    getFirestore
} from "../lib/fabrica.js";
import {
    getString,
    muestraError
} from "../lib/util.js";
import {
    muestraPlatillos
} from "./navegacion.js";
import {
    tieneRol
} from "./seguridad.js";

const daoPlatillo =
    getFirestore().
collection("Platillo");
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
        const idPlatillo = getString(
            formData, "idPlatillo").trim();
        const nombre = getString(formData, "nombre").trim();
        const precio = getString(formData, "precio").trim();
        const descripcion = getString(formData, "descripcion").trim();
        /**
         * @type {
            import("./tipos.js").
                    Platillo} */
        const modelo = {
            idPlatillo,
            nombre,
            precio,
            descripcion
        };
        await daoPlatillo.
        add(modelo);
        muestraPlatillos();
    } catch (e) {
        muestraError(e);
    }
}