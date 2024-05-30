import { html, LitElement } from "lit-element";

import rootStyle from "@/style/root";

class PageHeader extends LitElement {
  static styles = [rootStyle];

  render() {
    return html`
      <div class="root-section">
        <div class="light-container">
          <slot name="header"></slot>
        </div>
        <div class="dark-container">
          <slot name="subheader"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("page-header", PageHeader);
