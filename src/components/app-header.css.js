import { css } from 'lit';

export const styles = css`
  .header__logo {
    display: flex;
    gap: 0.5rem;
    margin-inline: auto;
    width: fit-content;
    padding: 0.75rem 1rem;
  }

  .tab {
    display: flex;
    height: fit-content;
    padding: 0;
    transition: transform 0.1s ease-in-out;
  }

  .tab > a {
    padding: 0.5rem 0.75rem;
  }

  .tab:active {
    scale: 0.95;
  }
`;
