import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsFractalMixin from "@/mixin/cms-fractal";
import sectionStyle from "@/style/section";

import "@/component/block/fractal-image-preview";
import "@/component/block/fractal-image-meta";

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
      <div class="root-section">
        <div class="dark-container">
          <fractal-image-preview-block fractal="${this.fractal}"></fractal-image-preview-block>
        </div>
        <div class="light-container">
          <fractal-image-meta-block fractal="${this.fractal}"></fractal-image-meta-block>
        </div>
      </div>
    `;
  }
}

customElements.define("fractal-image-section", FractalImageSection);
