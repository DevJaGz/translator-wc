import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/app-layout';
import './language-selection/language-selection';
import './translator-input/transator-input';
import './translator-output/translator-output';

@customElement('translator-page')
export class TranslatorPage extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  render() {
    return html`
      <app-layout>
        <form>
          <language-selection></language-selection>
          <div class="translator-io">
            <translator-input class="translator-io__input"></translator-input>
            <translator-output class="translator-io__output"></translator-output>
          </div>
        </form>
      </app-layout>
    `;
  }
}
