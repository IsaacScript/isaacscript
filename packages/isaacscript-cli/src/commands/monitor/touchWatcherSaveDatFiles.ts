import {
  isDirectory,
  isFile,
  makeDirectory,
  touch,
} from "isaacscript-common-node";
import path from "node:path";
import type { ValidatedConfig } from "../../classes/ValidatedConfig.js";
import { WATCHER_MOD_NAME } from "../../constants.js";

export function touchWatcherSaveDatFiles(config: ValidatedConfig): void {
  const modsDataPath = path.join(config.modsDirectory, "..", "data");
  const watcherModDataPath = path.join(modsDataPath, WATCHER_MOD_NAME);
  if (!isDirectory(watcherModDataPath)) {
    makeDirectory(watcherModDataPath);
  }
  const saveDatFileName = `save${config.saveSlot}.dat`;
  const saveDatPath = path.join(watcherModDataPath, saveDatFileName);
  if (!isFile(saveDatPath)) {
    touch(saveDatPath);
  }
}
