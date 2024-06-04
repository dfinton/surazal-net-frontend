import { html } from "lit-element";
import { MobxLitElement } from "@adobe/lit-mobx";

import ConvertDocumentObjectToElement from "@/mixin/convert-cms-document-object";
import cmsPageStore from "@/store/cms-page";
import commonElementStyle from "@/style/common-element";
import layoutStyle from "@/style/layout";
import utilityStyle from "@/style/utility";

const pageStoreErrorHandler =
  ({ section }) =>
  (error) =>
    console.error(
      `An error was encountered fetching page content data for section "${section}":\n`,
      error.message,
    );

class ContentBlock extends ConvertDocumentObjectToElement(MobxLitElement) {
  static properties = {
    section: {},
  };

  static styles = [commonElementStyle, layoutStyle, utilityStyle];

  cmsPageStore;

  connectedCallback() {
    super.connectedCallback();

    this.cmsPageStore
      .fetchPage({ sectionSlug: this.section })
      .catch(pageStoreErrorHandler({ section: this.section }));
  }

  willUpdate(changedProperties) {
    if (!changedProperties.size) {
      return;
    }

    if (changedProperties.has("section")) {
      this.cmsPageStore
        .fetchPage({ sectionSlug: this.section })
        .catch(pageStoreErrorHandler({ section: this.section }));
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

    return html`<div class="content-block">${htmlContent}</div>`;
  }
}

customElements.define("content-block", ContentBlock);
