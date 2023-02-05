import chalk from "chalk";
import { error, parseSemanticVersion } from "isaacscript-common-ts";
import path from "node:path";
import { Config } from "../../classes/Config.js";
import {
  CONSTANTS_TS_PATH,
  CWD,
  METADATA_XML_PATH,
  MOD_SOURCE_PATH,
  MOD_UPLOADER_PATH,
  PACKAGE_JSON_PATH,
  PROJECT_NAME,
  PUBLISH_POST_COPY_PY_PATH,
  PUBLISH_PRE_COPY_PY_PATH,
  VERSION_TXT_PATH,
} from "../../constants.js";
import { PackageManager } from "../../enums/PackageManager.js";
import { execExe, execPowershell, execShell } from "../../exec.js";
import * as file from "../../file.js";
import { gitCommitIfChanges, isGitDirty } from "../../git.js";
import { getJSONC } from "../../json.js";
import { getPackageManagerUsedForExistingProject } from "../../packageManager.js";
import { Args } from "../../parseArgs.js";
import { getModTargetDirectoryName } from "../../utils.js";
import { compileAndCopy } from "../copy/copy.js";

const LINT_SCRIPT_NAME = "lint.sh";
const UPDATE_SCRIPT_NAME = "update.sh";

export async function publishIsaacScriptMod(
  args: Args,
  config: Config,
): Promise<void> {
  const skipIncrement = args.skipIncrement === true;
  const { setVersion } = args;
  const dryRun = args.dryRun === true;
  const verbose = args.verbose === true;
  const packageManager = getPackageManagerUsedForExistingProject(args, verbose);

  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);

  validateVersion(setVersion);
  validateGitNotDirty(packageManager, verbose);
  validateIsaacScriptOtherCopiesNotRunning(verbose);

  await startPublish(
    MOD_SOURCE_PATH,
    modTargetPath,
    skipIncrement,
    setVersion,
    dryRun,
    packageManager,
    verbose,
  );
}

function validateVersion(setVersion: string | undefined) {
  if (setVersion !== undefined && /^\d+\.\d+\.\d+$/.exec(setVersion) === null) {
    error(
      chalk.red(
        `The version of "${setVersion}" does not match the semantic versioning format.`,
      ),
    );
  }
}

function validateGitNotDirty(packageManager: PackageManager, verbose: boolean) {
  if (isGitDirty(packageManager, verbose)) {
    error(
      chalk.red(
        "Before publishing, you must push your current changes to git. (Version commits should be not contain any code changes.)",
      ),
    );
  }
}

function validateIsaacScriptOtherCopiesNotRunning(verbose: boolean) {
  if (process.platform !== "win32") {
    return;
  }

  // From: https://securityboulevard.com/2020/01/get-process-list-with-command-line-arguments/
  const stdout = execPowershell(
    "Get-WmiObject Win32_Process -Filter \"name = 'node.exe'\" | Select-Object -ExpandProperty CommandLine",
    verbose,
  );
  const lines = stdout.split("\r\n");
  const otherCopiesOfRunningIsaacScript = lines.filter(
    (line) =>
      line.includes("node.exe") &&
      line.includes("isaacscript") &&
      !line.includes("isaacscript publish"),
  );
  if (otherCopiesOfRunningIsaacScript.length > 0) {
    error(
      chalk.red(
        `Other copies of ${PROJECT_NAME} appear to be running. You must close those copies before publishing.`,
      ),
    );
  }
}

async function startPublish(
  modSourcePath: string,
  modTargetPath: string,
  skipIncrement: boolean,
  setVersion: string | undefined,
  dryRun: boolean,
  packageManager: PackageManager,
  verbose: boolean,
) {
  runBashScript(UPDATE_SCRIPT_NAME, verbose);

  // Since we updated the dependencies, things may not longer compile or lint, so test those things
  // before we update the version.
  await compileAndCopy(modSourcePath, modTargetPath, packageManager, verbose);
  runBashScript(LINT_SCRIPT_NAME, verbose);

  let version =
    setVersion === undefined ? getVersionFromPackageJSON(verbose) : setVersion;
  if (!skipIncrement && setVersion === undefined) {
    version = bumpVersionInPackageJSON(version, verbose);
  } else if (setVersion !== undefined) {
    writeVersionInPackageJSON(version, verbose);
  }

  writeVersionToConstantsTS(version, verbose);
  writeVersionToMetadataXML(version, verbose);
  writeVersionToVersionTXT(version, verbose);

  unsetDevelopmentConstant(verbose);

  runReleaseScriptPreCopy(verbose);
  await compileAndCopy(modSourcePath, modTargetPath, packageManager, verbose);
  purgeRoomXMLs(modTargetPath, verbose);
  runReleaseScriptPostCopy(verbose);

  if (!dryRun) {
    gitCommitIfChanges(version, packageManager, verbose);
    uploadMod(modTargetPath, verbose);
  }

  const dryRunSuffix = dryRun ? " (dry run)" : "";
  console.log(`\nPublished version ${version} successfully${dryRunSuffix}.`);
}

function runBashScript(scriptName: string, verbose: boolean) {
  if (!file.exists(scriptName, verbose)) {
    error(
      `The "${scriptName}" script does not exist in the current working directory.`,
    );
  }

  execShell("bash", [scriptName], verbose);
}

function getVersionFromPackageJSON(verbose: boolean) {
  if (!file.exists(PACKAGE_JSON_PATH, verbose)) {
    error(
      chalk.red(
        `A "${PACKAGE_JSON_PATH}" was not found in the current directory.`,
      ),
    );
  }

  const packageJSON = getJSONC(PACKAGE_JSON_PATH, verbose);

  const { version } = packageJSON;
  if (typeof version !== "string") {
    error(
      `The "${chalk.green(
        PACKAGE_JSON_PATH,
      )}" file has an invalid "version" field.`,
    );
  }

  return version;
}

function bumpVersionInPackageJSON(version: string, verbose: boolean): string {
  const semanticVersion = parseSemanticVersion(version);
  if (semanticVersion === undefined) {
    error(`Failed to parse the version in the "package.json" file: ${version}`);
  }

  const { majorVersion, minorVersion, patchVersion } = semanticVersion;

  const incrementedPatchVersion = patchVersion + 1;
  const incrementedVersion = `${majorVersion}.${minorVersion}.${incrementedPatchVersion}`;

  const packageJSON = file.read(PACKAGE_JSON_PATH, verbose);
  const newPackageJSON = packageJSON.replace(
    /"version": ".+",/,
    `"version": "${incrementedVersion}",`,
  );
  file.write(PACKAGE_JSON_PATH, newPackageJSON, verbose);

  console.log(
    `The version of ${incrementedVersion} was written to: ${PACKAGE_JSON_PATH}`,
  );

  return incrementedVersion;
}

function writeVersionInPackageJSON(version: string, verbose: boolean) {
  const packageJSON = file.read(PACKAGE_JSON_PATH, verbose);
  const newPackageJSON = packageJSON.replace(
    /"version": ".+",/,
    `"version": "${version}",`,
  );
  file.write(PACKAGE_JSON_PATH, newPackageJSON, verbose);

  console.log(`The version of ${version} was written to: ${PACKAGE_JSON_PATH}`);
}

function writeVersionToConstantsTS(version: string, verbose: boolean) {
  if (!file.exists(CONSTANTS_TS_PATH, verbose)) {
    console.log(
      'Skipping writing the version to "constants.ts" since it was not found.',
    );
    return;
  }

  const constantsTS = file.read(CONSTANTS_TS_PATH, verbose);
  const newConstantsTS = constantsTS.replace(
    /const VERSION = ".+"/,
    `const VERSION = "${version}"`,
  );
  file.write(CONSTANTS_TS_PATH, newConstantsTS, verbose);

  console.log(`The version of ${version} was written to: ${CONSTANTS_TS_PATH}`);
}

function writeVersionToMetadataXML(version: string, verbose: boolean) {
  const metadataXML = file.read(METADATA_XML_PATH, verbose);
  const newMetadataXML = metadataXML.replace(
    /<version>.+<\/version>/,
    `<version>${version}</version>`,
  );
  file.write(METADATA_XML_PATH, newMetadataXML, verbose);

  console.log(`The version of ${version} was written to: ${METADATA_XML_PATH}`);
}

function writeVersionToVersionTXT(version: string, verbose: boolean) {
  file.write(VERSION_TXT_PATH, version, verbose);

  console.log(`The version of ${version} was written to: ${VERSION_TXT_PATH}`);
}

function unsetDevelopmentConstant(verbose: boolean) {
  if (!file.exists(CONSTANTS_TS_PATH, verbose)) {
    return;
  }

  const constantsTS = file.read(CONSTANTS_TS_PATH, verbose);
  const newConstantsTS = constantsTS.replace(
    "const IS_DEV = true",
    "const IS_DEV = false",
  );
  file.write(CONSTANTS_TS_PATH, newConstantsTS, verbose);
}

function runReleaseScriptPreCopy(verbose: boolean) {
  if (!file.exists(PUBLISH_PRE_COPY_PY_PATH, verbose)) {
    return;
  }

  console.log(`Running the "${PUBLISH_PRE_COPY_PY_PATH}" script.`);
  const { stdout } = execShell("python", [PUBLISH_PRE_COPY_PY_PATH], verbose);
  if (stdout.length > 0) {
    console.log(stdout);
  }
}

function runReleaseScriptPostCopy(verbose: boolean) {
  if (!file.exists(PUBLISH_POST_COPY_PY_PATH, verbose)) {
    return;
  }

  console.log(`Running the "${PUBLISH_POST_COPY_PY_PATH}" script.`);
  const { stdout } = execShell("python", [PUBLISH_POST_COPY_PY_PATH], verbose);
  if (stdout.length > 0) {
    console.log(stdout);
  }
}

function purgeRoomXMLs(modTargetPath: string, verbose: boolean) {
  const roomsPath = path.join(modTargetPath, "resources", "rooms");
  if (!file.exists(roomsPath, verbose) || !file.isDir(roomsPath, verbose)) {
    return;
  }

  const roomFileList = file.getDirList(roomsPath, verbose);
  const xmlFiles = roomFileList.filter(
    (fileName) => path.extname(fileName) === ".xml",
  );
  for (const xmlFile of xmlFiles) {
    const roomFilePath = path.join(roomsPath, xmlFile);
    file.deleteFileOrDirectory(roomFilePath, verbose);
  }
}

function uploadMod(modTargetPath: string, verbose: boolean) {
  if (hasIsaacSteamWorkshopUploadGitHubAction(verbose)) {
    // CI will automatically upload the new version to the Steam Workshop, so there is no need to
    // open the mod uploader program.
    return;
  }

  console.log(
    `The "isaac-steam-workshop-upload" action was not found in the "${chalk.green(
      "ci.yml",
    )}" file; assuming that we want to use the ModUploader tool.`,
  );
  execExe(MOD_UPLOADER_PATH, [], verbose, modTargetPath);
}

function hasIsaacSteamWorkshopUploadGitHubAction(verbose: boolean): boolean {
  const ciYMLPath = path.join(CWD, ".github", "workflows", "ci.yml");
  if (!file.exists(ciYMLPath, verbose)) {
    return false;
  }

  const ciYML = file.read(ciYMLPath, verbose);
  const lines = ciYML.split("\n");

  return lines.some(
    (line) =>
      line.match(/^\s*uses: IsaacScript\/isaac-steam-workshop-upload/) !== null,
  );
}
