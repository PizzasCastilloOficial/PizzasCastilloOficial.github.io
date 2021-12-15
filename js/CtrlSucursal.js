import {
    getAuth,
    getFirestore
} from "../lib/fabrica.js";
import {
    getString,
    muestraError
} from "../lib/util.js";
import {
    muestraSucursales
} from "./navegacion.js";
import {
    tieneRol
} from "./seguridad.js";

const daoSucursal =
    getFirestore().
collection("Sucursal");
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
            await daoSucursal.
        doc(id).
        get();
        if (doc.exists) {
            /**
             * @type {
                import("./tipos.js").
                        Sucursal} */
            const data = doc.data();
            forma.idSucursal.value = data.idSucursal;
            forma.nombre.value = data.nombre || "";
            forma.direccion.value = data.direccion || "";
            forma.hapertura.value = data.hapertura || "";
            forma.hcierre.value = data.hcierre || "";
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
        muestraSucursales();
    }
}

/** @param {Event} evt */
async function guarda(evt) {
    try {
        evt.preventDefault();
        const formData =
            new FormData(forma);
        const idSucursal = getString(formData, "idSucursal").trim();
        const nombre = getString(formData, "nombre").trim();
        const direccion = getString(formData, "direccion").trim();
        const hapertura = getString(formData, "hapertura").trim();
        const hcierre = getString(formData, "hcierre").trim();
        /**
         * @type {
            import("./tipos.js").
                    Sucursal} */
        const modelo = {
            idSucursal,
            nombre,
            direccion,
            hapertura,
            hcierre
        };
        await daoSucursal.
        doc(id).
        set(modelo);
        muestraSucursales();
    } catch (e) {
        muestraError(e);
    }
}

async function elimina() {
    try {
        if (confirm("Confirmar la " +
                "eliminación")) {
            await daoSucursal.
            doc(id).
            delete();
            muestraSucursales();
        }
    } catch (e) {
        muestraError(e);
    }
}