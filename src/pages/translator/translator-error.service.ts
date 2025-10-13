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
        'Unable to translate the text. Please try again.',
    );
  }
}

export class LanguageDetectorError extends TranslatorError {
  constructor(message?: string) {
    super(
      message ??
        'Unable to detect the language of the text. Please try again.',
    );
  }
}

export class TextToSpeechError extends TranslatorError {
  constructor(message?: string) {
    super(
      message ??
        'Unable to play the text. Please try again.',
    );
  }
}

export class UnknownError extends TranslatorError {
  constructor(message?: string) {
    super(message ?? 'An unexpected error has occurred. Please try again later.');
  }
}

export class TranslatorErrorService {
  notifyError(error: TranslatorError) {
    alert(error.message);
  }
}
