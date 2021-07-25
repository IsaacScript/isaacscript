export class Config {
  /** The "mods" directory that lives next to the "isaac-ng.exe" program. */
  modsDirectory =
    "C:\\Program Files (x86)\\Steam\\steamapps\\common\\The Binding of Isaac Rebirth\\mods";

  /** The save slot that you test your mod on. */
  saveSlot = 1;
  /** The path to "steamcmd.exe". This is optional and only needed for automating publishing. */
  steamCmdPath?: string;
}
