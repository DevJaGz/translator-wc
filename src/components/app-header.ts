import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';
import { styles } from './app-header.css.js';
import mainStyles from '../css/main.css?inline';

@customElement('app-header')
export class AppHeader extends LitElement {
  pageController = new PageController(this);

  static styles = [unsafeCSS(mainStyles), styles];

  render() {
    return html`<header>
      <h1
        class="header__logo"
        aria-label="Google Traductor">
        <div class="google-logo">
          <span>G</span>
          <span>o</span>
          <span>o</span>
          <span>g</span>
          <span>l</span>
          <span>e</span>
        </div>
        <span class="traductor">Traductor</span>
      </h1>
    </header>`;
  }
}