import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import ConvertDocumentObjectToElement from "@/mixin/convert-cms-document-object";
import cmsPostStore from "@/store/cms-post";
import commonElementStyle from "@/style/common-element";
import layoutStyle from "@/style/layout";
import utilityStyle from "@/style/utility";

const blogPostStoreErrorHandler =
  ({ post }) =>
  (error) =>
    console.error(
      `An error was encountered fetching blog post data for slug "${post}":`,
      error.message,
    );

class BlogPostHeader extends ConvertDocumentObjectToElement(MobxLitElement) {
  static properties = {
    post: {},
  };

  static styles = [commonElementStyle, layoutStyle, utilityStyle];

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
    const title = post?.title;
    const authorName = post?.author?.name;
    const authorEmail = post?.author?.email;

    return html`
      <div class="content-block">
        <h2>${title}</h2>
        <h4>
          by <a href="mailto:${authorEmail}">${authorName}</a>
        </h4>
      </div>
    `;
  }
}

customElements.define("blog-post-header", BlogPostHeader);
