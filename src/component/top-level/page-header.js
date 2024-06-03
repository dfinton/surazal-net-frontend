import { html, LitElement } from "lit-element";

import rootStyle from "@/style/root";

import "@/component/container/content-container";

class PageHeader extends LitElement {
  static styles = [rootStyle];

  render() {
    return html`
      <div class="root-section">
        <content-container containerClass="light">
          <slot name="header"></slot>
        </content-container>
        <content-container containerClass="dark">
          <slot name="subheader"></slot>
        </content-container>
      </div>
    `;
  }
}

customElements.define("page-header", PageHeader);
