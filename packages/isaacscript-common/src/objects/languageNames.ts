import { LanguageAbbreviation } from "isaac-typescript-definitions";

export const LANGUAGE_NAMES = {
  [LanguageAbbreviation.ENGLISH]: "English", // "en"
  [LanguageAbbreviation.JAPANESE]: "Japanese", // "jp"
  [LanguageAbbreviation.KOREAN]: "Korean", // "kr"
  [LanguageAbbreviation.CHINESE_SIMPLE]: "Chinese (Simple)", // "zh"
  [LanguageAbbreviation.RUSSIAN]: "Russian", // "ru"
  [LanguageAbbreviation.GERMAN]: "German", // "de"
  [LanguageAbbreviation.SPANISH]: "Spanish", // "es"
} as const satisfies Record<LanguageAbbreviation, string>;
