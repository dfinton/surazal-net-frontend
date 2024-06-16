import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import cmsPostStore from "@/store/cms-post";
import sectionStyle from "@/style/section";

import "@/component/block/blog-post-summary.js";
import "@/component/block/pagination-controls.js";

class BlogListSection extends MobxLitElement {
  static properties = {
    page: {},
    pageSize: {},
  };

  static styles = [sectionStyle];

  cmsPostStore;

  constructor() {
    super();

    this.cmsPostStore = cmsPostStore;
  }

  async _handlePaginationClickEvent(e) {
    const url = new URL(location);
    const page = e.detail.page;

    url.searchParams.set("page", page);
    history.pushState({}, "", url);

    this.page = page;

    try {
      await this.cmsPostStore.fetchPostSummaryList({
        page: this.page,
        pageSize: this.pageSize,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async connectedCallback() {
    super.connectedCallback();

    try {
      await this.cmsPostStore.fetchPostSummaryList({
        page: this.page,
        pageSize: this.pageSize,
      });
      await this.cmsPostStore.fetchPostCount();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const paginationContainer = html`
      <div class="dark-container">
        <pagination-controls-block
          page="${this.page}"
          pageSize="${this.pageSize}"
          total="${this.cmsPostStore.postCount}"
          @pagination-click="${this._handlePaginationClickEvent}"
        ></pagination-controls-block>
      </div>
    `;

    const postSummaryContainers = this.cmsPostStore.postSummaryList.map(
      (postSummary) => {
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
      },
    );

    return html`
      <div class="root-section">
        ${paginationContainer} ${postSummaryContainers} ${paginationContainer}
      </div>
    `;
  }
}

customElements.define("blog-list-section", BlogListSection);
