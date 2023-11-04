import path from "node:path";
import ncu from "npm-check-updates";
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
 * - Upgrade yarn (if it is the package manager used in the project).
 * - Run `npm-check-updates` to update the dependencies in the "package.json" file.
 * - Install the new dependencies with the package manager used in the project.
 *
 * @param filePathOrDirPath Either the path to a "package.json" file or the path to a directory
 *                          which contains a "package.json" file. If undefined is passed, the
 *                          current working directory will be used.
 * @param installAfterUpdate Optional. Whether to install the new dependencies afterward, if any.
 *                           Defaults to true.
 * @param quiet Optional. Whether to suppress console output. Defaults to false.
 * @returns Whether any dependencies were updated.
 */
export async function updatePackageJSON(
  filePathOrDirPath: string | undefined,
  installAfterUpdate = true,
  quiet = false,
): Promise<boolean> {
  const packageJSONPath = getFilePath(PACKAGE_JSON, filePathOrDirPath);
  const packageRoot = path.dirname(packageJSONPath);
  const packageManagers = getPackageManagersForProject(packageRoot);
  const oldPackageJSONString = readFile(packageJSONPath);

  if (packageManagers.includes(PackageManager.yarn)) {
    // Yarn does not have a quiet flag, so we use the `$sq` helper function.
    $sq`yarn set version latest`;
  }

  await ncu.run({
    // This option is necessary because NCU will be a no-op by default (i.e. it only displays what
    // is upgradeable).
    upgrade: true,

    // The current working directory may not contain the "package.json" file, so we must explicitly
    // specify it.
    packageFile: packageJSONPath,

    // If a dependency does not have a "^" prefix, we assume that it should be a "locked" dependency
    // and not upgraded.
    filterVersion: "^*",
  });

  const newPackageJSONString = readFile(packageJSONPath);
  const hasNewDependencies = oldPackageJSONString !== newPackageJSONString;
  if (hasNewDependencies) {
    if (!quiet) {
      console.log('New "package.json" file:');
      diff(oldPackageJSONString, newPackageJSONString);
      console.log();
    }

    if (installAfterUpdate) {
      // Since `getPackageManagerForProject` can cause a fatal error, we only invoke it if we need
      // to install the new dependencies.
      const packageManager = getPackageManagerForProject(packageRoot);
      $s`${packageManager} install`;
    }
  }

  return hasNewDependencies;
}
