import { APIModel, Language, LanguageCode, TranslatorConfig } from './config';

export type Status =
  | 'downloading'
  | 'idle'
  | 'error'
  | 'initializing'
  | 'ready'
  | 'translating';

export interface DownloadingModel {
  type: 'model';
  name: APIModel;
  progress: number;
  details?: string;
}

export interface Translating {
  type: 'translation';
}

export type TranslatorLoading = null | DownloadingModel | Translating;

export type TranslatorError = null | { message: string } ;
export interface TranslatorState {
  languages: Language[];
  sourceLanguageCode: LanguageCode;
  targetLanguageCode: LanguageCode;
  translation: string;
  status: Status;
  loading: TranslatorLoading;
  error: TranslatorError;
}

export const INITIAL_STATE: TranslatorState = {
  sourceLanguageCode: LanguageCode.auto,
  targetLanguageCode: LanguageCode.english,
  languages: TranslatorConfig.languages,
  translation: '',
  status: 'idle',
  loading: null,
  error: null,
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

export type UnsubscribeFn = () => void;

export class TranslatorStoreReducer {
  #state = INITIAL_STATE;
  get state() {
    return this.#state as DeepReadonly<TranslatorState>;
  }

  setSourceLanguageCode(code: LanguageCode) {
    this.setState({
      sourceLanguageCode: code,
    });
  }

  setTargetLanguageCode(code: LanguageCode) {
    this.setState({
      targetLanguageCode: code,
    });
  }

  setTranslation(translation: string) {
    this.setState({ translation });
  }

  setLoading(loading: TranslatorLoading) {
    this.setState({ loading });
  }

  setError(error: TranslatorError) {
    this.setState({ error });
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
