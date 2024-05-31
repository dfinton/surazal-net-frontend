import { html, LitElement } from "lit-element";

import rootStyle from "@/style/root";

import "@/component/common/footer";
import "@/component/common/header";
import "@/component/common/content";
import "@/component/common/linkList";

class MainPage extends LitElement {
  static styles = [rootStyle];

  render() {
    return html`
      <div class="root-page">
        <page-header>
          <page-content slot="header" section="page-header"></page-content>
          <link-list
            slot="subheader"
            linkList="site-links"
            listStyle="horizontal"
          ></link-list>
        </page-header>
        <slot></slot>
        <page-footer>
          <page-content section="page-footer"></page-content>
          <link-list linkList="site-links" listStyle="undecorated"></link-list>
          <link-list
            linkList="social-links"
            listStyle="undecorated"
          ></link-list>
        </page-footer>
      </div>
    `;
  }
}

customElements.define("main-page", MainPage);
