import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { translatorService } from '../translator.service';
import { ProgressLoading, UnsubscribeFn } from '../translator.store';

@customElement('model-notification')
export class ModelNotification extends LitElement {
  readonly #service = translatorService;
  unsubscribeFn!: UnsubscribeFn;

  @state()
  loadingProgress: ProgressLoading | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.unsubscribeFn = this.#service.listenChanges(
      (state) => {
        const show = state.loading?.type === 'progress';
        this.loadingProgress = show ? (state.loading as ProgressLoading) : null;
      },
      { notifyImmediately: true },
    );
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return this.loadingProgress
      ? html`
          <div class="max-w-90 mx-auto text-sm text-secondary text-center my-4">
            Loading <strong>${this.loadingProgress.name}</strong> model
            (${Math.round(this.loadingProgress.progress * 100)}%)...
            <progress
              class="progress "
              .value="${this.loadingProgress.progress}"
              max="1"></progress>
            <div>
              <small>
                This can take a while the first time. Later refreshes will be
                faster.
              </small>
            </div>
          </div>
        `
      : null;
  }
}
