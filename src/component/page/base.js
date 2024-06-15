import { html, LitElement } from "lit-element";

import containerStyle from "@/style/container";
import pageStyle from "@/style/page";

import "@/component/block/content";
import "@/component/section/header";
import "@/component/section/footer";

class BasePage extends LitElement {
  static styles = [containerStyle, pageStyle];

  render() {
    return html`
      <div class="root-page">
        <header-section></header-section>
        <div class="root-section">
          <div class="dark-container">
            <content-block section="home-page-intro"></content-block>
          </div>
        </div>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("base-page", BasePage);
