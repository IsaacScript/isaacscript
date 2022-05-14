export function capitalizeFirstLetter(string: string): string {
  const firstCharacter = string.charAt(0);
  const capitalizedFirstLetter = firstCharacter.toUpperCase();
  const restOfString = string.slice(1);

  return `${capitalizedFirstLetter}${restOfString}`;
}

export function removeAllCharacters(string: string, character: string): string {
  return string.replaceAll(character, "");
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
