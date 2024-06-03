import { html, LitElement } from "lit-element";

import containerStyle from "@/style/container";

class ContentContainer extends LitElement {
  static properties = {
    containerClass: {},
  };

  static styles = [ containerStyle ];

  constructor() {
    super();

    this.containerClass = "clear";
  }

  render() {
    return html`
      <div class="${this.containerClass}-container">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("content-container", ContentContainer);
