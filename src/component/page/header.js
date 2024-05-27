import { html, css, LitElement } from "lit-element";

import LightMobxLitElement from "@/component/base/light-mobx-lit-element";
import cmsPageStore from "@/store/cms-page";
import cmsLinkStore from "@/store/cms-link";
import ConvertDocumentObjectToElement from "@/mixin/convert-cms-document-object";

class PageHeader extends ConvertDocumentObjectToElement(LightMobxLitElement) {
  static sectionSlug = "page-header";
  static linkSlug = "site-links";

  cmsPageStore;
  cmsLinkStore;

  constructor() {
    super();

    this.cmsPageStore = cmsPageStore;
    this.cmsLinkStore = cmsLinkStore;

    const fetchStoreData = Promise.all([
      this.cmsPageStore.fetchPage({ sectionSlug: PageHeader.sectionSlug }),
      this.cmsLinkStore.fetchLink({ slug: PageHeader.linkSlug }),
    ]);

    fetchStoreData
      .catch((error) => {
        console.error("An error was encounter fetching page data", error.message);
      });
  }

  render() {
    const page = this.cmsPageStore.page[PageHeader.sectionSlug];
    const link = this.cmsLinkStore.link[PageHeader.linkSlug];

    const content = page?.content?.document;
    const linkLabel = link?.label;
    const linkList = link?.linkList;

    let htmlContent;
    let linkContent;
    let linkLabelContent;

    if (content) {
      htmlContent = content.map((pageDocument) => {
        const pageElement = this.convertDocumentObjectToElement({
          documentObject: pageDocument,
        });

        return html`<div>${pageElement}</div>`;
      });
    }

    if (linkLabel) {
      linkLabelContent = html`<span>${linkLabel}</span>`
    }

    if (linkList) {
      linkContent = linkList.map((link) =>
        html`
          <li>
            <a href="${link.url}">${link.label}</a>
          </li>
        `
      )
    }

    return html`
      <div class="root-section">
        <div class="light-container">
          <div class="content">${htmlContent}</div>
        </div>
        <div class="dark-container">
          <div class="content center">
            <strong>${linkLabelContent}</strong>
            <div class="horizontal-list">
              <ul>${linkContent}</ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("page-header", PageHeader);
