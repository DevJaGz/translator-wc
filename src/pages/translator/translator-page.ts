import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/app-layout';
import './language-selection/language-selection';

@customElement('translator-page')
export class TranslatorPage extends LitElement {

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`
      <app-layout>
        <language-selection></language-selection>
      </app-layout>
    `;
  }
}
