import { APIModel, LanguageCode } from './config';
import { LanguageDetectorService } from './language-detector.service';
import { TranslatorApi } from './translator.api';
import { TranslatorStore } from './translator.store';

export interface ReportProgress {
  event: ProgressEvent;
  who: APIModel;
}

class TranslatorService {
  #store: TranslatorStore;
  #translatorApi: TranslatorApi; // TODO: rename to translatorService
  #languageDetectorService: LanguageDetectorService;

  #languageDetector!: LanguageDetector;

  constructor(
    store: TranslatorStore,
    translatorApi: TranslatorApi,
    languageDetectorApi: LanguageDetectorService,
  ) {
    this.#store = store;
    this.#translatorApi = translatorApi;
    this.#languageDetectorService = languageDetectorApi;
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
    this.#store.setStatus('initializing');
    await this.initializeLanguageDetector();
    this.#store.setStatus('ready');
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
      this.#languageDetectorService.isSupported()
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
    await this.#languageDetectorService.initialize({
      notifyProgress: (event) => {
        this.#store.setStatus('downloading');
        this.reportProgress({
          who: 'LanguageDetector',
          event,
        });
      },
    });
  }

  protected reportProgress(report: ReportProgress) {
    this.#store.setProgressByModel(report.who, report.event.loaded);
  }
}

export const translatorService = new TranslatorService(
  new TranslatorStore(),
  new TranslatorApi(),
  new LanguageDetectorService(),
);
