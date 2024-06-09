import { html, LitElement } from "lit-element";

import "@/component/top-level/section.js";
import "@/component/container/content.js";
import "@/component/common/content-block.js";
import "@/component/root/page.js";

class LinksPage extends LitElement {
  render() {
    return html`
      <page-root></page-root>
    `;
  }
}

customElements.define("links-page", LinksPage);
