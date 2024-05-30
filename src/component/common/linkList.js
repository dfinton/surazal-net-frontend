import { html } from "lit-element";

import LightMobxLitElement from "@/component/base/light-mobx-lit-element";
import cmsLinkStore from "@/store/cms-link";

class LinkList extends LightMobxLitElement {
  static properties = {
    linkList: {},
    listStyle: {},
  };

  linkList;
  cmsLinkStore;

  connectedCallback() {
    super.connectedCallback();

    this.cmsLinkStore.fetchLink({ slug: this.linkList }).catch((error) => {
      console.error(
        `An error was encountered fetching link list data for "${this.linkList}":\n`,
        error.message,
      );
    });
  }

  willUpdate(changedProperties) {
    if (!changedProperties.size) {
      return;
    }

    if (changedProperties.has("linkList")) {
      this.cmsLinkStore.fetchLink({ slug: this.linkList }).catch((error) => {
        console.error(
          `An error was encountered fetching link list data for "${this.linkList}":\n`,
          error.message,
        );
      });
    }
  }

  constructor() {
    super();

    this.cmsLinkStore = cmsLinkStore;
  }

  render() {
    const link = this.cmsLinkStore.link[this.linkList];

    const linkLabel = link?.label;
    const linkList = link?.linkList;

    let linkContent;
    let linkLabelContent;
    let justification;
    let linkListClass;

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

    switch (this.listStyle) {
      case "horizontal":
        justification = "center";
        linkListClass = "horizontal-list";
        break;
      case "undecorated":
        justification = "left";
        linkListClass = "undecorated-list";
        break;
      default:
    }

    return html`
      <div class="content ${justification}">
        <div class="content">${linkLabelContent}</div>
        <div class="content">
          <ul class="content ${linkListClass}">
            ${linkContent}
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define("link-list", LinkList);
