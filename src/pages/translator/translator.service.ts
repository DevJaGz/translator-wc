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

  get state() {
    return this.#store.state;
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
    this.#translatorService.destroy();
    this.#store.clean();
  }

  async translate(text: string) {
    this.#store.setStatus('translating');
    this.#store.setLoading({
      type: 'translation',
    });
    const { sourceLanguageCode, targetLanguageCode } =
      await this.getLanguageCodes(text);
    await this.initializeTranslator(sourceLanguageCode, targetLanguageCode);
    const translation = await this.#translatorService.translate(text);
    this.#store.setState({
      status: 'ready',
      translation,
      loading: null,
    });
  }

  hasBrowserSupport() {
    return (
      this.#translatorService.isSupported() &&
      this.#languageDetectorService.isSupported()
    );
  }

  setSourceLanguageCode(language: LanguageCode) {
    this.#store.setSourceLanguageCode(language);
  }

  setTargetLanguageCode(language: LanguageCode) {
    this.#store.setTargetLanguageCode(language);
  }

  protected async getLanguageCodes(text: string) {
    const state = this.#store.state;
    let sourceLanguageCode = state.sourceLanguageCode;
    const targetLanguageCode = state.targetLanguageCode;

    if (sourceLanguageCode === LanguageCode.auto) {
      await this.initializeLanguageDetector();
      const [first, second] = await this.#languageDetectorService.detect(text);
      const detectedCode =
        first.detectedLanguage === targetLanguageCode
          ? second.detectedLanguage
          : first.detectedLanguage;
      sourceLanguageCode = detectedCode as LanguageCode;
    }

    return {
      sourceLanguageCode,
      targetLanguageCode,
    };
  }

  protected async initializeLanguageDetector() {
    await this.#languageDetectorService.initialize({
      notifyProgress: (event) => {
        this.#store.setState({
          loading: {
            type: 'model',
            name: 'LanguageDetector',
            progress: event.loaded,
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
          loading: {
            type: 'model',
            name: 'Translator',
            progress: event.loaded,
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
