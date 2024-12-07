// Packages held back:
// - "react" - Docusaurus requires v18.
// - "react-dom" - Docusaurus requires v18.

import { updatePackageJSONDependenciesMonorepo } from "complete-node";

await updatePackageJSONDependenciesMonorepo();
