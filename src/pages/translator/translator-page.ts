import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { translatorService } from './translator.service';
import '../../components/app-layout';
import './language-selection/language-selection';

@customElement('translator-page')
export class TranslatorPage extends LitElement {
  readonly #service = translatorService;

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
