import { html, css, LitElement } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import commonElementStyle from "@/style/common-element";
import layoutStyle from "@/style/layout";
import utilityStyle from "@/style/utility";

const blogPostListStyle = css`
  .blog-post-list-entry {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }

  .blog-post-list-entry > .timestamp {
    flex: 0 1 10rem;
  }

  .blog-post-list-entry > .title {
    flex: 1 1;
  }

  .blog-post-list-entry > .author {
    flex: 0 1 10rem;
    text-align: right;
  }
`;

class BlogPostSummaryBlock extends LitElement {
  static properties = {
    post: {},
    title: {},
    authorName: {},
    authorEmail: {},
    createdAt: {},
  };

  static styles = [
    blogPostListStyle,
    commonElementStyle,
    layoutStyle,
    utilityStyle,
  ];

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
