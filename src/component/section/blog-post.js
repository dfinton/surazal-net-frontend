import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import sectionStyle from "@/style/section";

import CmsPostMixin from "@/mixin/cms-post";

import "@/component/block/blog-post-body.js";
import "@/component/block/blog-post-fractal.js";
import "@/component/block/blog-post-header.js";

class BlogPostSection extends CmsPostMixin(MobxLitElement) {
  static properties = {
    post: {},
  };

  static styles = [sectionStyle];

  async connectedCallback() {
    super.connectedCallback();

    await this.fetchCmsPost({ post: this.post });
  }

  async willUpdate(changedProperties) {
    if (!changedProperties.size) {
      return;
    }

    if (changedProperties.has("post")) {
      await this.fetchCmsPost({ post: this.post });
    }
  }

  render() {
    let fractalContainer;

    if (this.cmsPostStore.post[this.post]?.fractals?.length) {
      fractalContainer = html`
        <div class="dark-container">
          <blog-post-fractal-block post="${this.post}"></blog-post-body-block>
        </div>
      `;
    }

    return html`
      <div class="root-section">
        <div class="light-container">
          <blog-post-header-block post="${this.post}"></blog-post-header-block>
        </div>
        <div class="dark-container">
          <blog-post-body-block post="${this.post}"></blog-post-body-block>
        </div>
        ${fractalContainer}
      </div>
    `;
  }
}

customElements.define("blog-post-section", BlogPostSection);
