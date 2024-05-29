import { html } from "lit-element";

import LightLitElement from "@/component/base/light-lit-element";

import "@/component/layout/footer";
import "@/component/layout/header";

class PageRoot extends LightLitElement {
  render() {
    return html`
      <div class="root-page">
        <page-header></page-header>
        <page-footer></page-footer>
      </div>
    `;
  }
}

customElements.define("page-root", PageRoot);
