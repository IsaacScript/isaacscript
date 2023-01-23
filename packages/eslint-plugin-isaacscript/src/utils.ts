import { ESLintUtils } from "@typescript-eslint/utils";
import * as ts from "typescript";

/** Taken from ESLint: https://github.com/eslint/eslint/blob/main/lib/rules/max-len.js */
const URL_REGEXP = /[^:/?#]:\/\/[^?#]/u;

export function areStringsEqualExcludingTrailingSpaces(
  string1: string,
  string2: string,
): boolean {
  const string1Lines = string1.split("\n");
  const string2Lines = string2.split("\n");

  if (string1Lines.length !== string2Lines.length) {
    return false;
  }

  for (let i = 0; i < string1Lines.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const line1 = string1Lines[i]!;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const line2 = string2Lines[i]!;

    if (line1.trimEnd() !== line2.trimEnd()) {
      return false;
    }
  }

  return true;
}

export function capitalizeFirstLetter(string: string): string {
  const firstCharacter = string.charAt(0);
  const capitalizedFirstLetter = firstCharacter.toUpperCase();
  const restOfString = string.slice(1);

  return `${capitalizedFirstLetter}${restOfString}`;
}

const urlCreator = (name: string) =>
  `https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/${name}.md`;
export const createRule = ESLintUtils.RuleCreator(urlCreator);

/**
 * From: https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
 */
export function getOrdinalSuffix(i: number): string {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
}

export function hasURL(text: string): boolean {
  return URL_REGEXP.test(text);
}

/**
 * From:
 * https://stackoverflow.com/questions/8334606/check-if-first-letter-of-word-is-a-capital-letter
 */
export function isFirstLetterCapitalized(string: string): boolean {
  return /^\p{Lu}/u.test(string);
}

export function isFunction(type: ts.Type, checker: ts.TypeChecker): boolean {
  // "isFunctionLike" does not seem to work with basic function expressions, so we resort to
  // checking if any signatures exist.
  const signatures = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
  return signatures.length > 0;
}
