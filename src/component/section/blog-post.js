import { html, LitElement } from "lit-element";

import sectionStyle from "@/style/section";

import "@/component/block/blog-post-body.js";
import "@/component/block/blog-post-header.js";

class BlogPostSection extends LitElement {
  static properties = {
    post: {},
  };

  static styles = [sectionStyle];

  render() {
    return html`
      <div class="root-section">
        <div class="light-container">
          <blog-post-header-block post="${this.post}"></blog-post-header-block>
        </div>
        <div class="dark-container">
          <blog-post-body-block post="${this.post}"></blog-post-body-block>
        </div>
      </div>
    `;
  }
}

customElements.define("blog-post-section", BlogPostSection);
