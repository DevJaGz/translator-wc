export const CodeLanguage = {
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

export type CodeLanguage = (typeof CodeLanguage)[keyof typeof CodeLanguage];

export interface Language {
  name: string;
  code: CodeLanguage;
}

export class TranslatorConfig {
  static languages = [
    {
      name: 'Auto Detect',
      code: CodeLanguage['auto-detect'],
    },
    {
      name: 'Spanish (Spain)',
      code: CodeLanguage['spanish-spain'],
    },
    {
      name: 'English (United States)',
      code: CodeLanguage['english-united-states'],
    },
    {
      name: 'French (France)',
      code: CodeLanguage['french-france'],
    },
    {
      name: 'German (Germany)',
      code: CodeLanguage['german-germany'],
    },
    {
      name: 'Italian (Italy)',
      code: CodeLanguage['italian-italy'],
    },
    {
      name: 'Portuguese (Brazil)',
      code: CodeLanguage['portuguese-brazil'],
    },
    {
      name: 'Portuguese (Portugal)',
      code: CodeLanguage['portuguese-portugal'],
    },
    {
      name: 'Russian (Russia)',
      code: CodeLanguage['russian-russia'],
    },
    {
      name: 'Chinese (China)',
      code: CodeLanguage['chinese-china'],
    },
  ];
}
