import chalk from "chalk";
import path from "path";
import { Config } from "../Config";
import * as configFile from "../configFile";
import {
  CONSTANTS_TS_PATH,
  METADATA_XML_PATH,
  MOD_SOURCE_PATH,
  PACKAGE_JSON_PATH,
  VERSION_TXT_PATH,
} from "../constants";
import { compileAndCopy } from "../copy/copy";
import * as file from "../file";
import { execExe, execShell, parseIntSafe } from "../misc";

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

  // Check to see that the version specified matches semantic versioning
  if (setVersion !== undefined && !/^\d+\.\d+\.\d+$/.exec(setVersion)) {
    console.error(
      `The version of "${setVersion}" does not match the semantic versioning format.`,
    );
    process.exit(1);
  }

  startPublish(MOD_SOURCE_PATH, modTargetPath, skip, setVersion);
}

function startPublish(
  modSourcePath: string,
  modTargetPath: string,
  skip: boolean,
  setVersion: string | undefined,
): void {
  updateDeps();

  let version =
    setVersion === undefined ? getVersionFromPackageJSON() : setVersion;
  if (!skip && setVersion === undefined) {
    version = bumpVersionInPackageJSON(version);
  }

  writeVersionToConstantsTS(version);
  writeVersionToMetadataXML(version);
  writeVersionToVersionTXT(version);
  compileAndCopy(modSourcePath, modTargetPath);
  runPreReleaseScript(modSourcePath);
  gitCommitIfChanges(version);
  purgeRoomXMLs(modTargetPath);
  openModUploader(modTargetPath);

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

function runPreReleaseScript(modSourcePath: string) {
  const projectRoot = path.join(modSourcePath, "..");
  const preReleaseScriptPath = path.join(
    projectRoot,
    "scripts",
    "pre-release.py",
  );
  if (!file.exists(preReleaseScriptPath)) {
    return;
  }

  execExe(preReleaseScriptPath, projectRoot);
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

  console.log(`Bumped the version to: ${incrementedVersion}`);

  return incrementedVersion;
}

function writeVersionToConstantsTS(version: string) {
  if (file.exists(CONSTANTS_TS_PATH)) {
    return;
  }

  const constantsTS = file.read(CONSTANTS_TS_PATH);
  const newConstantsTS = constantsTS.replace(
    /const VERSION = ".+"/,
    `const VERSION = "${version}"`,
  );
  file.write(CONSTANTS_TS_PATH, newConstantsTS);

  console.log(
    `The version of ${version} was written to the ${CONSTANTS_TS_PATH} file.`,
  );
}

function writeVersionToMetadataXML(version: string) {
  const metadataXML = file.read(METADATA_XML_PATH);
  const newMetadataXML = metadataXML.replace(
    /<version>.+<\/version>/,
    `<version>${version}</version>`,
  );
  file.write(METADATA_XML_PATH, newMetadataXML);

  console.log(
    `The version of ${version} was written to the ${METADATA_XML_PATH} file.`,
  );
}

function writeVersionToVersionTXT(version: string) {
  file.write(VERSION_TXT_PATH, version);

  console.log(
    `The version of ${version} was written to the ${VERSION_TXT_PATH} file.`,
  );
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

function openModUploader(modTargetPath: string) {
  console.log(
    "Opening the mod uploader tool from Nicalis. Close it when you are finished uploading the mod...",
  );

  const modUploaderPath = path.join(
    modTargetPath,
    "..",
    "..",
    "tools",
    "ModUploader",
    "ModUploader.exe",
  );
  execExe(modUploaderPath, modTargetPath);
  // (this will block until the user closes the mod uploader tool)

  console.log("Mod uploader tool closed.");
}
