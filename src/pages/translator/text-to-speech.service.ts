import { LanguageCode } from './config';
import { TextToSpeechError } from './translator-error.service';

export class TextToSpeechService {
  hasSupport(): boolean {
    return 'SpeechSynthesis' in window;
  }

  speak(
    text: string,
    options?: {
      langugeCode?: LanguageCode;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
      onCancel?: () => void;
    },
  ) {
    if (!text) {
      return;
    }

    if (!this.hasSupport()) {
      new TextToSpeechError('Text to speech is not supported');
    }

    const langugeCode = options?.langugeCode ?? 'en';

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langugeCode;
    utterance.rate = 0.8;
    utterance.onstart = () => {
        options?.onStart?.();
    };
    utterance.onend = () => {
        options?.onEnd?.();
    };
    utterance.onerror = () => {
        options?.onError?.()
    };

    window.speechSynthesis.speak(utterance);
  }

  stop() {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  }
}
