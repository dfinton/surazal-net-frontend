import { html, LitElement } from "lit-element";

import pageStyle from "@/style/page";

import "@/component/section/content";
import "@/component/section/header";
import "@/component/section/footer";

class FractalsPage extends LitElement {
  static styles = [pageStyle];

  render() {
    return html`
      <div class="root-page">
        <header-section></header-section>
        <content-section section="fractals"></content-section>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("fractals-page", FractalsPage);
