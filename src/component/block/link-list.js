import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import cmsLinkStore from "@/store/cms-link";
import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

class LinkListBlock extends MobxLitElement {
  static properties = {
    linkList: {},
    listStyle: {},
  };

  static styles = [elementStyle, layoutStyle];

  cmsLinkStore;

  connectedCallback() {
    super.connectedCallback();

    this.cmsLinkStore.fetchLink({ link: this.linkList }).catch((error) => {
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
      this.cmsLinkStore.fetchLink({ link: this.linkList }).catch((error) => {
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
      <div class="content-block ${justification}">
        <div>${linkLabelContent}</div>
        <div>
          <ul class="${linkListClass}">
            ${linkContent}
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define("link-list-block", LinkListBlock);
