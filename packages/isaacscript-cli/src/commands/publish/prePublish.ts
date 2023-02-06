import { error } from "isaacscript-common-ts";
import {
  BUILD_SCRIPT,
  CONSTANTS_TS_PATH,
  LINT_SCRIPT,
  METADATA_XML_PATH,
  PACKAGE_JSON,
  UPDATE_SCRIPT,
  VERSION_TXT_PATH,
} from "../../constants.js";
import { PackageManager } from "../../enums/PackageManager.js";
import { execShell, execShellString } from "../../exec.js";
import { fileExists, getHashOfFile, readFile, writeFile } from "../../file.js";
import { gitCommitAllAndPush } from "../../git.js";
import { getProjectPackageJSONField } from "../../json.js";
import {
  getPackageManagerInstallCommand,
  getPackageManagerUsedForExistingProject,
} from "../../packageManager.js";
import { Args } from "../../parseArgs.js";

/**
 * Before uploading the project, we want to update dependencies, increment the version, and perform
 * some other steps.
 */
export function prePublish(args: Args, typeScript: boolean): void {
  const skipUpdate = args.skipUpdate === true;
  const skipLint = args.skipLint === true;
  const verbose = args.verbose === true;

  execShellString("git pull --rebase");
  const packageManager = getPackageManagerUsedForExistingProject(args, verbose);
  updateDependencies(skipUpdate, packageManager, verbose);
  incrementVersion(args, typeScript, packageManager);
  tryRunBashScript(BUILD_SCRIPT, verbose);
  if (!skipLint) {
    tryRunBashScript(LINT_SCRIPT, verbose);
  }
}

function updateDependencies(
  skipUpdate: boolean,
  packageManager: PackageManager,
  verbose: boolean,
) {
  if (skipUpdate) {
    return;
  }

  if (!fileExists(UPDATE_SCRIPT, verbose)) {
    return;
  }

  console.log("Updating NPM dependencies...");

  const beforeHash = getHashOfFile(PACKAGE_JSON);
  execShell("bash", [UPDATE_SCRIPT], verbose);
  const afterHash = getHashOfFile(PACKAGE_JSON);

  if (beforeHash !== afterHash) {
    const packageManagerInstallCommand =
      getPackageManagerInstallCommand(packageManager);
    execShellString(packageManagerInstallCommand, verbose);
    gitCommitAllAndPush("chore: update deps", verbose);
  }
}

function incrementVersion(
  args: Args,
  typeScript: boolean,
  packageManager: PackageManager,
) {
  const skipIncrement = args.skipIncrement === true;
  const verbose = args.verbose === true;

  if (skipIncrement) {
    return;
  }

  const versionCommandArgument = getVersionCommandArgument(args);
  // The "--no-git-tag-version" flag will prevent the package manager from both making a commit and
  // adding a tag.
  execShellString(
    `${packageManager} version --no-git-tag-version ${versionCommandArgument}`,
    verbose,
  );

  if (!typeScript) {
    const version = getProjectPackageJSONField("version", verbose);
    writeVersionToConstantsTS(version, verbose);
    writeVersionToMetadataXML(version, verbose);
    writeVersionToVersionTXT(version, verbose);
  }
}

function getVersionCommandArgument(args: Args): string {
  const { setVersion } = args;
  if (setVersion !== undefined) {
    return setVersion; // They want to use a specific version, which was manually specified.
  }

  const major = args.major === true;
  if (major) {
    return "--major";
  }

  const minor = args.minor === true;
  if (minor) {
    return "--minor";
  }

  const patch = args.patch === true;
  if (patch) {
    return "--patch";
  }

  // Default to a patch version.
  return "patch";
}

function writeVersionToConstantsTS(version: string, verbose: boolean) {
  if (!fileExists(CONSTANTS_TS_PATH, verbose)) {
    console.log(
      'Skipping writing the version to "constants.ts" since it was not found.',
    );
    return;
  }

  const constantsTS = readFile(CONSTANTS_TS_PATH, verbose);
  const newConstantsTS = constantsTS.replace(
    /const VERSION = ".+"/,
    `const VERSION = "${version}"`,
  );
  writeFile(CONSTANTS_TS_PATH, newConstantsTS, verbose);

  console.log(`The version of ${version} was written to: ${CONSTANTS_TS_PATH}`);
}

function writeVersionToMetadataXML(version: string, verbose: boolean) {
  const metadataXML = readFile(METADATA_XML_PATH, verbose);
  const newMetadataXML = metadataXML.replace(
    /<version>.+<\/version>/,
    `<version>${version}</version>`,
  );
  writeFile(METADATA_XML_PATH, newMetadataXML, verbose);

  console.log(`The version of ${version} was written to: ${METADATA_XML_PATH}`);
}

function writeVersionToVersionTXT(version: string, verbose: boolean) {
  writeFile(VERSION_TXT_PATH, version, verbose);

  console.log(`The version of ${version} was written to: ${VERSION_TXT_PATH}`);
}

function tryRunBashScript(scriptName: string, verbose: boolean) {
  if (!fileExists(scriptName, verbose)) {
    error(
      `Failed to find the script "${scriptName}" in the current working directory.`,
    );
  }

  const { exitStatus, stdout } = execShell("bash", [scriptName], verbose, true);

  if (exitStatus !== 0) {
    execShellString("git reset --hard", verbose); // Revert the version changes.
    error(`Failed to run "${scriptName}":`, stdout);
  }
}
