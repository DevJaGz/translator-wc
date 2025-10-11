import { Language, LanguageCode, TranslatorConfig } from './config';

export interface TranslatorState {
  languages: Language[];
  fromSelector: {
    languageCode: LanguageCode;
  };
  toSelector: {
    languageCode: LanguageCode;
  };
}

export const INITIAL_STATE: TranslatorState = {
  fromSelector: {
    languageCode: LanguageCode['auto-detect'],
  },
  toSelector: {
    languageCode: LanguageCode['english-united-states'],
  },
  languages: TranslatorConfig.languages,
};

type Observer = (state: TranslatorState) => void;

interface SubscriptionOptions {
  notifyImmediately?: boolean;
  onlyOnce?: boolean;
}

interface Subscription {
  observer: Observer;
  options?: SubscriptionOptions;
}

export class TranslatorStoreReducer {
  #state = INITIAL_STATE;
  state = this.#state as DeepReadonly<TranslatorState>;

  setFromSelectorLanguage(language: LanguageCode) {
    this.setState({
      fromSelector: {
        languageCode: language,
      },
    });
  }

  setToSelectorLanguage(language: LanguageCode) {
    this.setState({
      toSelector: {
        languageCode: language,
      },
    });
  }

  protected setState(state: Partial<TranslatorState>) {
    this.#state = { ...this.#state, ...state };
    this.notify();
  }

  protected notify() {}
}

export class TranslatorStore extends TranslatorStoreReducer {
  #subscriptions: Set<Subscription> = new Set();

  subscribe(observer: Observer, options?: SubscriptionOptions) {
    const subscription: Subscription = { observer, options };
    this.#subscriptions.add(subscription);
    if (options?.notifyImmediately) {
      observer(this.state);
    }
    return subscription;
  }

  unsubscribe(subscription: Subscription) {
    this.#subscriptions.delete(subscription);
  }

  protected override notify() {
    for (const subscription of this.#subscriptions) {
      subscription.observer(this.state);
      if (subscription.options?.onlyOnce) {
        this.unsubscribe(subscription);
      }
    }
  }
}
