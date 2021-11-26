import path from "path";
import {
  DISABLE_IT_FILE,
  MAIN_LUA,
  WATCHER_MOD_NAME,
  WATCHER_MOD_SOURCE_PATH,
} from "../../constants";
import * as file from "../../file";
import { Config } from "../../types/Config";

export function copyWatcherMod(config: Config): void {
  // Check to see if this mod was disabled
  const watcherModPath = path.join(config.modsDirectory, WATCHER_MOD_NAME);
  const disableItPath = path.join(watcherModPath, DISABLE_IT_FILE);
  const watcherModDisabled = file.exists(disableItPath);

  // Delete and re-copy the watcher mod every time IsaacScript starts
  // This ensures that it is always the latest version
  if (file.exists(watcherModPath)) {
    file.deleteFileOrDirectory(watcherModPath);
  }

  file.copy(WATCHER_MOD_SOURCE_PATH, watcherModPath);

  if (watcherModDisabled) {
    // Since we deleted the directory, the "disable.it" file was deleted
    // Restore it
    file.write(disableItPath, "");
  }

  // By default, the IsaacScript watcher mod automatically restarts the game,
  // so we only need to disable it if the config option is explicitly set to false
  if (config.enableIsaacScriptWatcherAutoRestart === false) {
    disableIsaacScriptWatcherAutomaticRestart(watcherModPath);
  }

  // If we copied a new version of the watcher mod into place,
  // but the user currently has the game open, then the old version will stay loaded
  // However, if the watcher mod reloads itself, the game will crash,
  // so there is no automated solution for this
}

function disableIsaacScriptWatcherAutomaticRestart(watcherModPath: string) {
  const mainLuaPath = path.join(watcherModPath, MAIN_LUA);
  const mainLua = file.read(mainLuaPath);

  const modifiedMainLua = mainLua.replace(
    "local RESTART_GAME_ON_RECOMPILATION = true",
    "local RESTART_GAME_ON_RECOMPILATION = false",
  );

  file.write(mainLuaPath, modifiedMainLua);
}
