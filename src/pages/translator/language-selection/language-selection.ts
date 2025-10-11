import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './language-selector';
import { translatorService } from '../translator.service';

@customElement('language-selection')
export class LanguageSelection extends LitElement {
  readonly #service = translatorService;

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`<div class="language-selection">
      <language-selector
      class="language-selection__selector"
        .languageCode="${this.#service.dto.fromSelector
          .languageCode}"></language-selector>
      <button class="btn">⇄</button>
      <language-selector
        class="language-selection__selector"
        .languageCode="${this.#service.dto.toSelector
          .languageCode}"></language-selector>
    </div>`;
  }
}
