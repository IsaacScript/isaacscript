/* eslint-disable import/no-unused-modules */

import path from "path";
import syncDirectory from "sync-directory";
import { FILE_SYNCED_MESSAGE, MAIN_LUA } from "../../../constants";
import * as file from "../../../file";

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

  syncDirectory(modSourcePath, modTargetPath, {
    watch: true,
    type: "copy",
    afterSync,
    onError,
    chokidarWatchOptions: {
      awaitWriteFinish: {
        stabilityThreshold: 1000,
      },
    },
  });
}

function afterSync(params: { type: string; relativePath: string }) {
  if (params.type === "init:copy") {
    return;
  }

  if (params.relativePath === `${path.sep}${MAIN_LUA}`) {
    monkeyPatchMainLua();
  }

  send(`${FILE_SYNCED_MESSAGE} ${params.relativePath}`);
}

function onError(err: Error) {
  console.error("The directory syncer encountered an error:", err);
}

function send(msg: string) {
  if (typeof process.send === "function") {
    process.send(msg);
  }
}

// Some TSTL objects (such as Map and Set) are written as global variables,
// which can cause multiple mods written with IsaacScript to trample on one another
// Until TSTL has an official fix, monkey patch this
function monkeyPatchMainLua() {
  const mainLuaPath = path.join(modTargetPath, MAIN_LUA);
  const mainLua = file.read(mainLuaPath);
  mainLua.replace(/WeakMap = \(function\(\)/, "WeakMap = WeakMap or (function");
  mainLua.replace(/WeakSet = \(function\(\)/, "WeakSet = WeakSet or (function");
  mainLua.replace(/Map = \(function\(\)/, "Map = (function");
  mainLua.replace(/Set = \(function\(\)/, "Set = (function");
}
