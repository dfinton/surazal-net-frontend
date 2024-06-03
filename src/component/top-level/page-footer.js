import { html, LitElement } from "lit-element";

import layoutStyle from "@/style/layout";
import rootStyle from "@/style/root";

import "@/component/container/content-container";

class PageFooter extends LitElement {
  static styles = [rootStyle, layoutStyle];

  render() {
    return html`
      <div class="root-section">
        <content-container containerClass="dark">
          <div class="content-block column-layout">
            <slot></slot>
          </div>
        </content-container>
      </div>
    `;
  }
}

customElements.define("page-footer", PageFooter);
