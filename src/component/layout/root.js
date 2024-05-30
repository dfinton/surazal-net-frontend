import { html, LitElement } from "lit-element";

import rootStyle from "@/style/root";

import "@/component/common/footer";
import "@/component/common/header";

class PageRoot extends LitElement {
  static styles = [rootStyle];

  render() {
    return html`
      <div class="root-page">
        <page-header></page-header>
        <page-footer></page-footer>
      </div>
    `;
  }
}

customElements.define("page-root", PageRoot);
