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
    readonly CanOverwriteColor: () => boolean;

    /** Returns the costume body's `SkinColor`. */
    readonly GetBodyColor: () => SkinColor;

    /** Returns the costume head's `SkinColor`. */
    readonly GetHeadColor: () => SkinColor;

    /** Returns the `ItemConfigItem` associated with the costume. */
    readonly GetItemConfig: () => ItemConfigItem;

    /** Returns the `PlayerType` of the player wearing the costume. */
    readonly GetPlayerType: () => PlayerType;

    /** Returns the costume's display priority. */
    readonly GetPriority: () => int;

    /** Returns the costume's sprite. */
    readonly GetSprite: () => Sprite;

    /** Returns whether the costume has an overlay effect. */
    readonly HasOverlay: () => boolean;

    /** Returns whether the costume has alternative versions for other skin colors. */
    readonly HasSkinAlt: () => boolean;

    /**
     * Returns whether the costume displays the player as flying. This does not actually grant
     * flying.
     */
    readonly IsFlying: () => boolean;

    /** Returns whether the costume's item animation is playing. */
    readonly IsItemAnimPlaying: () => boolean;

    /**
     * Returns whether or not the costume is only visible when the player's item state matches is
     * the same as the associated collectible.
     */
    readonly IsItemStateOnly: () => boolean;
  }
}
