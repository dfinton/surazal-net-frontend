import { html, LitElement } from "lit-element";

import containerStyle from "@/style/container";
import rootStyle from "@/style/root";

import "@/component/block/content";
import "@/component/section/header";
import "@/component/section/footer";

class AboutPage extends LitElement {
  static styles = [containerStyle, rootStyle];

  render() {
    return html`
      <div class="root-page">
        <header-section></header-section>
        <div class="root-section">
          <div class="dark-container">
            <content-block section="about-this-page"></content-block>
          </div>
        </div>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("about-page", AboutPage);
