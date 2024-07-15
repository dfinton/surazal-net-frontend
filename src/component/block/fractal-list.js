import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsFractalMixin from "@/mixin/cms-fractal";
import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

class FractalListBlock extends CmsFractalMixin(MobxLitElement) {
  static styles = [elementStyle, layoutStyle];

  render() {
    const fractalsContent = this.cmsFractalStore.imageSummaryList.map((fractal) => {
      const fractalUrl = `/fractals/image?fractal=${fractal.slug}`;
      const fractalImageUrl = fractal.thumbnail?.file?.url;
      const fractalName = fractal.name;

      return html`
        <div class="image-frame">
          <div class="image flex-center">
            <a href="${fractalUrl}">
              <img src="${fractalImageUrl}" />
            </a>
          </div>
          <div class="image-caption center">
            <a href="${fractalUrl}">
              <h5>${fractalName}</h5>
            </a>
          </div>
        </div>
      `;
    });

    return html`
      <div class="images-container content-block">
        ${fractalsContent}
      </div>
    `;
  }
}

customElements.define("fractal-list-block", FractalListBlock);
