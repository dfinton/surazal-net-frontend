import { html, css, LitElement } from "lit-element";

import commonElementStyle from "@/style/common-element";
import layoutStyle from "@/style/layout";
import utilityStyle from "@/style/utility";

const paginationStyle = css`
  .button {
    text-align: center;
    padding: .25rem .25rem .125rem;
    border-radius: .25rem;
    display: inline-block;
    text-align: center;
    margin: 0 0.125rem 0 0.125rem;
    min-width: 1rem;
    border-radius: 0.25rem;
    border: 0.125rem outset var(--light-border-color);
  }

  .button.inactive {
    background-color: var(--dark-background-color);
  }

  .button.active {
    background-color: var(--light-background-color);
    cursor: pointer;
  }
`;

class PaginationControls extends LitElement {
  static properties = {
    pageSize: {},
    page: {},
    total: {},
  };

  static styles = [
    commonElementStyle,
    layoutStyle,
    utilityStyle,
    paginationStyle,
  ];

  render() {
    const totalPages = Math.ceil(this.total / this.pageSize);
    const isFirstPage = this.page == 1;
    const isLastPage = this.page == totalPages;
    const previousButtonsClass = `button ${isFirstPage ? 'inactive' : 'active'}`;
    const nextButtonsClass = `button ${isLastPage ? 'inactive' : 'active'}`

    let firstPageButton = html`
      <span class="${previousButtonsClass}">&lt;&lt;</span>
    `;

    let previousPageButton = html`
      <span class="${previousButtonsClass}">&lt;</span>
    `;

    if (!isFirstPage) {
      firstPageButton = html`
        <a>${firstPageButton}</a>
      `;

      previousPageButton = html`
        <a>${previousPageButton}</a>
      `
    }

    let nextPageButton = html`
      <span class="${nextButtonsClass}">&gt;</span>
    `;

    let lastPageButton = html`
      <span class="${nextButtonsClass}">&gt;&gt;</span>
    `;

    if (!isLastPage) {
      nextPageButton = html`
        <a>${nextPageButton}</a>
      `;

      lastPageButton = html`
        <a>${lastPageButton}</a>
      `
    }

    const pageButtons = [];

    pageButtons.push(firstPageButton);
    pageButtons.push(previousPageButton);

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const isCurrentPage = this.page == currentPage;
      const pageButtonClass = `button ${isCurrentPage ? 'inactive' : 'active'}`;

      let pageButton = html`
        <span class="${pageButtonClass}">${currentPage}</span>
      `;

      if (!isCurrentPage) {
        pageButton = html`
          <a>${pageButton}</a>
        `;
      }

      pageButtons.push(pageButton);
    }

    pageButtons.push(nextPageButton);
    pageButtons.push(lastPageButton);

    return html`
      <div class="content-block center">
        ${pageButtons}
      </div>
    `;
  }
}

customElements.define("pagination-controls", PaginationControls);
