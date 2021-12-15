class MiFooter
extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /* html */
            `<p>
        &copy; 2021
        Ayala Perez Nelson Antonio
      </p>`;
    }
}

customElements.define(
    "mi-footer", MiFooter);