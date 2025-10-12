import { LanguageCode } from './config';
import { TranslatorApiService } from './translator-api.service';
import { TranslatorStore } from './translator.store';

class TranslatorService {
  #store: TranslatorStore;
  #translatorApi: TranslatorApiService;

  constructor(store: TranslatorStore, translatorApi: TranslatorApiService) {
    this.#store = store;
    this.#translatorApi = translatorApi;
  }

  get dto() {
    return {
      ...this.#store.state,
    };
  }

  get listenChanges() {
    return this.#store.subscribe.bind(this.#store);
  }

  get unlistenChanges() {
    return this.#store.unsubscribe.bind(this.#store);
  }

  translate(text: string) {
    console.log('translate', text);
    this.setTranslation(text);
  }

  hasBrowserSupport() {
    return this.#translatorApi.isSupported() && 'LanguageDetector' in self;
  }

  setFromSelectorLanguage(language: LanguageCode) {
    this.#store.setFromSelectorLanguage(language);
  }

  setToSelectorLanguage(language: LanguageCode) {
    this.#store.setToSelectorLanguage(language);
  }

  setTranslation(translation: string) {
    this.#store.setTranslation(translation);
  }
}

export const translatorService = new TranslatorService(
  new TranslatorStore(),
  new TranslatorApiService(),
);
