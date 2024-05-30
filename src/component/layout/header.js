import { html } from "lit-element";

import LightMobxLitElement from "@/component/base/light-mobx-lit-element";

import "@/component/common/content";
import "@/component/common/linkList";

class PageHeader extends LightMobxLitElement {
  static sectionSlug = "page-header";
  static linkSlug = "site-links";

  render() {
    return html`
      <div class="root-section">
        <div class="light-container">
          <page-content section="${PageHeader.sectionSlug}"></page-content>
        </div>
        <div class="dark-container">
          <link-list
            linkList="${PageHeader.linkSlug}"
            listStyle="horizontal"
          ></link-list>
        </div>
      </div>
    `;
  }
}

customElements.define("page-header", PageHeader);
