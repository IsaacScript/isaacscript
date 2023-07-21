import path from "node:path";
import { ValidatedConfig } from "../../classes/ValidatedConfig.js";
import { WATCHER_MOD_NAME } from "../../constants.js";
import { fileExists, makeDir, touch } from "../../file.js";

export function touchWatcherSaveDatFiles(
  config: ValidatedConfig,
  verbose: boolean,
): void {
  const modsDataPath = path.join(config.modsDirectory, "..", "data");
  const watcherModDataPath = path.join(modsDataPath, WATCHER_MOD_NAME);
  if (!fileExists(watcherModDataPath, verbose)) {
    makeDir(watcherModDataPath, verbose);
  }
  const saveDatFileName = `save${config.saveSlot}.dat`;
  const saveDatPath = path.join(watcherModDataPath, saveDatFileName);
  if (!fileExists(saveDatPath, verbose)) {
    touch(saveDatPath, verbose);
  }
}
