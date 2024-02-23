import path from "node:path";
import { PackageManager } from "../enums/PackageManager.js";
import { $s, $sq } from "./execa.js";
import { getFilePath, readFile } from "./file.js";
import { PACKAGE_JSON } from "./packageJSON.js";
import {
  getPackageManagerForProject,
  getPackageManagersForProject,
} from "./packageManager.js";
import { diff } from "./utils.js";

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
 * @returns Whether Yarn or any dependencies were updated.
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
    installAfterUpdate,
    quiet,
  );

  return yarnUpdated || dependenciesUpdated;
}

function updateYarn(
  packageJSONPath: string,
  packageRoot: string,
  quiet: boolean,
): boolean {
  const packageManagers = getPackageManagersForProject(packageRoot);

  if (!packageManagers.includes(PackageManager.yarn)) {
    return false;
  }

  const oldPackageJSONString = readFile(packageJSONPath);

  // Yarn does not have a quiet flag, so we use the `$sq` helper function.
  $sq`yarn set version latest`;

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

function updateDependencies(
  packageJSONPath: string,
  packageRoot: string,
  installAfterUpdate: boolean,
  quiet: boolean,
): boolean {
  const oldPackageJSONString = readFile(packageJSONPath);

  // - "--upgrade" is necessary because `npm-check-updates` will be a no-op by default (i.e. it only
  //   displays what is upgradeable).
  // - "--packageFile" is necessary because the current working directory may not contain the
  //   "package.json" file, so we must explicitly specify it.
  // - "--filterVersion" is necessary because if a dependency does not have a "^" prefix, we assume
  //   that it should be a "locked" dependency and not upgraded.
  if (quiet) {
    $sq`npx npm-check-updates --upgrade --packageFile ${packageJSONPath} --filterVersion ^*`;
  } else {
    $s`npx npm-check-updates --upgrade --packageFile ${packageJSONPath} --filterVersion ^*`;
  }

  const newPackageJSONString = readFile(packageJSONPath);
  if (oldPackageJSONString === newPackageJSONString) {
    return false;
  }

  if (installAfterUpdate) {
    const packageManager = getPackageManagerForProject(packageRoot);
    $s`${packageManager} install`;
  }

  return true;
}
