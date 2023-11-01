import {
  PACKAGE_JSON,
  dirName,
  echo,
  getArgs,
  getFileNamesInDirectory,
  isDirectory,
  isFile,
  packageJSONHasScript,
} from "isaacscript-common-node";
import path from "node:path";

const __dirname = dirName();

const REPO_ROOT = path.join(__dirname, "..");
const PACKAGES_PATH = path.join(REPO_ROOT, "packages");

main();

function main() {
  const args = getArgs();
  const scriptName = args[0];
  const packageNames = getMonorepoPackageNames(scriptName);
  const packageNamesString = JSON.stringify(packageNames);
  echo(packageNamesString);
}

/**
 * Helper function to get the package names in a monorepo by looking at all of the subdirectories in
 * the "packages" directory.
 *
 * @param scriptName Optional. If specified, the package names will be filtered to only include
 *                   those that include scripts with the given name.
 */
function getMonorepoPackageNames(scriptName?: string): string[] {
  const packageNames: string[] = [];

  const fileNames = getFileNamesInDirectory(PACKAGES_PATH);
  for (const fileName of fileNames) {
    const filePath = path.join(PACKAGES_PATH, fileName);
    if (isDirectory(filePath)) {
      packageNames.push(fileName);
    }
  }

  if (scriptName === undefined || scriptName === "") {
    return packageNames;
  }

  return packageNames.filter((packageName) => {
    const packageJSONPath = path.join(PACKAGES_PATH, packageName, PACKAGE_JSON);
    if (!isFile(packageJSONPath)) {
      return false;
    }

    return packageJSONHasScript(packageJSONPath, scriptName);
  });
}
