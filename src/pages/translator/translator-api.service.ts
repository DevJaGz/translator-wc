export class TranslatorApiService {
    isSupported(): boolean {
        return 'Translator' in self;
    }
}