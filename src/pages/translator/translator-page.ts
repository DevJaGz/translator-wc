import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { translatorService } from './translator.service';
import {
  LanguageSelectorEvent,
  SelectorType,
} from './language-selector/language-selector';
import { UnsubscribeFn } from './translator.store';
import { LanguageCode } from './config';
import { PageController } from '@open-cells/page-controller';
import '../../components/app-layout';
import './translator-input/transator-input';
import './translator-output/translator-output';
import './language-selector/language-selector';
import './model-notification/model-notification';

@customElement('translator-page')
export class TranslatorPage extends LitElement {
  @state()
  isReady = true;

  @state()
  canSwapLanguages = false;

  readonly #service = translatorService;
  readonly #pageController = new PageController(this);
  unsubscribeFn!: UnsubscribeFn;

  constructor() {
    super();
    const hasBrowserSupport = translatorService.hasBrowserSupport();
    if (!hasBrowserSupport) {
      this.#pageController.navigate('/not-supported');
      return;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribeFn = this.#service.listenChanges(
      (state) => {
        this.canSwapLanguages = state.sourceLanguageCode !== LanguageCode.auto;
      },
      { notifyImmediately: true },
    );
  }

  onLanguageSelected(event: CustomEvent<LanguageSelectorEvent>) {
    const { selectorType, selectedLanguage } = event.detail;

    if (selectorType === SelectorType.SOURCE) {
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
      <model-notification></model-notification>
      <app-layout class="relative h-full overflow-hidden">
        <form
          @language-selected="${(event: CustomEvent<LanguageSelectorEvent>) =>
            this.onLanguageSelected(event)}">
          <div class="language-selection">
            <language-selector
              class="language-selection__selector"
              .selectorType="${SelectorType.SOURCE}"></language-selector>
            <button
              type="button"
              .disabled="${!this.canSwapLanguages}"
              @click="${() => this.#service.swapLanguages()}"
              class="btn btn-ghost btn-circle">
              <span class="material-symbols-outlined"> swap_horiz </span>
            </button>
            <language-selector
              class="language-selection__selector"
              .selectorType="${SelectorType.TARGET}"></language-selector>
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
