// Note that all mandatory properties must be explicitly validated in `configFile.ts`.

/** This is the format for the "isaacscript.json" file. */
export class Config {
  $schema =
    "https://raw.githubusercontent.com/IsaacScript/isaacscript/main/packages/isaacscript-cli/schemas/isaacscript-schema.json";

  /** The "mods" directory that lives next to the "isaac-ng.exe" program. */
  modsDirectory =
    "C:\\Program Files (x86)\\Steam\\steamapps\\common\\The Binding of Isaac Rebirth\\mods";

  /** The save slot that you test your mod on. */
  saveSlot = 1;

  /**
   * By default, the target mod directory name will be the same as the project directory name. This
   * setting allows you to customize it.
   */
  customTargetModDirectoryName?: string;

  /** The path to "steamcmd.exe". This is optional and only needed for automating publishing. */
  steamCmdPath?: string;

  /**
   * When your code is recompiled, IsaacScript watcher can restart the game to ensure that any
   * run-related variables are properly reset. This is set to true by default.
   */
  enableIsaacScriptWatcherAutoRestart?: boolean;

  /**
   * If set to true, the IsaacScript watcher will spawn an additional watcher process for the files
   * in the `isaacscript-common` directory. (It assumes that you have `isaacscript-common` linked to
   * a forked development repository.)
   */
  isaacScriptCommonDev?: boolean;

  constructor(
    modsDirectory?: string,
    saveSlot?: number,
    isaacScriptCommonDev?: boolean,
  ) {
    if (modsDirectory !== undefined) {
      this.modsDirectory = modsDirectory;
    }

    if (saveSlot !== undefined) {
      this.saveSlot = saveSlot;
    }

    if (isaacScriptCommonDev !== undefined) {
      this.isaacScriptCommonDev = isaacScriptCommonDev;
    }
  }
}
