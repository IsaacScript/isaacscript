import { ChildProcess, fork } from "child_process";
import path from "path";
import { Config } from "../Config";
import { WATCHER_MOD_NAME } from "../constants";
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
    console.error(
      `Error: ${processDescription} subprocess closed with code: ${code}`,
    );
    process.exit(1);
  });

  saveDatWriter.on("exit", (code: number | null) => {
    console.error(
      `Error: ${processDescription} subprocess exited with code: ${code}`,
    );
    process.exit(1);
  });
}

export function sendMsgToSaveDatWriter(msg: SaveDatMessage): void {
  if (saveDatWriter !== null) {
    saveDatWriter.send(msg);
  }
}
