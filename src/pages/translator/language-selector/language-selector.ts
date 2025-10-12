import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Language, LanguageCode } from '../config';
import { translatorService } from '../translator.service';
import { UnsubscribeFn } from '../translator.store';

export const SelectorType = {
  FROM: 'fromSelector',
  TO: 'toSelector',
} as const;
export type SelectorType = (typeof SelectorType)[keyof typeof SelectorType];

export interface LanguageSelectorEvent {
  selectedLanguage: LanguageCode;
  selectorType: SelectorType;
}

@customElement('language-selector')
export class LanguageSelector extends LitElement {
  @property({ type: String })
  languageCode = '';

  @property({ type: String })
  selectorType: SelectorType = SelectorType.FROM;

  @state()
  isLoading = false;

  list: Language[] = [];
  unsubscribeFn!: UnsubscribeFn;

  readonly #service = translatorService;

  constructor() {
    super();
    this.unsubscribeFn = this.#service.listenChanges((state) => {
      this.isLoading = state.loading !== null;
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.list =
      this.selectorType === 'toSelector'
        ? this.#service.state.languages.filter((lang) => lang.code !== 'auto')
        : this.#service.state.languages;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribeFn();
  }

  protected handleSelection(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value as LanguageCode;

    const languageSelectedEvent = new CustomEvent<LanguageSelectorEvent>(
      'language-selected',
      {
        detail: {
          selectedLanguage: selectedLanguage as LanguageCode,
          selectorType: this.selectorType,
        },
        bubbles: true,
        composed: true,
      },
    );

    this.dispatchEvent(languageSelectedEvent);
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`
      <select
        @change="${this.handleSelection}"
        class="select  w-full"
        .id="${this.selectorType}"
        .name="${this.selectorType}"
        .disabled="${this.isLoading}"
        >
        ${this.list.map(
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
