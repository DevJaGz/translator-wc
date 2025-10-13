import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Language, LanguageCode } from '../config';
import { translatorService } from '../translator.service';
import { TranslatorState, UnsubscribeFn } from '../translator.store';

export const SelectorType = {
  SOURCE: 'source',
  TARGET: 'target',
} as const;
export type SelectorType = (typeof SelectorType)[keyof typeof SelectorType];

export interface LanguageSelectorEvent {
  selectedLanguage: LanguageCode;
  selectorType: SelectorType;
}

@customElement('language-selector')
export class LanguageSelector extends LitElement {
  @property({ type: String })
  selectorType: SelectorType = SelectorType.SOURCE;

  @state()
  isLoading = false;

  @state()
  list: Language[] = [];
  unsubscribeFn!: UnsubscribeFn;

  currentSelections: Record<SelectorType, LanguageCode | null> = {
    [SelectorType.SOURCE]: null,
    [SelectorType.TARGET]: null,
  };

  readonly #service = translatorService;

  connectedCallback(): void {
    super.connectedCallback();
    this.updateSelections(this.#service.state);
    this.unsubscribeFn = this.#service.listenChanges((state) => {
      this.isLoading = state.loading !== null;
      this.updateSelections(state);
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribeFn();
  }

  protected updateSelections(state: TranslatorState) {
    if (
      this.currentSelections[SelectorType.TARGET] ===
        state.targetLanguageCode &&
      this.currentSelections[SelectorType.SOURCE] === state.sourceLanguageCode
    ) {
      return;
    }

    this.list =
      this.selectorType === SelectorType.SOURCE
        ? state.languages.filter(
            (lang) => lang.code !== state.targetLanguageCode,
          )
        : state.languages.filter(
            (lang) =>
              ![LanguageCode.auto, state.sourceLanguageCode].includes(
                lang.code,
              ),
          );

    this.currentSelections = {
      [SelectorType.SOURCE]: state.sourceLanguageCode,
      [SelectorType.TARGET]: state.targetLanguageCode,
    };
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
        .disabled="${this.isLoading}">
        ${this.list.map(
          (language) =>
            html`<option
              .selected="${this.currentSelections[this.selectorType] === language.code}"
              value=${language.code}>
              ${language.name}
            </option>`,
        )}
      </select>
    `;
  }
}
