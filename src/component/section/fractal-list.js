import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsFractalMixin from "@/mixin/cms-fractal";
import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";
import sectionStyle from "@/style/section";

import "@/component/block/pagination-controls.js";

class FractalListSection extends CmsFractalMixin(MobxLitElement) {
  static properties = {
    page: {},
    pageSize: {},
  };

  static styles = [elementStyle, layoutStyle, sectionStyle];

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
    const paginationContainer = html`
      <div class="dark-container">
        <pagination-controls-block
          page="${this.page}"
          pageSize="${this.pageSize}"
          total="${this.cmsFractalStore.imageCount}"
          @pagination-click="${this._handlePaginationClickEvent}"
        ></pagination-controls-block>
      </div>
    `;

    const fractalsContent = this.cmsFractalStore.imageSummaryList.map((fractal) => {
      const fractalUrl = `/fractals/image?fractal=${fractal.slug}`;
      const fractalImageUrl = fractal.thumbnail?.file?.url;
      const fractalName = fractal.name;

      return html`
        <div class="image-frame">
          <div class="image center">
            <a href="${fractalUrl}">
              <img src="${fractalImageUrl}" />
            </a>
          </div>
          <div class="image-caption center">
            <a href="${fractalUrl}">
              <h5>${fractalName}</h5>
            </a>
          </div>
        </div>
      `;
    });

    return html`
      <div class="root-section">
        ${paginationContainer}
        <div class="dark-container">
          <div class="images-container content-block">
            ${fractalsContent}
          </div>
        </div>
        ${paginationContainer}
      </div>
    `;
  }
}

customElements.define("fractal-list-section", FractalListSection);
