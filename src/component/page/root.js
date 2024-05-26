import { html } from "lit-element";

import LightLitElement from "../base/light-lit-element";

import "./footer";
import "./header";

class PageRoot extends LightLitElement {
  render() {
    return html`
      <div class="root-container">
        <page-header></page-header>
        <page-footer></page-footer>
      </div>
    `;
  }
}

customElements.define("page-root", PageRoot);
