import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsFractalMixin from "@/mixin/cms-fractal";
import sectionStyle from "@/style/section";

class FractalImageSection extends CmsFractalMixin(MobxLitElement) {
  static properties = {
    fractal: {},
  };

  static styles = [sectionStyle];

  async connectedCallback() {
    super.connectedCallback();

    await this.fetchCmsFractalImage({ image: this.fractal });
  }

  async willUpdate(changedProperties) {
    if (!changedProperties.size) {
      return;
    }

    if (changedProperties.has("fractal")) {
      await this.fetchCmsFractalImage({ image: this.fractal });
    }
  }

  render() {
    return html`
      <div>Hey yo!</div>
    `;
  }
}

customElements.define("fractal-image-section", FractalImageSection);
