import { html, LitElement } from "lit-element";

import "@/component/root/page.js";

class DisclaimerPage extends LitElement {
  render() {
    return html` <page-root></page-root> `;
  }
}

customElements.define("disclaimer-page", DisclaimerPage);
