import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsPostMixin from "@/mixin/cms-post";
import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

class BlogPostHeaderBlock extends CmsPostMixin(MobxLitElement) {
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
      Anonymously Authored at ${createdAtLocale}
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
