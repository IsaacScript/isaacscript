// Docusaurus-related things are stuck on this:
// https://github.com/typesense/docusaurus-theme-search-typesense/issues/38

// Old versions:
// - @docusaurus/core - 2.4.3
// - @docusaurus/eslint-plugin - 2.4.3
// - @docusaurus/module-type-aliases - 2.4.3
// - @docusaurus/preset-classic - 2.4.3
// - @docusaurus/theme-common - 2.4.3
// - @docusaurus/tsconfig - 2.4.3
// - @mdx-js/react - 1.6.22
// - prism-react-renderer - 1.3.5
// - react - 17.0.2
// - react-dom - 17.0.2

import {
  $s,
  PACKAGE_JSON,
  dirName,
  echo,
  getPackageJSONDependencies,
  getPackageJSONField,
  isFile,
  isMain,
  setPackageJSONDependency,
  updatePackageJSON,
} from "isaacscript-common-node";
import { trimPrefix } from "isaacscript-common-ts";
import path from "node:path";
import { getMonorepoPackageNames } from "./getMonorepoPackageNames.js";

const __dirname = dirName();
const REPO_ROOT = path.join(__dirname, "..");

if (isMain()) {
  await updateIsaacScriptMonorepo();
}

export async function updateIsaacScriptMonorepo(): Promise<void> {
  // Certain monorepo packages are dependant on other monorepo packages, so check to see if those
  // are all up to date first. (This is independent of the root "package.json" file.)
  const updatedSomething = updateIndividualPackageDeps();

  const hasNewDependencies = await updatePackageJSON(REPO_ROOT);
  if (hasNewDependencies) {
    // Now that the main dependencies have changed, we might need to update the "package.json" files
    // in the individual packages. However, we don't want to blow away "peerDependencies", since
    // they are in the form of ">= 5.0.0". Thus, we specify "--types prod,dev" to exclude syncing
    // "peerDependencies".
    $s`syncpack fix-mismatches --types prod,dev`;
  }

  if (updatedSomething || hasNewDependencies) {
    echo("Updated to the latest dependencies.");
  } else {
    echo("No new updates.");
  }
}

/**
 * `syncpack` will automatically update most of the dependencies in the individual project
 * "package.json" files, but not the ones that do not exist in the root "package.json".
 *
 * @returns Whether anything was updated.
 */
function updateIndividualPackageDeps(): boolean {
  let updatedSomething = false;

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

      // Some packages do not have "package.json" files, like "isaacscript-lua".
      const packageJSONPath2 = path.join(monorepoPackagePath2, PACKAGE_JSON);
      if (!isFile(packageJSONPath2)) {
        continue;
      }

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
        updatedSomething = true;
      }
    }
  }

  return updatedSomething;
}
