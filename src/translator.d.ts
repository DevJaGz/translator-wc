declare class Translator {
  static availability(config: {
    sourceLanguage: string;
    targetLanguage: string;
  }): Promise<'available' | 'downloadable' | 'downloading' |'unavailable'>;

  static create(config?: {
    sourceLanguage: string;
    targetLanguage: string;
    monitor?: (monitor: EventTarget) => void;
    signal?: AbortSignal;
  }): Promise<Translator>;

  destroy(): void;

  translate(input: string, options?: {
    signal?: AbortSignal;
  }): Promise<string>;

  translateStreaming(input: string, options?: {
    signal?: AbortSignal;
  }): Promise<ReadableStream<string>>;
}
