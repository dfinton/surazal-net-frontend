import { css } from "lit";

export default css`
  .root-page {
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .root-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.125rem;
    border-radius: 0.25rem;
    border: 0.25rem outset var(--border-color);
    overflow: hidden;
  }
`;
