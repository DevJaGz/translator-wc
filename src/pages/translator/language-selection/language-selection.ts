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
    return html`<form
      @language-selected=${(event: CustomEvent) =>
        this.#service.setFromSelectorLanguage(event.detail)}>
      <language-selector
        .languageCode="${this.#service.dto.fromSelector
          .languageCode}"></language-selector>
    </form>`;
  }
}
