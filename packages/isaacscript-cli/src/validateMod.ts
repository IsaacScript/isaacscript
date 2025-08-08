import chalk from "chalk";
import {
  fatalError,
  getFilePath,
  getPackageJSON,
  getPackageJSONDependencies,
  getPackageManagerAddDevCommand,
  getPackageManagerInstallCommand,
  isDirectory,
  isFile,
} from "complete-node";
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
export async function validateInIsaacScriptProject(): Promise<void> {
  const isaacScriptModMissingFile = await getIsaacScriptModMissingFile(CWD);
  if (isaacScriptModMissingFile !== undefined) {
    await errorNotExists(isaacScriptModMissingFile);
  }
}

/**
 * Returns the file name missing. If undefined is returned, then the file path is an IsaacScript mod
 * directory.
 */
export async function getIsaacScriptModMissingFile(
  directoryPath: string,
): Promise<string | undefined> {
  // Files
  for (const fileName of ["package.json"]) {
    const filePath = path.join(directoryPath, fileName);
    // eslint-disable-next-line no-await-in-loop
    const file = await isFile(filePath);
    if (!file) {
      return filePath;
    }
  }

  // Subdirectories
  for (const subdirectoryName of ["src", "mod"]) {
    const subdirectoryPath = path.join(directoryPath, subdirectoryName);
    // eslint-disable-next-line no-await-in-loop
    const directory = await isDirectory(subdirectoryPath);
    if (!directory) {
      return subdirectoryPath;
    }
  }

  // Specific files in subdirectories.
  {
    const filePath = path.join(directoryPath, "mod", METADATA_XML);
    const file = await isFile(filePath);
    if (!file) {
      return filePath;
    }
  }

  return undefined;
}

async function errorNotExists(filePath: string) {
  const directory = await isDirectory(filePath);
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

export async function validatePackageJSONDependencies(): Promise<void> {
  const packageManager = await getPackageManagerUsedForExistingProject();
  const packageJSONPath = await getFilePath("package.json", CWD);
  const packageJSON = await getPackageJSON(packageJSONPath);
  const dependencies =
    (await getPackageJSONDependencies(packageJSON, "dependencies")) ?? {};
  const dependenciesArray = Object.keys(dependencies);

  const devDependencies =
    (await getPackageJSONDependencies(packageJSON, "devDependencies")) ?? {};
  const devDependenciesArray = Object.keys(devDependencies);

  for (const devDependency of REQUIRED_PACKAGE_JSON_DEV_DEPENDENCIES) {
    if (dependenciesArray.includes(devDependency)) {
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

export async function validateDepsInstalled(
  isaacScriptCommonDev: boolean | undefined,
  verbose: boolean,
): Promise<void> {
  // Running "npm install" will remove the links.
  if (isaacScriptCommonDev === true) {
    return;
  }

  const packageManager = await getPackageManagerUsedForExistingProject();
  const command = getPackageManagerInstallCommand(packageManager);

  console.log(
    `Running "${command}" to ensure that the project's dependencies are installed correctly.`,
  );

  execShellString(command, verbose);
}
