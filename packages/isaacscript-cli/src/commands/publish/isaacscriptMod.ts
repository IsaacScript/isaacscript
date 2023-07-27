import chalk from "chalk";
import path from "node:path";
import type { ValidatedConfig } from "../../classes/ValidatedConfig.js";
import {
  CONSTANTS_TS_PATH,
  CWD,
  MOD_SOURCE_PATH,
  MOD_UPLOADER_PATH,
  PUBLISH_POST_COPY_PY_PATH,
  PUBLISH_PRE_COPY_PY_PATH,
} from "../../constants.js";
import { execExe, execShell, execShellString } from "../../exec.js";
import {
  deleteFileOrDirectory,
  fileExists,
  getDirList,
  isDir,
  readFile,
  writeFile,
} from "../../file.js";
import { getReleaseGitCommitMessage, gitCommitAllAndPush } from "../../git.js";
import { getProjectPackageJSONField } from "../../json.js";
import { getPackageManagerUsedForExistingProject } from "../../packageManager.js";
import type { Args } from "../../parseArgs.js";
import { getModTargetDirectoryName } from "../../utils.js";
import { compileAndCopy } from "../copy/copy.js";

export async function publishIsaacScriptMod(
  args: Args,
  config: ValidatedConfig,
): Promise<void> {
  const dryRun = args.dryRun === true;
  const verbose = args.verbose === true;
  const packageManager = getPackageManagerUsedForExistingProject(args, verbose);
  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);
  const version = getProjectPackageJSONField("version", verbose);

  unsetDevelopmentConstant(verbose);
  runReleaseScriptPreCopy(verbose);
  await compileAndCopy(MOD_SOURCE_PATH, modTargetPath, packageManager, verbose);
  purgeRoomXMLs(modTargetPath, verbose);
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

function unsetDevelopmentConstant(verbose: boolean) {
  if (!fileExists(CONSTANTS_TS_PATH, verbose)) {
    return;
  }

  const constantsTS = readFile(CONSTANTS_TS_PATH, verbose);
  const newConstantsTS = constantsTS.replace(
    "const IS_DEV = true",
    "const IS_DEV = false",
  );
  writeFile(CONSTANTS_TS_PATH, newConstantsTS, verbose);
}

function runReleaseScriptPreCopy(verbose: boolean) {
  if (!fileExists(PUBLISH_PRE_COPY_PY_PATH, verbose)) {
    return;
  }

  console.log(`Running the "${PUBLISH_PRE_COPY_PY_PATH}" script.`);
  const { stdout } = execShell("python", [PUBLISH_PRE_COPY_PY_PATH], verbose);
  if (stdout.length > 0) {
    console.log(stdout);
  }
}

function runReleaseScriptPostCopy(verbose: boolean) {
  if (!fileExists(PUBLISH_POST_COPY_PY_PATH, verbose)) {
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
  if (!fileExists(roomsPath, verbose) || !isDir(roomsPath, verbose)) {
    return;
  }

  const roomFileList = getDirList(roomsPath, verbose);
  const xmlFiles = roomFileList.filter(
    (fileName) => path.extname(fileName) === ".xml",
  );
  for (const xmlFile of xmlFiles) {
    const roomFilePath = path.join(roomsPath, xmlFile);
    deleteFileOrDirectory(roomFilePath, verbose);
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
    )}" file; assuming that we want to use the "ModUploader.exe" tool.`,
  );
  execExe(MOD_UPLOADER_PATH, [], verbose, modTargetPath);
}

function hasIsaacSteamWorkshopUploadGitHubAction(verbose: boolean): boolean {
  const ciYMLPath = path.join(CWD, ".github", "workflows", "ci.yml");
  if (!fileExists(ciYMLPath, verbose)) {
    return false;
  }

  const ciYML = readFile(ciYMLPath, verbose);
  const lines = ciYML.split("\n");

  return lines.some(
    (line) =>
      line.match(/^\s*uses: IsaacScript\/isaac-steam-workshop-upload/) !== null,
  );
}
