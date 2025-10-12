import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { translatorService } from '../translator.service';
import { TranslatorState } from '../translator.store';

export type ToastSeverity = 'info' | 'error';
export type ToastIcon = 'Info' | 'Error';

export interface ToastContentBase {
  text: string;
}
export interface ToastContentProgress extends ToastContentBase {
  type: 'progress';
  progress: number;
}

export interface ToastContentText extends ToastContentBase {
  type: 'text';
}

export type ToastContent = null | ToastContentProgress | ToastContentText;
export interface ToastData {
  severity: ToastSeverity;
  content: ToastContent;
  icon: ToastIcon;
}

@customElement('translator-toast')
export class TranslatorToast extends LitElement {
  @state()
  data: ToastData | null = {
    content: {
      type: 'text',
      text: 'Model Translator is downloading (50%)...',
    },
    severity: 'info',
    icon: 'Info',
  };

  readonly #service = translatorService;

  constructor() {
    super();
    this.#service.listenChanges((state) => {
      const canShow = state.loading?.type === 'model' || state.error !== null;
      this.data = canShow
        ? {
            severity: this.getSeverity(state),
            content: this.getContent(state),
            icon: this.getIcon(state),
          }
        : null;
    });
  }

  protected getSeverity({ error }: TranslatorState): ToastSeverity {
    return error ? 'error' : 'info';
  }

  protected getIcon({ error }: TranslatorState): ToastIcon {
    return error ? 'Error' : 'Info';
  }

  protected getContent(state: TranslatorState): ToastContent {
    const { error, loading } = state;
    if (error) {
      return {
        type: 'text',
        text: error.message,
      };
    }
    if (loading?.type === 'model') {
      const progress = this.getProgress(state);
      const percentage = Math.round(progress * 100);
      return {
        type: 'progress',
        progress,
        text: `Model <strong>${loading.name}</strong> is downloading (${percentage}%) ...`,
      };
    }
    return null;
  }

  protected getProgress({ loading }: TranslatorState): number {
    return loading?.type === 'model' ? loading.progress : 0;
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`<div
      class="translator-toast"
      data-severity="${this.data?.severity ?? ''}"
      data-content-type="${this.data?.content?.type ?? ''}">
      <span class="material-symbols-outlined translator-toast__icon">
        ${this.data?.icon}
      </span>
      <div class="translator-toast__content">
        <p .innerHTML="${this.data?.content?.text ?? ''}"></p>
        <progress
          class="progress text-secondary"
          .value="${(this.data?.content as ToastContentProgress)?.progress ?? ''}"
          max="1"></progress>
      </div>
    </div>`;
  }
}
