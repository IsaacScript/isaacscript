import { $op, getMonorepoPackageNames, lintScript } from "complete-node";
import path from "node:path";

// This script runs the lint scripts for each individual package. It does not run the lint scripts
// for the monorepo itself. For that, use the "lint.ts" script.
await lintScript(async (packageRoot) => {
  const lintPackages = await getMonorepoPackageNames(packageRoot, "lint");

  const promises: Array<Promise<unknown>> = [];

  for (const lintPackage of lintPackages) {
    const packagePath = path.join(packageRoot, "packages", lintPackage);
    const $$ = $op({ cwd: packagePath });
    promises.push($$`npm run lint`);
  }

  await Promise.all(promises);
});
