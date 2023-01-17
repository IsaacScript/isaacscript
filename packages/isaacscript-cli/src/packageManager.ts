import commandExists from "command-exists";
import { error, getEnumValues, HasAllEnumKeys } from "isaacscript-common-ts";
import path from "path";
import { CWD } from "./constants";
import { PackageManager } from "./enums/PackageManager";
import * as file from "./file";
import { Args } from "./parseArgs";

const PACKAGE_MANAGER_LOCK_FILE_NAMES = {
  [PackageManager.NPM]: "package-lock.json",
  [PackageManager.YARN]: "yarn.lock",
  [PackageManager.PNPM]: "pnpm-lock.yaml",
} as const satisfies HasAllEnumKeys<PackageManager, string>;

export function getPackageManagerLockFileName(
  packageManager: PackageManager,
): string {
  return PACKAGE_MANAGER_LOCK_FILE_NAMES[packageManager];
}

export function getPackageManagerAddCommand(
  packageManager: PackageManager,
  dependency: string,
): string {
  switch (packageManager) {
    case PackageManager.NPM: {
      return `npm install ${dependency} --save`;
    }

    case PackageManager.YARN: {
      return `yarn add ${dependency}`;
    }

    case PackageManager.PNPM: {
      return `pnpm add ${dependency}`;
    }
  }
}

export function getPackageManagerInstallCommand(
  packageManager: PackageManager,
): [command: string, args: string[]] {
  switch (packageManager) {
    case PackageManager.NPM: {
      return ["npm", ["install"]];
    }

    case PackageManager.YARN: {
      return ["yarn", ["install"]];
    }

    case PackageManager.PNPM: {
      return ["pnpm", ["install"]];
    }
  }
}

export function getPackageManagerInstallCICommand(
  packageManager: PackageManager,
): string {
  switch (packageManager) {
    case PackageManager.NPM: {
      return "npm ci";
    }

    case PackageManager.YARN: {
      return "yarn install --frozen-lockfile";
    }

    case PackageManager.PNPM: {
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
    return PackageManager.YARN;
  }

  if (commandExists.sync("pnpm")) {
    return PackageManager.PNPM;
  }

  return PackageManager.NPM;
}

export function getPackageManagerUsedForExistingProject(
  args: Args,
  verbose: boolean,
): PackageManager {
  for (const packageManager of getEnumValues(PackageManager)) {
    const lockFileName = getPackageManagerLockFileName(packageManager);
    const lockFilePath = path.join(CWD, lockFileName);
    if (file.exists(lockFilePath, verbose)) {
      return packageManager;
    }
  }

  return getPackageManagerUsedForNewProject(args);
}

function getPackageManagerFromArgs(args: Args) {
  const dev = args.dev === true;
  if (dev) {
    const yarnExists = commandExists.sync("yarn");
    if (!yarnExists) {
      error(
        'You specified the "dev" flag, but "yarn" does not seem to be a valid command. The IsaacScript monorepo uses yarn, so in order to initiate a linked development mod, you must also have yarn installed. Try running "corepack enable" to install it.',
      );
    }

    return PackageManager.YARN;
  }

  const npm = args.npm === true;
  if (npm) {
    const npmExists = commandExists.sync("npm");
    if (!npmExists) {
      error(
        'You specified the "npm" flag, but "npm" does not seem to be a valid command.',
      );
    }

    return PackageManager.NPM;
  }

  const yarn = args.yarn === true;
  if (yarn) {
    const yarnExists = commandExists.sync("yarn");
    if (!yarnExists) {
      error(
        'You specified the "yarn" flag, but "yarn" does not seem to be a valid command.',
      );
    }

    return PackageManager.YARN;
  }

  const pnpm = args.pnpm === true;
  if (pnpm) {
    const pnpmExists = commandExists.sync("pnpm");
    if (!pnpmExists) {
      error(
        'You specified the "pnpm" flag, but "pnpm" does not seem to be a valid command.',
      );
    }

    return PackageManager.PNPM;
  }

  return undefined;
}
