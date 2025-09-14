import { $, getMonorepoPackageNames, lintScript } from "complete-node";
import path from "node:path";

// This script runs the lint scripts for each individual package. It does not run the lint scripts
// for the monorepo itself. For that, use the "lint.ts" script.
await lintScript(import.meta.dirname, async (packageRoot) => {
  const lintPackages = await getMonorepoPackageNames(packageRoot, "lint");

  await Promise.all(
    lintPackages.map(async (packageName) => {
      const packagePath = path.join(packageRoot, "packages", packageName);
      const $$ = $({ cwd: packagePath });
      await $$`npm run lint`;
    }),
  );

  console.log("Successfully linted all monorepo packages.");
});
