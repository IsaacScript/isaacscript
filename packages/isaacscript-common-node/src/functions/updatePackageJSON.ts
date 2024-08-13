import { parseSemanticVersion } from "isaacscript-common-ts";
import path from "node:path";
import { PackageManager } from "../enums/PackageManager.js";
import { $op } from "./execa.js";
import { getFilePath, readFile } from "./file.js";
import { PACKAGE_JSON } from "./packageJSON.js";
import {
  getPackageManagerForProject,
  getPackageManagersForProject,
} from "./packageManager.js";
import { diff, fatalError } from "./utils.js";

/** @returns Whether the dependencies were updated. */
export function updateDependencies(
  packageJSONPath: string,
  packageRoot: string,
  quiet: boolean,
): boolean {
  const $$ = $op({
    cwd: packageRoot,
    stdio: quiet ? "pipe" : "inherit",
  });

  const oldPackageJSONString = readFile(packageJSONPath);

  // - "--upgrade" is necessary because `npm-check-updates` will be a no-op by default (i.e. it only
  //   displays what is upgradeable).
  // - "--packageFile" is necessary because the current working directory may not contain the
  //   "package.json" file, so we must explicitly specify it.
  // - "--filterVersion" is necessary because if a dependency does not have a "^" prefix, we assume
  //   that it should be a "locked" dependency and not upgraded.
  $$.sync`npx npm-check-updates --upgrade --packageFile ${packageJSONPath} --filterVersion ^*`;

  const newPackageJSONString = readFile(packageJSONPath);
  return oldPackageJSONString !== newPackageJSONString;
}

/**
 * Helper function to:
 *
 * - Upgrade Yarn (if it is the package manager used in the project).
 * - Run `npm-check-updates` to update the dependencies in the "package.json" file.
 * - Install the new dependencies with the package manager used in the project.
 *
 * @param filePathOrDirPath Either the path to a "package.json" file or the path to a directory
 *                          which contains a "package.json" file. If undefined is passed, the
 *                          current working directory will be used.
 * @param installAfterUpdate Optional. Whether to install the new dependencies afterward, if any.
 *                           Default is true.
 * @param quiet Optional. Whether to suppress console output. Default is false.
 * @returns Whether the "package.json" file was updated.
 */
export function updatePackageJSON(
  filePathOrDirPath: string | undefined,
  installAfterUpdate = true,
  quiet = false,
): boolean {
  const packageJSONPath = getFilePath(PACKAGE_JSON, filePathOrDirPath);
  const packageRoot = path.dirname(packageJSONPath);

  const yarnUpdated = updateYarn(packageJSONPath, packageRoot, quiet);
  const dependenciesUpdated = updateDependencies(
    packageJSONPath,
    packageRoot,
    quiet,
  );

  const packageJSONChanged = yarnUpdated || dependenciesUpdated;
  if (packageJSONChanged && installAfterUpdate) {
    const packageManager = getPackageManagerForProject(packageRoot);
    const $$ = $op({ cwd: packageRoot });
    $$.sync`${packageManager} install`;
  }

  return packageJSONChanged;
}

/** @returns Whether Yarn was updated. */
export function updateYarn(
  packageJSONPath: string,
  packageRoot: string,
  quiet: boolean,
): boolean {
  const packageManagers = getPackageManagersForProject(packageRoot);

  if (!packageManagers.includes(PackageManager.yarn)) {
    return false;
  }

  const $$ = $op({ cwd: packageRoot });

  // If Yarn version 1 is being used, assume that we don't need to update it.
  const { stdout } = $$.sync`yarn --version`;
  if (typeof stdout !== "string") {
    fatalError('Failed to get the output of the "yarn --version" command.');
  }

  const yarnVersion = parseSemanticVersion(stdout);
  if (yarnVersion === undefined) {
    fatalError(
      `Failed to parse the Yarn version when running the "yarn --version" command: ${stdout}`,
    );
  }
  if (yarnVersion.majorVersion === 1) {
    return false;
  }

  const oldPackageJSONString = readFile(packageJSONPath);

  $$.sync`yarn set version latest`;

  const newPackageJSONString = readFile(packageJSONPath);
  if (oldPackageJSONString === newPackageJSONString) {
    return false;
  }

  if (!quiet) {
    console.log("New version of Yarn:");
    diff(oldPackageJSONString, newPackageJSONString);
    console.log();
  }

  return true;
}
