import { html, LitElement } from "lit-element";

import getParam from "@/service/url-search-params";
import pageStyle from "@/style/page";

import "@/component/section/blog-post";
import "@/component/section/header";
import "@/component/section/footer";

class BlogPostPage extends LitElement {
  static styles = [pageStyle];

  post;

  constructor() {
    super();

    this.post = getParam("post");
  }

  render() {
    return html`
      <div class="root-page">
        <header-section></header-section>
        <blog-post-section post="${this.post}"></blog-post-section>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("blog-post-page", BlogPostPage);
