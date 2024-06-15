import { html, LitElement } from "lit-element";

import containerStyle from "@/style/container";
import pageStyle from "@/style/page";

import "@/component/section/header";
import "@/component/section/footer";

class FractalsPage extends LitElement {
  static styles = [containerStyle, pageStyle];

  render() {
    return html`
      <div class="root-page">
        <header-section></header-section>
        <div class="root-section">
          <div class="dark-container">Fractals Placeholder</div>
        </div>
        <footer-section></footer-section>
      </div>
    `;
  }
}

customElements.define("fractals-page", FractalsPage);
