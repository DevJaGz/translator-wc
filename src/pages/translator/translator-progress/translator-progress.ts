import { LitElement, PropertyValues, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { translatorService } from '../translator.service';
import { Unsubscriber } from '../translator.store';

@customElement('translator-progress')
export class TranslatorProgress extends LitElement {
  @state()
  progress = 0;

  readonly #service = translatorService;
  subscription: Unsubscriber | null = null;

  constructor() {
    super();
    this.subscription = this.#service.listenChanges((state) => {
      if (state.status === 'downloading') {
        const totalProgress = Object.keys(state.progress).length;
        const languageDetectorProgress = state.progress.LanguageDetector ?? 0;
        const translatorProgress = state.progress.Translator ?? 0;
        const progress = languageDetectorProgress + translatorProgress;
        const computedProgress = progress / totalProgress;
        this.progress = computedProgress;
      }
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.subscription!();
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`<div class="flex flex-col items-center h-full  gap-2">
      <p class="text-center text-sm text-secondary max-w-90">
        Fetching models... <br />
        It can take a while when you first visit this page to populate the
        cache. Later refreshes will be faster.
      </p>
      <progress
        class="progress w-56 text-secondary"
        .value="${this.progress}"
        max="1"></progress>
    </div>`;
  }
}
