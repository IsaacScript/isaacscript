import chalk from "chalk";
import commandExists from "command-exists";
import {
  PackageManager,
  fatalError,
  getPackageManagerLockFileName,
  getPackageManagersForProject,
} from "isaacscript-common-node";
import { CWD } from "./constants.js";

export const PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT = PackageManager.yarn;

interface PackageManagerOptions {
  npm: boolean;
  yarn: boolean;
  pnpm: boolean;
  dev?: boolean;
}

export function getPackageManagerUsedForNewProject(
  options: PackageManagerOptions,
): PackageManager {
  const packageManagerFromOptions = getPackageManagerFromOptions(options);
  if (packageManagerFromOptions !== undefined) {
    return packageManagerFromOptions;
  }

  return getDefaultPackageManager();
}

export function getDefaultPackageManager(): PackageManager {
  if (commandExists.sync("yarn")) {
    return PackageManager.yarn;
  }

  if (commandExists.sync("pnpm")) {
    return PackageManager.pnpm;
  }

  return PackageManager.npm;
}

export function getPackageManagerUsedForExistingProject(): PackageManager {
  const packageManagers = getPackageManagersForProject(CWD);
  if (packageManagers.length > 1) {
    const packageManagerLockFileNames = packageManagers
      .map((packageManager) => getPackageManagerLockFileName(packageManager))
      .map((packageManagerLockFileName) => `"${packageManagerLockFileName}"`)
      .join(" & ");
    fatalError(
      `Multiple different kinds of package manager lock files were found (${packageManagerLockFileNames}). You should delete the ones that you are not using so that this program can correctly detect your package manager.`,
    );
  }

  const packageManager = packageManagers[0];
  if (packageManager !== undefined) {
    return packageManager;
  }

  return getDefaultPackageManager();
}

function getPackageManagerFromOptions(options: PackageManagerOptions) {
  if (options.dev === true) {
    const packageManagerCommandExists = commandExists.sync(
      PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT,
    );
    if (!packageManagerCommandExists) {
      fatalError(
        `You specified the "--dev" option, but "${chalk.green(
          PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT,
        )}" does not seem to be a valid command. The IsaacScript monorepo uses ${PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT}, so in order to initiate a linked development mod, you must also have ${PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT} installed. Try running "corepack enable" to install it.`,
      );
    }

    return PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT;
  }

  if (options.npm) {
    const npmExists = commandExists.sync("npm");
    if (!npmExists) {
      fatalError(
        `You specified the "--npm" flag, but "${chalk.green(
          "npm",
        )}" does not seem to be a valid command.`,
      );
    }

    return PackageManager.npm;
  }

  if (options.yarn) {
    const yarnExists = commandExists.sync("yarn");
    if (!yarnExists) {
      fatalError(
        `You specified the "--yarn" flag, but "${chalk.green(
          "yarn",
        )}" does not seem to be a valid command.`,
      );
    }

    return PackageManager.yarn;
  }

  if (options.pnpm) {
    const pnpmExists = commandExists.sync("pnpm");
    if (!pnpmExists) {
      fatalError(
        `You specified the "--pnpm" flag, but "${chalk.green(
          "pnpm",
        )}" does not seem to be a valid command.`,
      );
    }

    return PackageManager.pnpm;
  }

  return undefined;
}
