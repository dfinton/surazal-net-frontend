import { html } from "lit";

export default (SuperClass) => class ConvertCmsDocumentObject extends SuperClass {
  convertDocumentObjectToElement({ documentObject }) {
    if (documentObject.children) {
      let childrenHtml = documentObject.children.map((child, childIndex) => {
        return this.convertDocumentObjectToElement({
          documentObject: child,
        });
      });

      let textAlignClass;

      switch (documentObject.textAlign) {
        case "center":
          textAlignClass = "center";
          break;
        case "end":
          textAlignClass = "right";
          break;
        default:
          textAlignClass = "left";
          break;
      }

      if (documentObject.type === "paragraph") {
        return html`<p class=${textAlignClass}>${childrenHtml}</p>`;
      }

      if (documentObject.type === "blockquote") {
        return html`<blockquote>${childrenHtml}</blockquote>`;
      }

      if (documentObject.type === "link") {
        return html`
          <a href=${documentObject.href} target="_blank" rel="noreferrer"
            >${childrenHtml}</a
          >
        `;
      }

      if (documentObject.type === "heading") {
        switch (documentObject.level) {
          case 1:
            return html`<h1 class=${textAlignClass}>${childrenHtml}</h1>`;
          case 2:
            return html`<h2 class=${textAlignClass}>${childrenHtml}</h2>`;
          case 3:
            return html`<h3 class=${textAlignClass}>${childrenHtml}</h3>`;
          case 4:
            return html`<h4 class=${textAlignClass}>${childrenHtml}</h4>`;
          case 5:
            return html`<h5 class=${textAlignClass}>${childrenHtml}</h5>`;
          case 6:
            return html`<h6 class=${textAlignClass}>${childrenHtml}</h6>`;
          default:
        }
      }

      if (documentObject.type === "code") {
        return html`<pre>${childrenHtml}</pre>`;
      }

      if (documentObject.type === "divider") {
        return html`<hr />`;
      }

      if (documentObject.type === "unordered-list") {
        return html`<ul>
          ${childrenHtml}
        </ul>`;
      }

      if (documentObject.type === "ordered-list") {
        return html`<ol>
          ${childrenHtml}
        </ol>`;
      }

      if (documentObject.type === "list-item") {
        return html`<li>${childrenHtml}</li>`;
      }

      if (documentObject.type === "layout") {
        const layoutSubclass = html`layout-${documentObject.layout.join("-")}`;

        return html`
          <div class=${["layout", layoutSubclass].join(" ")}>${childrenHtml}</div>
        `;
      }

      if (documentObject.type === "layout-area") {
        return html`<div class="layout-area">${childrenHtml}</div>`;
      }

      return html`<div>${childrenHtml}</div>`;
    }

    let documentElement = documentObject.text;

    if (documentObject.bold) {
      documentElement = html`<strong>${documentElement}</strong>`;
    }

    if (documentObject.italic) {
      documentElement = html`<em>${documentElement}</em>`;
    }

    if (documentObject.underline) {
      documentElement = html`<u>${documentElement}</u>`;
    }

    if (documentObject.strikethrough) {
      documentElement = html`<s>${documentElement}</s>`;
    }

    if (documentObject.code) {
      documentElement = html`<code>${documentElement}</code>`;
    }

    if (documentObject.keyboard) {
      documentElement = html`<kbd>${documentElement}</kbd>`;
    }

    if (documentObject.subscript) {
      documentElement = html`<sub>${documentElement}</sub>`;
    }

    if (documentObject.superscript) {
      documentElement = html`<sup>${documentElement}</sup>`;
    }

    return html`<span>${documentElement}</span>`;
  }
}
