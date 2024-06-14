import { html, LitElement } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import getParam from "@/service/url-search-params";
import cmsPostStore from "@/store/cms-post";
import containerStyle from "@/style/container";
import rootStyle from "@/style/root";

import "@/component/block/blog-post-summary.js";
import "@/component/block/pagination-controls.js";
import "@/component/section/header";
import "@/component/section/footer";

const postStoreErrorHandler = () => {
  return (error) => {
    console.error(
      `An error was encountered fetching post list data:`,
      error.message,
    );
  };
};

class BlogPage extends MobxLitElement {
  static styles = [containerStyle, rootStyle];

  cmsPostStore;
  page;
  pageSize;

  constructor() {
    super();

    this.cmsPostStore = cmsPostStore;
    this.page = getParam("page") ?? 1;
    this.pageSize = 20;
  }

  _handlePageClickEvent(e) {
    const url = new URL(location);
    const page = e.detail.page;

    url.searchParams.set("page", page);
    history.pushState({}, "", url);

    this.page = page;

    this.cmsPostStore
      .fetchPostList({ page: this.page, pageSize: this.pageSize })
      .catch(postStoreErrorHandler({ page: this.page }));
  }

  connectedCallback() {
    super.connectedCallback();

    this.cmsPostStore
      .fetchPostList({ page: this.page, pageSize: this.pageSize })
      .catch(postStoreErrorHandler());

    this.cmsPostStore.fetchPostCount().catch(postStoreErrorHandler());
  }

  render() {
    const paginationContainer = html`
      <div class="dark-container">
        <pagination-controls-block
          page="${this.page}"
          pageSize="${this.pageSize}"
          total="${this.cmsPostStore.postCount}"
          @page-click="${this._handlePageClickEvent}"
        ></pagination-controls-block>
      </div>
    `;

    const postSummaryContainers = this.cmsPostStore.postSummaryList.map((postSummary) => {
      return html`
        <div class="dark-container">
          <blog-post-summary-block
            post="${postSummary.slug}"
            title="${postSummary.title}"
            authorName="${postSummary.author?.name}"
            authorEmail="${postSummary.author?.email}"
            createdAt="${postSummary.createdAt}"
          ></blog-post-summary-block>
        </div>
      `;
    });

    return html`
      <div class="root-page">
        <header-section></header-section>
        <div class="root-section">
          ${paginationContainer}
          ${postSummaryContainers}
          ${paginationContainer}
        </div>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("blog-page", BlogPage);
