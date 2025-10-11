import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import mainStyles from '../css/main.css?inline';

@customElement('app-layout')
export class AppLayout extends LitElement {
  static styles = [unsafeCSS(mainStyles)];

  render() {
    return html`
      <div class="max-w-7xl mx-auto mt-8 ">
        <slot></slot>
      </div>
    `;
  }
}
