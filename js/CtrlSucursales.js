import {
    getAuth,
    getFirestore
} from "../lib/fabrica.js";
import {
    cod,
    muestraError
} from "../lib/util.js";
import {
    tieneRol
} from "./seguridad.js";

/** @type {HTMLUListElement} */
const lista = document.
querySelector("#lista");
const daoSucursal =
    getFirestore().
collection("Sucursal");

getAuth().
onAuthStateChanged(
    protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
    if (tieneRol(usuario, ["Administrador"])) {
        consulta();
    }
}

function consulta() {
    daoSucursal.
    orderBy("idSucursal")
        .onSnapshot(
            htmlLista, errConsulta);
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    QuerySnapshot} snap */
function htmlLista(snap) {
    let html = "";
    if (snap.size > 0) {
        snap.forEach(doc =>
            html += htmlFila(doc));
    } else {
        html += /* html */
            `<li class="vacio">
        -- No hay sucursales
        registradas. --
      </li>`;
    }
    lista.innerHTML = html;
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    DocumentSnapshot} doc */
function htmlFila(doc) {
    /**
     * @type {import("./tipos.js").
                    Sucursal} */
    const data = doc.data();
    const idSucursal = cod(data.idSucursal);
    const nombre = cod(data.nombre);
    const direccion = cod(data.direccion);
    const hapertura = cod(data.hapertura);
    const hcierre = cod(data.hcierre);
    const parámetros =
        new URLSearchParams();
    parámetros.append("id", doc.id);
    return ( /* html */
        `<li style="text-align: center">
      <a class="fila" href=
  "sucursal.html?${parámetros}">
        <strong class="primario">
          ${idSucursal} ${nombre} ${direccion} ${hapertura} ${hcierre}
        </strong>
      </a>
     
    </li>`);
}

/** @param {Error} e */
function errConsulta(e) {
    muestraError(e);
    consulta();
}