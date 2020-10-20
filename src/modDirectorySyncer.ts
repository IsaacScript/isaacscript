import * as chokidar from "chokidar";
import path from "path";
import { MAIN_LUA_SOURCE_PATH } from "./constants";
import * as misc from "./misc";

if (process.argv.length !== 4) {
  throw new Error(
    "The directory syncer process did not get the right amount of arguments.",
  );
}

const modSourcePath = process.argv[2];
const modTargetPath = process.argv[3];

// First, copy the existing directory fresh
if (!misc.exists(modSourcePath)) {
  misc.makeDir(modSourcePath);
}
if (misc.exists(modTargetPath)) {
  misc.deleteDir(modTargetPath);
}
misc.copy(modSourcePath, modTargetPath);

// Second, watch for changes
const watcher = chokidar.watch(modSourcePath, {
  persistent: true,
  ignoreInitial: true,
});

watcher
  .on("add", add)
  .on("addDir", addDir)
  .on("change", change)
  .on("unlink", unlink)
  .on("unlinkDir", unlinkDir)
  .on("error", error);

function add(filePath: string) {
  misc.copy(filePath, getTargetPath(filePath));
  if (filePath === MAIN_LUA_SOURCE_PATH) {
    // We don't need to report if the "main.lua" file changes,
    // since we have a dedicated message for that
    return;
  }
  send(`Copied new file: ${filePath}`);
}

function addDir(dirPath: string) {
  misc.copy(dirPath, getTargetPath(dirPath));
  send(`Copied new directory: ${dirPath}`);
}

function change(filePath: string) {
  misc.copy(filePath, getTargetPath(filePath));
  if (filePath === MAIN_LUA_SOURCE_PATH) {
    // We don't need to report if the "main.lua" file changes,
    // since we have a dedicated message for that
    return;
  }
  send(`Copied changed file: ${filePath}`);
}

function unlink(filePath: string) {
  misc.deleteFile(getTargetPath(filePath));
  send(`Deleted file: ${filePath}`);
}

function unlinkDir(dirPath: string) {
  misc.deleteDir(getTargetPath(dirPath));
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
