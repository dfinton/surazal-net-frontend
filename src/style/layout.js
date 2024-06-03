import { css } from "lit";

export default css`
  .content-block {
    padding: 0.5rem;
  }

  .column-layout {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    gap: 1rem;
  }
`;
