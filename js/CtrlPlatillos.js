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
const daoPlatillo =
    getFirestore().
collection("Platillo");

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
    daoPlatillo.
    orderBy("idPlatillo")
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
        -- No hay platillos
        registrados. --
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
                    Platillo} */
    const data = doc.data();
    const idPlatillo = cod(data.idPlatillo);
    const nombre = cod(data.nombre);
    const precio = cod(data.precio);
    const descripcion = cod(data.descripcion);
    const parámetros =
        new URLSearchParams();
    parámetros.append("id", doc.id);
    return ( /* html */
        `<li>
      <a class="fila" href=
  "platillo.html?${parámetros}">
        <strong class="primario">
          ${idPlatillo} ${nombre} ${precio} ${descripcion}
        </strong>
      </a>
     
    </li>`);
}

/** @param {Error} e */
function errConsulta(e) {
    muestraError(e);
    consulta();
}