/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @noSelf
 * @see https://repentogon.com/
 */
declare namespace Debug {
  /** Forcibly unloads a specified script from the Lua environment. */
  function ForceUnload(moduleName: string): void;

  /**
   * Retrieves the function signature from the provided address.
   *
   * Passing an invalid address will throw an error.
   */
  function GetSignature(address: int): string;

  /** Returns an array of all scripts currently loaded in the Lua environment. */
  function ListLoadedFiles(): string[];
}
