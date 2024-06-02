import { html, LitElement } from "lit-element";

import layoutStyle from "@/style/layout";
import rootStyle from "@/style/root";

class PageBody extends LitElement {
  static styles = [rootStyle, layoutStyle];

  render() {
    return html`
      <div class="root-section dark-container">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("page-body", PageBody);
