import path from "path";
import { Config } from "../common/Config";
import * as file from "../common/file";
import {
  DISABLE_IT_FILE,
  WATCHER_MOD_NAME,
  WATCHER_MOD_SOURCE_PATH,
} from "./constants";

export default function copyWatcherMod(config: Config): void {
  // Check to see if this mod was disabled
  const watcherModPath = path.join(
    config.modTargetPath,
    "..",
    WATCHER_MOD_NAME,
  );
  const disableItPath = path.join(watcherModPath, DISABLE_IT_FILE);
  const watcherModDisabled = file.exists(disableItPath);

  // Delete and re-copy the watcher mod every time IsaacScript starts
  // This ensures that it is always the latest version
  if (file.exists(watcherModPath)) {
    file.deleteDir(watcherModPath);
  }
  file.copy(WATCHER_MOD_SOURCE_PATH, watcherModPath);

  if (watcherModDisabled) {
    // Since we deleted the directory, the "disable.it" file was deleted
    // Restore it
    file.write(disableItPath, "");
  }

  // If we copied a new version of the watcher mod into place,
  // but the user currently has the game open, then the old version will stay loaded
  // However, if the watcher mod reloads itself, the game will crash,
  // so there is no automated solution for this
}
