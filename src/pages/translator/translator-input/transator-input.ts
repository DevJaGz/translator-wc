import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('translator-input')
export class TranslatorInput extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`input`;
  }
}
