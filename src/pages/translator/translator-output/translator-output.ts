import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('translator-output')
export class TranslatorOutput extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`<div class="flex flex-col h-full">
      <output class="flex-1">TranslatorOutput works</output>

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
