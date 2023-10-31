import path from "node:path";
import ncu from "npm-check-updates";
import { PackageManager } from "../enums/PackageManager.js";
import { $s, $ss } from "./execa.js";
import { getFilePath, readFile } from "./file.js";
import { PACKAGE_JSON } from "./packageJSON.js";
import {
  getPackageManagerForProject,
  getPackageManagerInstallCommand,
} from "./packageManager.js";
import { diff } from "./utils.js";

/**
 * Helper function to:
 *
 * - Upgrade yarn (if it is the package manager used in the project).
 * - Run `npm-check-updates` to update the dependencies in the "package.json" file.
 * - Install the new dependencies with the package manager used in the project.
 *
 * @param filePathOrDirPath Either the path to a "package.json" file or the path to a directory
 *                          which contains a "package.json" file. If undefined is passed, the
 *                          current working directory will be used.
 * @returns Whether any dependencies were updated.
 */
export async function updatePackageJSON(
  filePathOrDirPath: string | undefined,
): Promise<boolean> {
  const packageJSONPath = getFilePath(PACKAGE_JSON, filePathOrDirPath);
  const packageRoot = path.dirname(packageJSONPath);
  const packageManager = getPackageManagerForProject(packageRoot);
  const oldPackageJSONString = readFile(packageJSONPath);

  if (packageManager === PackageManager.yarn) {
    // Yarn does not have a silent flag, so we use the `$ss` helper function.
    $ss`yarn set version latest`;
  }

  await ncu.run({
    // This option is necessary because NCU will be a no-op by default (i.e. it only displays what
    // is upgradeable).
    upgrade: true,

    // If a dependency does not have a "^" prefix, we assume that it should be a "locked" dependency
    // and not upgraded.
    filterVersion: "^*",
  });

  const newPackageJSONString = readFile(packageJSONPath);
  const hasNewDependencies = oldPackageJSONString !== newPackageJSONString;
  if (hasNewDependencies) {
    console.log('New "package.json" file:');
    diff(oldPackageJSONString, newPackageJSONString);
    console.log();

    const command = getPackageManagerInstallCommand(packageManager);
    $s`${command}`;
  }

  return hasNewDependencies;
}
