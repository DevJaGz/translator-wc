import { ApiService, InitializeOptions } from './api.service';

interface InitializeTranslatorParams extends InitializeOptions {
  sourceLanguage: string;
  targetLanguage: string;
}

export class TranslatorApiService extends ApiService<Translator> {
  isSupported(): boolean {
    return 'Translator' in self;
  }

  async initialize(params: InitializeTranslatorParams) {
    const isVailable =
      (await window.Translator.availability({
        sourceLanguage: params.sourceLanguage,
        targetLanguage: params.targetLanguage,
      })) === 'available';

    this.session = !isVailable
      ? await window.Translator.create({
          sourceLanguage: params.sourceLanguage,
          targetLanguage: params.targetLanguage,
          monitor: (event) => {
            this.monitorEvent = event;
            this.progressListener = (result) => {
              const progress = result as ProgressEvent;
              params?.notifyProgress?.(progress);
            };
            event.addEventListener('downloadprogress', this.progressListener);
          },
        })
      : (this.session ?? (await window.Translator.create()));
  }

  async translate(text: string) {
    const session = this.session;
    if (!session) {
      throw new Error('Translator is not initialized');
    }
    return await session.translate(text);
  }
}
