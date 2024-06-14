import { html, LitElement } from "lit-element";

import containerStyle from "@/style/container";
import rootStyle from "@/style/root";

import "@/component/section/header";
import "@/component/section/footer";

class FractalsPage extends LitElement {
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

customElements.define("fractals-page", FractalsPage);
