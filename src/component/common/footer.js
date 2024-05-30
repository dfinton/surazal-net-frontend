import { html, LitElement } from "lit-element";

import layoutStyle from "@/style/layout";
import rootStyle from "@/style/root";

class PageFooter extends LitElement {
  static styles = [rootStyle, layoutStyle];

  render() {
    return html`
      <div class="root-section dark-container">
        <div class="content column-layout">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("page-footer", PageFooter);
