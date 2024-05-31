import { css } from "lit";

export default css`
  .content {
    margin: 0.5rem;
    min-width: 300px;
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
