export interface InitializeOptions {
  notifyProgress?: (progress: ProgressEvent) => void;
}
export class LanguageDetectorService {
  protected session?: LanguageDetector;
  protected monitorEvent?: EventTarget;
  protected progressListener?: EventListener;

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
      : await window.LanguageDetector.create();
  }

  destroy() {
    this.session?.destroy();
    this.session = undefined;
    this.distroyMonitorEvent();
  }

  protected distroyMonitorEvent() {
    this.monitorEvent?.removeEventListener(
      'downloadprogress',
      this.progressListener!,
    );
    this.monitorEvent = undefined;
  }
}
