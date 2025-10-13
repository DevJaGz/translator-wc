import { ApiService, InitializeOptions } from './api.service';
import { LanguageDetectorError } from './translator-error.service';

export class LanguageDetectorApiService extends ApiService<LanguageDetector> {
  isSupported(): boolean {
    return 'LanguageDetector' in window;
  }

  async initialize(options?: InitializeOptions) {
    const availability = await window.LanguageDetector.availability();

    if (availability === 'unavailable') {
      throw new LanguageDetectorError('LanguageDetector is not available');
    }

    if (availability === 'available') {
      this.session = this.session ?? (await window.LanguageDetector.create());
      return;
    }

    if (availability === 'downloadable' || availability === 'downloading') {
      await new Promise<void>(async (resolve) => {
        this.session = await window.LanguageDetector.create({
          monitor: (event) => {
            this.monitorEvent = event;
            this.progressListener = (result) => {
              const progress = result as ProgressEvent;
              options?.notifyProgress?.(progress);

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

  async detect(text: string) {
    const session = this.session;
    if (!session) {
      throw new Error('LanguageDetector is not initialized');
    }
    return await session.detect(text);
  }
}
