import { isDirectory, isFile, makeDirectory, touch } from "complete-node";
import path from "node:path";
import type { ValidatedConfig } from "../../classes/ValidatedConfig.js";
import { WATCHER_MOD_NAME } from "../../constants.js";

export async function touchWatcherSaveDatFiles(
  config: ValidatedConfig,
): Promise<void> {
  const modsDataPath = path.resolve(config.modsDirectory, "..", "data");
  const watcherModDataPath = path.join(modsDataPath, WATCHER_MOD_NAME);
  const directory = await isDirectory(watcherModDataPath);
  if (!directory) {
    await makeDirectory(watcherModDataPath);
  }
  const saveDatFileName = `save${config.saveSlot}.dat`;
  const saveDatPath = path.join(watcherModDataPath, saveDatFileName);
  const file = await isFile(saveDatPath);
  if (!file) {
    await touch(saveDatPath);
  }
}
