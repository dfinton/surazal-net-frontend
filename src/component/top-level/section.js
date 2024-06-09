import { html, LitElement } from "lit-element";

import layoutStyle from "@/style/layout";
import rootStyle from "@/style/root";

class PageSection extends LitElement {
  static styles = [rootStyle, layoutStyle];

  render() {
    return html`
      <div class="root-section">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("page-section", PageSection);
