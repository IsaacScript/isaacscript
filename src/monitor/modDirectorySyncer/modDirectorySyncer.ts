import * as chokidar from "chokidar";
import fs from "fs";
import path from "path";
import { MAIN_LUA_SOURCE_PATH } from "../../constants";
import * as file from "../../file";

let modSourcePath: string;
let modTargetPath: string;

init();

function init() {
  const numArgs = 2;
  if (process.argv.length !== 2 + numArgs) {
    throw new Error(
      "The directory syncer process did not get the right amount of arguments.",
    );
  }

  modSourcePath = process.argv[2];
  modTargetPath = process.argv[3];

  // First, copy the existing directory fresh
  if (!file.exists(modSourcePath)) {
    file.makeDir(modSourcePath);
  }
  if (file.exists(modTargetPath)) {
    file.deleteDir(modTargetPath);
  }
  file.copy(modSourcePath, modTargetPath);

  // Second, watch for changes
  const watcher = chokidar.watch(modSourcePath, {
    persistent: true,
    ignoreInitial: true,
  });

  watcher
    .on("add", (filePath: string, stats: fs.Stats) => {
      onAddOrChange(filePath, stats, "Added new");
    })
    .on("addDir", addDir)
    .on("change", (filePath: string, stats: fs.Stats) => {
      onAddOrChange(filePath, stats, "Changed");
    })
    .on("unlink", unlink)
    .on("unlinkDir", unlinkDir)
    .on("error", error);
}

function onAddOrChange(
  filePath: string,
  stats: fs.Stats,
  verb: string,
  checkNewStats = false,
) {
  if (checkNewStats) {
    stats = fs.statSync(filePath);
  }

  if (stats.size === 0 && !checkNewStats) {
    // Sometimes chokidar receives an event when the file is in the process of being written to
    // If this is the case, the size of the file will be 0
    // Try to copy the file again after a short delay
    setTimeout(() => {
      onAddOrChange(filePath, stats, verb, true);
    }, 100);
  } else {
    addOrChange(filePath, verb);
  }
}

function addOrChange(filePath: string, verb: string) {
  file.copy(filePath, getTargetPath(filePath));

  if (filePath !== MAIN_LUA_SOURCE_PATH) {
    // We don't need to report if the "main.lua" file changes,
    // since we have a dedicated message for that
    send(`${verb} file: ${filePath}`);
  }
}

function addDir(dirPath: string) {
  file.copy(dirPath, getTargetPath(dirPath));
  send(`Copied new directory: ${dirPath}`);
}

function unlink(filePath: string) {
  file.deleteFile(getTargetPath(filePath));
  send(`Deleted file: ${filePath}`);
}

function unlinkDir(dirPath: string) {
  file.deleteDir(getTargetPath(dirPath));
  send(`Deleted directory: ${dirPath}`);
}

function error(err: Error) {
  console.error("modDirectorySyncer - Error:", err);
  send(`Error: ${err.message}`);
}

function getTargetPath(filePath: string): string {
  const basePath = path.relative(modSourcePath, filePath);
  return path.join(modTargetPath, basePath);
}

function send(msg: string) {
  if (typeof process.send === "function") {
    process.send(msg);
  }
}
