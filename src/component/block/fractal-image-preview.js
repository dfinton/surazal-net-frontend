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
    let altText = "No preview image found"

    if (image && image.small) {
      const imageUrl = image.small.file.url;

      altText = image.altText;

      imagePreview = html`
        <div class="image-frame">
          <div class="image">
            <a href="${imageUrl}">
              <img class="preview" alt="${altText}" src="${imageUrl}" />
            </a>
          </div>
        </div>
      `;
    }

    return html`
      <div class="content-block flex-center">${imagePreview}</div>
    `;
  }
}

customElements.define("fractal-image-preview-block", FractalImagePreviewBlock);
