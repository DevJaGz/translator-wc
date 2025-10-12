export class TranslatorApi {
  isSupported(): boolean {
    return 'Translator' in self;
  }
}
