import { html, LitElement } from "lit-element";

import containerStyle from "@/style/container";
import layoutStyle from "@/style/layout";
import rootStyle from "@/style/root";

import "@/component/block/content";
import "@/component/block/link-list";

class FooterSection extends LitElement {
  static styles = [containerStyle, rootStyle, layoutStyle];

  render() {
    return html`
      <div class="root-section">
        <div class="dark-container">
          <div class="content-block column-layout">
            <content-block section="page-footer"></content-block>
            <link-list-block linkList="site-links" listStyle="undecorated"></link-list>
            <link-list-block linkList="social-web" listStyle="undecorated"></link-list>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("footer-section", FooterSection);
