import { css } from "lit";

export default css`
  .blog-post-list-entry {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }

  .blog-post-list-entry > .timestamp {
    flex: 0 1 10rem;
  }

  .blog-post-list-entry > .title {
    flex: 1 1;
  }

  .blog-post-list-entry > .author {
    flex: 0 1 10rem;
    text-align: right;
  }
`;
