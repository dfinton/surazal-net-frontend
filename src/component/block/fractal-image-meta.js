import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsFractalMixin from "@/mixin/cms-fractal";
import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

class FractalImageMetaBlock extends CmsFractalMixin(MobxLitElement) {
  static properties = {
    fractal: {},
  };

  static styles = [elementStyle, layoutStyle];

  render() {
    const image = this.cmsFractalStore.image[this.fractal];

    let imageMeta;

    if (image) {
      const imageName = image.name;
      const imageFiles = [image.thumbnail, image.small, image.medium, image.large];
      const imageLinks = [];

      for (const imageFile of imageFiles) {
        if (imageFile) {
          imageLinks.push(html`
            <li>
              <a href="${imageFile.file.url}">
                ${imageFile.file.width}x${imageFile.file.height} pixels
              </a>
            </li>
          `);
        }
      }

      imageMeta = html`
        <h3>${imageName}</h3>
        <div>
          <ul class="horizontal-list">
            ${imageLinks}
          </ul>
        </div>
      `;
    }

    return html`
      <div class="content-block center">${imageMeta}</div>
    `;
  }
}

customElements.define("fractal-image-meta-block", FractalImageMetaBlock);
