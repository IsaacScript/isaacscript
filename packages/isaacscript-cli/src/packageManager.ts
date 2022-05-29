import commandExists from "command-exists";
import path from "path";
import { CWD } from "./constants";
import * as file from "./file";
import { Args } from "./parseArgs";
import { PackageManager } from "./types/PackageManager";
import { ensureAllCases, getEnumValues } from "./utils";

const PACKAGE_MANAGER_LOCK_FILE_NAMES: {
  readonly [key in PackageManager]: string;
} = {
  [PackageManager.NPM]: "package-lock.json",
  [PackageManager.YARN]: "yarn.lock",
} as const;

export function getPackageManagerLockFileName(
  packageManager: PackageManager,
): string {
  return PACKAGE_MANAGER_LOCK_FILE_NAMES[packageManager];
}

export function getPackageManagerInstallCommand(
  packageManager: PackageManager,
): [command: string, args: string[]] {
  switch (packageManager) {
    case PackageManager.NPM: {
      return ["npm", ["install"]];
    }

    case PackageManager.YARN: {
      return ["yarn", []];
    }

    default: {
      return ensureAllCases(packageManager);
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

    default: {
      return ensureAllCases(packageManager);
    }
  }
}

export function getPackageManagerUsedForNewProject(args: Args): PackageManager {
  const npm = args.npm === true;
  if (npm) {
    return PackageManager.NPM;
  }

  if (commandExists.sync("yarn")) {
    return PackageManager.YARN;
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
