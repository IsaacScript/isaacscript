import chalk from "chalk";
import { isObject, setAdd } from "isaacscript-common-ts";
import { getFilePath, readFile, writeFile } from "./file.js";
import { fatalError } from "./utils.js";

type PackageJSONDependencyFieldName =
  | "dependencies"
  | "devDependencies"
  | "peerDependencies";

export const PACKAGE_JSON = "package.json";

/**
 * Helper function to get a "package.json" file as an object. This will print an error message and
 * exit the program if the "package.json" file cannot be found or is otherwise invalid.
 *
 * @param filePathOrDirPath Either the path to a "package.json" file or the path to a directory
 *                          which contains a "package.json" file. If undefined is passed, the
 *                          current working directory will be used.
 */
export function getPackageJSON(
  filePathOrDirPath: string | undefined,
): Record<string, unknown> {
  const filePath = getFilePath(PACKAGE_JSON, filePathOrDirPath);
  const packageJSONContents = readFile(filePath);
  const packageJSON = JSON.parse(packageJSONContents) as unknown;
  if (!isObject(packageJSON)) {
    fatalError(
      `Failed to parse a "${chalk.green(
        PACKAGE_JSON,
      )}" file at the following path: ${chalk.green(filePath)}`,
    );
  }

  return packageJSON;
}

/**
 * Helper function to get the "dependencies" or "devDependencies" or "peerDependencies" field from a
 * "package.json" file. If the corresponding field does not exist, `undefined` will be returned.
 *
 * This will print an error message and exit the program if the "package.json" file cannot be found
 * or is otherwise invalid.
 *
 * @param filePathOrDirPathOrRecord Either the path to a "package.json" file, the path to a
 *                                 directory which contains a "package.json" file, or a parsed
 *                                 JavaScript object from a JSON file. If undefined is passed, the
 *                                 current working directory will be used.
 * @param dependencyFieldName Optional. The specific dependencies field to get. Defaults to
 *                            "dependencies".
 */
export function getPackageJSONDependencies(
  filePathOrDirPathOrRecord: string | Record<string, unknown> | undefined,
  dependencyFieldName: PackageJSONDependencyFieldName,
): Record<string, string> | undefined {
  const packageJSON =
    typeof filePathOrDirPathOrRecord === "object"
      ? filePathOrDirPathOrRecord
      : getPackageJSON(filePathOrDirPathOrRecord);

  const field = packageJSON[dependencyFieldName];
  if (field === undefined) {
    return undefined;
  }

  if (!isObject(field)) {
    if (typeof filePathOrDirPathOrRecord === "string") {
      fatalError(
        `Failed to parse the "${chalk.green(
          dependencyFieldName,
        )}" field in a "${chalk.green(PACKAGE_JSON)}" file from: ${chalk.green(
          filePathOrDirPathOrRecord,
        )}`,
      );
    }

    fatalError(
      `Failed to parse the "${chalk.green(
        dependencyFieldName,
      )}" field in a "${chalk.green(PACKAGE_JSON)}" file.`,
    );
  }

  for (const [key, value] of Object.entries(field)) {
    if (typeof value !== "string") {
      fatalError(
        `Failed to parse the "${chalk.green(
          dependencyFieldName,
        )}" field in a "${chalk.green(
          PACKAGE_JSON,
        )}" file since the "${chalk.green(key)}" entry was not a string.`,
      );
    }
  }

  return field as Record<string, string>;
}

/**
 * Helper function to get an arbitrary string field from a "package.json" file. If the field does
 * not exist, `undefined` will be returned. This will print an error message and exit the program if
 * the "package.json" file cannot be found or is otherwise invalid.
 *
 * @param filePathOrDirPathOrRecord Either the path to a "package.json" file, the path to a
 *                                 directory which contains a "package.json" file, or a parsed
 *                                 JavaScript object from a JSON file. If undefined is passed, the
 *                                 current working directory will be used.
 * @param fieldName The name of the field to retrieve.
 */
export function getPackageJSONField(
  filePathOrDirPathOrRecord: string | Record<string, unknown> | undefined,
  fieldName: string,
): string {
  const packageJSON =
    typeof filePathOrDirPathOrRecord === "object"
      ? filePathOrDirPathOrRecord
      : getPackageJSON(filePathOrDirPathOrRecord);

  const field = packageJSON[fieldName];
  if (typeof field !== "string") {
    if (typeof filePathOrDirPathOrRecord === "string") {
      fatalError(
        `Failed to parse the "${chalk.green(
          fieldName,
        )}" field in a "${chalk.green(PACKAGE_JSON)}" file from: ${chalk.green(
          filePathOrDirPathOrRecord,
        )}`,
      );
    }

    fatalError(
      `Failed to parse the "${chalk.green(
        fieldName,
      )}" field in a "${chalk.green(PACKAGE_JSON)}" file.`,
    );
  }

  return field;
}

/**
 * Helper function to get the "scripts" field from a "package.json" file. If the field does not
 * exist, `undefined` will be returned. This will print an error message and exit the program if the
 * "package.json" file cannot be found or is otherwise invalid.
 *
 * @param filePathOrDirPathOrRecord Either the path to a "package.json" file, the path to a
 *                                 directory which contains a "package.json" file, or a parsed
 *                                 JavaScript object from a JSON file. If undefined is passed, the
 *                                 current working directory will be used.
 */
export function getPackageJSONScripts(
  filePathOrDirPathOrRecord: string | Record<string, unknown> | undefined,
): Record<string, string> | undefined {
  const packageJSON =
    typeof filePathOrDirPathOrRecord === "object"
      ? filePathOrDirPathOrRecord
      : getPackageJSON(filePathOrDirPathOrRecord);

  const { scripts } = packageJSON;
  if (scripts === undefined) {
    return undefined;
  }

  if (!isObject(scripts)) {
    if (typeof filePathOrDirPathOrRecord === "string") {
      fatalError(
        `Failed to parse the "${chalk.green(
          "scripts",
        )}" field in a "${chalk.green(PACKAGE_JSON)}" file from: ${chalk.green(
          filePathOrDirPathOrRecord,
        )}`,
      );
    }

    fatalError(
      `Failed to parse the "${chalk.green(
        "scripts",
      )}" field in a "${chalk.green(PACKAGE_JSON)}" file.`,
    );
  }

  for (const [key, value] of Object.entries(scripts)) {
    if (typeof value !== "string") {
      fatalError(
        `Failed to parse the "${chalk.green(key)}" script in the "${chalk.green(
          PACKAGE_JSON,
        )}" file.`,
      );
    }
  }

  return scripts as Record<string, string>;
}

/**
 * Helper function to get the "version" field from a "package.json" file. This will print an error
 * message and exit the program if the "package.json" file cannot be found or is otherwise invalid.
 *
 * @param filePathOrDirPathOrRecord Either the path to a "package.json" file, the path to a
 *                                 directory which contains a "package.json" file, or a parsed
 *                                 JavaScript object from a JSON file. If undefined is passed, the
 *                                 current working directory will be used.
 */
export function getPackageJSONVersion(
  filePathOrDirPathOrRecord: string | Record<string, unknown> | undefined,
): string {
  return getPackageJSONField(filePathOrDirPathOrRecord, "version");
}

/**
 * Helper function to check if a "package.json" file has a particular dependency. Both the
 * "dependencies" and the "devDependencies" fields will be checked. This will print an error message
 * and exit the program if the "package.json" file cannot be found or is otherwise invalid.
 *
 * This function is variadic, meaning that you can pass as many dependency names as you want to
 * check for. This function will return true if one or more dependencies were found.
 *
 * @param filePathOrDirPathOrRecord Either the path to a "package.json" file, the path to a
 *                                 directory which contains a "package.json" file, or a parsed
 *                                 JavaScript object from a JSON file. If undefined is passed, the
 *                                 current working directory will be used.
 * @param dependencyNames The name of the dependency to check for.
 */
export function isPackageJSONDependency(
  filePathOrDirPathOrRecord: string | Record<string, unknown> | undefined,
  ...dependencyNames: string[]
): boolean {
  const dependencySet = new Set<string>();

  const packageJSON =
    typeof filePathOrDirPathOrRecord === "object"
      ? filePathOrDirPathOrRecord
      : getPackageJSON(filePathOrDirPathOrRecord);

  const dependencies = getPackageJSONDependencies(packageJSON, "dependencies");
  if (dependencies !== undefined) {
    setAdd(dependencySet, ...Object.keys(dependencies));
  }

  const devDependencies = getPackageJSONDependencies(
    packageJSON,
    "devDependencies",
  );
  if (devDependencies !== undefined) {
    setAdd(dependencySet, ...Object.keys(devDependencies));
  }

  return dependencyNames.some((dependencyName) =>
    dependencySet.has(dependencyName),
  );
}

/**
 * Helper function to check if a "package.json" file has a particular script. This will print an
 * error message and exit the program if the "package.json" file cannot be found or is otherwise
 * invalid.
 *
 * @param filePathOrDirPathOrRecord Either the path to a "package.json" file, the path to a
 *                                 directory which contains a "package.json" file, or a parsed
 *                                 JavaScript object from a JSON file. If undefined is passed, the
 *                                 current working directory will be used.
 * @param scriptName The name of the script to check for.
 */
export function packageJSONHasScript(
  filePathOrDirPathOrRecord: string | Record<string, unknown> | undefined,
  scriptName: string,
): boolean {
  const packageJSON =
    typeof filePathOrDirPathOrRecord === "object"
      ? filePathOrDirPathOrRecord
      : getPackageJSON(filePathOrDirPathOrRecord);

  const scripts = getPackageJSONScripts(packageJSON);
  if (scripts === undefined) {
    return false;
  }

  const script = scripts[scriptName];
  return script !== undefined;
}

/**
 * Helper function to set a dependency in a "package.json" file to a new value. This will print an
 * error message and exit the program if the "package.json" file cannot be found or is otherwise
 * invalid.
 *
 * @param filePathOrDirPath Either the path to a "package.json" file or the path to a directory
 *                          which contains a "package.json" file. If undefined is passed, the
 *                          current working directory will be used.
 * @param dependencyName The name of the dependency to update.
 * @param version The new value for the dependency field. Note that most of the time, the version
 *                should have a "^" character prefix to indicate that patch updates should
 *                automatically be downloaded by the package manager.
 */
export function setPackageJSONDependency(
  filePathOrDirPath: string | undefined,
  dependencyName: string,
  version: string,
): void {
  const filePath = getFilePath(PACKAGE_JSON, filePathOrDirPath);
  const packageJSON = getPackageJSON(filePath);

  const dependencies =
    getPackageJSONDependencies(packageJSON, "dependencies") ?? {};
  dependencies[dependencyName] = version;
  packageJSON["dependencies"] = dependencies;

  const newFileContents = JSON.stringify(packageJSON);
  writeFile(filePath, newFileContents);
}
