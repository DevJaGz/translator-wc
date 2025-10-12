export type API = Translator | LanguageDetector;
export interface InitializeOptions {
  notifyProgress?: (progress: ProgressEvent) => void;
}

export class ApiService<TApi extends API> {
  protected session?: TApi;
  protected monitorEvent?: EventTarget;
  protected progressListener?: EventListener;

  isSupported(): boolean {
    return true;
  }

  async initialize(_options?: InitializeOptions): Promise<void> {
    return Promise.resolve();
  }

  destroy() {
    this.session?.destroy();
    this.session = undefined;
    this.distroyProgressEvent();
  }

  protected distroyProgressEvent() {
    this.monitorEvent?.removeEventListener(
      'downloadprogress',
      this.progressListener!,
    );
    this.monitorEvent = undefined;
  }
}
