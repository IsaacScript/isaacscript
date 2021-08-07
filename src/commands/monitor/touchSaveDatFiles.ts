import path from "path";
import { WATCHER_MOD_NAME } from "../../constants";
import * as file from "../../file";
import { Config } from "../../types/Config";

export default function touchSaveDatFiles(config: Config): void {
  const modsDataPath = path.join(config.modsDirectory, "..", "data");
  const watcherModDataPath = path.join(modsDataPath, WATCHER_MOD_NAME);
  if (!file.exists(watcherModDataPath)) {
    file.makeDir(watcherModDataPath);
  }
  const saveDatFileName = `save${config.saveSlot}.dat`;
  const saveDatPath = path.join(watcherModDataPath, saveDatFileName);
  if (!file.exists(saveDatPath)) {
    file.touch(saveDatPath);
  }
}
