import { html, LitElement } from "lit-element";

import LightMobxLitElement from "../base/light-mobx-lit-element";

class PageFooter extends LightMobxLitElement {
  render() {
    return html`
      <div class="light-container">
        This is a footer
      </div>
    `;
  }
}

customElements.define("page-footer", PageFooter);
