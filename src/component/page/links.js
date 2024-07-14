import { html, LitElement } from "lit-element";

import pageStyle from "@/style/page";

import "@/component/section/content";
import "@/component/section/header";
import "@/component/section/footer";

class LinksPage extends LitElement {
  static styles = [pageStyle];

  render() {
    return html`
      <div class="root-page">
        <header-section></header-section>
        <content-section section="links"></content-section>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("links-page", LinksPage);
