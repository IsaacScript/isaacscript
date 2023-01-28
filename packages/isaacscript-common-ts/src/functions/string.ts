/** From: https://github.com/expandjs/expandjs/blob/master/lib/kebabCaseRegex.js */
const KEBAB_CASE_REGEX =
  /^([a-z](?![\d])|[\d](?![a-z]))+(-?([a-z](?![\d])|[\d](?![a-z])))*$|^$/;

export function capitalizeFirstLetter(string: string): string {
  const firstCharacter = string.charAt(0);
  const capitalizedFirstLetter = firstCharacter.toUpperCase();
  const restOfString = string.slice(1);

  return `${capitalizedFirstLetter}${restOfString}`;
}

/** From: https://stackoverflow.com/questions/1731190/check-if-a-string-has-white-space */
export function hasWhiteSpace(s: string): boolean {
  return /\s/g.test(s);
}

/** Kebab case is the naming style of using all lowercase and hyphens, like "foo-bar". */
export function isKebabCase(string: string): boolean {
  return KEBAB_CASE_REGEX.test(string);
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
