import { css } from "lit";

export default css`
  a {
    color: var(--link-color);
    font-weight: bold;
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.25rem 0 0 0;
  }

  ul.horizontal-list {
    list-style: none;
    padding: 0;
    margin: 0.25rem 0 0 0;
  }

  ul.horizontal-list > li {
    display: inline;
  }

  ul.horizontal-list > li:not(:first-child)::before {
    content: "•";
    margin-right: 0.25rem;
    margin-left: 0.25rem;
  }

  ul.undecorated-list {
    padding: 0;
    margin: 0.25rem 0 0 0;
  }

  ul.undecorated-list > li {
    list-style-type: none;
  }
`;
