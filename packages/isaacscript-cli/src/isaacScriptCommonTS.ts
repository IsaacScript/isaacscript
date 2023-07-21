// The functions here are copied from `isaacscript-common-ts` because they are natively written as
// MTS files and we have issues importing from them inside the monorepo. (The `tsup` tool makes it
// so that the library can be consumed from both CommonJS and ESM projects, but `tsconfig-paths`
// makes it always seem to consume the ESM version.) Furthermore, using `tsconfig-paths` makes live
// debugging more difficult.

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
  /^([a-z](?![\d])|[\d](?![a-z]))+(-?([a-z](?![\d])|[\d](?![a-z])))*$|^$/;

/**
 * Helper function to print out an error message and then exit the program.
 *
 * All of the arguments will be directly passed to the `console.error` function.
 */
export function error(...args: unknown[]): never {
  console.error(...args);
  return process.exit(1);
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
 * This is a more reliable version of `parseInt`. By default, `parseInt('1a')` will return "1",
 * which is unexpected. This returns either an integer or NaN.
 */
export function parseIntSafe(input: string): number {
  if (typeof input !== "string") {
    return NaN;
  }

  // Remove all leading and trailing whitespace.
  let trimmedInput = input.trim();

  const isNegativeNumber = trimmedInput.startsWith("-");
  if (isNegativeNumber) {
    // Remove the leading minus sign before we match the regular expression.
    trimmedInput = trimmedInput.substring(1);
  }

  if (/^\d+$/.exec(trimmedInput) === null) {
    // "\d" matches any digit (same as "[0-9]").
    return NaN;
  }

  if (isNegativeNumber) {
    // Add the leading minus sign back.
    trimmedInput = `-${trimmedInput}`;
  }

  return Number.parseInt(trimmedInput, 10);
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
  const match = versionString.match(/^v*(\d+)\.(\d+)\.(\d+)/);
  if (match === null) {
    return undefined;
  }

  const majorVersionString = match[1] ?? "";
  const minorVersionString = match[2] ?? "";
  const patchVersionString = match[3] ?? "";

  const majorVersion = parseIntSafe(majorVersionString);
  if (Number.isNaN(majorVersion)) {
    return undefined;
  }

  const minorVersion = parseIntSafe(minorVersionString);
  if (Number.isNaN(minorVersion)) {
    return undefined;
  }

  const patchVersion = parseIntSafe(patchVersionString);
  if (Number.isNaN(patchVersion)) {
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
export function repeat(n: number, func: (i: number) => void): void {
  for (let i = 0; i < n; i++) {
    func(i);
  }
}
