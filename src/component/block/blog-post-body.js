import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import ConvertDocumentObjectToElement from "@/mixin/convert-cms-document-object";
import cmsPostStore from "@/store/cms-post";
import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

class BlogPostBodyBlock extends ConvertDocumentObjectToElement(MobxLitElement) {
  static properties = {
    post: {},
  };

  static styles = [elementStyle, layoutStyle];

  cmsPostStore;

  async connectedCallback() {
    super.connectedCallback();

    try {
      await this.cmsPostStore.fetchPost({ post: this.post });
    } catch (error) {
      console.error(error);
    }
  }

  async willUpdate(changedProperties) {
    if (!changedProperties.size) {
      return;
    }

    if (changedProperties.has("post")) {
      try {
        await this.cmsPostStore.fetchPost({ post: this.post });
      } catch (error) {
        console.error(error);
      }
    }
  }

  constructor() {
    super();

    this.cmsPostStore = cmsPostStore;
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
