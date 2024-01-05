import type { XMLNode } from "../../../enums/mods/repentogon/XMLNode";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace XMLData {
    /** Returns the number of entries a given XMLNode structure has. */
    function GetNumEntries(nodeType: XMLNode): int;
  }
}
