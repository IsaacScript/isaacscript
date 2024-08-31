import { $s, buildScript, cp, mkdir, rm } from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";
import path from "node:path";

await buildScript(({ outDir, packageRoot }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );

  $s`tsc`;
  copyToMonorepoNodeModules(packageRoot, outDir);
});

/**
 * We copy the build output to the "node_modules" folder at the root of the monorepo. This obviates
 * the need for the monorepo to consume the actual npm package. (The ESLint config for the monorepo
 * needs the compiled JavaScript in order to work properly.)
 */
function copyToMonorepoNodeModules(packageRoot: string, outDir: string) {
  const monorepoRoot = path.join(packageRoot, "..", "..");
  const packageName = path.basename(packageRoot);
  const monorepoPluginDir = path.join(
    monorepoRoot,
    "node_modules",
    packageName,
  );
  rm(monorepoPluginDir);
  mkdir(monorepoPluginDir);

  // We only need to copy the "package.json" file and the "dist" directory in order for it to work
  // properly.
  const packageJSONPath = path.join(packageRoot, "package.json");
  const newPackageJSONPath = path.join(monorepoPluginDir, "package.json");
  cp(packageJSONPath, newPackageJSONPath);
  const monorepoPluginDistDir = path.join(monorepoPluginDir, "dist");
  cp(outDir, monorepoPluginDistDir);
}
