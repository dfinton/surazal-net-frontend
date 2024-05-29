import { html } from "lit-element";

import LightMobxLitElement from "@/component/base/light-mobx-lit-element";
import cmsPageStore from "@/store/cms-page";
import cmsLinkStore from "@/store/cms-link";
import ConvertDocumentObjectToElement from "@/mixin/convert-cms-document-object";

import "@/component/common/content";

class PageFooter extends ConvertDocumentObjectToElement(LightMobxLitElement) {
  static sectionSlug = "page-footer";
  static siteLinkSlug = "site-links";
  static socialLinkSlug = "social-links";

  cmsLinkStore;

  constructor() {
    super();

    this.cmsLinkStore = cmsLinkStore;

    const fetchStoreData = Promise.all([
      this.cmsLinkStore.fetchLink({ slug: PageFooter.siteLinkSlug }),
      this.cmsLinkStore.fetchLink({ slug: PageFooter.socialLinkSlug }),
    ]);

    fetchStoreData.catch((error) => {
      console.error(
        "An error was encountered fetching page footer data",
        error.message,
      );
    });
  }

  render() {
    const siteLink = this.cmsLinkStore.link[PageFooter.siteLinkSlug];
    const socialLink = this.cmsLinkStore.link[PageFooter.socialLinkSlug];

    const siteLinkLabel = siteLink?.label;
    const socialLinkLabel = socialLink?.label;
    const siteLinkList = siteLink?.linkList;
    const socialLinkList = socialLink?.linkList;

    let siteLinkContent;
    let socialLinkContent;
    let siteLinkLabelContent;
    let socialLinkLabelContent;

    if (siteLinkLabel) {
      siteLinkLabelContent = html`<h3>${siteLinkLabel}</h3>`;
    }

    if (socialLinkLabel) {
      socialLinkLabelContent = html`<h3>${socialLinkLabel}</h3>`;
    }

    if (siteLinkList) {
      siteLinkContent = siteLinkList.map(
        (siteLink) => html`
          <li>
            <a href="${siteLink.url}">${siteLink.label}</a>
          </li>
        `,
      );
    }

    if (socialLinkList) {
      socialLinkContent = socialLinkList.map(
        (socialLink) => html`
          <li>
            <a href="${socialLink.url}">${socialLink.label}</a>
          </li>
        `,
      );
    }

    return html`
      <div class="root-section dark-container">
        <div class="content column-layout">
          <page-content section="${PageFooter.sectionSlug}"></page-content>
          <div class="content left">
            <div class="content">
              <h3>${siteLinkLabel}</h3>
            </div>
            <div class="content">
              <ul class="undecorated-list">
                ${siteLinkContent}
              </ul>
            </div>
          </div>
          <div class="content left">
            <div class="content">
              <h3>${socialLinkLabel}</h3>
            </div>
            <div class="content">
              <ul class="undecorated-list">
                ${socialLinkContent}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("page-footer", PageFooter);
