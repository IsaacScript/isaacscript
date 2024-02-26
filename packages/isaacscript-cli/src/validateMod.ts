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
import { CWD, METADATA_XML, PROJECT_NAME } from "./constants.js";
import { execShellString } from "./exec.js";
import { getPackageManagerUsedForExistingProject } from "./packageManager.js";

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

/** Validate that we are in a directory that looks like an IsaacScript project. */
export function validateInIsaacScriptProject(): void {
  const isaacScriptModMissingFile = getIsaacScriptModMissingFile(CWD);
  if (isaacScriptModMissingFile !== undefined) {
    errorNotExists(isaacScriptModMissingFile);
  }
}

/**
 * Returns the file name missing. If undefined is returned, then the file path is an IsaacScript mod
 * directory.
 */
export function getIsaacScriptModMissingFile(
  directoryPath: string,
): string | undefined {
  // Files
  for (const fileName of [PACKAGE_JSON]) {
    const filePath = path.join(directoryPath, fileName);
    if (!isFile(filePath)) {
      return filePath;
    }
  }

  // Subdirectories
  for (const subdirectoryName of ["src", "mod"]) {
    const subdirectoryPath = path.join(directoryPath, subdirectoryName);
    if (!isDirectory(subdirectoryPath)) {
      return subdirectoryPath;
    }
  }

  // Specific files in subdirectories.
  {
    const filePath = path.join(directoryPath, "mod", METADATA_XML);
    if (!isFile(filePath)) {
      return filePath;
    }
  }

  return undefined;
}

function errorNotExists(filePath: string) {
  const directory = isDirectory(filePath);
  const noun = directory ? "subdirectory" : "file";
  console.error(
    `It looks like the current working directory of "${chalk.green(
      CWD,
    )}" is not an ${PROJECT_NAME} project. ("${filePath}" ${noun} does not exist.)`,
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
    getPackageJSONDependencies(packageJSON, "dependencies") ?? {};
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
