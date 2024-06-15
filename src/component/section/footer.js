import { html, LitElement } from "lit-element";

import layoutStyle from "@/style/layout";
import sectionStyle from "@/style/section";

import "@/component/block/content";
import "@/component/block/link-list";

class FooterSection extends LitElement {
  static styles = [sectionStyle, layoutStyle];

  render() {
    return html`
      <div class="root-section">
        <div class="dark-container">
          <div class="content-block column-layout">
            <content-block section="page-footer"></content-block>
            <link-list-block linkList="site-links" listStyle="undecorated"></link-list-block>
            <link-list-block linkList="social-web" listStyle="undecorated"></link-list-block>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("footer-section", FooterSection);
