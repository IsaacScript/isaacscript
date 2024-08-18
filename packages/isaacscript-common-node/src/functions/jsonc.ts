import { isObject } from "isaacscript-common-ts";
import JSONC from "jsonc-parser";
import { readFile } from "./file.js";

/**
 * Helper function to parse a file as JSONC.
 *
 * This expects the file to contain an object (i.e. `{}`). This will print an error message and exit
 * the program if any errors occur.
 */
export function getJSONC(filePath: string): Record<string, unknown> {
  const fileContents = readFile(filePath);

  let json: unknown;
  try {
    json = JSONC.parse(fileContents);
  } catch (error) {
    throw new Error(`Failed to parse "${filePath}" as JSONC: ${error}`);
  }

  if (!isObject(json)) {
    throw new Error(
      `Failed to parse "${filePath}" as JSONC, since the contents were not an object.`,
    );
  }

  return json;
}
