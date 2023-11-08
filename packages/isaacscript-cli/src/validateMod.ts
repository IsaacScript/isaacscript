import chalk from "chalk";
import {
  PACKAGE_JSON,
  fatalError,
  getFilePath,
  getPackageJSON,
  getPackageJSONDependencies,
  getPackageManagerAddDevCommand,
  getPackageManagerInstallCommand,
  isDirectory,
  isFile,
} from "isaacscript-common-node";
import path from "node:path";
import { CWD, PROJECT_NAME } from "./constants.js";
import { execShellString } from "./exec.js";
import { getPackageManagerUsedForExistingProject } from "./packageManager.js";

const FILE_NAMES_TO_CHECK = [PACKAGE_JSON] as const;

/** We don't check "node_modules" because we might be cloning a fresh IsaacScript project. */
const SUBDIRECTORY_NAMES_TO_CHECK = ["src", "mod"] as const;

/**
 * We want "typescript" and some of the other dependencies to be in "devDependencies" instead of
 * "dependencies" because it prevents their functions from being placed into the list of
 * auto-complete functions.
 */
const REQUIRED_PACKAGE_JSON_DEV_DEPENDENCIES = [
  "isaacscript",
  // - "isaacscript-lint" is not required.
  // - "isaacscript-spell" is not required.
  // - "isaacscript-tsconfig" is not required.
  "typescript",
  "typescript-to-lua",
] as const;

// Validate that we are in a directory that looks like an IsaacScript project.
export function validateInIsaacScriptProject(): void {
  for (const fileName of FILE_NAMES_TO_CHECK) {
    const filePath = path.join(CWD, fileName);
    if (!isFile(filePath)) {
      errorNotExists(fileName, true);
    }
  }

  for (const subdirectoryName of SUBDIRECTORY_NAMES_TO_CHECK) {
    const subdirectoryPath = path.join(CWD, subdirectoryName);
    if (!isDirectory(subdirectoryPath)) {
      errorNotExists(subdirectoryName, false);
    }
  }
}

function errorNotExists(dirName: string, file: boolean) {
  const noun = file ? "file" : "subdirectory";
  console.error(
    `It looks like the current working directory of "${chalk.green(
      CWD,
    )}" is not an ${PROJECT_NAME} project. (There is no "${dirName}" ${noun} here.)`,
  );
  console.error(
    `Did you mean to create a new ${PROJECT_NAME} project with "${chalk.green(
      "npx isaacscript init",
    )}"?`,
  );
  console.error(
    `If not, then change the current working directory to an ${PROJECT_NAME} project.`,
  );
  process.exit(1);
}

export function validatePackageJSONDependencies(): void {
  const packageJSONPath = getFilePath(PACKAGE_JSON, CWD);
  const packageJSON = getPackageJSON(packageJSONPath);
  const dependencies =
    getPackageJSONDependencies(packageJSON, "devDependencies") ?? {};
  const dependenciesArray = Object.keys(dependencies);

  const devDependencies =
    getPackageJSONDependencies(packageJSON, "devDependencies") ?? {};
  const devDependenciesArray = Object.keys(devDependencies);

  for (const devDependency of REQUIRED_PACKAGE_JSON_DEV_DEPENDENCIES) {
    if (dependenciesArray.includes(devDependency)) {
      const packageManager = getPackageManagerUsedForExistingProject();
      const addDevCommand = getPackageManagerAddDevCommand(
        packageManager,
        devDependency,
      );
      fatalError(
        `The "${devDependency}" dependency is located in the "dependencies" object instead of the "devDependencies" object in the "${packageJSONPath}" file. You can fix this with the following command:\n${chalk.green(
          addDevCommand,
        )}`,
      );
    }
  }

  for (const devDependency of REQUIRED_PACKAGE_JSON_DEV_DEPENDENCIES) {
    if (!devDependenciesArray.includes(devDependency)) {
      const packageManager = getPackageManagerUsedForExistingProject();
      const addDevCommand = getPackageManagerAddDevCommand(
        packageManager,
        devDependency,
      );
      fatalError(
        `IsaacScript projects require a "devDependencies" entry of "${devDependency}" in the "${packageJSONPath}" file. You can add it with the following command:\n${chalk.green(
          addDevCommand,
        )}`,
      );
    }
  }
}

export function validateDepsInstalled(verbose: boolean): void {
  const packageManager = getPackageManagerUsedForExistingProject();
  const command = getPackageManagerInstallCommand(packageManager);

  console.log(
    `Running "${command}" to ensure that the project's dependencies are installed correctly.`,
  );

  execShellString(command, verbose);
}
