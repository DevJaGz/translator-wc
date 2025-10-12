import { LanguageCode } from './config';
import { LanguageDetectorService } from './language-detector.service';
import { TranslatorApi } from './translator.api';
import { TranslatorStore } from './translator.store';

class TranslatorService {
  #store: TranslatorStore;
  #translatorApi: TranslatorApi;
  #languageDetectorApi: LanguageDetectorService;

  #languageDetector!: LanguageDetector;

  constructor(
    store: TranslatorStore,
    translatorApi: TranslatorApi,
    languageDetectorApi: LanguageDetectorService,
  ) {
    this.#store = store;
    this.#translatorApi = translatorApi;
    this.#languageDetectorApi = languageDetectorApi;
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

  async initialize() {
    this.initializeLanguageDetector();
  }

  async clean() {
    this.#languageDetector.destroy();
    this.#store.clean();
  }

  translate(text: string) {
    console.log('translate', text);
    this.setTranslation(text);
  }

  hasBrowserSupport() {
    return (
      this.#translatorApi.isSupported() &&
      this.#languageDetectorApi.isSupported()
    );
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

  protected async initializeLanguageDetector() {
    await this.#languageDetectorApi.initialize();
  }
}

export const translatorService = new TranslatorService(
  new TranslatorStore(),
  new TranslatorApi(),
  new LanguageDetectorService(),
);
