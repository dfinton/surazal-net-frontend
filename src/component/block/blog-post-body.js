import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsPostMixin from "@/mixin/cms-post";
import ConvertCmsDocumentObjectMixin from "@/mixin/convert-cms-document-object";
import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

class BlogPostBodyBlock extends CmsPostMixin(
  ConvertCmsDocumentObjectMixin(MobxLitElement),
) {
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
    const content = post?.content?.document;

    let htmlContent;

    if (content) {
      htmlContent = content.map((pageDocument) => {
        const pageElement = this.convertDocumentObjectToElement({
          documentObject: pageDocument,
        });

        return html`<div>${pageElement}</div>`;
      });
    }

    return html` <div class="content-block">${htmlContent}</div> `;
  }
}

customElements.define("blog-post-body-block", BlogPostBodyBlock);
