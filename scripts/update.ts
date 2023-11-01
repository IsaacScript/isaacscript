// Docusaurus-related things are stuck on this:
// https://github.com/typesense/docusaurus-theme-search-typesense/issues/38

// Old versions:
// - @docusaurus/core - 2.4.3
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
  echo,
  fatalError,
  findPackageRoot,
  getPackageJSON,
  getPackageJSONDependencies,
  getPackageJSONVersion,
  script,
  updatePackageJSON,
} from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = findPackageRoot();

const PACKAGES_TO_CHECK_FOR_ISAACSCRIPT_LINT = [
  "eslint-config-isaacscript",
  "eslint-plugin-isaacscript",
] as const;

await updateIsaacScriptMonorepo();

export async function updateIsaacScriptMonorepo(): Promise<void> {
  await script(async ({ packageRoot }) => {
    // "isaacscript-lint" deps are independent of the root "package.json" file, so we do those
    // first.
    updateIsaacScriptLintDeps();

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
 * Specifically, "isaacscript-lint" needs to be updated for "eslint-config-isaacscript" and
 * "eslint-plugin-isaacscript". ("isaac-typescript-definitions" is currently a dependency at the
 * root, so we don't have to worry about updating "isaacscript-common".)
 */
function updateIsaacScriptLintDeps() {
  for (const monorepoPackage of PACKAGES_TO_CHECK_FOR_ISAACSCRIPT_LINT) {
    const packagePath = path.join(REPO_ROOT, "packages", monorepoPackage);
    const version = getPackageJSONVersion(packagePath);
    const versionWithPrefix = `^${version}`;

    const isaacScriptLintPackageJSONPath = path.join(
      REPO_ROOT,
      "packages",
      "isaacscript-lint",
      PACKAGE_JSON,
    );
    const packageJSON = getPackageJSON(isaacScriptLintPackageJSONPath);
    const dependencies = getPackageJSONDependencies(
      isaacScriptLintPackageJSONPath,
    );
    assertDefined(
      dependencies,
      `Failed to get the dependencies from: ${isaacScriptLintPackageJSONPath}`,
    );

    const dependency = dependencies[monorepoPackage];
    if (typeof dependency !== "string") {
      fatalError(
        `Failed to parse the following dependency: ${monorepoPackage}`,
      );
    }

    if (dependency !== versionWithPrefix) {
      dependencies[monorepoPackage] = versionWithPrefix;
      const newFileContents = JSON.stringify(packageJSON);
      fs.writeFileSync(isaacScriptLintPackageJSONPath, newFileContents);
      echo(
        `Updated the "isaacscript-lint" dependency of "${monorepoPackage}" to: ${version}`,
      );
    }
  }
}
