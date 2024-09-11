// Packages held back:
// - "typescript" - Stuck on "5.5.4" until TSESLint upgrades:
// https://github.com/typescript-eslint/typescript-eslint/issues/9653

import { updatePackageJSONDependenciesMonorepo } from "complete-node"; // eslint-disable-line import-x/no-extraneous-dependencies

await updatePackageJSONDependenciesMonorepo();
