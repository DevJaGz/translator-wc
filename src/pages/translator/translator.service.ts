import { APIModel, LanguageCode } from './config';
import { LanguageDetectorApiService } from './language-detector-api.service';
import { TranslatorApiService } from './translator-api.service';
import { TranslatorStore } from './translator.store';

export interface ReportProgress {
  event: ProgressEvent;
  who: APIModel;
}

class TranslatorService {
  #store: TranslatorStore;
  #translatorService: TranslatorApiService;
  #languageDetectorService: LanguageDetectorApiService;

  constructor(
    store: TranslatorStore,
    translatorApi: TranslatorApiService,
    languageDetectorApi: LanguageDetectorApiService,
  ) {
    this.#store = store;
    this.#translatorService = translatorApi;
    this.#languageDetectorService = languageDetectorApi;
  }

  get dto() {
    // TODO: rename to state
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
    this.#store.setStatus('ready');
  }

  async clean() {
    this.#languageDetectorService.destroy();
    this.#languageDetectorService.destroy();
    this.#store.clean();
  }

  async translate(text: string) {
    const { fromSelector, toSelector } = this.#store.state;
    let sourceLanguage = fromSelector.languageCode;
    const targetLanguage = toSelector.languageCode;
    if (sourceLanguage === LanguageCode.auto) {
      await this.initializeLanguageDetector();
      sourceLanguage = await this.#languageDetectorService.detect(text);
    }
    await this.initializeTranslator(sourceLanguage, targetLanguage);
    const translation = await this.#translatorService.translate(text);
    this.#store.setTranslation(translation);
  }

  hasBrowserSupport() {
    return (
      this.#translatorService.isSupported() &&
      this.#languageDetectorService.isSupported()
    );
  }

  setFromSelectorLanguage(language: LanguageCode) {
    this.#store.setFromSelectorLanguage(language);
  }

  setToSelectorLanguage(language: LanguageCode) {
    this.#store.setToSelectorLanguage(language);
  }

  protected async initializeLanguageDetector() {
    await this.#languageDetectorService.initialize({
      notifyProgress: (event) => {
        this.#store.setState({
          progress: {
            LanguageDetector: event.loaded,
          },
          status: 'downloading',
        });
      },
    });
  }

  protected async initializeTranslator(
    sourceLanguage: LanguageCode,
    targetLanguage: LanguageCode,
  ) {
    await this.#translatorService.initialize({
      sourceLanguage,
      targetLanguage,
      notifyProgress: (event) => {
        this.#store.setState({
          progress: {
            Translator: event.loaded,
          },
          status: 'downloading',
        });
      },
    });
  }
}

export const translatorService = new TranslatorService(
  new TranslatorStore(),
  new TranslatorApiService(),
  new LanguageDetectorApiService(),
);
