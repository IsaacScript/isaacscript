/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @noSelf
 * @see https://repentogon.com/index.html
 */
declare namespace ProceduralItemManager {
  /** Creates a glitch item based on a given seed. Returns the negative ID of the created item. */
  function CreateProceduralItem(seed: Seeds, unknown: int): int;

  function GetProceduralItem(index: int): ProceduralItem;

  function GetProceduralItemCount(): int;
}
