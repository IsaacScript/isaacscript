import { parseIntSafe } from "./types";
import { assertDefined } from "./utils";

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
 * Helper function to get the closest key from a map based on partial search text. (It only searches
 * through the keys, not the values.)
 *
 * Note that:
 * - Spaces are automatically removed from the search text.
 * - Both the search text and the strings to search through are converted to lowercase before
 *   attempting to find a match.
 *
 * For example:
 *
 * ```ts
 * const map = new <string, number>Map([
 *   ["foo", 123],
 *   ["bar", 456],
 * ]);
 * const searchText = "f";
 * const match = getMapPartialMatch(map, searchText); // match is now equal to ["foo", 123]
 * ```
 *
 * @returns If a match was found, returns a tuple of the map key and value. If a match was not
 *          found, returns undefined.
 */
export function getMapPartialMatch<T>(
  searchText: string,
  map: ReadonlyMap<string, T>,
): [string, T] | undefined {
  const keys = [...map.keys()];

  const matchingKey = getPartialMatch(searchText, keys);
  if (matchingKey === undefined) {
    return undefined;
  }

  const value = map.get(matchingKey);
  assertDefined(
    value,
    `Failed to get the map value corresponding to the partial match of: ${matchingKey}`,
  );

  return [matchingKey, value];
}

/**
 * Helper function to get the closest key from an object based on partial search text. (It only
 * searches through the keys, not the values.)
 *
 * Note that:
 * - Spaces are automatically removed from the search text.
 * - Both the search text and the strings to search through are converted to lowercase before
 *   attempting to find a match.
 *
 * For example:
 *
 * ```ts
 * const object = {
 *   foo: 123,
 *   bar: 456,
 * };
 * const searchText = "f";
 * const match = getObjectPartialMatch(object, searchText); // match is now equal to ["foo", 123]
 * ```
 *
 * @returns If a match was found, returns a tuple of the map key and value. If a match was not
 *          found, returns undefined.
 */
export function getObjectPartialMatch<T>(
  searchText: string,
  object: Record<string, T>,
): [string, T] | undefined {
  const keys = Object.keys(object);

  const matchingKey = getPartialMatch(searchText, keys);
  if (matchingKey === undefined) {
    return undefined;
  }

  const value = object[matchingKey];
  assertDefined(
    value,
    `Failed to get the object value corresponding to the partial match of: ${matchingKey}`,
  );

  return [matchingKey, value];
}

/**
 * Helper function to get the closest value from an array of strings based on partial search text.
 *
 * Note that:
 * - Spaces are automatically removed from the search text.
 * - Both the search text and the strings to search through are converted to lowercase before
 *   attempting to find a match.
 *
 * For example:
 *
 * ```ts
 * const array = ["foo", "bar"];
 * const searchText = "f";
 * const match = getPartialMatch(array, searchText); // match is now equal to "foo"
 *
 * @returns If a match was found, returns the array element. If a match was not
 * found, returns undefined.
 * ```
 */
export function getPartialMatch(
  searchText: string,
  array: string[] | readonly string[],
): string | undefined {
  const sortedArray = array.toSorted();

  searchText = searchText.toLowerCase();
  searchText = searchText.replaceAll(" ", "");

  const matchingElements = sortedArray.filter((element) =>
    element.toLowerCase().startsWith(searchText),
  );
  matchingElements.sort();

  return matchingElements[0];
}

/**
 * Helper function to parse a Semantic Versioning string into its individual constituents. Returns
 * undefined if the submitted string was not a proper Semantic Version string.
 *
 * https://semver.org/
 */
export function parseSemanticVersion(versionString: string):
  | {
      majorVersion: int;
      minorVersion: int;
      patchVersion: int;
    }
  | undefined {
  const [majorVersionString, minorVersionString, patchVersionString] =
    string.match(versionString, "(%d+).(%d+).(%d+)");

  if (
    majorVersionString === undefined ||
    minorVersionString === undefined ||
    patchVersionString === undefined
  ) {
    return undefined;
  }

  const majorVersion = parseIntSafe(majorVersionString);
  const minorVersion = parseIntSafe(minorVersionString);
  const patchVersion = parseIntSafe(patchVersionString);

  if (
    majorVersion === undefined ||
    minorVersion === undefined ||
    patchVersion === undefined
  ) {
    return undefined;
  }

  return { majorVersion, minorVersion, patchVersion };
}

export function removeAllCharacters(string: string, character: string): string {
  return string.replaceAll(character, "");
}

/**
 * Helper function to remove all of the characters in a string before a given substring. Returns the
 * modified string.
 */
export function removeCharactersBefore(
  string: string,
  substring: string,
): string {
  const index = string.indexOf(substring);
  return string.slice(index);
}

/** Helper function to remove all characters from a string that are not letters or numbers. */
export function removeNonAlphanumericCharacters(str: string): string {
  const [returnValue, _] = string.gsub(str, "%W", "");
  return returnValue;
}

/**
 * Helper function to remove one or more substrings from a string, if they exist. Returns the
 * modified string.
 *
 * This function is variadic, meaning that you can pass as many substrings as you want to remove.
 */
export function removeSubstring(
  string: string,
  ...substrings: string[]
): string {
  for (const substring of substrings) {
    string = string.replaceAll(substring, "");
  }

  return string;
}

/** Helper function to trim a prefix from a string, if it exists. Returns the trimmed string. */
export function trimPrefix(string: string, prefix: string): string {
  if (!string.startsWith(prefix)) {
    return string;
  }

  return string.slice(prefix.length);
}

/** Helper function to trim a suffix from a string, if it exists. Returns the trimmed string. */
export function trimSuffix(string: string, prefix: string): string {
  if (!string.endsWith(prefix)) {
    return string;
  }

  const endCharacter = string.length - prefix.length;
  return string.slice(0, endCharacter);
}

export function uncapitalizeFirstLetter(string: string): string {
  if (string === "") {
    return string;
  }

  const firstCharacter = string.charAt(0);
  const uncapitalizedFirstLetter = firstCharacter.toLowerCase();
  const restOfString = string.slice(1);

  return `${uncapitalizedFirstLetter}${restOfString}`;
}
