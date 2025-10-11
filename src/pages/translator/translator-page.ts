import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/app-layout';

@customElement('translator-page')
export class TranslatorPage extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`
      <app-layout>
        TranslatorPage Works
      </app-layout>
    `;
  }
}
