import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/app-layout';

@customElement('not-supported-page')
export class NotSupportedPage extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`
      <app-layout>
        <div
          class="flex flex-col  justify-center h-full mx-auto max-w-xl gap-4">
          <div
            role="alert"
            class="alert alert-vertical  sm:alert-horizontal ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="stroke-primary h-6 w-6 shrink-0">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-secondary"
              >Sorry, your browser is not supported. <br />
              This application requires a more recent version of your browser.
            </span>
          </div>
        </div>
      </app-layout>
    `;
  }
}
