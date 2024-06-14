import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import ConvertDocumentObjectToElement from "@/mixin/convert-cms-document-object";
import cmsPostStore from "@/store/cms-post";
import commonElementStyle from "@/style/common-element";
import containerStyle from "@/style/container";
import layoutStyle from "@/style/layout";
import utilityStyle from "@/style/utility";

const blogPostStoreErrorHandler =
  ({ post }) =>
  (error) =>
    console.error(
      `An error was encountered fetching blog post data for slug "${post}":`,
      error.message,
    );

class BlogPostBlock extends ConvertDocumentObjectToElement(MobxLitElement) {
  static properties = {
    post: {},
  };

  static styles = [commonElementStyle, containerStyle, layoutStyle, utilityStyle];

  cmsPostStore;

  connectedCallback() {
    super.connectedCallback();

    this.cmsPostStore
      .fetchPost({ post: this.post })
      .catch(blogPostStoreErrorHandler({ post: this.post }));
  }

  willUpdate(changedProperties) {
    if (!changedProperties.size) {
      return;
    }

    if (changedProperties.has("post")) {
      this.cmsPostStore
        .fetchPost({ post: this.post })
        .catch(blogPostStoreErrorHandler({ post: this.post }));
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

    return html`
      <div class="dark-container">
        <div class="content-block">
          ${htmlContent}
        </div>
      </div>
    `;
  }
}

customElements.define("blog-post-block", BlogPostBlock);
