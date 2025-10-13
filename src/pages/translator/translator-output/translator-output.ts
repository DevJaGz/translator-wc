import { LitElement, PropertyValues, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { translatorService } from '../translator.service';
import { UnsubscribeFn } from '../translator.store';

@customElement('translator-output')
export class TranslatorOutput extends LitElement {
  @state()
  translation = '';

  @state()
  isLoading = false;

  @state()
  isSpeaking = false;

  readonly #service = translatorService;
  unsubscribeFn!: UnsubscribeFn;

  firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.unsubscribeFn = this.#service.listenChanges(
      (state) => {
        this.translation = state.translation;
        this.isLoading = state.loading !== null;
        this.isSpeaking = state.isSpeaking;
      },
      { notifyImmediately: true },
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribeFn();
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`<div class="flex flex-col h-full">
      <output
        id="translator-output"
        class="flex-1 text-2xl translator-output"
        data-placeholder="Translation"
        >${this.isLoading ? 'Loading...' : this.translation}</output
      >

      <div class="flex justify-between items-center flex-wrap gap-2">
        <div class="flex gap-2">${this.getSpeakingButton()}</div>
        <button
          style="visibility: ${this.translation === '' ? 'hidden' : 'visible'};"
          @click="${() => this.#service.copyTranslation()}"
          type="button"
          class="btn btn-ghost btn-circle">
          <span class="material-symbols-outlined"> content_copy </span>
        </button>
      </div>
    </div>`;
  }

  getSpeakingButton() {
    const isSpeaking = this.translation && this.isSpeaking;
    if (!this.translation){
      return null;
    }
    if (isSpeaking) {
      return html`<button
        @click="${() => this.#service.stopListeningTranslation()}"
        type="button"
        class="btn btn-ghost btn-circle">
        <span class="material-symbols-outlined"> Stop </span>
      </button>`;
    }
    return html`<button
      @click="${() => this.#service.listenTranslation()}"
      type="button"
      class="btn btn-ghost btn-circle">
      <span class="material-symbols-outlined"> volume_up </span>
    </button>`;
  }
}
