import { html, LitElement } from "lit-element";

import getParam from "@/service/url-search-params";

import "@/component/common/blog-post-list.js";
import "@/component/root/page.js";

class BlogPage extends LitElement {
  page;
  pageSize;

  constructor() {
    super();

    this.page = getParam("page") ?? 1;
    this.pageSize = 1;
  }

  render() {
    return html`
      <page-root>
        <blog-post-list
          page="${this.page}"
          pageSize="${this.pageSize}"
        ></blog-post-list>
      </page-root>
    `;
  }
}

customElements.define("blog-page", BlogPage);
