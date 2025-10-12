export const LanguageCode = {
  'spanish': 'es',
  'english': 'en',
  'french': 'fr',
  'german': 'de',
  'italian': 'it',
  'portuguese': 'pt',
  'russian': 'ru',
  'chinese': 'zh',
  'auto': 'auto',
} as const;

export type LanguageCode = (typeof LanguageCode)[keyof typeof LanguageCode];

export interface Language {
  name: string;
  code: LanguageCode;
}

export class TranslatorConfig {
  static languages = [
    {
      name: 'Auto Detect',
      code: LanguageCode['auto'],
    },
    {
      name: 'Spanish',
      code: LanguageCode['spanish'],
    },
    {
      name: 'English',
      code: LanguageCode['english'],
    },
    {
      name: 'French',
      code: LanguageCode['french'],
    },
    {
      name: 'German',
      code: LanguageCode['german'],
    },
    {
      name: 'Italian',
      code: LanguageCode['italian'],
    },
    {
      name: 'Portuguese',
      code: LanguageCode['portuguese'],
    },
    {
      name: 'Russian',
      code: LanguageCode['russian'],
    },
    {
      name: 'Chinese',
      code: LanguageCode['chinese'],
    },
  ];
}


export type APIModel = 'Translator' | 'LanguageDetector';