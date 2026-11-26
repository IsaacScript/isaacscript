import { updatePackageJSONDependencies } from "complete-node";
import path from "node:path";

const MONOREPO_ROOT = path.resolve(import.meta.dirname, "..");

await updatePackageJSONDependencies(MONOREPO_ROOT, true, false, [
  "isaac-typescript-definitions",
]);
