import { html, LitElement } from "lit-element";

import rootStyle from "@/style/root";

import "@/component/common/content";
import "@/component/common/linkList";

class PageHeader extends LitElement {
  static styles = [rootStyle];

  render() {
    return html`
      <div class="root-section">
        <div class="light-container">
          <page-content section="page-header"></page-content>
        </div>
        <div class="dark-container">
          <link-list linkList="site-links" listStyle="horizontal"></link-list>
        </div>
      </div>
    `;
  }
}

customElements.define("page-header", PageHeader);
