import { LANGUAGE_NAMES } from "../objects/languageNames";

/**
 * Helper function to convert the language abbreviation from `Options.Language` to the "full"
 * language name.
 *
 * For example, if the current language is set to Korean, `Options.Language` will be set to "kr",
 * and this function will return "Korean".
 */
export function getLanguageName(): string {
  const languageAbbreviation = Options.Language;
  return LANGUAGE_NAMES[languageAbbreviation];
}
