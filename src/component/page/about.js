import { html, LitElement } from "lit-element";

import "@/component/top-level/section.js";
import "@/component/container/content.js";
import "@/component/common/content-block.js";
import "@/component/root/page.js";

class AboutPage extends LitElement {
  render() {
    return html`
      <page-root>
        <page-section>
          <content-container containerClass="dark">
            <content-block section="about-this-page"></content-block>
          </content-container>
        </page-section>
      </page-root>
    `;
  }
}

customElements.define("about-page", AboutPage);
