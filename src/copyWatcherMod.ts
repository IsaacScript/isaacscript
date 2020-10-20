import path from "path";
import Config from "./Config";
import { WATCHER_MOD_NAME, WATCHER_MOD_SOURCE_PATH } from "./constants";
import * as misc from "./misc";

export default function copyWatcherMod(config: Config): void {
  // Delete and re-copy the watcher mod every time IsaacScript starts
  // This ensures that it is always the latest version
  const watcherModPath = path.join(
    config.modTargetPath,
    "..",
    WATCHER_MOD_NAME,
  );
  if (misc.exists(watcherModPath)) {
    misc.deleteDir(watcherModPath);
  }
  misc.copy(WATCHER_MOD_SOURCE_PATH, watcherModPath);
}
