import type { PlayerType, SkinColor } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @noSelf
   * @see https://repentogon.com/
   */
  interface CostumeSpriteDesc extends IsaacAPIClass {
    /** Returns whether the costume overrides the character's body color. */
    CanOverwriteColor: () => boolean;

    /** Returns the costume body's `SkinColor`. */
    GetBodyColor: () => SkinColor;

    /** Returns the costume head's `SkinColor`. */
    GetHeadColor: () => SkinColor;

    /** Returns the `ItemConfigItem` associated with the costume. */
    GetItemConfig: () => ItemConfigItem;

    /** Returns the `PlayerType` of the player wearing the costume. */
    GetPlayerType: () => PlayerType;

    /** Returns the costume's display priority. */
    GetPriority: () => int;

    /** Returns the costume's sprite. */
    GetSprite: () => Sprite;

    /** Returns whether the costume has an overlay effect. */
    HasOverlay: () => boolean;

    /** Returns whether the costume has alternative versions for other skin colors. */
    HasSkinAlt: () => boolean;

    /**
     * Returns whether the costume displays the player as flying. This does not actually grant
     * flying.
     */
    IsFlying: () => boolean;

    /** Returns whether the costume's item animation is playing. */
    IsItemAnimPlaying: () => boolean;

    /**
     * Returns whether or not the costume is only visible when the player's item state matches is
     * the same as the associated collectible.
     */
    IsItemStateOnly: () => boolean;
  }
}
