import { html, LitElement } from "lit-element";

import pageStyle from "@/style/page";

import "@/component/section/content";
import "@/component/section/header";
import "@/component/section/footer";

class AboutPage extends LitElement {
  static styles = [pageStyle];

  render() {
    return html`
      <div class="root-page">
        <header-section></header-section>
        <content-section section="about-this-page"></content-section>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("about-page", AboutPage);
