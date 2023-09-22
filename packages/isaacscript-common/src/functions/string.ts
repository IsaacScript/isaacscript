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
 * Helper function to get the closest value from an array of strings based on partial search text.
 *
 * For the purposes of this function, both search text and the array are converted to lowercase
 * before attempting to find a match.
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
  array: string[],
): string | undefined {
  array.sort();

  searchText = searchText.toLowerCase();
  searchText = searchText.replaceAll(" ", "");

  const matchingElements = array.filter((element) =>
    element.toLowerCase().startsWith(searchText),
  );
  matchingElements.sort();

  return matchingElements[0];
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
