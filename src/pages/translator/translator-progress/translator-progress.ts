import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('translator-progress')
export class TranslatorProgress extends LitElement {
  @property({ type: Number })
  progress = 0;

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
