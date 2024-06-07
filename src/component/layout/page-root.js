import { html, LitElement } from "lit-element";

import rootStyle from "@/style/root";

import "@/component/top-level/page-footer";
import "@/component/top-level/page-header";
import "@/component/common/content-block";
import "@/component/common/link-list";

class PageRoot extends LitElement {
  static styles = [rootStyle];

  render() {
    return html`
      <div class="root-page">
        <page-header>
          <content-block slot="header" section="page-header"></content-block>
          <link-list
            slot="subheader"
            linkList="site-links"
            listStyle="horizontal"
          ></link-list>
        </page-header>
        <slot></slot>
        <page-footer>
          <content-block section="page-footer"></content-block>
          <link-list linkList="site-links" listStyle="undecorated"></link-list>
          <link-list
            linkList="social-web"
            listStyle="undecorated"
          ></link-list>
        </page-footer>
      </div>
    `;
  }
}

customElements.define("page-root", PageRoot);
