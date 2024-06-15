import { html, LitElement } from "lit-element";

import sectionStyle from "@/style/section";

import "@/component/block/content";

class ContentContainer extends LitElement {
  static properties = {
    section: {},
  };

  static styles = [sectionStyle];

  render() {
    return html`
      <div class="root-section">
        <div class="dark-container">
          <content-block section="${this.section}"></content-block>
        </div>
      </div>
    `;
  }
}

customElements.define("content-section", ContentContainer);
