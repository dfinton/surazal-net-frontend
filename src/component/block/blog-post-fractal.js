import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsPostMixin from "@/mixin/cms-post";

import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

class BlogPostFractalBlock extends CmsPostMixin(MobxLitElement) {
  static properties = {
    post: {},
  };

  static styles = [elementStyle, layoutStyle];

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
    return html`
      <div>Fractals!</div>
    `;
  }
}

customElements.define("blog-post-fractal-block", BlogPostFractalBlock);
