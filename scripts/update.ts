// Docusaurus-related things are stuck on this:
// https://github.com/typesense/docusaurus-theme-search-typesense/issues/38

// Old versions:
// - @docusaurus/core - 2.4.3
// - @docusaurus/eslint-plugin - 2.4.3
// - @docusaurus/module-type-aliases - 2.4.3
// - @docusaurus/preset-classic - 2.4.3
// - @docusaurus/tsconfig - 2.4.3
// - @mdx-js/react - 1.6.22
// - prism-react-renderer - 1.3.5
// - react - 17.0.2
// - react-dom - 17.0.2

import {
  $s,
  PACKAGE_JSON,
  findPackageRoot,
  getPackageJSONDependencies,
  getPackageJSONField,
  isFile,
  script,
  setPackageJSONDependency,
  updatePackageJSON,
} from "isaacscript-common-node";
import { trimPrefix } from "isaacscript-common-ts";
import path from "node:path";
import { getMonorepoPackageNames } from "./getMonorepoPackageNames.js";

const REPO_ROOT = findPackageRoot();

await updateIsaacScriptMonorepo();

export async function updateIsaacScriptMonorepo(): Promise<void> {
  await script(async ({ packageRoot }) => {
    // Certain monorepo packages are dependant on other monorepo packages, so check to see if those
    // are all up to date first. (This is independent of the root "package.json" file.)
    updateIndividualPackageDeps();

    const hasNewDependencies = await updatePackageJSON(packageRoot);
    if (hasNewDependencies) {
      // Now that the main dependencies have changed, we might need to update the "package.json"
      // files in the individual packages. However, we don't want to blow away "peerDependencies",
      // since they are in the form of ">= 5.0.0". Thus, we specify "--types prod,dev" to exclude
      // syncing "peerDependencies".
      $s`syncpack fix-mismatches --types prod,dev`;
    }
  });
}

/**
 * `syncpack` will automatically update most of the dependencies in the individual project
 * "package.json" files, but not the ones that do not exist in the root "package.json".
 */
function updateIndividualPackageDeps() {
  const monorepoPackageNames = getMonorepoPackageNames();
  for (const monorepoPackageName of monorepoPackageNames) {
    const monorepoPackagePath = path.join(
      REPO_ROOT,
      "packages",
      monorepoPackageName,
    );

    // Some packages do not have "package.json" files, like "isaacscript-lua".
    const packageJSONPath = path.join(monorepoPackagePath, PACKAGE_JSON);
    if (!isFile(packageJSONPath)) {
      continue;
    }

    // Some packages do not have version fields, like "docs".
    const version = getPackageJSONField(packageJSONPath, "version");
    if (version === undefined) {
      continue;
    }

    for (const monorepoPackageName2 of monorepoPackageNames) {
      const monorepoPackagePath2 = path.join(
        REPO_ROOT,
        "packages",
        monorepoPackageName2,
      );
      const dependencies = getPackageJSONDependencies(
        monorepoPackagePath2,
        "dependencies",
      );
      if (dependencies === undefined) {
        continue;
      }

      const depVersion = dependencies[monorepoPackageName];
      if (depVersion === undefined) {
        continue;
      }

      const depVersionTrimmed = trimPrefix(depVersion, "^");

      if (depVersionTrimmed !== version) {
        const versionWithPrefix = `^${version}`;
        setPackageJSONDependency(
          monorepoPackagePath2,
          monorepoPackageName,
          versionWithPrefix,
        );
      }
    }
  }
}
