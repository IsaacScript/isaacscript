import moment from "moment";
import { CURRENT_DIRECTORY_NAME } from "./constants";
import { Config } from "./types/Config";

export const ensureAllCases = (obj: never): never => obj;

export function error(...args: unknown[]): never {
  console.error(...args);
  process.exit(1);
}

export function getModTargetDirectoryName(config: Config): string {
  return config.customTargetModDirectoryName === undefined
    ? CURRENT_DIRECTORY_NAME
    : config.customTargetModDirectoryName;
}

export function getTime(): string {
  return moment().format("h:mm:ss A"); // e.g. "1:23:45 AM"
}

// From: https://stackoverflow.com/questions/1731190/check-if-a-string-has-white-space
export function hasWhiteSpace(s: string): boolean {
  return /\s/g.test(s);
}

/**
 * parseIntSafe is a more reliable version of parseInt. By default, "parseInt('1a')" will return
 * "1", which is unexpected. This returns either an integer or NaN.
 */
export function parseIntSafe(input: string): number {
  if (typeof input !== "string") {
    return NaN;
  }

  // Remove all leading and trailing whitespace
  let trimmedInput = input.trim();

  const isNegativeNumber = trimmedInput.startsWith("-");
  if (isNegativeNumber) {
    // Remove the leading minus sign before we match the regular expression
    trimmedInput = trimmedInput.substring(1);
  }

  if (/^\d+$/.exec(trimmedInput) === null) {
    // "\d" matches any digit (same as "[0-9]")
    return NaN;
  }

  if (isNegativeNumber) {
    // Add the leading minus sign back
    trimmedInput = `-${trimmedInput}`;
  }

  return parseInt(trimmedInput, 10);
}

export function parseSemVer(
  versionString: string,
): [major: number, minor: number, patch: number] {
  const match = /^v*(\d+)\.(\d+)\.(\d+)/g.exec(versionString);
  if (match === null) {
    error(`Failed to parse the version string of: ${versionString}`);
  }

  const [, majorVersionString, minorVersionString, patchVersionString] = match;

  const majorVersion = parseIntSafe(majorVersionString);
  if (Number.isNaN(majorVersion)) {
    error(`Failed to parse the major version number from: ${versionString}`);
  }

  const minorVersion = parseInt(minorVersionString, 10);
  if (Number.isNaN(minorVersion)) {
    error(`Failed to parse the minor version number from: ${versionString}`);
  }

  const patchVersion = parseInt(patchVersionString, 10);
  if (Number.isNaN(patchVersion)) {
    error(`Failed to parse the patch version number from: ${versionString}`);
  }

  return [majorVersion, minorVersion, patchVersion];
}
