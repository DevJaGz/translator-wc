import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { translatorService } from './translator.service';
import {
  LanguageSelectorEvent,
  SelectorType,
} from './language-selector/language-selector';
import { PageController } from '@open-cells/page-controller';
import '../../components/app-layout';
import './translator-input/transator-input';
import './translator-output/translator-output';
import './language-selector/language-selector';

@customElement('translator-page')
export class TranslatorPage extends LitElement {
  @state()
  isReady = true;

  readonly #service = translatorService;
  readonly #pageController = new PageController(this);

  constructor() {
    super();
    const hasBrowserSupport = translatorService.hasBrowserSupport();
    if (!hasBrowserSupport) {
      this.#pageController.navigate('/not-supported');
      return;
    }
  }

  onLanguageSelected(event: CustomEvent<LanguageSelectorEvent>) {
    const { selectorType, selectedLanguage } = event.detail;

    if (selectorType === SelectorType.FROM) {
      this.#service.setSourceLanguageCode(selectedLanguage);
      return;
    }

    this.#service.setTargetLanguageCode(selectedLanguage);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#service.clean();
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`
      <app-layout class="relative h-full overflow-hidden">
        <form
          @language-selected="${(event: CustomEvent<LanguageSelectorEvent>) =>
            this.onLanguageSelected(event)}">
          <div class="language-selection">
            <language-selector
              class="language-selection__selector"
              .selectorType="${SelectorType.FROM}"
              .languageCode="${this.#service.state
                .sourceLanguageCode}"></language-selector>
            <button
              type="button"
              class="btn btn-ghost btn-circle">
              <span class="material-symbols-outlined"> swap_horiz </span>
            </button>
            <language-selector
              class="language-selection__selector"
              .selectorType="${SelectorType.TO}"
              .languageCode="${this.#service.state
                .targetLanguageCode}"></language-selector>
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
