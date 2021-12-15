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
        const idSucursal = getString(
            formData, "idSucursal").trim();
        const nombre = getString(formData, "nombre").trim();
        const direccion = getString(formData, "direccion").trim();
        const hapertura = getString(formData, "hapertura").trim()
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
        add(modelo);
        muestraSucursales();
    } catch (e) {
        muestraError(e);
    }
}