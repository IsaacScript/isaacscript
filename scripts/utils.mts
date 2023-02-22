import * as fs from "node:fs";
import * as url from "node:url";

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
export const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export function capitalizeFirstLetter(string: string): string {
  if (string === "") {
    return string;
  }

  const firstCharacter = string.charAt(0);
  const capitalizedFirstLetter = firstCharacter.toUpperCase();
  const restOfString = string.slice(1);

  return `${capitalizedFirstLetter}${restOfString}`;
}

export function deleteFileOrDirectory(filePath: string): void {
  try {
    fs.rmSync(filePath, {
      recursive: true,
    });
  } catch (err) {
    error(`Failed to delete file or directory "${filePath}":`, err);
  }
}

/**
 * Helper function to print out an error message and then exit the program.
 *
 * All of the arguments will be directly passed to the `console.error` function.
 */
export function error(...args: unknown[]): never {
  console.error(...args);
  return process.exit(1);
}

export function fileExists(filePath: string): boolean {
  let pathExists: boolean;
  try {
    pathExists = fs.existsSync(filePath);
  } catch (err) {
    error(`Failed to check if "${filePath}" exists:`, err);
  }

  return pathExists;
}

/** From: https://github.com/expandjs/expandjs/blob/master/lib/kebabCaseRegex.js */
const KEBAB_CASE_REGEX =
  /^([a-z](?![\d])|[\d](?![a-z]))+(-?([a-z](?![\d])|[\d](?![a-z])))*$|^$/;

/** Kebab case is the naming style of using all lowercase and hyphens, like "foo-bar". */
export function isKebabCase(string: string): boolean {
  return KEBAB_CASE_REGEX.test(string);
}

/** Will recursively make as many subdirectories as needed. */
export function makeDir(dirPath: string): void {
  try {
    fs.mkdirSync(dirPath, {
      recursive: true,
    });
  } catch (err) {
    error(`Failed to create the "${dirPath}" directory:`, err);
  }
}

export function readFile(filePath: string): string {
  let fileContents: string;
  try {
    fileContents = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    error(`Failed to read the "${filePath}" file:`, err);
  }

  return fileContents;
}

export function renameFile(srcPath: string, dstPath: string): void {
  try {
    fs.renameSync(srcPath, dstPath);
  } catch (err) {
    error(`Failed to rename "${srcPath}" to "${dstPath}":`, err);
  }
}

/** Helper function to trim a suffix from a string, if it exists. Returns the trimmed string. */
export function trimSuffix(string: string, prefix: string): string {
  if (!string.endsWith(prefix)) {
    return string;
  }

  const endCharacter = string.length - prefix.length;
  return string.slice(0, endCharacter);
}

export function writeFile(filePath: string, data: string): void {
  try {
    fs.writeFileSync(filePath, data);
  } catch (err) {
    error(`Failed to write to the "${filePath}" file:`, err);
  }
}
