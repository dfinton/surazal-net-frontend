import { html, LitElement } from "lit-element";

import getParam from "@/service/url-search-params";

import "@/component/top-level/section.js";
import "@/component/container/content.js";
import "@/component/common/blog-post-block.js";
import "@/component/common/blog-post-header.js";
import "@/component/root/page.js";

class BlogPostPage extends LitElement {
  slug;

  constructor() {
    super();

    this.slug = getParam("post");
  }

  render() {
    return html`
      <page-root>
        <page-section>
          <content-container containerClass="dark">
            <blog-post-header post="${this.slug}"></blog-post-header>
          </content-container>
          <content-container containerClass="dark">
            <blog-post-block post="${this.slug}"></blog-post-block>
          </content-container>
        </page-section>
      </page-root>
    `;
  }
}

customElements.define("blog-post-page", BlogPostPage);
