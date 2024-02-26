import chalk from "chalk";
import path from "node:path";
import { $s } from "./execa.js";
import { isFile, rm } from "./file.js";
import { PACKAGE_JSON } from "./packageJSON.js";
import {
  getPackageManagerForProject,
  getPackageManagerLockFileName,
} from "./packageManager.js";
import { fatalError } from "./utils.js";

/**
 * Helper function to:
 *
 * - delete the "node_modules" folder
 * - delete any package manager lock files that exist
 * - reinstall the dependencies using the detected package manager
 *
 * This will attempt to validate that the directory is correct by looking for a "package.json" file.
 * If not found, this function will print an error message and exit.
 *
 * @param packageRoot The path to the directory that contains the "package.json" file and the
 *                    "node_modules" folder. If undefined is passed, the current working directory
 *                    will be used.
 * @returns Whether any dependencies were updated.
 */
export function nukeDependencies(packageRoot: string | undefined): void {
  if (packageRoot === undefined) {
    packageRoot = process.cwd(); // eslint-disable-line no-param-reassign
  }

  const packageJSONPath = path.join(packageRoot, PACKAGE_JSON);
  if (!isFile(packageJSONPath)) {
    fatalError(
      `Failed to find the "${chalk.green(
        PACKAGE_JSON,
      )}" file at the package root: ${chalk.green(packageRoot)}`,
    );
  }

  const nodeModulesPath = path.join(packageRoot, "node_modules");
  console.log(`Removing: ${nodeModulesPath}`);
  rm(nodeModulesPath);
  console.log(`Removed: ${nodeModulesPath}`);

  const packageManager = getPackageManagerForProject(packageRoot);
  const packageManagerLockFileName =
    getPackageManagerLockFileName(packageManager);
  const packageManagerLockFilePath = path.join(
    packageRoot,
    packageManagerLockFileName,
  );
  console.log(`Removing: ${packageManagerLockFilePath}`);
  rm(packageManagerLockFilePath);
  console.log(`Removed: ${packageManagerLockFilePath}`);

  $s`${packageManager} install`;
}
