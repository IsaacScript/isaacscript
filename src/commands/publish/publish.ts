import chalk from "chalk";
import path from "path";
import {
  CONFIG_FILE_NAME,
  CONSTANTS_TS_PATH,
  METADATA_XML_PATH,
  MOD_SOURCE_PATH,
  MOD_UPLOADER_PATH,
  PACKAGE_JSON_PATH,
  PROJECT_NAME,
  PUBLISH_POST_COPY_PY_PATH,
  PUBLISH_PRE_COPY_PY_PATH,
  VERSION_TXT_PATH,
} from "../../constants";
import { execExe, execPowershell, execShell } from "../../exec";
import * as file from "../../file";
import { Config } from "../../types/Config";
import { error, getModTargetDirectoryName, parseIntSafe } from "../../utils";
import { compileAndCopy } from "../copy/copy";

const UPDATE_SCRIPT_NAME = "update.sh";

export function publish(argv: Record<string, unknown>, config: Config): void {
  const skipVersionIncrement = argv.skip === true;
  const setVersion = argv.setVersion as string | undefined;
  const dryRun = argv.dryRun === true;
  const onlyUpload = argv.onlyUpload === true;
  const verbose = argv.verbose === true;

  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);

  validateVersion(setVersion);
  validateIsaacScriptOtherCopiesNotRunning(verbose);

  if (onlyUpload) {
    uploadMod(modTargetPath, config.steamCmdPath, verbose);
    return;
  }

  startPublish(
    MOD_SOURCE_PATH,
    modTargetPath,
    skipVersionIncrement,
    setVersion,
    config.steamCmdPath,
    dryRun,
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
    error();
  }
}

function startPublish(
  modSourcePath: string,
  modTargetPath: string,
  skipVersionIncrement: boolean,
  setVersion: string | undefined,
  steamCmdPath: string | undefined,
  dryRun: boolean,
  verbose: boolean,
) {
  updateDeps(verbose);

  let version =
    setVersion === undefined ? getVersionFromPackageJSON() : setVersion;
  if (!skipVersionIncrement && setVersion === undefined) {
    version = bumpVersionInPackageJSON(version, verbose);
  } else if (setVersion !== undefined) {
    writeVersionInPackageJSON(version, verbose);
  }

  writeVersionToConstantsTS(version, verbose);
  writeVersionToMetadataXML(version, verbose);
  writeVersionToVersionTXT(version, verbose);
  runReleaseScriptPreCopy(verbose);
  compileAndCopy(modSourcePath, modTargetPath, verbose);
  purgeRoomXMLs(modTargetPath, verbose);
  runReleaseScriptPostCopy(verbose);

  if (!dryRun) {
    gitCommitIfChanges(version, verbose);
    uploadMod(modTargetPath, steamCmdPath, verbose);
  }

  const dryRunSuffix = dryRun ? " (dry run)" : "";
  console.log(`\nPublished version ${version} successfully${dryRunSuffix}.`);
}

function updateDeps(verbose: boolean) {
  if (!file.exists(UPDATE_SCRIPT_NAME)) {
    error(
      `The "${UPDATE_SCRIPT_NAME}" script does not exist in the current working directory.`,
    );
  }

  execShell("bash", [UPDATE_SCRIPT_NAME], verbose);
}

function getVersionFromPackageJSON() {
  if (!file.exists(PACKAGE_JSON_PATH)) {
    error(
      chalk.red(
        `A "${PACKAGE_JSON_PATH}" was not found in the current directory.`,
      ),
    );
  }

  const packageJSONRaw = file.read(PACKAGE_JSON_PATH);
  let packageJSON: Record<string, unknown>;
  try {
    packageJSON = JSON.parse(packageJSONRaw) as Record<string, unknown>;
  } catch (err) {
    error(`Failed to parse "${chalk.green(PACKAGE_JSON_PATH)}":`, err);
  }

  if (!Object.prototype.hasOwnProperty.call(packageJSON, "version")) {
    error(
      `The "${chalk.green(
        PACKAGE_JSON_PATH,
      )}" file does not have a "version" field.`,
    );
  }

  if (typeof packageJSON.version !== "string") {
    error(
      `The "${chalk.green(
        PACKAGE_JSON_PATH,
      )}" file has a "version" field that is not a string.`,
    );
  }

  return packageJSON.version;
}

function bumpVersionInPackageJSON(version: string, verbose: boolean): string {
  // Get the patch version (i.e. the third number)
  const matches = /(\d+\.\d+\.)(\d+)/.exec(version);
  if (matches === null) {
    error(`Failed to parse the version of: ${version}`);
  }

  const versionPrefix = matches[1];
  if (versionPrefix === undefined) {
    error(`Failed to parse the first part of the version: ${version}`);
  }

  const patchVersionString = matches[2];
  if (patchVersionString === undefined) {
    error(`Failed to parse the second part of the version: ${version}`);
  }

  const patchVersion = parseIntSafe(patchVersionString);
  if (Number.isNaN(patchVersion)) {
    error(`Failed to convert "${patchVersionString}" to a number.`);
  }

  const incrementedPatchVersion = patchVersion + 1;
  const incrementedVersion = `${versionPrefix}${incrementedPatchVersion}`;

  const packageJSON = file.read(PACKAGE_JSON_PATH);
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
  const packageJSON = file.read(PACKAGE_JSON_PATH);
  const newPackageJSON = packageJSON.replace(
    /"version": ".+",/,
    `"version": "${version}",`,
  );
  file.write(PACKAGE_JSON_PATH, newPackageJSON, verbose);

  console.log(`The version of ${version} was written to: ${PACKAGE_JSON_PATH}`);
}

function writeVersionToConstantsTS(version: string, verbose: boolean) {
  if (!file.exists(CONSTANTS_TS_PATH)) {
    console.log(
      'Skipping writing the version to "constants.ts" since it was not found.',
    );
    return;
  }

  const constantsTS = file.read(CONSTANTS_TS_PATH);
  const newConstantsTS = constantsTS.replace(
    /const VERSION = ".+"/,
    `const VERSION = "${version}"`,
  );
  file.write(CONSTANTS_TS_PATH, newConstantsTS, verbose);

  console.log(`The version of ${version} was written to: ${CONSTANTS_TS_PATH}`);
}

function writeVersionToMetadataXML(version: string, verbose: boolean) {
  const metadataXML = file.read(METADATA_XML_PATH);
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

function runReleaseScriptPreCopy(verbose: boolean) {
  if (!file.exists(PUBLISH_PRE_COPY_PY_PATH)) {
    return;
  }

  console.log(`Running the "${PUBLISH_PRE_COPY_PY_PATH}" script.`);
  let [, stdout] = execShell("python", [PUBLISH_PRE_COPY_PY_PATH], verbose);
  stdout = stdout.trim();
  if (stdout.length > 0) {
    console.log(stdout);
  }
}

function runReleaseScriptPostCopy(verbose: boolean) {
  if (!file.exists(PUBLISH_POST_COPY_PY_PATH)) {
    return;
  }

  console.log(`Running the "${PUBLISH_POST_COPY_PY_PATH}" script.`);
  let [, stdout] = execShell("python", [PUBLISH_POST_COPY_PY_PATH], verbose);
  stdout = stdout.trim();
  if (stdout.length > 0) {
    console.log(stdout);
  }
}

function gitCommitIfChanges(version: string, verbose: boolean) {
  // Throw an error if this is not a git repository
  execShell("git", ["status"], verbose);

  // Check to see if there are any changes
  // https://stackoverflow.com/questions/3878624/how-do-i-programmatically-determine-if-there-are-uncommitted-changes
  const [exitCode] = execShell(
    "git",
    ["diff-index", "--quiet", "HEAD", "--"],
    verbose,
    true,
  );
  if (exitCode === 0) {
    // There are no changes
    console.log("There are no changes to commit.");
    return;
  }

  const commitMessage = `v${version}`;
  execShell("git", ["add", "-A"], verbose);
  execShell("git", ["commit", "-m", commitMessage], verbose);
  execShell("git", ["push"], verbose);

  console.log(
    `Committed and pushed to the git repository with a message of: ${commitMessage}`,
  );
}

function purgeRoomXMLs(modTargetPath: string, verbose: boolean) {
  const roomsPath = path.join(modTargetPath, "resources", "rooms");
  if (!file.exists(roomsPath) || !file.isDir(roomsPath)) {
    return;
  }

  const roomFileList = file.getDirList(roomsPath);
  roomFileList.forEach((fileName: string) => {
    if (path.extname(fileName) === ".xml") {
      const roomFilePath = path.join(roomsPath, fileName);
      file.deleteFileOrDirectory(roomFilePath, verbose);
    }
  });
}

function uploadMod(
  modTargetPath: string,
  steamCmdPath: string | undefined,
  verbose: boolean,
) {
  if (steamCmdPath === undefined) {
    console.log(
      `The "steamCmdPath" property was not found in the "${chalk.green(
        CONFIG_FILE_NAME,
      )}" file; assuming that we want to use the ModUploader tool.`,
    );
    execExe(MOD_UPLOADER_PATH, verbose, modTargetPath);
  } else {
    runSteamCmd(modTargetPath, steamCmdPath, verbose);
  }
}

function runSteamCmd(
  modTargetPath: string,
  steamCmdPath: string,
  verbose: boolean,
) {
  if (!file.exists(steamCmdPath)) {
    error(
      chalk.red(
        `The path provided for "steamCmdPath" is "${steamCmdPath}", but that does not exist.`,
      ),
    );
  }

  const metadataVDFPath = path.join(modTargetPath, "metadata.vdf");
  if (!file.exists(metadataVDFPath)) {
    console.error(
      chalk.red(
        `A "metadata.vdf" file was not found in your mod directory. You must create this file in order for "steamcmd.exe" to work. Please see the ${PROJECT_NAME} docs:`,
      ),
    );
    error(getIsaacScriptDocs());
  }

  const usernameVar = "STEAM_USERNAME";
  const username = process.env[usernameVar];
  if (username === undefined || username === "") {
    console.error(
      chalk.red(
        `Failed to read the "${usernameVar}" environment variable from the ".env" file. Please see the ${PROJECT_NAME} docs:`,
      ),
    );
    error(getIsaacScriptDocs());
  }

  const passwordVar = "STEAM_PASSWORD";
  const password = process.env[passwordVar];
  if (password === undefined || password === "") {
    console.error(
      chalk.red(
        `Failed to read the "${passwordVar}" environment variable from the ".env" file. Please see the ${PROJECT_NAME} docs:`,
      ),
    );
    error(getIsaacScriptDocs());
  }

  console.log("Uploading the mod to the Steam Workshop...");

  execShell(
    steamCmdPath,
    [
      "+login",
      username,
      password,
      "+workshop_build_item",
      metadataVDFPath,
      "+quit",
    ],
    verbose,
  );

  console.log("Mod uploaded successfully.");
}

function getIsaacScriptDocs() {
  return chalk.red(
    "https://isaacscript.github.io/docs/publishing-to-the-workshop/#metadatavdf",
  );
}
