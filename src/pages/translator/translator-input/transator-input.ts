import { LitElement, PropertyValues, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';

@customElement('translator-input')
export class TranslatorInput extends LitElement {
  @query('#input-textarea')
  inputTextarea!: HTMLTextAreaElement;

  firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.inputTextarea.focus();
    this.inputTextarea.addEventListener(
      'input',
      this.resizeTextarea.bind(this),
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.inputTextarea.removeEventListener(
      'input',
      this.resizeTextarea.bind(this),
    );
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html` <fieldset class="flex flex-col h-full w-full">
      <textarea
        id="input-textarea"
        name="input-textarea"
        class="flex-1 focus-visible:outline-0 resize-none overflow-hidden"
        placeholder="Write what you want to translate here"
        maxlength="5000"></textarea>
      <div >Optional</div>
    </fieldset>`;
  }

  protected resizeTextarea() {
    this.inputTextarea.style.height = 'auto';
    this.inputTextarea.style.height = `${this.inputTextarea.scrollHeight}px`;
  }
}
