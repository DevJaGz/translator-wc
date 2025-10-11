import { LanguageCode } from './config';
import { TranslatorStore } from './translator.store';

class TranslatorService {
  #store: TranslatorStore;

  constructor(store: TranslatorStore) {
    this.#store = store;
  }

  get dto() {
    return {
      ...this.#store.state,
    };
  }

  setFromSelectorLanguage(language: LanguageCode) {
    this.#store.setFromSelectorLanguage(language);
  }

  setToSelectorLanguage(language: LanguageCode) {
    this.#store.setToSelectorLanguage(language);
  }
}

export const translatorService = new TranslatorService(new TranslatorStore());
