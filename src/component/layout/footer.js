import { html } from "lit-element";

import LightMobxLitElement from "@/component/base/light-mobx-lit-element";

import "@/component/common/content";
import "@/component/common/linkList";

class PageFooter extends LightMobxLitElement {
  static sectionSlug = "page-footer";
  static siteLinkSlug = "site-links";
  static socialLinkSlug = "social-links";

  render() {
    return html`
      <div class="root-section dark-container">
        <div class="content column-layout">
          <page-content section="${PageFooter.sectionSlug}"></page-content>
          <link-list
            linkList="${PageFooter.siteLinkSlug}"
            listStyle="undecorated"
          ></link-list>
          <link-list
            linkList="${PageFooter.socialLinkSlug}"
            listStyle="undecorated"
          ></link-list>
        </div>
      </div>
    `;
  }
}

customElements.define("page-footer", PageFooter);
