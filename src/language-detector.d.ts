declare class LanguageDetector {
  readonly inputQuota: number;
  static availability(options?: {
    expectedInputLanguages?: string[];
  }): Promise<'available' | 'downloadable' | 'unavailable'>;

  static create(options?: {
    expectedInputLanguages?: string[];
    monitor?: (monitor: EventTarget) => void;
    signal?: AbortSignal;
  }): Promise<LanguageDetector>;

  destroy(): void;

  detect(
    input: string,
    options?: {
      signal?: AbortSignal;
    },
  ): Promise<string>;
}
