import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('translator-output')
export class TranslatorOutput extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`<output>TranslatorOutput works</output>`;
  }
}
