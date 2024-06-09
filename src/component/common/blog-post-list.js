import { html, css } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import cmsPostStore from "@/store/cms-post";
import commonElementStyle from "@/style/common-element";
import containerStyle from "@/style/container";
import layoutStyle from "@/style/layout";
import rootStyle from "@/style/root";
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

const postStoreErrorHandler =
  ({ page }) =>
  (error) =>
    console.error(
      `An error was encountered fetching post list data for page "${page}":\n`,
      error.message,
    );

class BlogPostList extends MobxLitElement {
  static properties = {
    pageSize: {},
    page: {},
  };

  static styles = [
    blogPostListStyle,
    commonElementStyle,
    containerStyle,
    layoutStyle,
    rootStyle,
    utilityStyle,
  ];

  cmsPostStore;

  constructor() {
    super();

    this.cmsPostStore = cmsPostStore;
  }

  connectedCallback() {
    super.connectedCallback();

    this.cmsPostStore
      .fetchPostList({ page: this.page, pageSize: this.pageSize })
      .catch(postStoreErrorHandler({ page: this.page }));
  }

  willUpdate(changedProperties) {
    if (!changedProperties.size) {
      return;
    }

    if (changedProperties.has("page") || changedProperties.has("pageSize")) {
      this.cmsPostStore
        .fetchPostList({ page: this.page, pageSize: this.pageSize })
        .catch(postStoreErrorHandler({ page: this.page }));
    }
  }

  render() {
    const postList = this.cmsPostStore.postSummaryList.map((postSummary) => {
      const createdAtLocale = new Date(
        postSummary.createdAt,
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return html`
        <div class="dark-container">
          <div class="content-block blog-post-list-entry">
            <span class="timestamp"> ${createdAtLocale} </span>
            <span class="title">
              <a href="/blog/post?slug=${postSummary.slug}">
                ${postSummary.title}
              </a>
            </span>
            <span class="author"> ${postSummary.author.name} </span>
          </div>
        </div>
      `;
    });

    return html` <div class="root-section">${postList}</div> `;
  }
}

customElements.define("blog-post-list", BlogPostList);
