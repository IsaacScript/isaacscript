// Packages held back:
// - "typescript" - Stuck on "5.5.2" until TSTL upgrades:
// https://github.com/TypeScriptToLua/TypeScriptToLua/issues/1580
// - "typescript" - Stuck on "5.5.4" until TSESLint upgrades:
// https://github.com/typescript-eslint/typescript-eslint/issues/9653

import { updatePackageJSONDependenciesMonorepo } from "complete-node";

await updatePackageJSONDependenciesMonorepo();
