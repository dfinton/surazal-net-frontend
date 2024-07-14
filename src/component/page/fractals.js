import { html, LitElement } from "lit-element";

import getParam from "@/service/url-search-params";
import pageStyle from "@/style/page";

import "@/component/section/fractal-list";
import "@/component/section/header";
import "@/component/section/footer";

class FractalsPage extends LitElement {
  static styles = [pageStyle];

  page;
  pageSize;

  constructor() {
    super();

    this.page = getParam("page") ?? 1;
    this.pageSize = 100;
  }

  render() {
    return html`
      <div class="root-page">
        <header-section></header-section>
        <fractal-list-section
          page="${this.page}"
          pageSize="${this.pageSize}"
        ></fractal-list-section>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("fractals-page", FractalsPage);
