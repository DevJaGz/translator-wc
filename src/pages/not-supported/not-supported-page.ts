import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/app-layout';

@customElement('not-supported-page')
export class NotSupportedPage extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`
      <app-layout>
        NotSupportedPage Works
      </app-layout>
    `;
  }
}
