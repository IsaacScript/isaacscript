import type { PlayerType, SkinColor } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html`
   * @noSelf
   */
  interface CostumeSpriteDesc {
    /** Returns whether the costume can change the player's color. */
    CanOverwriteColor: () => boolean;

    /** Returns the base `SkinColor` of the costume's body. */
    GetBodyColor: () => SkinColor;

    /** Returns the base `SkinColor` of the costume's head. */
    GetHeadColor: () => SkinColor;

    /** Returns the `ItemConfigItem` of the collectible associated with this costume. */
    GetItemConfig: () => ItemConfigItem;

    /** Returns the `PlayerType` of the player wearing the costume. */
    GetPlayerType: () => PlayerType;

    /** Returns the display priority of the costume. */
    GetPriority: () => int;

    /** Returns the costume's sprite. */
    GetSprite: () => Sprite;

    /** Returns whether the costume is an overlay. */
    HasOverlay: () => boolean;

    /** Returns whether the costume has an alternate version based on the player's skin color. */
    HasSkinAlt: () => boolean;

    /** Returns whether the costume grants flying. */
    IsFlying: () => boolean;

    IsItemAnimPlaying: () => boolean;

    /**
     * Returns whether or not the costume is only applied when the collectible it is associated with
     * is in a special state.
     */
    IsItemStateOnly: () => boolean;
  }
}
