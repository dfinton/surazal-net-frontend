import { html, LitElement } from "lit-element";

import getParam from "@/service/url-search-params";
import pageStyle from "@/style/page";

import "@/component/section/blog-list";
import "@/component/section/header";
import "@/component/section/footer";

class BlogListPage extends LitElement {
  static styles = [pageStyle];

  page;
  pageSize;

  constructor() {
    super();

    this.page = getParam("page") ?? 1;
    this.pageSize = 20;
  }

  render() {
    return html`
      <div class="root-page">
        <header-section></header-section>
        <blog-list-section
          page="${this.page}"
          pageSize="${this.pageSize}"
        ></blog-list-section>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("blog-list-page", BlogListPage);
