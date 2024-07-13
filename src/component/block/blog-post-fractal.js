import { html, css } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsPostMixin from "@/mixin/cms-post";

import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

const imageStyle = css`
  .images-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .image-frame {
    border-radius: 0.125rem;
    border: 0.125rem outset var(--light-border-color);
  }

  .image-frame a,
  .image-frame img {
    display: block;
  }
`;

class BlogPostFractalBlock extends CmsPostMixin(MobxLitElement) {
  static properties = {
    post: {},
  };

  static styles = [elementStyle, layoutStyle, imageStyle];

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

      return html`
        <div class="image-frame">
          <a href="${fractalUrl}">
            <img src="${fractalImageUrl}" />
          </a>
        </div>
      `;
    });

    return html`
      <div class="images-container content-block">${fractalsContent}</div>
    `;
  }
}

customElements.define("blog-post-fractal-block", BlogPostFractalBlock);
