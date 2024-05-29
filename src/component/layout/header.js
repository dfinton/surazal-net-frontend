import { html } from "lit-element";

import LightMobxLitElement from "@/component/base/light-mobx-lit-element";
import cmsPageStore from "@/store/cms-page";
import cmsLinkStore from "@/store/cms-link";
import ConvertDocumentObjectToElement from "@/mixin/convert-cms-document-object";

import "@/component/common/content";

class PageHeader extends ConvertDocumentObjectToElement(LightMobxLitElement) {
  static sectionSlug = "page-header";
  static linkSlug = "site-links";

  cmsLinkStore;

  constructor() {
    super();

    this.cmsLinkStore = cmsLinkStore;

    this.cmsLinkStore.fetchLink({ slug: PageHeader.linkSlug }).catch((error) => {
      console.error(
        "An error was encountered fetching page header data",
        error.message,
      );
    });
  }

  render() {
    const link = this.cmsLinkStore.link[PageHeader.linkSlug];

    const linkLabel = link?.label;
    const linkList = link?.linkList;

    let linkContent;
    let linkLabelContent;

    if (linkLabel) {
      linkLabelContent = html`<h3>${linkLabel}</h3>`;
    }

    if (linkList) {
      linkContent = linkList.map(
        (link) => html`
          <li>
            <a href="${link.url}">${link.label}</a>
          </li>
        `,
      );
    }

    return html`
      <div class="root-section">
        <div class="light-container">
          <page-content section="${PageHeader.sectionSlug}"></page-content>
        </div>
        <div class="dark-container">
          <div class="content center">
            <div>${linkLabelContent}</div>
            <div class="content">
              <ul class="horizontal-list">
                ${linkContent}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("page-header", PageHeader);
