import chalk from "chalk";
import fs from "node:fs";
import path from "node:path";
import { PACKAGE_MANAGER_VALUES } from "../cachedEnums.js";
import { PackageManager } from "../enums/PackageManager.js";
import { fatalError } from "./utils.js";

const PACKAGE_MANAGER_TO_LOCK_FILE_NAME = {
  [PackageManager.npm]: "package-lock.json",
  [PackageManager.yarn]: "yarn.lock",
  [PackageManager.pnpm]: "pnpm-lock.yaml",
} as const satisfies Record<PackageManager, string>;

export const PACKAGE_MANAGER_LOCK_FILE_NAMES: readonly string[] = Object.values(
  PACKAGE_MANAGER_TO_LOCK_FILE_NAME,
);

const PACKAGE_MANAGER_EXEC_COMMANDS = {
  [PackageManager.npm]: "npx",
  [PackageManager.yarn]: "npx",
  [PackageManager.pnpm]: "pnpm exec",
} as const satisfies Record<PackageManager, string>;

/**
 * Helper function to get the add command for a package manager. For example, the command for npm
 * is: `npm install foo --save`
 */
export function getPackageManagerAddCommand(
  packageManager: PackageManager,
  dependency: string,
): string {
  switch (packageManager) {
    case PackageManager.npm: {
      return `npm install ${dependency} --save`;
    }

    case PackageManager.yarn: {
      return `yarn add ${dependency}`;
    }

    case PackageManager.pnpm: {
      return `pnpm add ${dependency}`;
    }
  }
}

/**
 * Helper function to get the add development command for a package manager. For example, the
 * command for npm is: `npm install foo --save-dev`
 */
export function getPackageManagerAddDevCommand(
  packageManager: PackageManager,
  dependency: string,
): string {
  switch (packageManager) {
    case PackageManager.npm: {
      return `npm install ${dependency} --save-dev`;
    }

    case PackageManager.yarn: {
      return `yarn add ${dependency} --dev`;
    }

    case PackageManager.pnpm: {
      return `pnpm add ${dependency} --save-dev`;
    }
  }
}

/**
 * Helper function to get the exec command for a package manager. For example, the command for npm
 * is: `npx`
 */
export function getPackageManagerExecCommand(
  packageManager: PackageManager,
): string {
  return PACKAGE_MANAGER_EXEC_COMMANDS[packageManager];
}

/**
 * Helper function to look at the lock files in a given directory in order to detect the package
 * manager being used for the project.
 *
 * Since 2 or more different kinds of lock files can exist, this will print an error message and
 * exit the program if 0 lock files are found or if 2 or more lock files are found.
 */
export function getPackageManagerForProject(
  packageRoot: string,
): PackageManager {
  const packageManagers = getPackageManagersForProject(packageRoot);
  if (packageManagers.length > 1) {
    fatalError(
      `${
        packageManagers.length
      } different package manager lock files exist at "${chalk.green(
        packageRoot,
      )}". You should delete the ones that you are not using so that this program can correctly detect your package manager.`,
    );
  }

  const packageManager = packageManagers[0];
  if (packageManager === undefined) {
    fatalError(
      `No package manager lock files exist at "${chalk.green(
        packageRoot,
      )}". You should install dependencies using the package manager of your choice so that this program can correctly detect your package manager.`,
    );
  }

  return packageManager;
}

/**
 * Helper function to get the continuous integration install command for a package manager. For
 * example, the command for npm is: `npm ci`
 */
export function getPackageManagerInstallCICommand(
  packageManager: PackageManager,
): string {
  switch (packageManager) {
    case PackageManager.npm: {
      return "npm ci";
    }

    case PackageManager.yarn: {
      return "yarn install --immutable";
    }

    case PackageManager.pnpm: {
      return "pnpm install --frozen-lockfile";
    }
  }
}

/**
 * Helper function to get the install command for a package manager. For example, the command for
 * npm is: `npm install`
 */
export function getPackageManagerInstallCommand(
  packageManager: PackageManager,
): string {
  return `${packageManager} install`;
}

export function getPackageManagerLockFileName(
  packageManager: PackageManager,
): string {
  return PACKAGE_MANAGER_TO_LOCK_FILE_NAME[packageManager];
}

/**
 * Helper function to look at the lock files in a given directory in order to detect the package
 * manager being used for the project.
 *
 * Since 2 or more different kinds of lock files can exist, this will return an array containing all
 * of the package managers found. If no lock files were found, this will return an empty array.
 */
export function getPackageManagersForProject(
  packageDir: string,
): PackageManager[] {
  const packageManagersFound: PackageManager[] = [];

  for (const packageManager of PACKAGE_MANAGER_VALUES) {
    const lockFileName = getPackageManagerLockFileName(packageManager);
    const lockFilePath = path.join(packageDir, lockFileName);
    if (fs.existsSync(lockFilePath)) {
      packageManagersFound.push(packageManager);
    }
  }

  return packageManagersFound;
}
