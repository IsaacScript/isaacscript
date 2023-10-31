// Old versions:
// - @mdx-js/react - Stuck until Docusaurus upgrades.
// - prism-react-renderer - Stuck until Docusaurus upgrades.
// - react - Stuck until Docusaurus upgrades.
// - react-dom - Stuck until Docusaurus upgrades.
// - retext-english - Stuck until Docusaurus is on ESM.
// - unified - Stuck until Docusaurus is on ESM.

import {
  $,
  PACKAGE_JSON,
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
  await script(async () => {
    // "isaacscript-lint" deps are independent of the root "package.json" file, so we do those
    // first.
    updateIsaacScriptLintDeps();

    const hasNewDependencies = await updatePackageJSON();
    if (hasNewDependencies) {
      // Now that the main dependencies have changed, we might need to update the "package.json"
      // files in the individual packages. However, we don't want to blow away "peerDependencies",
      // since they are in the form of ">= 5.0.0". Thus, we specify "--types prod,dev" to exclude
      // syncing "peerDependencies".
      await $`npx syncpack fix-mismatches --types "prod,dev"`;
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
      console.log(
        `Updated the "isaacscript-lint" dependency of "${monorepoPackage}" to: ${version}`,
      );
    }
  }
}
