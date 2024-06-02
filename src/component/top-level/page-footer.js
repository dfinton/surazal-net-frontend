import { html, LitElement } from "lit-element";

import layoutStyle from "@/style/layout";
import rootStyle from "@/style/root";

class PageFooter extends LitElement {
  static styles = [rootStyle, layoutStyle];

  render() {
    return html`
      <div class="root-section">
        <div class="dark-container">
          <div class="content-block column-layout">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("page-footer", PageFooter);
