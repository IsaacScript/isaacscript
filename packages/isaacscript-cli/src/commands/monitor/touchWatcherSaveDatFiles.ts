import path from "node:path";
import { Config } from "../../classes/Config.js";
import { WATCHER_MOD_NAME } from "../../constants.js";
import * as file from "../../file.js";

export function touchWatcherSaveDatFiles(
  config: Config,
  verbose: boolean,
): void {
  const modsDataPath = path.join(config.modsDirectory, "..", "data");
  const watcherModDataPath = path.join(modsDataPath, WATCHER_MOD_NAME);
  if (!file.exists(watcherModDataPath, verbose)) {
    file.makeDir(watcherModDataPath, verbose);
  }
  const saveDatFileName = `save${config.saveSlot}.dat`;
  const saveDatPath = path.join(watcherModDataPath, saveDatFileName);
  if (!file.exists(saveDatPath, verbose)) {
    file.touch(saveDatPath, verbose);
  }
}
