import path from "path";
import { Config } from "../Config";
import * as file from "../file";

export default function touchSaveDatFiles(config: Config): void {
  const modsDataPath = path.join(config.modsDirectory, "..", "data");
  const modDataPath = path.join(modsDataPath, config.projectName);
  const saveDatFileName = `save${config.saveSlot}.dat`;
  const saveDatPath = path.join(modDataPath, saveDatFileName);
  if (!file.exists(saveDatPath)) {
    file.touch(saveDatPath);
  }
}
