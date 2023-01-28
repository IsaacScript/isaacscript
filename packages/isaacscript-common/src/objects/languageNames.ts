import { LanguageAbbreviation } from "isaac-typescript-definitions";

export const LANGUAGE_NAMES = {
  [LanguageAbbreviation.ENGLISH]: "English",
  [LanguageAbbreviation.JAPANESE]: "Japanese",
  [LanguageAbbreviation.KOREAN]: "Korean",
  [LanguageAbbreviation.CHINESE_SIMPLE]: "Chinese (Simple)",
  [LanguageAbbreviation.RUSSIAN]: "Russian",
  [LanguageAbbreviation.GERMAN]: "German",
  [LanguageAbbreviation.SPANISH]: "Spanish",
} as const satisfies Record<LanguageAbbreviation, string>;
