import { PackageManager } from "./types/PackageManager";
import { ensureAllCases, getEnumValues } from "./utils";

const PACKAGE_MANAGER_LOCK_FILE_NAMES: {
  readonly [key in PackageManager]: string;
} = {
  [PackageManager.NPM]: "package-lock.json",
  [PackageManager.YARN]: "yarn.lock",
};

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

export function getPackageManagerUsedForExistingProject() {
  for (const packageManager of getEnumValues(PackageManager)) {
    const lockFileName = getPackageManagerLockFileName(packageManager);
  }
}
