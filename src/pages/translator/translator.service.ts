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

export const translatorService = new TranslatorService(new TranslatorStore());
