// The functions here are copied from `isaacscript-common-ts` because this package uses CommonJS
// instead of ESM. Furthermore, using `tsconfig-paths` makes live debugging more difficult.

/**
 * Immutable is a utility type that will make the given array/map/set/object recursively read-only.
 *
 * You can use this type to easily build safe data structures.
 *
 * From: https://stackoverflow.com/questions/41879327/deepreadonly-object-typescript
 */
export type Immutable<T> = T extends ImmutablePrimitive
  ? T
  : T extends Array<infer U>
  ? ImmutableArray<U>
  : T extends Map<infer K, infer V>
  ? ImmutableMap<K, V>
  : T extends Set<infer M>
  ? ImmutableSet<M>
  : ImmutableObject<T>;

type ImmutablePrimitive =
  | undefined
  | null
  | boolean
  | string
  | number
  | Function; // eslint-disable-line @typescript-eslint/ban-types
type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };

interface ReadonlySetConstructor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new <T = any>(values?: readonly T[] | Iterable<T> | null): ReadonlySet<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly prototype: ReadonlySet<any>;
}

/** An alias for the `Set` constructor that returns a read-only set. */
export const ReadonlySet = Set as ReadonlySetConstructor;

/** From: https://github.com/expandjs/expandjs/blob/master/lib/kebabCaseRegex.js */
const KEBAB_CASE_REGEX =
  /^([a-z](?!\d)|\d(?![a-z]))+(-?([a-z](?!\d)|\d(?![a-z])))*$|^$/;

const INTEGER_REGEX = /^-?\d+$/;
const FLOAT_REGEX = /^-?\d*\.?\d+$/;

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

/**
 * Helper function to print out an error message and then exit the program.
 *
 * All of the arguments will be directly passed to the `console.error` function.
 */
export function fatalError(...args: unknown[]): never {
  console.error(...args);
  process.exit(1);
}

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

/** From: https://stackoverflow.com/questions/1731190/check-if-a-string-has-white-space */
export function hasWhiteSpace(s: string): boolean {
  return /\s/g.test(s);
}

/** Kebab case is the naming style of using all lowercase and hyphens, like "foo-bar". */
export function isKebabCase(string: string): boolean {
  return KEBAB_CASE_REGEX.test(string);
}

/** Helper function to narrow `unknown` to `Record`. */
export function isRecord(object: unknown): object is Record<string, unknown> {
  return (
    typeof object === "object" && object !== null && !Array.isArray(object)
  );
}

/**
 * This is a more reliable version of `Number.parseFloat`:
 *
 * - `undefined` is returned instead of `Number.NaN`, which is helpful in conjunction with
 *   TypeScript type narrowing patterns.
 * - Strings that are a mixture of numbers and letters will result in undefined instead of the part
 *   of the string that is the number. (e.g. "1a" --> undefined instead of "1a" --> 1)
 * - Non-strings will result in undefined instead of being coerced to a number.
 *
 * @param string A string to convert to an integer.
 */
export function parseFloatSafe(string: string): number | undefined {
  if (typeof string !== "string") {
    return undefined;
  }

  const trimmedString = string.trim();

  // If the string does not entirely consist of numbers, return undefined.
  if (FLOAT_REGEX.exec(trimmedString) === null) {
    return undefined;
  }

  const number = Number.parseFloat(trimmedString);
  return Number.isNaN(number) ? undefined : number;
}

/**
 * This is a more reliable version of `Number.parseInt`:
 *
 * - `undefined` is returned instead of `Number.NaN`, which is helpful in conjunction with
 *   TypeScript type narrowing patterns.
 * - Strings that are a mixture of numbers and letters will result in undefined instead of the part
 *   of the string that is the number. (e.g. "1a" --> undefined instead of "1a" --> 1)
 * - Non-strings will result in undefined instead of being coerced to a number.
 *
 * If you have to use a radix other than 10, use the vanilla `Number.parseInt` function instead,
 * because this function ensures that the string contains no letters.
 *
 * @param string A string to convert to an integer.
 */
export function parseIntSafe(string: string): number | undefined {
  if (typeof string !== "string") {
    return undefined;
  }

  const trimmedString = string.trim();

  // If the string does not entirely consist of numbers, return undefined.
  if (INTEGER_REGEX.exec(trimmedString) === null) {
    return undefined;
  }

  const number = Number.parseInt(trimmedString, 10);
  return Number.isNaN(number) ? undefined : number;
}

/**
 * Helper function to parse a Semantic Versioning string into its individual constituents. Returns
 * undefined if the submitted string was not a proper Semantic Version string.
 *
 * https://semver.org/
 */
export function parseSemanticVersion(versionString: string):
  | {
      majorVersion: number;
      minorVersion: number;
      patchVersion: number;
    }
  | undefined {
  const match = versionString.match(
    /^v*(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)/,
  );
  if (match === null || match.groups === undefined) {
    return undefined;
  }

  const { major, minor, patch } = match.groups;
  if (major === undefined || minor === undefined || patch === undefined) {
    return undefined;
  }

  const majorVersion = parseIntSafe(major);
  const minorVersion = parseIntSafe(minor);
  const patchVersion = parseIntSafe(patch);

  if (
    majorVersion === undefined ||
    minorVersion === undefined ||
    patchVersion === undefined
  ) {
    return undefined;
  }

  return { majorVersion, minorVersion, patchVersion };
}

/**
 * Helper function to remove lines from a multi-line string. This function looks for a "-start" and
 * a "-end" suffix after the marker. Lines with markets will be completely removed from the output.
 *
 * For example, by using a marker of "@foo":
 *
 * ```text
 * line1
 * # @foo-start
 * line2
 * line3
 * # @foo-end
 * line4
 * ```
 *
 * Would return:
 *
 * ```text
 * line1
 * line4
 * ```
 */
export function removeLinesBetweenMarkers(
  string: string,
  marker: string,
): string {
  const lines = string.split("\n");
  const newLines: string[] = [];

  let skippingLines = false;

  for (const line of lines) {
    if (line.includes(`${marker}-start`)) {
      skippingLines = true;
      continue;
    }

    if (line.includes(`${marker}-end`)) {
      skippingLines = false;
      continue;
    }

    if (!skippingLines) {
      newLines.push(line);
    }
  }

  return newLines.join("\n");
}

/** Helper function to remove lines from a multi-line string matching a certain other string. */
export function removeLinesMatching(string: string, match: string): string {
  const lines = string.split("\n");
  const newLines = lines.filter((line) => !line.includes(match));
  return newLines.join("\n");
}

/**
 * Helper function to repeat code N times. This is faster to type and cleaner than using a for loop.
 *
 * For example:
 *
 * ```ts
 * repeat(10, () => {
 *   foo();
 * });
 * ```
 *
 * The repeated function is passed the index of the iteration, if needed:
 *
 * ```ts
 * repeat(3, (i) => {
 *   console.log(i); // Prints "0", "1", "2"
 * });
 * ```
 */
export function repeat(num: number, func: (i: number) => void): void {
  for (let i = 0; i < num; i++) {
    func(i);
  }
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
