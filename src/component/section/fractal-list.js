import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsFractalMixin from "@/mixin/cms-fractal";
import sectionStyle from "@/style/section";

import "@/component/block/fractal-list.js";
import "@/component/block/pagination-controls.js";

class FractalListSection extends CmsFractalMixin(MobxLitElement) {
  static properties = {
    page: {},
    pageSize: {},
  };

  static styles = [sectionStyle];

  async connectedCallback() {
    super.connectedCallback();

    await Promise.allSettled([
      this.fetchCmsFractalImageSummaryList({
        page: this.page,
        pageSize: this.pageSize,
      }),
      this.fetchCmsFractalImageCount(),
    ]);
  }

  async _handlePaginationClickEvent(e) {
    const url = new URL(location);
    const page = e.detail.page;

    url.searchParams.set("page", page);
    history.pushState({}, "", url);

    this.page = page;

    await this.fetchCmsFractalImageSummaryList({
      page: this.page,
      pageSize: this.pageSize,
    });
  }

  render() {
    let paginationContainer;

    if (this.cmsFractalStore.imageCount > this.pageSize) {
      paginationContainer = html`
        <div class="dark-container">
          <pagination-controls-block
            page="${this.page}"
            pageSize="${this.pageSize}"
            total="${this.cmsFractalStore.imageCount}"
            @pagination-click="${this._handlePaginationClickEvent}"
          ></pagination-controls-block>
        </div>
      `;
    }

    const fractalsContainer = html`
      <div class="dark-container">
        <fractal-list-block></fractal-list-block>
      </div>
    `;

    return html`
      <div class="root-section">
        ${paginationContainer}
        ${fractalsContainer}
        ${paginationContainer}
      </div>
    `;
  }
}

customElements.define("fractal-list-section", FractalListSection);
