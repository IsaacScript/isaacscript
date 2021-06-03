export interface Config {
  /** The name of your project directory. */
  projectName: string;
  /** The "mods" directory that lives next to the "isaac-ng.exe" program. */
  modsDirectory: string;
  /** The save slot that you test your mod on. */
  saveSlot: number;
  /** The path to "steamcmd.exe". This is optional and only needed for automating publishing. */
  steamCmdPath?: string;
}
