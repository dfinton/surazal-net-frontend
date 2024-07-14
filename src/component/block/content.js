import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import CmsPageMixin from "@/mixin/cms-page";
import ConvertCmsDocumentObjectMixin from "@/mixin/convert-cms-document-object";
import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

class ContentBlock extends CmsPageMixin(
  ConvertCmsDocumentObjectMixin(MobxLitElement),
) {
  static properties = {
    section: {},
  };

  static styles = [elementStyle, layoutStyle];

  async connectedCallback() {
    super.connectedCallback();

    await this.fetchCmsPage({ section: this.section });
  }

  async willUpdate(changedProperties) {
    if (!changedProperties.size) {
      return;
    }

    if (changedProperties.has("section")) {
      await this.fetchCmsPage({ section: this.section });
    }
  }

  render() {
    const page = this.cmsPageStore.page[this.section];
    const content = page?.content?.document;

    let htmlContent;

    if (content) {
      htmlContent = content.map((pageDocument) => {
        const pageElement = this.convertDocumentObjectToElement({
          documentObject: pageDocument,
        });

        return html`<div>${pageElement}</div>`;
      });
    }

    return html`<div class="content-block">${htmlContent}</div>`;
  }
}

customElements.define("content-block", ContentBlock);
