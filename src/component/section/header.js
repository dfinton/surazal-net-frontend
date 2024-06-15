import { html, LitElement } from "lit-element";

import containerStyle from "@/style/container";
import sectionStyle from "@/style/section";

import "@/component/block/content";
import "@/component/block/link-list";

class HeaderSection extends LitElement {
  static styles = [containerStyle, sectionStyle];

  render() {
    return html`
      <div class="root-section">
        <div class="light-container">
          <content-block section="page-header"></content-block>
        </div>
        <div class="dark-container">
          <link-list-block
            linkList="site-links"
            listStyle="horizontal"
          ></link-list-block>
        </div>
      </div>
    `;
  }
}

customElements.define("header-section", HeaderSection);
