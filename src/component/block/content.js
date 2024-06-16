import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import ConvertCmsDocumentObjectMixin from "@/mixin/convert-cms-document-object";
import cmsPageStore from "@/store/cms-page";
import elementStyle from "@/style/element";
import layoutStyle from "@/style/layout";

class ContentBlock extends ConvertCmsDocumentObjectMixin(MobxLitElement) {
  static properties = {
    section: {},
  };

  static styles = [elementStyle, layoutStyle];

  cmsPageStore;

  async connectedCallback() {
    super.connectedCallback();

    try {
      this.cmsPageStore.fetchPage({ section: this.section });
    } catch (error) {
      console.error(error);
    }
  }

  async willUpdate(changedProperties) {
    if (!changedProperties.size) {
      return;
    }

    if (changedProperties.has("section")) {
      try {
        this.cmsPageStore.fetchPage({ section: this.section });
      } catch (error) {
        console.error(error);
      }
    }
  }

  constructor() {
    super();

    this.cmsPageStore = cmsPageStore;
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

    return html` <div class="content-block">${htmlContent}</div> `;
  }
}

customElements.define("content-block", ContentBlock);
