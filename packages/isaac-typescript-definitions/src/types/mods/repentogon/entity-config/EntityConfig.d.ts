import type { EntityType } from "../../../../enums/EntityType";
import type { PlayerType } from "../../../../enums/collections/subTypes";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace EntityConfig {
    function GetEntity(
      entityType: EntityType,
      variant?: int,
      subType?: int,
    ): EntityConfigEntity | undefined;

    /** Returns the highest PlayerType currently assigned to a valid character. */
    function GetMaxPlayerType(): PlayerType;

    function GetPlayer(playerType: PlayerType): EntityConfigPlayer | undefined;
  }
}
