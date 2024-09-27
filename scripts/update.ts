// Packages held back:
// - "typescript" - Stuck on "5.5.4" until TSESLint upgrades:
// https://github.com/typescript-eslint/typescript-eslint/issues/9653
// - "typescript-to-lua" - Stuck on "1.26.2" until TSESLint upgrades (same as previous).

import { updatePackageJSONDependenciesMonorepo } from "complete-node";

await updatePackageJSONDependenciesMonorepo();
