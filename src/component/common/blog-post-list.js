import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import cmsPostStore from "@/store/cms-post";
import commonElementStyle from "@/style/common-element";
import layoutStyle from "@/style/layout";
import utilityStyle from "@/style/utility";

const postStoreErrorHandler = ({ page }) =>
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

  static styles = [commonElementStyle, layoutStyle, utilityStyle];

  cmsPostStore;

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

  constructor() {
    super();

    this.cmsPostStore = cmsPostStore;
    this.pageSize = 10;
    this.page = 1;
  }

  render() {
    const postList = this.cmsPostStore.postSummaryList.map((postSummary) =>
      html`
        <li>${postSummary.title}</li>
      `
    );

    return html`
      <div class="content">
        <ul>
          ${postList}
        </ul>
      </div>
    `;
  }
}

customElements.define("blog-post-list", BlogPostList);
