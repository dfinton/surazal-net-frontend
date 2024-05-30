import { html, LitElement } from "lit-element";

import layoutStyle from "@/style/layout";
import rootStyle from "@/style/root";

import "@/component/common/content";
import "@/component/common/linkList";

class PageFooter extends LitElement {
  static styles = [rootStyle, layoutStyle];

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
