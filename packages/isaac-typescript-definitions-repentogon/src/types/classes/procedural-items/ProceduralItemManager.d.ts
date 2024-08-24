import type { CollectibleType } from "isaac-typescript-definitions";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @noSelf
 * @see https://repentogon.com/
 */
declare namespace ProceduralItemManager {
  /**
   * Creates a new glitch item and returns its negative ID.
   *
   * @param seed
   * @param unknown The exact behavior of this parameter is unknown and undocumented.
   */
  function CreateProceduralItem(seed: Seed, unknown: int): CollectibleType;

  /** Returns a `ProceduralItem` from the specified index. Returns undefined if none were found. */
  function GetProceduralItem(index: int): ProceduralItem | undefined;

  /** Returns the total amount of procedural items generated. */
  function GetProceduralItemCount(): int;
}
