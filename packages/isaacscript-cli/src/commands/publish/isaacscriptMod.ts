import chalk from "chalk";
import {
  deleteFileOrDirectory,
  getFileNamesInDirectory,
  getPackageJSONVersion,
  isDirectory,
  isFile,
  readFile,
} from "complete-node";
import path from "node:path";
import { getConfigFromFile } from "../../configFile.js";
import {
  CWD,
  MOD_SOURCE_PATH,
  MOD_UPLOADER_PATH,
  PUBLISH_POST_COPY_PY_PATH,
  PUBLISH_PRE_COPY_PY_PATH,
} from "../../constants.js";
import { execExe, execShell, execShellString } from "../../exec.js";
import { getReleaseGitCommitMessage, gitCommitAllAndPush } from "../../git.js";
import { getPackageManagerUsedForExistingProject } from "../../packageManager.js";
import { getModTargetDirectoryName } from "../../utils.js";
import { compileAndCopy } from "../copy/copy.js";

export async function publishIsaacScriptMod(
  dryRun: boolean,
  verbose: boolean,
): Promise<void> {
  const packageManager = await getPackageManagerUsedForExistingProject();
  const config = await getConfigFromFile();
  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);
  const version = await getPackageJSONVersion(undefined);

  runReleaseScriptPreCopy(verbose);
  await compileAndCopy(MOD_SOURCE_PATH, modTargetPath, packageManager, verbose);
  purgeRoomXMLs(modTargetPath);
  runReleaseScriptPostCopy(verbose);

  if (dryRun) {
    execShellString("git reset --hard", verbose); // Revert the version changes.
  } else {
    const releaseGitCommitMessage = getReleaseGitCommitMessage(version);
    gitCommitAllAndPush(releaseGitCommitMessage, verbose);
    uploadMod(modTargetPath, verbose);
  }

  const dryRunSuffix = dryRun ? " (dry run)" : "";
  console.log(`\nPublished version ${version} successfully${dryRunSuffix}.`);
}

function runReleaseScriptPreCopy(verbose: boolean) {
  if (!isFile(PUBLISH_PRE_COPY_PY_PATH)) {
    return;
  }

  console.log(`Running the "${PUBLISH_PRE_COPY_PY_PATH}" script.`);
  const { stdout } = execShell("python", [PUBLISH_PRE_COPY_PY_PATH], verbose);
  if (stdout !== "") {
    console.log(stdout);
  }
}

function runReleaseScriptPostCopy(verbose: boolean) {
  if (!isFile(PUBLISH_POST_COPY_PY_PATH)) {
    return;
  }

  console.log(`Running the "${PUBLISH_POST_COPY_PY_PATH}" script.`);
  const { stdout } = execShell("python", [PUBLISH_POST_COPY_PY_PATH], verbose);
  if (stdout !== "") {
    console.log(stdout);
  }
}

function purgeRoomXMLs(modTargetPath: string) {
  const roomsPath = path.join(modTargetPath, "resources", "rooms");
  if (!isDirectory(roomsPath)) {
    return;
  }

  const fileNames = getFileNamesInDirectory(roomsPath);
  const xmlFileNames = fileNames.filter(
    (fileName) => path.extname(fileName) === ".xml",
  );
  for (const xmlFileName of xmlFileNames) {
    const roomFilePath = path.join(roomsPath, xmlFileName);
    deleteFileOrDirectory(roomFilePath);
  }
}

function uploadMod(modTargetPath: string, verbose: boolean) {
  if (hasIsaacSteamWorkshopUploadGitHubAction()) {
    // CI will automatically upload the new version to the Steam Workshop, so there is no need to
    // open the mod uploader program.
    return;
  }

  console.log(
    `The "isaac-steam-workshop-upload" action was not found in the "${chalk.green(
      "ci.yml",
    )}" file; assuming that we want to use the "ModUploader.exe" tool.`,
  );
  execExe(MOD_UPLOADER_PATH, [], verbose, modTargetPath);
}

function hasIsaacSteamWorkshopUploadGitHubAction(): boolean {
  const ciYMLPath = path.join(CWD, ".github", "workflows", "ci.yml");
  if (!isFile(ciYMLPath)) {
    return false;
  }

  const ciYML = readFile(ciYMLPath);
  const lines = ciYML.split("\n");

  return lines.some(
    (line) =>
      line.match(/^\s*uses: IsaacScript\/isaac-steam-workshop-upload/) !== null,
  );
}
