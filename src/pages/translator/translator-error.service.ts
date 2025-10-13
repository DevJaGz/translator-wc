export class TranslatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TranslatorError';
  }
}

export class TranslationError extends TranslatorError {
  constructor(message?: string) {
    super(
      message ??
        'No fue posible traducir el texto. Por favor, inténtelo de nuevo.',
    );
  }
}

export class LanguageDetectorError extends TranslatorError {
  constructor(message?: string) {
    super(
      message ??
        'No fue posible detectar el idioma del texto. Por favor, inténtelo de nuevo.',
    );
  }
}

export class TextToSpeechError extends TranslatorError {
  constructor(message?: string) {
    super(
      message ??
        'No fue posible reproducir el texto. Por favor, inténtelo de nuevo.',
    );
  }
}
export class UnknownError extends TranslatorError {
  constructor(message?: string) {
    super(message ?? 'Ha ocurrido un error inesperado. Inténtelo más tarde.');
  }
}

export class TranslatorErrorService {
  notifyError(error: TranslatorError) {
    alert(error.message);
  }
}
