// The functions here are copied from `isaacscript-common-ts` because this package uses CommonJS
// instead of ESM. Furthermore, using `tsconfig-paths` makes live debugging more difficult.

/**
 * Helper function to throw an error if the provided value is equal to `undefined`.
 *
 * This is useful to have TypeScript narrow a `T | undefined` value to `T` in a concise way.
 */
export function assertDefined<T>(
  value: T,
  ...[msg]: [undefined] extends [T]
    ? [string]
    : [
        "The assertion is useless because the provided value does not contain undefined.",
      ]
): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    throw new TypeError(msg);
  }
}

export function capitalizeFirstLetter(string: string): string {
  if (string === "") {
    return string;
  }

  const firstCharacter = string.charAt(0);
  const capitalizedFirstLetter = firstCharacter.toUpperCase();
  const restOfString = string.slice(1);

  return `${capitalizedFirstLetter}${restOfString}`;
}

/**
 * From:
 * https://stackoverflow.com/questions/8334606/check-if-first-letter-of-word-is-a-capital-letter
 */
export function isFirstLetterCapitalized(string: string): boolean {
  return /^\p{Lu}/u.test(string);
}

/**
 * Helper function to trim a prefix from a string, if it exists. Returns the trimmed string.
 *
 * @param string The string to trim.
 * @param prefix The prefix to trim.
 * @param trimAll Whether to remove multiple instances of the prefix, if they exist.
 */
export function trimPrefix(
  string: string,
  prefix: string,
  trimAll = false,
): string {
  if (trimAll) {
    const regExp = new RegExp(`^${prefix}+`, "g");
    return string.replaceAll(regExp, "");
  }

  if (!string.startsWith(prefix)) {
    return string;
  }

  return string.slice(prefix.length);
}
