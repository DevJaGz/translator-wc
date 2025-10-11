import { LitElement, PropertyValues, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageController } from '@open-cells/page-controller';
import { styles } from './app-header.css.js';
import mainStyles from '../css/main.css?inline';

@customElement('app-header')
export class AppHeader extends LitElement {
  readonly #linkNavigation = new LinkNavigation(this);
  pageController = new PageController(this);

  static styles = [unsafeCSS(mainStyles), styles];

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated?.(_changedProperties);
    this.#linkNavigation.handleInitialActiveLink();
  }

  render() {
    return html`<header>
      <h1
        class="header__logo google-logo"
        aria-label="Google Traductor">
        <div>
          <span>G</span>
          <span>o</span>
          <span>o</span>
          <span>g</span>
          <span>l</span>
          <span>e</span>
        </div>
        <span class="traductor">Traductor</span>
      </h1>
      <nav class="w-fit mx-auto">
        <ul class="tabs tabs-box">
          <li class="tab">
            <a
              data-name="translator"
              @click="${(event: MouseEvent) =>
                this.#linkNavigation.handleLinkClicked(event)}">
              Traductor
            </a>
          </li>
          <li class="tab">
            <a
              data-name="credits"
              @click="${(event: MouseEvent) =>
                this.#linkNavigation.handleLinkClicked(event)}">
              Créditos
            </a>
          </li>
        </ul>
      </nav>
    </header>`;
  }
}

class LinkNavigation {
  #lastLinkActive: HTMLElement | null = null;

  constructor(protected appHeader: AppHeader) {}

  handleInitialActiveLink(): void {
    const { name } = this.appHeader.pageController.getCurrentRoute();
    const link = this.appHeader.shadowRoot!.querySelector(
      `a[data-name="${name}"]`,
    ) as HTMLElement;
    this.handleLinkUpdates(link);
  }

  handleLinkClicked(event: MouseEvent): void {
    const link = event.target as HTMLElement;
    this.handleLinkUpdates(link);
  }

  protected handleLinkUpdates(link: HTMLElement): void {
    const name = link.dataset.name!;
    this.appHeader.pageController.navigate(name);
    this.handleActiveLink(link);
  }

  protected handleActiveLink(link: HTMLElement): void {
    if (link === this.#lastLinkActive) return;
    const cssClass = 'tab-active';
    link.parentElement!.classList.add(cssClass);
    this.#lastLinkActive?.parentElement!.classList.remove(cssClass);
    this.#lastLinkActive = link;
  }
}
