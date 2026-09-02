import type { ActiveSlot } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface PlayerHUD {
    /**
     * Returns a specific heart from the HUD by its index. Returns `undefined` if no heart with the
     * provided index exists.
     */
    readonly GetHeartByIndex: (index: int) => PlayerHUDHeart | undefined;

    /** Returns an array of all of the hearts currently displayed. */
    readonly GetHearts: () => PlayerHUDHeart[];

    /** Returns the `HUD`. */
    readonly GetHUD: () => HUD;

    readonly GetIndex: () => int;
    readonly GetLayout: () => int;

    /** Returns the `EntityPlayer` associated with the `PlayerHUD`. */
    readonly GetPlayer: () => EntityPlayer;

    /**
     * Renders the active item sprite and chargebar on the HUD.
     *
     * @param slot
     * @param position
     * @param alpha Optional. Default is 1.
     * @param scale Optional. Default is 1.
     */
    readonly RenderActiveItem: (
      slot: ActiveSlot,
      position: Vector,
      alpha?: number,
      scale?: number,
    ) => void;
  }
}
