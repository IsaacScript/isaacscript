import type { EntityType } from "../../../enums/EntityType";
import type {
  BabySubType,
  PlayerType,
} from "../../../enums/collections/subTypes";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace EntityConfig {
    /**
     * Returns the `EntityConfigBaby` from the provided `BabySubType`.
     *
     * Returns undefined if there is no co-op baby with the given ID.
     */
    function GetBaby(babySubType: BabySubType): EntityConfigBaby | undefined;

    /**
     * Returns the `EntityConfigEntity` from the provided `EntityType`.
     *
     * Providing the variant and subtype is optional. If a non-existent variant/subtype is
     * requested, the base version of that entity is returned instead.
     *
     * Returns undefined if there is no entity from the provided `EntityType`.
     *
     * @param entityType
     * @param variant Default is -1.
     * @param subType Default is -1.
     */
    function GetEntity(
      entityType: EntityType,
      variant?: int,
      subType?: int,
    ): EntityConfigEntity | undefined;

    /** Returns the highest `BabySubType` currently assigned to a valid co-op baby. */
    function GetMaxBabyID(): BabySubType;

    /** Returns the highest `PlayerType` assigned to a valid player. */
    function GetMaxPlayerType(): PlayerType;

    /**
     * Returns the `EntityConfigPlayer` from the provided Player.
     *
     * Returns undefined if there is no player with the given `PlayerType`.
     */
    function GetPlayer(playerType: PlayerType): EntityConfigPlayer | undefined;
  }
}
