import { html, css } from "lit-element";
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
    const post = this.cmsPostStore.post[this.post];
    const fractals = post?.fractals ?? [];

    const fractalsContent = fractals.map((fractal) => {
      const fractalUrl = `/fractals/images?fractal=${fractal.slug}`;
      const fractalImageUrl = fractal.thumbnail?.file?.url;
      const fractalName = fractal.name;

      return html`
        <div class="image-frame">
          <div class="image center">
            <a href="${fractalUrl}">
              <img src="${fractalImageUrl}" />
            </a>
          </div>
          <div class="image-caption center">
            <a href="${fractalUrl}">
              <h5>${fractalName}</h5>
            </a>
          </div>
        </div>
      `;
    });

    return html`
      <div class="images-container content-block">${fractalsContent}</div>
    `;
  }
}

customElements.define("blog-post-fractal-block", BlogPostFractalBlock);
