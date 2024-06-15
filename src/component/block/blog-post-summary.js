import { html, css, LitElement } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import blogStyle from "@/style/blog";
import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

class BlogPostSummaryBlock extends LitElement {
  static properties = {
    post: {},
    title: {},
    authorName: {},
    authorEmail: {},
    createdAt: {},
  };

  static styles = [blogStyle, elementStyle, layoutStyle];

  render() {
    const createdAtLocale = new Date(this.createdAt).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );

    return html`
      <div class="content-block blog-post-list-entry">
        <span class="timestamp"> ${createdAtLocale} </span>
        <span class="title">
          <a href="/blog/post?post=${this.post}"> ${this.title} </a>
        </span>
        <span class="author">${this.authorName}</span>
      </div>
    `;
  }
}

customElements.define("blog-post-summary-block", BlogPostSummaryBlock);
