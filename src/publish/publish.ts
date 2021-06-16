import chalk from "chalk";
import path from "path";
import { Config } from "../Config";
import * as configFile from "../configFile";
import {
  CONFIG_FILE_NAME,
  CONSTANTS_TS_PATH,
  METADATA_XML_PATH,
  MOD_SOURCE_PATH,
  PACKAGE_JSON_PATH,
  PUBLISH_POST_COPY_PY_PATH,
  PUBLISH_PRE_COPY_PY_PATH,
  VERSION_TXT_PATH,
} from "../constants";
import { compileAndCopy } from "../copy/copy";
import * as file from "../file";
import { execShell, parseIntSafe } from "../misc";

export default function publish(
  argv: Record<string, unknown>,
  config: Config | null,
): void {
  if (config === null) {
    configFile.errorNotExist();
    return;
  }

  const skip = argv.skip === true;
  const setVersion = argv.setversion as string | undefined;
  const modTargetPath = path.join(config.modsDirectory, config.projectName);

  if (setVersion !== undefined && /^\d+\.\d+\.\d+$/.exec(setVersion) === null) {
    console.error(
      chalk.red(
        `The version of "${setVersion}" does not match the semantic versioning format.`,
      ),
    );
    process.exit(1);
  }

  startPublish(
    MOD_SOURCE_PATH,
    modTargetPath,
    skip,
    setVersion,
    config.steamCmdPath,
  );
}

function startPublish(
  modSourcePath: string,
  modTargetPath: string,
  skip: boolean,
  setVersion: string | undefined,
  steamCmdPath: string | undefined,
): void {
  updateDeps();

  let version =
    setVersion === undefined ? getVersionFromPackageJSON() : setVersion;
  if (!skip && setVersion === undefined) {
    version = bumpVersionInPackageJSON(version);
  } else if (setVersion !== undefined) {
    writeVersionInPackageJSON(version);
  }

  writeVersionToConstantsTS(version);
  writeVersionToMetadataXML(version);
  writeVersionToVersionTXT(version);
  runReleaseScriptPreCopy();
  compileAndCopy(modSourcePath, modTargetPath);
  runReleaseScriptPostCopy();
  gitCommitIfChanges(version);
  purgeRoomXMLs(modTargetPath);
  uploadMod(modTargetPath, steamCmdPath);

  console.log(`\nPublished version ${version} successfully.`);
}

function updateDeps() {
  execShell("npx", [
    "npm-check-updates",
    "--upgrade",
    "--packageFile",
    "package.json",
  ]);

  console.log("NPM dependencies updated successfully.");
}

function getVersionFromPackageJSON() {
  if (!file.exists(PACKAGE_JSON_PATH)) {
    console.error(
      chalk.red(
        `A "${PACKAGE_JSON_PATH}" was not found in the current directory.`,
      ),
    );
    process.exit(1);
  }

  const packageJSONRaw = file.read(PACKAGE_JSON_PATH);
  let packageJSON: Record<string, unknown>;
  try {
    packageJSON = JSON.parse(packageJSONRaw) as Record<string, unknown>;
  } catch (err) {
    console.error(`Failed to parse "${chalk.green(PACKAGE_JSON_PATH)}":`, err);
    process.exit(1);
  }

  if (!Object.prototype.hasOwnProperty.call(packageJSON, "version")) {
    console.error(
      `The "${chalk.green(
        PACKAGE_JSON_PATH,
      )}" file does not have a "version" field.`,
    );
    process.exit(1);
  }

  if (typeof packageJSON.version !== "string") {
    console.error(
      `The "${chalk.green(
        PACKAGE_JSON_PATH,
      )}" file has a "version" field that is not a string.`,
    );
    process.exit(1);
  }

  return packageJSON.version;
}

function bumpVersionInPackageJSON(version: string): string {
  // Get the patch version (i.e. the third number)
  const matches = /(\d+\.\d+\.)(\d+)/.exec(version);
  if (matches === null) {
    console.error(`Failed to parse the version of: ${version}`);
    process.exit(1);
  }

  const versionPrefix = matches[1];
  if (versionPrefix === undefined) {
    console.error(`Failed to parse the first part of the version: ${version}`);
    process.exit(1);
  }

  const patchVersionString = matches[2];
  if (patchVersionString === undefined) {
    console.error(`Failed to parse the second part of the version: ${version}`);
    process.exit(1);
  }

  const patchVersion = parseIntSafe(patchVersionString);
  if (Number.isNaN(patchVersion)) {
    console.error(`Failed to convert "${patchVersionString}" to a number.`);
    process.exit(1);
  }

  const incrementedPatchVersion = patchVersion + 1;
  const incrementedVersion = `${versionPrefix}${incrementedPatchVersion}`;

  const packageJSON = file.read(PACKAGE_JSON_PATH);
  const newPackageJSON = packageJSON.replace(
    /"version": ".+",/,
    `"version": "${incrementedVersion}",`,
  );
  file.write(PACKAGE_JSON_PATH, newPackageJSON);

  console.log(
    `The version of ${incrementedVersion} was written to: ${PACKAGE_JSON_PATH}`,
  );

  return incrementedVersion;
}

function writeVersionInPackageJSON(version: string) {
  const packageJSON = file.read(PACKAGE_JSON_PATH);
  const newPackageJSON = packageJSON.replace(
    /"version": ".+",/,
    `"version": "${version}",`,
  );
  file.write(PACKAGE_JSON_PATH, newPackageJSON);

  console.log(`The version of ${version} was written to: ${PACKAGE_JSON_PATH}`);
}

function writeVersionToConstantsTS(version: string) {
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
  file.write(CONSTANTS_TS_PATH, newConstantsTS);

  console.log(`The version of ${version} was written to: ${CONSTANTS_TS_PATH}`);
}

function writeVersionToMetadataXML(version: string) {
  const metadataXML = file.read(METADATA_XML_PATH);
  const newMetadataXML = metadataXML.replace(
    /<version>.+<\/version>/,
    `<version>${version}</version>`,
  );
  file.write(METADATA_XML_PATH, newMetadataXML);

  console.log(`The version of ${version} was written to: ${METADATA_XML_PATH}`);
}

function writeVersionToVersionTXT(version: string) {
  file.write(VERSION_TXT_PATH, version);

  console.log(`The version of ${version} was written to: ${VERSION_TXT_PATH}`);
}

function runReleaseScriptPreCopy() {
  if (!file.exists(PUBLISH_PRE_COPY_PY_PATH)) {
    return;
  }

  console.log(`Running the "${PUBLISH_PRE_COPY_PY_PATH}" script.`);
  execShell("python", [PUBLISH_PRE_COPY_PY_PATH]);
}

function runReleaseScriptPostCopy() {
  if (!file.exists(PUBLISH_POST_COPY_PY_PATH)) {
    return;
  }

  console.log(`Running the "${PUBLISH_POST_COPY_PY_PATH}" script.`);
  execShell("python", [PUBLISH_POST_COPY_PY_PATH]);
}

function gitCommitIfChanges(version: string) {
  // Throw an error if this is not a git repository
  execShell("git", ["status"]);

  // Check to see if there are any changes
  // https://stackoverflow.com/questions/3878624/how-do-i-programmatically-determine-if-there-are-uncommitted-changes
  const [exitCode] = execShell(
    "git",
    ["diff-index", "--quiet", "HEAD", "--"],
    true,
  );
  if (exitCode === 0) {
    // There are no changes
    console.log("There are no changes to commit.");
    return;
  }

  const commitMessage = `v${version}`;
  execShell("git", ["add", "-A"]);
  execShell("git", ["commit", "-m", commitMessage]);
  execShell("git", ["push"]);

  console.log(
    `Committed and pushed to the git repository with a message of: ${commitMessage}`,
  );
}

function purgeRoomXMLs(modTargetPath: string) {
  const roomsPath = path.join(modTargetPath, "resources", "rooms");
  if (!file.exists(roomsPath) || !file.isDir(roomsPath)) {
    return;
  }

  const roomFileList = file.getDirList(roomsPath);
  roomFileList.forEach((fileName: string) => {
    if (path.extname(fileName) === ".xml") {
      const roomFilePath = path.join(roomsPath, fileName);
      file.deleteFile(roomFilePath);
    }
  });
}

function uploadMod(modTargetPath: string, steamCmdPath: string | undefined) {
  if (steamCmdPath === undefined) {
    console.error(
      `In order for IsaacScript to automatically upload a mod, it needs to know the path to the "steamcmd.exe" program on your computer. Add a "${chalk.green(
        "steamCmdPath",
      )}" property to your "${chalk.green(
        CONFIG_FILE_NAME,
      )}" file and try again.`,
    );
    process.exit(1);
  }

  if (!file.exists(steamCmdPath)) {
    console.error(
      chalk.red(
        `The path provided for "steamCmdPath" is "${steamCmdPath}", but that does not exist.`,
      ),
    );
    process.exit(1);
  }

  const metadataVDFPath = path.join(modTargetPath, "metadata.vdf");
  if (!file.exists(metadataVDFPath)) {
    console.error(
      chalk.red(
        'A "metadata.vdf" file was not found in your mod directory. You must create this file in order for "steamcmd.exe" to work. Please see the IsaacScript docs:',
      ),
    );
    console.error(
      chalk.red(
        "https://isaacscript.github.io/docs/publishing-to-the-workshop/#metadatavdf",
      ),
    );
    process.exit(1);
  }

  const usernameVar = "STEAM_USERNAME";
  const username = process.env[usernameVar];
  if (username === undefined || username === "") {
    console.error(
      chalk.red(
        `Failed to read the "${usernameVar}" environment variable from the ".env" file. Please see the IsaacScript docs:`,
      ),
    );
    console.error(
      chalk.red(
        "https://isaacscript.github.io/docs/publishing-to-the-workshop/#env",
      ),
    );
    process.exit(1);
  }

  const passwordVar = "STEAM_PASSWORD";
  const password = process.env[passwordVar];
  if (password === undefined || password === "") {
    console.error(
      chalk.red(
        `Failed to read the "${passwordVar}" environment variable from the ".env" file. Please see the IsaacScript docs:`,
      ),
    );
    console.error(
      chalk.red(
        "https://isaacscript.github.io/docs/publishing-to-the-workshop/#env",
      ),
    );
    process.exit(1);
  }

  console.log("Uploading the mod to the Steam Workshop...");

  execShell(steamCmdPath, [
    "+login",
    username,
    password,
    "+workshop_build_item",
    metadataVDFPath,
    "+quit",
  ]);

  console.log("Mod uploaded successfully.");
}
