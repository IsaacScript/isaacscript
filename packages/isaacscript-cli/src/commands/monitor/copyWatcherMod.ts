import {
  copyFileOrDirectory,
  deleteFileOrDirectory,
  isFile,
  readFile,
  writeFile,
} from "complete-node";
import path from "node:path";
import type { ValidatedConfig } from "../../classes/ValidatedConfig.js";
import {
  DISABLE_IT_FILE,
  MAIN_LUA,
  WATCHER_MOD_NAME,
  WATCHER_MOD_SOURCE_PATH,
} from "../../constants.js";

export async function copyWatcherMod(config: ValidatedConfig): Promise<void> {
  // Check to see if this mod was disabled.
  const watcherModPath = path.join(config.modsDirectory, WATCHER_MOD_NAME);
  const disableItPath = path.join(watcherModPath, DISABLE_IT_FILE);
  const watcherModDisabled = await isFile(disableItPath);

  // Delete and re-copy the watcher mod every time IsaacScript starts. This ensures that it is
  // always the latest version.
  await deleteFileOrDirectory(watcherModPath);
  await copyFileOrDirectory(WATCHER_MOD_SOURCE_PATH, watcherModPath);

  if (watcherModDisabled) {
    // Since we deleted the directory, the "disable.it" file was deleted. Restore it.
    await writeFile(disableItPath, "");
  }

  // By default, the IsaacScript watcher mod automatically restarts the game, so we only need to
  // disable it if the config option is explicitly set to false.
  if (config.enableIsaacScriptWatcherAutoRestart === false) {
    await disableIsaacScriptWatcherAutomaticRestart(watcherModPath);
  }

  // If we copied a new version of the watcher mod into place, but the user currently has the game
  // open, then the old version will stay loaded. However, if the watcher mod reloads itself, the
  // game will crash, so there is no automated solution for this.
}

async function disableIsaacScriptWatcherAutomaticRestart(
  watcherModPath: string,
) {
  const mainLuaPath = path.join(watcherModPath, MAIN_LUA);
  const mainLua = await readFile(mainLuaPath);

  const modifiedMainLua = mainLua.replace(
    "local RESTART_GAME_ON_RECOMPILATION = true",
    "local RESTART_GAME_ON_RECOMPILATION = false",
  );

  await writeFile(mainLuaPath, modifiedMainLua);
}
