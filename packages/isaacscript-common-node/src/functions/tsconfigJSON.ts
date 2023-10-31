import { isObject } from "isaacscript-common-ts";
import { getFilePath } from "./file.js";
import { getJSONC } from "./jsonc.js";

export const TSCONFIG_JSON = "tsconfig.json";

/**
 * Helper function to get a "tsconfig.json" file as an object. This will print an error message and
 * exit the program if the "tsconfig.json" file cannot be found or is otherwise invalid.
 *
 * @param filePathOrDirPath Either the path to a "tsconfig.json" file or the path to a directory
 *                          which contains a "tsconfig.json" file. If undefined is passed, the
 *                          current working directory will be used.
 */
export function getTSConfigJSON(
  filePathOrDirPath: string | undefined,
): Record<string, unknown> {
  const filePath = getFilePath(TSCONFIG_JSON, filePathOrDirPath);
  return getJSONC(filePath);
}

/**
 * Helper function to get the "outDir" field from a "tsconfig.json" file. If the field does not
 * exist, `undefined` will be returned. This will print an error message and exit the program if the
 * "tsconfig.json" file cannot be found or is otherwise invalid.
 *
 * @param filePathOrDirPathOrRecord Either the path to a "tsconfig.json" file, the path to a
 *                                 directory which contains a "tsconfig.json" file, or a parsed
 *                                 JavaScript object from a JSON file. If undefined is passed, the
 *                                 current working directory will be used.
 */
export function getTSConfigJSONOutDir(
  filePathOrDirPathOrRecord: string | undefined,
): string | undefined {
  const TSConfigJSON =
    typeof filePathOrDirPathOrRecord === "object"
      ? filePathOrDirPathOrRecord
      : getTSConfigJSON(filePathOrDirPathOrRecord);

  const { compilerOptions } = TSConfigJSON;
  if (!isObject(compilerOptions)) {
    return undefined;
  }

  const { outDir } = compilerOptions;
  if (typeof outDir !== "string") {
    return undefined;
  }

  return outDir;
}
