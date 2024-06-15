import { css } from "lit";

export default css`
  .root-section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.125rem;
    border-radius: 0.25rem;
    border: 0.25rem outset var(--dark-border-color);
    overflow: hidden;
  }

  .light-container {
    background-color: var(--light-background-color);
  }

  .dark-container {
    background-color: var(--dark-background-color);
  }

  .clear-container {
    background-color: var(--clear-background-color);
  }
`;
