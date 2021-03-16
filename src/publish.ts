import chalk from "chalk";
import * as compileAndCopy from "./compileAndCopy";
import {
  CONSTANTS_TS_PATH,
  METADATA_XML_PATH,
  MOD_UPLOADER_PATH,
  PACKAGE_JSON_PATH,
  VERSION_TXT_PATH,
} from "./constants";
import * as file from "./file";
import * as misc from "./misc";

export function main(
  modSourcePath: string,
  modTargetPath: string,
  skip: boolean,
): void {
  updateDeps();

  let version = getVersionFromPackageJSON();
  if (!skip) {
    version = bumpVersionInPackageJSON(version);
  }
  writeVersionToConstantsTS(version);
  writeVersionToMetadataXML(version);
  writeVersionToVersionTXT(version);
  compileAndCopy.main(modSourcePath, modTargetPath);
  gitCommitIfChanges(version);
  openModUploader(modTargetPath);

  console.log(`\nPublished version ${version} successfully.`);
}

function updateDeps() {
  misc.execCommand("npx", [
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
  const matches = version.match(/(\d+\.\d+\.)(\d+)/g);
  if (!matches) {
    console.error(`Failed to parse the version of: ${version}`);
    process.exit(1);
  }

  const versionPrefix = matches[1];
  const patchVersionString = matches[2];
  if (versionPrefix === undefined || patchVersionString === undefined) {
    console.error(`Failed to parse the version of: ${version}`);
    process.exit(1);
  }

  const patchVersion = misc.parseIntSafe(patchVersionString);
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

  return incrementedVersion;
}

function writeVersionToConstantsTS(version: string) {
  const constantsTS = file.read(CONSTANTS_TS_PATH);
  const newConstantsTS = constantsTS.replace(
    /const VERSION = ".+"/,
    `const VERSION = "${version}"`,
  );
  file.write(CONSTANTS_TS_PATH, newConstantsTS);
}

function writeVersionToMetadataXML(version: string) {
  const metadataXML = file.read(METADATA_XML_PATH);
  const newMetadataXML = metadataXML.replace(
    /<version>.+<\/version>/,
    `<version>${version}</version>`,
  );
  file.write(METADATA_XML_PATH, newMetadataXML);
}

function writeVersionToVersionTXT(version: string) {
  file.write(VERSION_TXT_PATH, version);
}

function gitCommitIfChanges(version: string) {
  // Throw an error if this is not a git repository
  misc.execCommand("git", ["status"]);

  // Check to see if there are any changes
  // https://stackoverflow.com/questions/3878624/how-do-i-programmatically-determine-if-there-are-uncommitted-changes
  const exitCode = misc.execCommand(
    "git",
    ["diff-index", "--quiet", "HEAD", "--"],
    true,
  );
  if (exitCode === 0) {
    // There are no changes
    return;
  }

  misc.execCommand("git", ["add", "-A"]);
  misc.execCommand("git", ["commit", "-m", version]);
  misc.execCommand("git", ["push"]);
}

function openModUploader(modTargetPath: string) {
  misc.execScript(MOD_UPLOADER_PATH, modTargetPath);
  // (this will block until the user closes the mod uploader tool)
}
