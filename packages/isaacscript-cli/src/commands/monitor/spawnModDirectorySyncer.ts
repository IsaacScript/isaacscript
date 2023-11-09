import { dirName, fatalError } from "isaacscript-common-node";
import { fork } from "node:child_process";
import path from "node:path";
import type { ValidatedConfig } from "../../classes/ValidatedConfig.js";
import {
  FILE_SYNCED_MESSAGE,
  MAIN_LUA,
  MOD_SOURCE_PATH,
} from "../../constants.js";
import { getModTargetDirectoryName } from "../../utils.js";
import { notifyGameCommand, notifyGameMsg } from "./notifyGame.js";

const __dirname = dirName();

const SUBPROCESS_NAME = "modDirectorySyncer";
const SUBPROCESS_DESCRIPTION = "Directory syncer";

export function spawnModDirectorySyncer(config: ValidatedConfig): void {
  const processPath = path.join(__dirname, SUBPROCESS_NAME, SUBPROCESS_NAME);
  const modTargetName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetName);
  const directorySyncer = fork(processPath, [MOD_SOURCE_PATH, modTargetPath]);

  directorySyncer.on("message", (msg: string) => {
    // It is possible for a sub-process to send a non-string message.
    if (typeof msg !== "string") {
      fatalError(
        `Received a non-string message from the "${SUBPROCESS_NAME}" subprocess:`,
        msg,
      );
    }

    notifyGameMsg(msg);

    // If the "main.lua" file was successfully copied over, we also have to tell isaacscript-watcher
    // to reload the mod. Look for something like: "File synced: \main.lua"
    if (msg === `${FILE_SYNCED_MESSAGE} ${path.sep}${MAIN_LUA}`) {
      notifyGameCommand(`luamod ${modTargetName}`);
      notifyGameCommand("restart");
      notifyGameMsg("Reloaded the mod.");
    }
  });

  directorySyncer.on("close", (code: number | null) => {
    fatalError(
      `Error: ${SUBPROCESS_DESCRIPTION} subprocess closed with code: ${code}`,
    );
  });

  directorySyncer.on("exit", (code: number | null) => {
    fatalError(
      `Error: ${SUBPROCESS_DESCRIPTION} subprocess exited with code: ${code}`,
    );
  });
}
