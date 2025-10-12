import { APIModel, Language, LanguageCode, TranslatorConfig } from './config';

export type Status =
  | 'downloading'
  | 'idle'
  | 'error'
  | 'initializing'
  | 'ready'
  | 'translating';
export interface TranslatorState {
  languages: Language[];
  fromSelector: {
    languageCode: LanguageCode;
  };
  toSelector: {
    languageCode: LanguageCode;
  };
  translation: string;
  status: Status;
  progress: Partial<Record<APIModel, number>>;
}

export const INITIAL_STATE: TranslatorState = {
  fromSelector: {
    languageCode: LanguageCode['auto'],
  },
  toSelector: {
    languageCode: LanguageCode['english'],
  },
  languages: TranslatorConfig.languages,
  translation: '',
  status: 'idle',
  progress: {
    LanguageDetector: 0,
    Translator: 0,
  },
};

export type Observer = (state: TranslatorState) => void;

export interface SubscriptionOptions {
  notifyImmediately?: boolean;
  onlyOnce?: boolean;
}

export interface Subscription {
  observer: Observer;
  options?: SubscriptionOptions;
}

export type Unsubscriber = () => void;

export class TranslatorStoreReducer {
  #state = INITIAL_STATE;
  get state() {
    return this.#state as DeepReadonly<TranslatorState>;
  }

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

  setTranslation(translation: string) {
    this.setState({ translation });
  }

  setProgressByModel(model: APIModel, progress: number) {
    this.setState({ progress: { ...this.state.progress, [model]: progress } });
  }

  setStatus(status: Status) {
    this.setState({ status });
  }

  clean() {
    this.setState(INITIAL_STATE);
  }

  setState(state: Partial<TranslatorState>) {
    this.#state = {
      ...this.#state,
      ...state,
      fromSelector: { ...this.#state.fromSelector, ...state.fromSelector },
      toSelector: { ...this.#state.toSelector, ...state.toSelector },
      progress: { ...this.#state.progress, ...state.progress },
    };
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
    return () => this.unsubscribe(subscription);
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
