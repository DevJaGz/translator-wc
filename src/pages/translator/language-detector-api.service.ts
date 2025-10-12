import { ApiService, InitializeOptions } from './api.service';
import { LanguageCode } from './config';

export class LanguageDetectorApiService extends ApiService<LanguageDetector> {
  isSupported(): boolean {
    return 'LanguageDetector' in window;
  }

  async initialize(options?: InitializeOptions) {
    const isVailable =
      (await window.LanguageDetector.availability()) === 'available';

    this.session = !isVailable
      ? await window.LanguageDetector.create({
          monitor: (event) => {
            this.monitorEvent = event;
            this.progressListener = (result) => {
              const progress = result as ProgressEvent;
              options?.notifyProgress?.(progress);
            };
            event.addEventListener('downloadprogress', this.progressListener);
          },
        })
      : (this.session ?? (await window.LanguageDetector.create()));
  }

  async detect(text: string): Promise<LanguageCode> {
    const session = this.session;
    if (!session) {
      throw new Error('LanguageDetector is not initialized');
    }
    const codes = await session.detect(text);
    return codes[0].detectedLanguage as LanguageCode;
  }
}
