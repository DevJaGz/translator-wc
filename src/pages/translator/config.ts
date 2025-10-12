export const LanguageCode = {
  'spanish-spain': 'es-ES',
  'english-united-states': 'en-US',
  'french-france': 'fr-FR',
  'german-germany': 'de-DE',
  'italian-italy': 'it-IT',
  'portuguese-brazil': 'pt-BR',
  'portuguese-portugal': 'pt-PT',
  'russian-russia': 'ru-RU',
  'chinese-china': 'zh-CN',
  'auto-detect': 'auto',
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
      code: LanguageCode['auto-detect'],
    },
    {
      name: 'Spanish (Spain)',
      code: LanguageCode['spanish-spain'],
    },
    {
      name: 'English (United States)',
      code: LanguageCode['english-united-states'],
    },
    {
      name: 'French (France)',
      code: LanguageCode['french-france'],
    },
    {
      name: 'German (Germany)',
      code: LanguageCode['german-germany'],
    },
    {
      name: 'Italian (Italy)',
      code: LanguageCode['italian-italy'],
    },
    {
      name: 'Portuguese (Brazil)',
      code: LanguageCode['portuguese-brazil'],
    },
    {
      name: 'Portuguese (Portugal)',
      code: LanguageCode['portuguese-portugal'],
    },
    {
      name: 'Russian (Russia)',
      code: LanguageCode['russian-russia'],
    },
    {
      name: 'Chinese (China)',
      code: LanguageCode['chinese-china'],
    },
  ];
}


export type APIModel = 'Translator' | 'LanguageDetector';