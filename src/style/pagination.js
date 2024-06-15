import { css } from "lit";

export default css`
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
