import { ApiService, InitializeOptions } from './api.service';
import { TranslatorError } from './translator-error.service';

interface InitializeTranslatorParams extends InitializeOptions {
  sourceLanguage: string;
  targetLanguage: string;
}

export class TranslatorApiService extends ApiService<Translator> {
  isSupported(): boolean {
    return 'Translator' in self;
  }

  async initialize(params: InitializeTranslatorParams) {
    const availability = await window.Translator.availability({
      sourceLanguage: params.sourceLanguage,
      targetLanguage: params.targetLanguage,
    });

    if (availability === 'unavailable') {
      throw new TranslatorError('TranslatorError is not available');
    }

    if (availability === 'available') {
      this.session = await window.Translator.create({
        sourceLanguage: params.sourceLanguage,
        targetLanguage: params.targetLanguage,
      });
      return;
    }

    if (availability === 'downloadable' || availability === 'downloading') {
      await new Promise<void>(async (resolve) => {
        this.session = await window.Translator.create({
          sourceLanguage: params.sourceLanguage,
          targetLanguage: params.targetLanguage,
          monitor: (event) => {
            this.monitorEvent = event;
            this.progressListener = (result) => {
              const progress = result as ProgressEvent;
              params?.notifyProgress?.(progress);

              if (progress.loaded === 1) {
                this.distroyProgressEvent();
                resolve();
              }
            };
            event.addEventListener('downloadprogress', this.progressListener);
          },
        });
      });
    }
  }

  async translate(text: string) {
    const session = this.session;
    if (!session) {
      throw new TranslatorError('Translator is not initialized');
    }
    return await session.translate(text);
  }
}
