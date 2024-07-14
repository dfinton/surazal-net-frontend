import { html, LitElement } from "lit-element";

import getParam from "@/service/url-search-params";
import pageStyle from "@/style/page";

import "@/component/section/header";
import "@/component/section/footer";

class FractalImagePage extends LitElement {
  static styles = [pageStyle];

  fractal;

  constructor() {
    super();

    this.fractal = getParam("fractal");
  }

  render() {
    return html`
      <div class="root-page">
        <header-section></header-section>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("fractal-image-page", FractalImagePage);
