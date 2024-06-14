import { html, css, LitElement } from "lit-element";

import commonElementStyle from "@/style/common-element";
import layoutStyle from "@/style/layout";
import utilityStyle from "@/style/utility";

const paginationStyle = css`
  .button {
    text-align: center;
    padding: 0.25rem 0.25rem 0.125rem;
    border-radius: 0.25rem;
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

class PaginationControlsBlock extends LitElement {
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

  _dispatchPageClickEvent(pageNumber) {
    return (e) => {
      const isActive = e.target.classList.contains("active");

      if (!isActive) {
        return;
      }

      this.dispatchEvent(
        new CustomEvent("page-click", {
          bubbles: true,
          composed: true,
          detail: { page: pageNumber },
        }),
      );
    };
  }

  render() {
    const totalPages = Math.ceil(this.total / Number(this.pageSize));
    const page = Number(this.page);
    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;
    const previousButtonsClass = `button ${isFirstPage ? "inactive" : "active"}`;
    const nextButtonsClass = `button ${isLastPage ? "inactive" : "active"}`;

    const firstPageClickEvent = this._dispatchPageClickEvent(1);
    const previousPageClickEvent = this._dispatchPageClickEvent(Math.max(page - 1, 1));
    const nextPageClickEvent = this._dispatchPageClickEvent(
      Math.min(page + 1, totalPages),
    );
    const lastPageClickEvent = this._dispatchPageClickEvent(totalPages);

    let firstPageButton = html`
      <span
        role="button"
        @click="${firstPageClickEvent}"
        class="${previousButtonsClass}"
        >&lt;&lt;</span
      >
    `;

    let previousPageButton = html`
      <span
        role="button"
        @click="${previousPageClickEvent}"
        class="${previousButtonsClass}"
        >&lt;</span
      >
    `;

    if (!isFirstPage) {
      firstPageButton = html` <a>${firstPageButton}</a> `;

      previousPageButton = html` <a>${previousPageButton}</a> `;
    }

    let nextPageButton = html`
      <span
        role="button"
        @click="${nextPageClickEvent}"
        class="${nextButtonsClass}"
        >&gt;</span
      >
    `;

    let lastPageButton = html`
      <span
        role="button"
        @click="${lastPageClickEvent}"
        class="${nextButtonsClass}"
        >&gt;&gt;</span
      >
    `;

    if (!isLastPage) {
      nextPageButton = html` <a>${nextPageButton}</a> `;

      lastPageButton = html` <a>${lastPageButton}</a> `;
    }

    const pageButtons = [];

    pageButtons.push(firstPageButton);
    pageButtons.push(previousPageButton);

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const isCurrentPage = page === currentPage;
      const pageButtonClass = `button ${isCurrentPage ? "inactive" : "active"}`;
      const pageClickEvent = this._dispatchPageClickEvent(currentPage);

      let pageButton = html`
        <span
          role="button"
          @click="${pageClickEvent}"
          class="${pageButtonClass}"
          >${currentPage}</span
        >
      `;

      if (!isCurrentPage) {
        pageButton = html` <a>${pageButton}</a> `;
      }

      pageButtons.push(pageButton);
    }

    pageButtons.push(nextPageButton);
    pageButtons.push(lastPageButton);

    return html`<div class="content-block center">${pageButtons}</div>`;
  }
}

customElements.define("pagination-controls-block", PaginationControlsBlock);
