/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace Debug {
  /** Forcefully unloads a file from the provided file name. */
  function ForceUnload(moduleName: string): void;

  /** Returns the signature of a function from the provided address. */
  function GetSignature(address: int): string;

  /** Returns an array containing all of the files loaded into the Lua environment. */
  function ListLoadedFiles(): string[];
}
