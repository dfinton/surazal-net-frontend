import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import ConvertDocumentObjectToElement from "@/mixin/convert-cms-document-object";
import cmsPostStore from "@/store/cms-post";
import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

class BlogPostHeaderBlock extends ConvertDocumentObjectToElement(
  MobxLitElement,
) {
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
    const title = post?.title;
    const authorName = post?.author?.name;
    const authorEmail = post?.author?.email;
    const createdAt = post?.createdAt;

    const createdAtLocale = new Date(createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let authorContent = html`<h4>
      Anonymously authored at ${createdAtLocale}
    </h4>`;

    if (authorName) {
      const authorEmailLink = authorEmail
        ? html`<a href="mailto:${authorEmail}">${authorName}</a>`
        : html`${authorName}`;

      authorContent = html`<h4>
        by ${authorEmailLink} at ${createdAtLocale}
      </h4>`;
    }

    return html`
      <div class="content-block">
        <h2>${title}</h2>
        ${authorContent}
      </div>
    `;
  }
}

customElements.define("blog-post-header-block", BlogPostHeaderBlock);
