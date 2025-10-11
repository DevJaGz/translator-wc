import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { translatorService } from './translator.service';
import '../../components/app-layout';
import './translator-input/transator-input';
import './translator-output/translator-output';
import './language-selector/language-selector';

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
        <form>
          <div class="language-selection">
            <language-selector
              class="language-selection__selector"
              .languageCode="${this.#service.dto.fromSelector
                .languageCode}"></language-selector>
            <button class="btn">⇄</button>
            <language-selector
              class="language-selection__selector"
              .languageCode="${this.#service.dto.toSelector
                .languageCode}"></language-selector>
          </div>
          <div class="translator-io">
            <translator-input class="translator-io__input"></translator-input>
            <translator-output
              class="translator-io__output"></translator-output>
          </div>
        </form>
      </app-layout>
    `;
  }
}
