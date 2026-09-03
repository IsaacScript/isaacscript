import type { LintCommand } from "complete-node";
import { $q, getMonorepoPackageNames, lintCommands } from "complete-node";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");

// This script runs the lint scripts for each individual package. It does not run the lint scripts
// for the monorepo itself. For that, use the "lint.ts" script.
const lintPackages = await getMonorepoPackageNames(REPO_ROOT, "lint");

const lintPackageCommands: readonly LintCommand[] = lintPackages.map(
  (packageName) => {
    const packagePath = path.join(REPO_ROOT, "packages", packageName);
    const $$ = $q({
      cwd: packagePath,
      all: true,
    });
    return [packageName, $$`bun run lint`];
  },
);

await lintCommands(import.meta.dirname, lintPackageCommands, true);

console.log("Successfully linted all monorepo packages.");
