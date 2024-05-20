import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import cmsPostStore from "./store/cms-post";

class MainApp extends MobxLitElement {
  cmsPost = cmsPostStore;

  firstUpdated() {
    this.cmsPost.fetchPostList({ page: 1, pageSize: 10 });
  }

  render() {
    return html`
      <p>
        ${this.cmsPost.postSummaryList?.[0]?.title}
      </p>
    `;
  }
}

customElements.define("main-app", MainApp);
