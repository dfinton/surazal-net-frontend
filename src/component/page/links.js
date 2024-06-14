import { html, LitElement } from "lit-element";

import containerStyle from "@/style/container";
import rootStyle from "@/style/root";

import "@/component/section/header";
import "@/component/section/footer";

class LinksPage extends LitElement {
  static styles = [containerStyle, rootStyle];

  render() {
    return html`
      <div class="root-page">
        <header-section></header-section>
        <div class="root-section">
          <div class="dark-container">
            Placeholder
          </div>
        </div>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("links-page", LinksPage);
