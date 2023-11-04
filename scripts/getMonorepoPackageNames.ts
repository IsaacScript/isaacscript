// This is a script intended to be used inside of a GitHub Actions YAML file.

import {
  PACKAGE_JSON,
  appendFile,
  dirName,
  echo,
  fatalError,
  getArgs,
  getFileNamesInDirectory,
  isDirectory,
  isFile,
  isMain,
  packageJSONHasScript,
} from "isaacscript-common-node";
import path from "node:path";

const __dirname = dirName();

const REPO_ROOT = path.join(__dirname, "..");
const PACKAGES_PATH = path.join(REPO_ROOT, "packages");
const GITHUB_ACTIONS_OUTPUT_VARIABLE_NAME = "matrix";

if (isMain()) {
  main();
}

function main() {
  // Validate environment variables.
  const gitHubOutputFile = process.env["GITHUB_OUTPUT"];
  if (gitHubOutputFile === undefined || gitHubOutputFile === "") {
    fatalError("Failed to read the environment variable: GITHUB_OUTPUT");
  }

  const args = getArgs();
  const scriptName = args[0];
  const packageNames = getMonorepoPackageNames(scriptName);
  const packageNamesString = JSON.stringify(packageNames);

  echo(packageNamesString);

  // Quoting `packageNamesString` is unnecessary and will cause downstream errors.
  const gitHubActionsOutput = `${GITHUB_ACTIONS_OUTPUT_VARIABLE_NAME}=${packageNamesString}\n`;
  appendFile(gitHubOutputFile, gitHubActionsOutput);
}

/**
 * Helper function to get the package names in a monorepo by looking at all of the subdirectories in
 * the "packages" directory.
 *
 * @param scriptName Optional. If specified, the package names will be filtered to only include
 *                   those that include scripts with the given name.
 */
export function getMonorepoPackageNames(scriptName?: string): string[] {
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
