import { html, LitElement } from "lit-element";

import "@/component/root/page.js";

class FractalsPage extends LitElement {
  render() {
    return html` <page-root></page-root> `;
  }
}

customElements.define("fractals-page", FractalsPage);
