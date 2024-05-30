import { html } from "lit-element";

import LightMobxLitElement from "@/component/base/light-mobx-lit-element";

import "@/component/common/content";
import "@/component/common/linkList";

class PageHeader extends LightMobxLitElement {
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
