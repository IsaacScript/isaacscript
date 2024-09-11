import { Command } from "@commander-js/extra-typings";
import type { PackageManager } from "complete-node";
import {
  fatalError,
  getPackageJSONField,
  getPackageJSONVersion,
  getPackageManagerInstallCommand,
  isFile,
  readFile,
  updatePackageJSON,
  writeFile,
} from "complete-node";
import {
  CONSTANTS_TS_PATH,
  CWD,
  METADATA_XML_PATH,
  VERSION_TXT_PATH,
} from "../../constants.js";
import { execShell, execShellString } from "../../exec.js";
import { getReleaseGitCommitMessage, gitCommitAllAndPush } from "../../git.js";
import { getPackageManagerUsedForExistingProject } from "../../packageManager.js";
import { getIsaacScriptModMissingFile } from "../../validateMod.js";
import { publishIsaacScriptMod } from "./isaacscriptMod.js";
import { validate } from "./validate.js";

export const publishCommand = new Command()
  .command("publish")
  .description("Bump the version & publish a new release.")
  .allowExcessArguments(false) // By default, Commander.js will allow extra positional arguments.
  .helpOption("-h, --help", "Display the list of options for this command.")
  .option("--major", "Perform a major version bump.", false)
  .option("--minor", "Perform a minor version bump.", false)
  .option("--patch", "Perform a patch version bump.", false)
  .option("--skip-increment", "Skip incrementing the version number.", false)
  .option(
    "--set-version <version>",
    "Specify the version number instead of incrementing it.",
  )
  .option(
    "--dry-run",
    "Skip committing/uploading & perform a Git reset afterward.",
    false,
  )
  .option("--skip-update", "Skip updating the npm dependencies.", false)
  .option("--skip-lint", "Skip linting before publishing.", false)
  .option("-v, --verbose", "Enable verbose output.", false)
  .action(async (options) => {
    await publish(options);
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const publishOptions = publishCommand.opts();
type PublishOptions = typeof publishOptions;

async function publish(options: PublishOptions): Promise<void> {
  const { dryRun, setVersion, verbose } = options;

  const isaacScriptModMissingFile = getIsaacScriptModMissingFile(CWD);
  const typeScript = isaacScriptModMissingFile !== undefined;

  validate(typeScript, setVersion, verbose);
  prePublish(options, typeScript);

  if (typeScript) {
    publishTypeScriptProject(dryRun, verbose);
  } else {
    await publishIsaacScriptMod(dryRun, verbose);
  }
}

/**
 * Before uploading the project, we want to update dependencies, increment the version, and perform
 * some other steps.
 */
function prePublish(options: PublishOptions, typeScript: boolean) {
  const { dryRun, skipLint, skipUpdate, verbose } = options;

  const packageManager = getPackageManagerUsedForExistingProject();

  execShellString("git pull --rebase");
  execShellString("git push");
  updateDependencies(skipUpdate, dryRun, packageManager, verbose);
  incrementVersion(options, typeScript);
  unsetDevelopmentConstants();

  tryRunNPMScript("build", verbose);
  if (!skipLint) {
    tryRunNPMScript("lint", verbose);
  }
}

function updateDependencies(
  skipUpdate: boolean,
  dryRun: boolean,
  packageManager: PackageManager,
  verbose: boolean,
) {
  if (skipUpdate) {
    return;
  }

  console.log('Updating dependencies in the "package.json" file...');
  const hasNewDependencies = updatePackageJSON(undefined);
  if (hasNewDependencies) {
    const command = getPackageManagerInstallCommand(packageManager);
    execShellString(command, verbose);
    if (!dryRun) {
      gitCommitAllAndPush("chore: update dependencies", verbose);
    }
  }
}

function incrementVersion(options: PublishOptions, typeScript: boolean) {
  const { skipIncrement, verbose } = options;

  if (skipIncrement) {
    return;
  }

  const versionCommandArgument = getVersionCommandArgument(options);
  // We always use `npm` here to avoid differences with the version command between package
  // managers. The "--no-git-tag-version" flag will prevent npm from both making a commit and adding
  // a tag.
  execShell(
    "npm",
    ["version", versionCommandArgument, "--no-git-tag-version"],
    verbose,
  );

  if (!typeScript) {
    const version = getPackageJSONVersion(undefined);
    writeVersionToConstantsTS(version);
    writeVersionToMetadataXML(version);
    writeVersionToVersionTXT(version);
  }
}

function getVersionCommandArgument(options: PublishOptions): string {
  if (options.setVersion !== undefined) {
    // They want to use a specific version, which was manually specified.
    return options.setVersion;
  }

  if (options.major) {
    return "major";
  }

  if (options.minor) {
    return "minor";
  }

  if (options.patch) {
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

function unsetDevelopmentConstants() {
  if (!isFile(CONSTANTS_TS_PATH)) {
    return;
  }

  const constantsTS = readFile(CONSTANTS_TS_PATH);
  const newConstantsTS = constantsTS
    .replace("const IS_DEV = true", "const IS_DEV = false")
    .replace("const DEBUG = true", "const DEBUG = false");
  writeFile(CONSTANTS_TS_PATH, newConstantsTS);
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

function publishTypeScriptProject(dryRun: boolean, verbose: boolean) {
  const projectName = getPackageJSONField(undefined, "name");
  const version = getPackageJSONVersion(undefined);

  if (dryRun) {
    execShellString("git reset --hard", verbose); // Revert the version changes.
  } else {
    const releaseGitCommitMessage = getReleaseGitCommitMessage(version);
    gitCommitAllAndPush(releaseGitCommitMessage, verbose);

    // - The "--access=public" flag is only technically needed for the first publish (unless the
    //   package is a scoped package), but it is saved here for posterity.
    // - The "--ignore-scripts" flag is needed since the "npm publish" command will run the
    //   "publish" script in the "package.json" file, causing an infinite loop.
    execShellString("npm publish --access=public --ignore-scripts", verbose);
  }

  const dryRunSuffix = dryRun ? " (dry-run)" : "";
  console.log(
    `Published ${projectName} version ${version} successfully${dryRunSuffix}.`,
  );
}
