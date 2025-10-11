import { startApp } from '@open-cells/core';
import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
import { styles } from './app-index.css.js';
import mainStyles from '../css/main.css?inline';
import './app-header';

startApp({
  routes,
  mainNode: 'app-content',
});

@customElement('app-index')
export class AppIndex extends LitElement {
  elementController = new ElementController(this);

  static styles = [unsafeCSS(mainStyles), styles];

  render() {
    return html`
      <app-header></app-header>
      <main
        role="main"
        tabindex="-1">
        <slot></slot>
      </main>
    `;
  }
}
