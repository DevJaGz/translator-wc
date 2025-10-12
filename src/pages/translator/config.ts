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
      name: 'Spanish (Spain)',
      code: LanguageCode['spanish'],
    },
    {
      name: 'English (United States)',
      code: LanguageCode['english'],
    },
    {
      name: 'French (France)',
      code: LanguageCode['french'],
    },
    {
      name: 'German (Germany)',
      code: LanguageCode['german'],
    },
    {
      name: 'Italian (Italy)',
      code: LanguageCode['italian'],
    },
    {
      name: 'Portuguese (Brazil)',
      code: LanguageCode['portuguese'],
    },
    {
      name: 'Russian (Russia)',
      code: LanguageCode['russian'],
    },
    {
      name: 'Chinese (China)',
      code: LanguageCode['chinese'],
    },
  ];
}


export type APIModel = 'Translator' | 'LanguageDetector';