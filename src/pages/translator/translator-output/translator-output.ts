import { LitElement, PropertyValues, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { translatorService } from '../translator.service';
import { Unsubscriber } from '../translator.store';

@customElement('translator-output')
export class TranslatorOutput extends LitElement {
  @state()
  translation = '';

  readonly #service = translatorService;
  translationSubscription: Unsubscriber | null = null;

  firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.translationSubscription = this.#service.listenChanges((state) => {
      this.translation = state.translation;
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.translationSubscription!();
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
        >${this.translation}</output
      >

      <div class="flex justify-between items-center flex-wrap gap-2">
        <div class="flex gap-2">
          <button
            type="button"
            class="btn btn-ghost btn-circle">
            <span class="material-symbols-outlined"> volume_up </span>
          </button>
        </div>
        <button
          type="button"
          class="btn btn-ghost btn-circle">
          <span class="material-symbols-outlined"> content_copy </span>
        </button>
      </div>
    </div>`;
  }
}
