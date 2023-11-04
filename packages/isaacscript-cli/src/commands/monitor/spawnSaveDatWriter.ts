import { dirName, fatalError } from "isaacscript-common-node";
import type { ChildProcess } from "node:child_process";
import { fork } from "node:child_process";
import path from "node:path";
import type { ValidatedConfig } from "../../classes/ValidatedConfig.js";
import { WATCHER_MOD_NAME } from "../../constants.js";
import type { SaveDatMessage } from "./saveDatWriter/types.js";

const __dirname = dirName();
const SUBPROCESS_NAME = "saveDatWriter";
const SUBPROCESS_DESCRIPTION = "save#.dat writer";

let saveDatWriter: ChildProcess | undefined;

export function spawnSaveDatWriter(config: ValidatedConfig): void {
  const processPath = path.join(__dirname, SUBPROCESS_NAME, SUBPROCESS_NAME);
  const modsDataPath = path.join(config.modsDirectory, "..", "data");
  const watcherModDataPath = path.join(modsDataPath, WATCHER_MOD_NAME);
  const saveDatFileName = `save${config.saveSlot}.dat`;
  const saveDatPath = path.join(watcherModDataPath, saveDatFileName);

  saveDatWriter = fork(processPath, [saveDatPath], {
    stdio: ["pipe", "pipe", "pipe", "ipc"],
  });

  saveDatWriter.on("close", (code: number | null) => {
    fatalError(
      `Error: ${SUBPROCESS_DESCRIPTION} subprocess closed with code: ${code}`,
    );
  });

  saveDatWriter.on("exit", (code: number | null) => {
    fatalError(
      `Error: ${SUBPROCESS_DESCRIPTION} subprocess exited with code: ${code}`,
    );
  });
}

export function sendMsgToSaveDatWriter(msg: SaveDatMessage): void {
  if (saveDatWriter !== undefined) {
    saveDatWriter.send(msg);
  }
}
