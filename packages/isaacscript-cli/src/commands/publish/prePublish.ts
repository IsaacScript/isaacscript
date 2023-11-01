import type { PackageManager } from "isaacscript-common-node";
import {
  PACKAGE_JSON,
  fatalError,
  getPackageJSONVersion,
  getPackageManagerInstallCommand,
  isFile,
  readFile,
  updatePackageJSON,
  writeFile,
} from "isaacscript-common-node";
import {
  CONSTANTS_TS_PATH,
  METADATA_XML_PATH,
  VERSION_TXT_PATH,
} from "../../constants.js";
import { execShell, execShellString } from "../../exec.js";
import { gitCommitAllAndPush } from "../../git.js";
import { getPackageManagerUsedForExistingProject } from "../../packageManager.js";
import type { Args } from "../../parseArgs.js";

/**
 * Before uploading the project, we want to update dependencies, increment the version, and perform
 * some other steps.
 */
export async function prePublish(
  args: Args,
  typeScript: boolean,
): Promise<void> {
  const skipUpdate = args.skipUpdate === true;
  const skipLint = args.skipLint === true;
  const dryRun = args.dryRun === true;
  const verbose = args.verbose === true;
  const packageManager = getPackageManagerUsedForExistingProject(args);

  execShellString("git pull --rebase");
  execShellString("git push");
  await updateDependencies(skipUpdate, dryRun, packageManager, verbose);
  incrementVersion(args, typeScript);

  tryRunNPMScript("build", verbose);
  if (!skipLint) {
    tryRunNPMScript("lint", verbose);
  }
}

async function updateDependencies(
  skipUpdate: boolean,
  dryRun: boolean,
  packageManager: PackageManager,
  verbose: boolean,
) {
  if (skipUpdate) {
    return;
  }

  console.log(`Updating dependencies in the "${PACKAGE_JSON}" file...`);
  const hasNewDependencies = await updatePackageJSON(undefined);
  if (hasNewDependencies) {
    const command = getPackageManagerInstallCommand(packageManager);
    execShellString(command, verbose);
    if (!dryRun) {
      gitCommitAllAndPush("chore: update dependencies", verbose);
    }
  }
}

function incrementVersion(args: Args, typeScript: boolean) {
  const skipIncrement = args.skipIncrement === true;
  const verbose = args.verbose === true;

  if (skipIncrement) {
    return;
  }

  const versionCommandArgument = getVersionCommandArgument(args);
  // We always use `npm` here to avoid differences with the version command between package
  // managers. The "--no-git-tag-version" flag will prevent npm from both making a commit and adding
  // a tag.
  execShellString(
    `npm version ${versionCommandArgument} --no-git-tag-version`,
    verbose,
  );

  if (!typeScript) {
    const version = getPackageJSONVersion(undefined);
    writeVersionToConstantsTS(version);
    writeVersionToMetadataXML(version);
    writeVersionToVersionTXT(version);
  }
}

function getVersionCommandArgument(args: Args): string {
  const { setVersion } = args;
  if (setVersion !== undefined) {
    // They want to use a specific version, which was manually specified.
    return setVersion;
  }

  const major = args.major === true;
  if (major) {
    return "major";
  }

  const minor = args.minor === true;
  if (minor) {
    return "minor";
  }

  const patch = args.patch === true;
  if (patch) {
    return "patch";
  }

  // Default to a patch version.
  return "patch";
}

function writeVersionToConstantsTS(version: string) {
  if (!isFile(CONSTANTS_TS_PATH)) {
    console.log(
      'Skipping writing the version to "constants.ts" since it was not found.',
    );
    return;
  }

  const constantsTS = readFile(CONSTANTS_TS_PATH);
  const newConstantsTS = constantsTS.replace(
    /const VERSION = ".+"/,
    `const VERSION = "${version}"`,
  );
  writeFile(CONSTANTS_TS_PATH, newConstantsTS);

  console.log(`The version of ${version} was written to: ${CONSTANTS_TS_PATH}`);
}

function writeVersionToMetadataXML(version: string) {
  const metadataXML = readFile(METADATA_XML_PATH);
  const newMetadataXML = metadataXML.replace(
    /<version>.+<\/version>/,
    `<version>${version}</version>`,
  );
  writeFile(METADATA_XML_PATH, newMetadataXML);

  console.log(`The version of ${version} was written to: ${METADATA_XML_PATH}`);
}

function writeVersionToVersionTXT(version: string) {
  writeFile(VERSION_TXT_PATH, version);

  console.log(`The version of ${version} was written to: ${VERSION_TXT_PATH}`);
}

function tryRunNPMScript(scriptName: string, verbose: boolean) {
  console.log(`Running: ${scriptName}`);
  const { exitStatus, stdout } = execShell(
    "npm",
    ["run", scriptName],
    verbose,
    true,
  );

  if (exitStatus !== 0) {
    execShellString("git reset --hard", verbose); // Revert the version changes.
    fatalError(`Failed to run "${scriptName}":`, stdout);
  }
}
