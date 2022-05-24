import { PackageManager } from "./types/PackageManager";
import { ensureAllCases } from "./utils";

export function getPackageManagerLockFileName(
  packageManager: PackageManager,
): string {
  switch (packageManager) {
    case PackageManager.NPM: {
      return "package-lock.json";
    }

    case PackageManager.YARN: {
      return "yarn.lock";
    }

    default: {
      return ensureAllCases(packageManager);
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
