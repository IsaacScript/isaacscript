import { ESLintUtils } from "@typescript-eslint/utils";

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

const urlCreator = (name: string) =>
  `https://github.com/IsaacScript/eslint-plugin-isaacscript/blob/main/docs/rules/${name}.md`;
export const createRule = ESLintUtils.RuleCreator(urlCreator);

/**
 * Helper function to get type safety on a switch statement.
 *
 * Very useful to be future-safe against people adding values to a type or an enum.
 */
export const ensureAllCases = (obj: never): never => obj;

/**
 * Helper function to get the only the values of an enum.
 *
 * (By default, TypeScript will put the keys inside of the values of a number-based enum, so those
 * have to be filtered out.)
 *
 * This function will work properly for both number and string enums.
 */
export function getEnumValues<T>(
  transpiledEnum: Record<string, string | T>,
): T[] {
  const values = Object.values(transpiledEnum);
  const numberValues = values.filter((value) => typeof value === "number");

  // If there are no number values, then this must be a string enum, and no filtration is required.
  const valuesToReturn = numberValues.length > 0 ? numberValues : values;
  return valuesToReturn as T[];
}

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
