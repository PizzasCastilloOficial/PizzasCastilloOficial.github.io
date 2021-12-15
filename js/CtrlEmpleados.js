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
const daoEmpleado =
    getFirestore().
collection("Empleado");

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
    daoEmpleado.
    orderBy("idEmpleado")
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
        -- No hay empleados
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
                    Empleado} */
    const data = doc.data();
    const idEmpleado = cod(data.idEmpleado);
    const nombre = cod(data.nombre);
    const sueldo = cod(data.sueldo);
    const edad = cod(data.edad);
    const descanso = cod(data.descanso);
    const parámetros =
        new URLSearchParams();
    parámetros.append("id", doc.id);
    return ( /* html */
        `<li style="text-align: center">
      <a class="fila" href=
  "empleado.html?${parámetros}">
        <strong class="primario">
          ${idEmpleado}
          <br>
          ${nombre}
          <br>
          ${sueldo}
          <br>
          ${edad}
          <br>
          ${descanso}
          <br>
        </strong>
      </a>
     
    </li>`);
}

/** @param {Error} e */
function errConsulta(e) {
    muestraError(e);
    consulta();
}