import { html, LitElement } from "lit-element";

import LightMobxLitElement from "../base/light-mobx-lit-element";

class PageHeader extends LightMobxLitElement {
  render() {
    return html`
      <div class="root-section">
        <div class="light-container">
          <div class="content">
            This is a header
          </div>
        </div>
        <div class="dark-container">
          <div class="content">
            This is a subheaderer
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("page-header", PageHeader);
