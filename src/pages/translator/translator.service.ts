import { APIModel, LanguageCode } from './config';
import { LanguageDetectorApiService } from './language-detector-api.service';
import { TranslatorApiService } from './translator-api.service';
import {
  TranslatorErrorService,
  LanguageDetectorError,
  TranslationError,
  TranslatorError,
  UnknownError,
} from './translator-error.service';
import { TranslatorStore } from './translator.store';

export interface ReportProgress {
  event: ProgressEvent;
  who: APIModel;
}

class TranslatorService {
  #store: TranslatorStore;
  #translatorService: TranslatorApiService;
  #languageDetectorService: LanguageDetectorApiService;
  #errorService: TranslatorErrorService;

  constructor(
    store: TranslatorStore,
    translatorApi: TranslatorApiService,
    languageDetectorApi: LanguageDetectorApiService,
    errorService: TranslatorErrorService,
  ) {
    this.#store = store;
    this.#translatorService = translatorApi;
    this.#languageDetectorService = languageDetectorApi;
    this.#errorService = errorService;
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
    try {
      if (!text) {
        this.#store.setState({
          translation: '',
          loading: null,
          sourceText: '',
        });
        return;
      }

      this.#store.setState({
        status: 'translating',
        loading: {
          type: 'static',
        },
        sourceText: text,
      });

      const { sourceLanguageCode, targetLanguageCode } =
        await this.getLanguageCodes(text);
      const translation = await this.performTranslation(
        text,
        sourceLanguageCode,
        targetLanguageCode,
      );
      this.#store.setState({
        status: 'ready',
        translation,
        loading: null,
      });
    } catch (error) {
      this.#store.setState({
        status: 'ready',
        translation: '',
        loading: null,
      });
      this.#errorService.notifyError(
        error instanceof TranslatorError ? error : new UnknownError(),
      );
    }
  }

  swapLanguages() {
    const { sourceLanguageCode, targetLanguageCode } = this.#store.state;
    this.#store.setSourceLanguageCode(targetLanguageCode);
    this.#store.setTargetLanguageCode(sourceLanguageCode);
    this.translate(this.#store.state.sourceText);
  }

  hasBrowserSupport() {
    return (
      this.#translatorService.isSupported() &&
      this.#languageDetectorService.isSupported()
    );
  }

  setSourceLanguageCode(language: LanguageCode) {
    this.#store.setSourceLanguageCode(language);
    this.translate(this.#store.state.sourceText);
  }

  setTargetLanguageCode(language: LanguageCode) {
    this.#store.setTargetLanguageCode(language);
    this.translate(this.#store.state.sourceText);
  }

  protected async performTranslation(
    text: string,
    sourceLanguageCode: LanguageCode,
    targetLanguageCode: LanguageCode,
  ) {
    try {
      await this.initializeTranslator(sourceLanguageCode, targetLanguageCode);
      return await this.#translatorService.translate(text);
    } catch (error) {
      throw new TranslationError();
    }
  }

  protected async getLanguageCodes(text: string) {
    try {
      const state = this.#store.state;
      let sourceLanguageCode = state.sourceLanguageCode;
      const targetLanguageCode = state.targetLanguageCode;

      if (sourceLanguageCode === LanguageCode.auto) {
        await this.initializeLanguageDetector();
        const [first, second] =
          await this.#languageDetectorService.detect(text);
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
    } catch (error) {
      throw new LanguageDetectorError();
    }
  }

  protected async initializeLanguageDetector() {
    await this.#languageDetectorService.initialize({
      notifyProgress: (event) => {
        this.#store.setState({
          loading: {
            type: 'progress',
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
            type: 'progress',
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
  new TranslatorErrorService(),
);
