import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsFractalMixin from "@/mixin/cms-fractal";
import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

class FractalImagePreviewBlock extends CmsFractalMixin(MobxLitElement) {
  static properties = {
    fractal: {},
  };

  static styles = [elementStyle, layoutStyle];

  render() {
    const image = this.cmsFractalStore.image[this.fractal];

    let imagePreview;

    if (image) {
      const altText = image.altText;
      const imageUrl = image.small?.file.url;

      imagePreview = html`
        <img class="preview" alt="${altText}" src="${imageUrl}" />
      `;
    }

    return html`
      <div class="content-block center">${imagePreview}</div>
    `;
  }
}

customElements.define("fractal-image-preview-block", FractalImagePreviewBlock);
