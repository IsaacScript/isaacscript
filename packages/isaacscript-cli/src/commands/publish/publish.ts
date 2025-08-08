import { Command } from "@commander-js/extra-typings";
import type { PackageManager } from "complete-node";
import {
  fatalError,
  getPackageJSONField,
  getPackageJSONVersion,
  getPackageManagerInstallCommand,
  isFile,
  readFile,
  updatePackageJSONDependencies,
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

async function publish(options: PublishOptions) {
  const { dryRun, setVersion, verbose } = options;

  const isaacScriptModMissingFile = await getIsaacScriptModMissingFile(CWD);
  const typeScript = isaacScriptModMissingFile !== undefined;

  await validate(typeScript, setVersion, verbose);
  await prePublish(options, typeScript);

  await (typeScript
    ? publishTypeScriptProject(dryRun, verbose)
    : publishIsaacScriptMod(dryRun, verbose));
}

/**
 * Before uploading the project, we want to update dependencies, increment the version, and perform
 * some other steps.
 */
async function prePublish(options: PublishOptions, typeScript: boolean) {
  const { dryRun, skipLint, skipUpdate, verbose } = options;

  const packageManager = await getPackageManagerUsedForExistingProject();

  execShellString("git pull --rebase");
  execShellString("git push");
  await updateDependencies(skipUpdate, dryRun, packageManager, verbose);
  await incrementVersion(options, typeScript);
  await unsetDevelopmentConstants();

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

  console.log('Updating dependencies in the "package.json" file...');
  const hasNewDependencies = await updatePackageJSONDependencies(undefined);
  if (hasNewDependencies) {
    const command = getPackageManagerInstallCommand(packageManager);
    execShellString(command, verbose);
    if (!dryRun) {
      gitCommitAllAndPush("chore: update dependencies", verbose);
    }
  }
}

async function incrementVersion(options: PublishOptions, typeScript: boolean) {
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
    const version = await getPackageJSONVersion(undefined);
    await writeVersionToConstantsTS(version);
    await writeVersionToMetadataXML(version);
    await writeVersionToVersionTXT(version);
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

async function writeVersionToConstantsTS(version: string) {
  const file = await isFile(CONSTANTS_TS_PATH);
  if (!file) {
    console.log(
      'Skipping writing the version to "constants.ts" since it was not found.',
    );
    return;
  }

  const constantsTS = await readFile(CONSTANTS_TS_PATH);
  const newConstantsTS = constantsTS.replace(
    /const VERSION = ".+"/,
    `const VERSION = "${version}"`,
  );
  await writeFile(CONSTANTS_TS_PATH, newConstantsTS);

  console.log(`The version of ${version} was written to: ${CONSTANTS_TS_PATH}`);
}

async function writeVersionToMetadataXML(version: string) {
  const metadataXML = await readFile(METADATA_XML_PATH);
  const newMetadataXML = metadataXML.replace(
    /<version>.+<\/version>/,
    `<version>${version}</version>`,
  );
  await writeFile(METADATA_XML_PATH, newMetadataXML);

  console.log(`The version of ${version} was written to: ${METADATA_XML_PATH}`);
}

async function writeVersionToVersionTXT(version: string) {
  await writeFile(VERSION_TXT_PATH, version);

  console.log(`The version of ${version} was written to: ${VERSION_TXT_PATH}`);
}

async function unsetDevelopmentConstants() {
  const file = await isFile(CONSTANTS_TS_PATH);
  if (!file) {
    return;
  }

  const constantsTS = await readFile(CONSTANTS_TS_PATH);
  const newConstantsTS = constantsTS
    .replace("const IS_DEV = true", "const IS_DEV = false")
    .replace("const DEBUG = true", "const DEBUG = false");
  await writeFile(CONSTANTS_TS_PATH, newConstantsTS);
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

async function publishTypeScriptProject(dryRun: boolean, verbose: boolean) {
  const projectName = await getPackageJSONField(undefined, "name");
  const version = await getPackageJSONVersion(undefined);

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
