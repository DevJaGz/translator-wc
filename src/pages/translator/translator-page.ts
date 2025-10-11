import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/app-layout';
import './translator-selector/translator-selector';
import { translatorService } from './translator.service';

@customElement('translator-page')
export class TranslatorPage extends LitElement {
  readonly #service = translatorService;

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`
      <app-layout
        @language-selected=${(event: CustomEvent) =>
          this.#service.setFromSelectorLanguage(event.detail)}>
        <translator-selector
          .languageCode="${this.#service.dto.fromSelector
            .languageCode}"></translator-selector>
      </app-layout>
    `;
  }
}
