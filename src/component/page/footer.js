import { html, LitElement } from "lit-element";

import LightMobxLitElement from "../base/light-mobx-lit-element";

class PageFooter extends LightMobxLitElement {
  render() {
    return html`
      <div class="root-section light-container">
        <div class="content">This is a footer</div>
      </div>
    `;
  }
}

customElements.define("page-footer", PageFooter);
