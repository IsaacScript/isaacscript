// We do not want "eslint-plugin-isaacscript" to depend on "isaacscript-common-ts" because it
// complicates the usage of the plugin inside of the monorepo. Specifically, since we manually copy
// the compiled output to the monorepo "node_modules" directory, it would cause errors if the
// "isaacscript-common-ts" directory did not also exist there. To fix this, we could also compile
// and copy "isaacscript-common-ts" in the build script for this plugin. However, that is
// undesirable for two reasons:
// 1) It increases the complexity of the build script.
// 2) If "isaacscript-common-ts" exists in the monorepo's "node_modules" directory, it can cause
//    bugs due to tooling preferring the "real" directory over the tsconfig "paths" resolution.

export type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<
  Record<K, V>
>;

const FIRST_LETTER_CAPITALIZED_REGEX = /^\p{Lu}/u;

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
  return FIRST_LETTER_CAPITALIZED_REGEX.test(string);
}

/**
 * Helper function to trim a prefix from a string, if it exists. Returns the trimmed string.
 *
 * @param string The string to trim.
 * @param prefix The prefix to trim.
 * @param trimAll Whether to remove multiple instances of the prefix, if they exist. If this is set
 *                to true, the prefix must only be a single character.
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
