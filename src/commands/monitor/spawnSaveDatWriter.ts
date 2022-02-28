import { ChildProcess, fork } from "child_process";
import path from "path";
import { WATCHER_MOD_NAME } from "../../constants";
import { Config } from "../../types/Config";
import { error } from "../../utils";
import { SaveDatMessage } from "./saveDatWriter/types";

let saveDatWriter: ChildProcess | null = null;

export function spawnSaveDatWriter(config: Config): void {
  const processName = "saveDatWriter";
  const processDescription = "Save.dat writer";
  const processPath = path.join(__dirname, processName, processName);
  const modsDataPath = path.join(config.modsDirectory, "..", "data");
  const watcherModDataPath = path.join(modsDataPath, WATCHER_MOD_NAME);
  const saveDatFileName = `save${config.saveSlot}.dat`;
  const saveDatPath = path.join(watcherModDataPath, saveDatFileName);

  saveDatWriter = fork(processPath, [saveDatPath], {
    stdio: ["pipe", "pipe", "pipe", "ipc"],
  });

  saveDatWriter.on("close", (code: number | null) => {
    error(`Error: ${processDescription} subprocess closed with code: ${code}`);
  });

  saveDatWriter.on("exit", (code: number | null) => {
    error(`Error: ${processDescription} subprocess exited with code: ${code}`);
  });
}

export function sendMsgToSaveDatWriter(msg: SaveDatMessage): void {
  if (saveDatWriter !== null) {
    saveDatWriter.send(msg);
  }
}
