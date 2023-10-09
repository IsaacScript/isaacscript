import commandExists from "command-exists";
import path from "node:path";
import { CWD } from "./constants.js";
import { PackageManager } from "./enums/PackageManager.js";
import { fileExists } from "./file.js";
import { fatalError, getEnumValues } from "./isaacScriptCommonTS.js";
import type { Args } from "./parseArgs.js";

const PACKAGE_MANAGER_LOCK_FILE_NAMES = {
  [PackageManager.npm]: "package-lock.json",
  [PackageManager.yarn]: "yarn.lock",
  [PackageManager.pnpm]: "pnpm-lock.yaml",
} as const satisfies Record<PackageManager, string>;

const PACKAGE_MANAGER_EXEC_COMMANDS = {
  [PackageManager.npm]: "npx",
  [PackageManager.yarn]: "npx",
  [PackageManager.pnpm]: "pnpm exec",
} as const satisfies Record<PackageManager, string>;

export const PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT = PackageManager.yarn;

export function getPackageManagerLockFileName(
  packageManager: PackageManager,
): string {
  return PACKAGE_MANAGER_LOCK_FILE_NAMES[packageManager];
}

export function getAllPackageManagerLockFileNames(): readonly string[] {
  return Object.values(PACKAGE_MANAGER_LOCK_FILE_NAMES);
}

export function getPackageManagerExecCommand(
  packageManager: PackageManager,
): string {
  return PACKAGE_MANAGER_EXEC_COMMANDS[packageManager];
}

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

export function getPackageManagerInstallCommand(
  packageManager: PackageManager,
): string {
  return `${packageManager} install`;
}

export function getPackageManagerInstallCICommand(
  packageManager: PackageManager,
): string {
  switch (packageManager) {
    case PackageManager.npm: {
      return "npm ci";
    }

    case PackageManager.yarn: {
      return "yarn install --frozen-lockfile";
    }

    case PackageManager.pnpm: {
      return "pnpm install --frozen-lockfile";
    }
  }
}

export function getPackageManagerUsedForNewProject(args: Args): PackageManager {
  const packageManagerFromArgs = getPackageManagerFromArgs(args);
  if (packageManagerFromArgs !== undefined) {
    return packageManagerFromArgs;
  }

  if (commandExists.sync("yarn")) {
    return PackageManager.yarn;
  }

  if (commandExists.sync("pnpm")) {
    return PackageManager.pnpm;
  }

  return PackageManager.npm;
}

export function getPackageManagerUsedForExistingProject(
  args: Args,
  verbose: boolean,
): PackageManager {
  const packageManagerSet = new Set<PackageManager>();

  for (const packageManager of getEnumValues(PackageManager)) {
    const lockFileName = getPackageManagerLockFileName(packageManager);
    const lockFilePath = path.join(CWD, lockFileName);
    if (fileExists(lockFilePath, verbose)) {
      packageManagerSet.add(packageManager);
    }
  }

  const packageManagers = [...packageManagerSet.values()];
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

  return getPackageManagerUsedForNewProject(args);
}

function getPackageManagerFromArgs(args: Args) {
  const dev = args.dev === true;
  if (dev) {
    const packageManagerCommandExists = commandExists.sync(
      PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT,
    );
    if (!packageManagerCommandExists) {
      fatalError(
        `You specified the "dev" flag, but "${PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT}" does not seem to be a valid command. The IsaacScript monorepo uses ${PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT}, so in order to initiate a linked development mod, you must also have ${PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT} installed. Try running "corepack enable" to install it.`,
      );
    }

    return PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT;
  }

  const npm = args.npm === true;
  if (npm) {
    const npmExists = commandExists.sync("npm");
    if (!npmExists) {
      fatalError(
        'You specified the "npm" flag, but "npm" does not seem to be a valid command.',
      );
    }

    return PackageManager.npm;
  }

  const yarn = args.yarn === true;
  if (yarn) {
    const yarnExists = commandExists.sync("yarn");
    if (!yarnExists) {
      fatalError(
        'You specified the "yarn" flag, but "yarn" does not seem to be a valid command.',
      );
    }

    return PackageManager.yarn;
  }

  const pnpm = args.pnpm === true;
  if (pnpm) {
    const pnpmExists = commandExists.sync("pnpm");
    if (!pnpmExists) {
      fatalError(
        'You specified the "pnpm" flag, but "pnpm" does not seem to be a valid command.',
      );
    }

    return PackageManager.pnpm;
  }

  return undefined;
}
