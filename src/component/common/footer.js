import { html } from "lit-element";

import LightMobxLitElement from "@/component/base/light-mobx-lit-element";

import "@/component/common/content";
import "@/component/common/linkList";

class PageFooter extends LightMobxLitElement {
  render() {
    return html`
      <div class="root-section dark-container">
        <div class="content column-layout">
          <page-content section="page-footer"></page-content>
          <link-list linkList="site-links" listStyle="undecorated"></link-list>
          <link-list
            linkList="social-links"
            listStyle="undecorated"
          ></link-list>
        </div>
      </div>
    `;
  }
}

customElements.define("page-footer", PageFooter);
