import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import { PACKAGE_JSON, PACKAGE_JSON_PATH } from "./constants.js";
import { readFile } from "./file.js";
import { fatalError, isRecord } from "./isaacScriptCommonTS.js";

/**
 * Helper function to parse a file as JSONC.
 *
 * This expects the file to contain an object (i.e. `{}`), not an array or a primitive. The function
 * will terminate the program if any errors occur.
 *
 * We parse as JSONC instead of JSON to allow for comments and trailing commas.
 */
export function getJSONC(
  filePath: string,
  verbose: boolean,
): Record<string, unknown> {
  const fileContents = readFile(filePath, verbose);

  let json: unknown;
  try {
    json = JSONC.parse(fileContents);
  } catch (error) {
    fatalError(`Failed to parse "${chalk.green(filePath)}" as JSONC:`, error);
  }

  if (!isRecord(json)) {
    fatalError(
      `Failed to parse "${chalk.green(
        filePath,
      )}", since the contents were not an object.`,
    );
  }

  return json;
}

export function getProjectPackageJSONField(
  fieldName: string,
  verbose: boolean,
): string {
  const packageJSON = getJSONC(PACKAGE_JSON_PATH, verbose);
  const field = packageJSON[fieldName];
  if (typeof field !== "string") {
    fatalError(
      `Failed to parse the "${fieldName}" field from the "${PACKAGE_JSON}" file.`,
    );
  }

  return field;
}
