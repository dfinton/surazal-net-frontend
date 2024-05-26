import { html, LitElement } from "lit-element";

import LightMobxLitElement from "../base/light-mobx-lit-element";

class PageHeader extends LightMobxLitElement {
  render() {
    return html`
      <div class="light-container">
        This is a header
      </div>
    `;
  }
}

customElements.define("page-header", PageHeader);
