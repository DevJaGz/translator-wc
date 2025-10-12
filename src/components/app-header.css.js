import { css } from 'lit';

export const styles = css`
  .header__logo {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-inline: auto;
    width: fit-content;
    line-height: 1.5;
    font-size: 1.325rem;
    user-select: none;
    color: var(--text-secondary);
    font-weight: 500;

    .header__logo__traductor {
      font-weight: 400;
    }
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
