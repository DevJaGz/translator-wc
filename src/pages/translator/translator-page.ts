import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { translatorService } from './translator.service';
import {
  LanguageSelectorEvent,
  SelectorType,
} from './language-selector/language-selector';
import '../../components/app-layout';
import './translator-input/transator-input';
import './translator-output/translator-output';
import './language-selector/language-selector';
import { PageController } from '@open-cells/page-controller';

@customElement('translator-page')
export class TranslatorPage extends LitElement {
  readonly #service = translatorService;
  readonly #pageController = new PageController(this);

  constructor() {
    super();
    const hasBrowserSupport = translatorService.hasBrowserSupport();
    if (!hasBrowserSupport) {
      this.#pageController.navigate('not-supported');
    }
  }

  onLanguageSelected(event: CustomEvent<LanguageSelectorEvent>) {
    const { selectorType, selectedLanguage } = event.detail;

    if (selectorType === SelectorType.FROM) {
      this.#service.setFromSelectorLanguage(selectedLanguage);
      return;
    }

    this.#service.setToSelectorLanguage(selectedLanguage);
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`
      <app-layout>
        <form
          @language-selected="${(event: CustomEvent<LanguageSelectorEvent>) =>
            this.onLanguageSelected(event)}">
          <div class="language-selection">
            <language-selector
              class="language-selection__selector"
              .selectorType="${SelectorType.FROM}"
              .languageCode="${this.#service.dto.fromSelector
                .languageCode}"></language-selector>
            <button
              type="button"
              class="btn btn-ghost btn-circle">
              <span class="material-symbols-outlined"> swap_horiz </span>
            </button>
            <language-selector
              class="language-selection__selector"
              .selectorType="${SelectorType.TO}"
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
