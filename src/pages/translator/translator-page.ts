import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/app-layout';
import { TranslatorConfig } from './config';

@customElement('translator-page')
export class TranslatorPage extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`
      <app-layout>
        <details class="dropdown">
          <summary class="btn m-1">open or close</summary>
          <ul
            class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            ${TranslatorConfig.languages.map(
              (language) => html`<li><a>${language.name}</a></li>`,
            )}
          </ul>
        </details>
      </app-layout>
    `;
  }
}
