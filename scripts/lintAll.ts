import { $op, lintScript } from "isaacscript-common-node";
import path from "node:path";
import { getMonorepoPackageNames } from "./getMonorepoPackageNames.js";

await lintScript(async ({ packageRoot }) => {
  const lintPackages = getMonorepoPackageNames("lint");

  const promises: Array<Promise<unknown>> = [];

  for (const lintPackage of lintPackages) {
    const packagePath = path.join(packageRoot, "packages", lintPackage);
    const $$ = $op({ cwd: packagePath });
    promises.push($$`npm run lint`);
  }

  await Promise.all(promises);
});
