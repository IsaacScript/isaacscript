import { fatalError } from "isaacscript-common-node";
import path from "node:path";
import { PACKAGE_JSON, REPO_ROOT } from "./constants.js";
import { getJSONC } from "./json.js";

/** Returns the version from the "package.json" file. (There is no "v" prefix.) */
export function getVersionOfThisPackage(verbose: boolean): string {
  const packageJSONPath = path.join(REPO_ROOT, PACKAGE_JSON);
  const packageJSON = getJSONC(packageJSONPath, verbose);

  const { version } = packageJSON;
  if (typeof version !== "string") {
    fatalError(
      'Failed to parse the version from this package\'s "package.json" file.',
    );
  }

  return version;
}
