import {
  $s,
  PACKAGE_JSON,
  buildScript,
  cp,
  fixMonorepoPackageDistDirectory,
  mkdir,
  rm,
} from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";
import path from "node:path";

await buildScript(({ outDir, packageRoot }) => {
  assertDefined(
    outDir,
    'Failed to get the "outDir" from the "tsconfig.json" file.',
  );

  $s`tsc`;
  fixMonorepoPackageDistDirectory(packageRoot, outDir);
  copyToMonorepoNodeModules(packageRoot, outDir);
});

/**
 * We copy the build output to the "node_modules" folder at the root of the monorepo. This obviates
 * the need for the monorepo to consume the actual npm package. (The ESLint config for the monorepo
 * needs the compiled JavaScript in order to work properly.)
 */
function copyToMonorepoNodeModules(packageRoot: string, outDir: string) {
  const monorepoRoot = path.join(packageRoot, "..", "..");
  const monorepoPluginDir = path.join(
    monorepoRoot,
    "node_modules",
    "eslint-plugin-isaacscript",
  );
  rm(monorepoPluginDir);

  mkdir(monorepoPluginDir);
  const newPackageJSONPath = path.join(monorepoPluginDir, PACKAGE_JSON);
  cp(PACKAGE_JSON, newPackageJSONPath);

  const monorepoPluginDistDir = path.join(monorepoPluginDir, "dist");
  cp(outDir, monorepoPluginDistDir);
}
