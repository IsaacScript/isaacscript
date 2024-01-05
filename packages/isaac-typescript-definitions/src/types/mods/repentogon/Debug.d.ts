/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace Debug {
  function ForceUnload(moduleName: string): void;
  function GetSignature(address: int): string;
  function ListLoadedFiles(): string[];
}
