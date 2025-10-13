import { LitElement, PropertyValues, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { translatorService } from '../translator.service';
import { debounceText } from '../../../utils/debounce-text';
import { UnsubscribeFn } from '../translator.store';

@customElement('translator-input')
export class TranslatorInput extends LitElement {
  @query('#input-textarea')
  inputTextarea!: HTMLTextAreaElement;

  @state()
  textCount = 0;

  @state()
  isLoading = false;

  @state()
  currentText = '';

  readonly #service = translatorService;
  readonly debounceTranslate: (text: string) => void;
  unsubscribeFn!: UnsubscribeFn;

  constructor() {
    super();
    this.debounceTranslate = debounceText(
      this.debounceTranslateCallback.bind(this),
      300,
    );
    this.unsubscribeFn = this.#service.listenChanges((state) => {
      this.isLoading = state.loading?.type === 'static';
      if (this.currentText !== state.sourceText) {
        this.currentText = state.sourceText;
      }
    });
  }

  firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.inputTextarea.focus();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribeFn();
  }

  protected debounceTranslateCallback(text: string) {
    this.currentText = text;
    this.#service.translate(text);
  }

  protected onHandleInput() {
    this.debounceTranslate(this.inputTextarea.value);
    this.resizeTextarea();
  }

  protected resizeTextarea() {
    this.inputTextarea.style.height = 'auto';
    this.inputTextarea.style.height = `${this.inputTextarea.scrollHeight}px`;
    this.textCount = this.inputTextarea.value.length;
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html` <fieldset class="flex flex-col h-full">
      <textarea
        id="input-textarea"
        name="input-textarea"
        class="flex-1 focus-visible:outline-0 resize-none overflow-hidden text-2xl"
        maxlength="5000"
        .value="${this.currentText}"
        @input="${this.onHandleInput}"></textarea>
      <div class="flex justify-between items-center flex-wrap gap-2">
        <div class="flex gap-2">
          <button
            type="button"
            class="btn btn-ghost btn-circle">
            <span class="material-symbols-outlined"> mic </span>
          </button>
          <button
            type="button"
            class="btn btn-ghost btn-circle">
            <span class="material-symbols-outlined"> volume_up </span>
          </button>
        </div>
        <span class="text-secondary  text-xs"> ${this.textCount} / 5000</span>
      </div>
    </fieldset>`;
  }
}
