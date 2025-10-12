export class LanguageDetectorService {
  #languageDetector!: LanguageDetector;

  isSupported(): boolean {
    return 'LanguageDetector' in window;
  }

  async initialize() {
    const isVailable = await window.LanguageDetector.availability() ==='available';
    if (!isVailable) {
      
    }
  }

}
