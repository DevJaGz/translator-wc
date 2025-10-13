import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-to-speech-button')
export class TextToSpeechButton extends LitElement {
  @property({ type: Boolean })
  isSpeaking = false;

  @property({ type: Boolean })
  show = false;

  onStop() {
    const event = new CustomEvent('text-to-speech-play', { detail: false });
    this.dispatchEvent(event);
  }

  onPlay() {
    const event = new CustomEvent('text-to-speech-play', { detail: true });
    this.dispatchEvent(event);
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    const isSpeaking = this.isSpeaking;
    if (!this.show) {
      return null;
    }
    if (isSpeaking) {
      return html`<button
        @click="${this.onStop}"
        type="button"
        class="btn btn-ghost btn-circle">
        <span class="material-symbols-outlined"> Stop </span>
      </button>`;
    }
    return html`<button
      @click="${this.onPlay}"
      type="button"
      class="btn btn-ghost btn-circle">
      <span class="material-symbols-outlined"> volume_up </span>
    </button>`;
  }
}
