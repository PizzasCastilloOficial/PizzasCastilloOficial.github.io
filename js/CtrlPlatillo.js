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
            await daoPlatillo.
        doc(id).
        get();
        if (doc.exists) {
            /**
             * @type {
                import("./tipos.js").
                        Platillo} */
            const data = doc.data();
            forma.idPlatillo.value = data.idPlatillo;
            forma.nombre.value = data.nombre || "";
            forma.precio.value = data.precio || "";
            forma.descripcion.value = data.descripcion || "";
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
        muestraPlatillos();
    }
}

/** @param {Event} evt */
async function guarda(evt) {
    try {
        evt.preventDefault();
        const formData =
            new FormData(forma);
        const idPlatillo = getString(formData, "idPlatillo").trim();
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
        doc(id).
        set(modelo);
        muestraPlatillos();
    } catch (e) {
        muestraError(e);
    }
}

async function elimina() {
    try {
        if (confirm("Confirmar la " +
                "eliminación")) {
            await daoPlatillo.
            doc(id).
            delete();
            muestraPlatillos();
        }
    } catch (e) {
        muestraError(e);
    }
}