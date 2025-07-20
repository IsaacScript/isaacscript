// Packages held back:
// - "react" - Docusaurus requires v18.
// - "react-dom" - Docusaurus requires v18.
// - "typedoc" - Custom docs script does not work with the latest version.
// - "typedoc-plugin-markdown" - Custom docs script does not work with the latest version.
// - "typescript" - Stuck on TypeScriptToLua's version.
// https://github.com/TypeScriptToLua/TypeScriptToLua/blob/master/package.json#L45

import { updatePackageJSONDependenciesMonorepo } from "complete-node";

await updatePackageJSONDependenciesMonorepo();
