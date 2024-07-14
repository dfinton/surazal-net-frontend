import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsFractalMixin from "@/mixin/cms-fractal";
import sectionStyle from "@/style/section";

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

  render() {
    return html` <div>Fractal Image List</div> `;
  }
}

customElements.define("fractal-list-section", FractalListSection);
