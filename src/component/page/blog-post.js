import { html, LitElement } from "lit-element";

import getParam from "@/service/url-search-params";
import containerStyle from "@/style/container";
import rootStyle from "@/style/root";

import "@/component/block/blog-post-body.js";
import "@/component/block/blog-post-header.js";
import "@/component/section/header";
import "@/component/section/footer";

class BlogPostPage extends LitElement {
  static styles = [containerStyle, rootStyle];

  slug;

  constructor() {
    super();

    this.slug = getParam("post");
  }

  render() {
    return html`
      <div class="root-page">
        <header-section></header-section>
        <div class="root-section">
          <div class="dark-container">
            <blog-post-header-block post="${this.slug}"></blog-post-header-block>
          </div>
          <div class="dark-container">
            <blog-post-body-block post="${this.slug}"></blog-post-body-block>
          </div>
        </div>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("blog-post-page", BlogPostPage);
