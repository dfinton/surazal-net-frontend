import { html, LitElement } from "lit-element";

import "@/component/common/blog-post-list.js";
import "@/component/root/page.js";

class BlogPage extends LitElement {
  render() {
    return html`
      <page-root>
        <blog-post-list></blog-post-list>
      </page-root>
    `;
  }
}

customElements.define("blog-page", BlogPage);
