import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LanguageCode } from '../config';
import { translatorService } from '../translator.service';

@customElement('language-selector')
export class LanguageSelector extends LitElement {
  @property({ type: String })
  languageCode = '';

  readonly #service = translatorService;

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  protected handleSelection(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value as LanguageCode;

    const languageSelectedEvent = new CustomEvent<LanguageCode>(
      'language-selected',
      {
        detail: selectedLanguage as LanguageCode,
        bubbles: true,
        composed: true,
      },
    );

    this.dispatchEvent(languageSelectedEvent);
  }

  render() {
    return html`
      <select
        @change=${(event: Event) => this.handleSelection(event)}
        id="langauge"
        name="langauge"
        class="select select-primary w-full">
        ${this.#service.dto.languages.map(
          (language) =>
            html`<option
              .selected="${this.languageCode === language.code}"
              value=${language.code}>
              ${language.name}
            </option>`,
        )}
      </select>
    `;
  }
}
