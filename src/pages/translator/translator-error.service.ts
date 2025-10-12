export class TranslatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TranslatorError';
  }
}

export class TranslationError extends TranslatorError {
  constructor() {
    super('No fue posible traducir el texto. Por favor, inténtelo de nuevo.');
  }
}

export class LanguageDetectorError extends TranslatorError {
  constructor() {
    super('No fue posible detectar el idioma del texto. Por favor, inténtelo de nuevo.');
  }
}

export class UnknownError extends TranslatorError {
  constructor() {
    super('Ha ocurrido un error inesperado. Inténtelo más tarde.');
  }
}

export class TranslatorErrorService {
  notifyError(error: TranslatorError) {
    alert(error.message);
  }
}
