import { html, LitElement } from "lit-element";

import LightMobxLitElement from "../base/light-mobx-lit-element";
import cmsPageStore from "../../store/cms-page";
import ConvertDocumentObjectToElement from "../../mixin/convert-cms-document-object";

class PageHeader extends ConvertDocumentObjectToElement(LightMobxLitElement) {
  static sectionSlug = "page-header";

  cmsPageStore = cmsPageStore;

  async firstUpdated() {
    await cmsPageStore.fetchPage({ sectionSlug: PageHeader.sectionSlug });
  }

  render() {
    const page = this.cmsPageStore.page[PageHeader.sectionSlug];
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

    return html`
      <div class="root-section">
        <div class="light-container">
          <div class="content">${htmlContent}</div>
        </div>
        <div class="dark-container">
          <div class="content">This is a subheaderer</div>
        </div>
      </div>
    `;
  }
}

customElements.define("page-header", PageHeader);
