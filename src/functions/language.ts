type LanguageNames = {
  [Value in LanguageAbbreviation]: string;
};

const LANGUAGE_NAMES: LanguageNames = {
  [LanguageAbbreviation.ENGLISH]: "English",
  [LanguageAbbreviation.JAPANESE]: "Japanese",
  [LanguageAbbreviation.KOREAN]: "Korean",
  [LanguageAbbreviation.CHINESE_SIMPLE]: "Chinese (Simple)",
  [LanguageAbbreviation.RUSSIAN]: "Russian",
  [LanguageAbbreviation.GERMAN]: "German",
  [LanguageAbbreviation.SPANISH]: "Spanish",
};

/** Returns a 3-tuple of Language enum value, language name and resource folder suffix. */
export function getLanguageName(): string {
  const languageAbbreviation = Options.Language;
  return LANGUAGE_NAMES[languageAbbreviation];
}
