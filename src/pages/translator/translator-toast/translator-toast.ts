import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { translatorService } from '../translator.service';

@customElement('translator-toast')
export class TranslatorToast extends LitElement {
  @state()
  isLoading = false;

  @state()
  progress = 0;

  readonly #service = translatorService;

  constructor() {
    super();
    this.#service.listenChanges((state) => {
      this.isLoading = state.loading !== null;
      this.progress =
        state.loading?.type === 'model' ? state.loading.progress : 0;
    });
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`<div >
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
