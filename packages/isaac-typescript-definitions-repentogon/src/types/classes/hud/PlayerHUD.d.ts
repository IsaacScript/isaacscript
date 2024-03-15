import type { ActiveSlot } from "isaac-typescript-definitions";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface PlayerHUD {
  /**
   * Returns a specific heart from the HUD by its index. Returns `undefined` if no heart with the
   * provided index exists.
   */
  GetHeartByIndex: (index: int) => PlayerHUDHeart | undefined;

  /** Returns an array of all of the hearts currently displayed. */
  GetHearts: () => PlayerHUDHeart[];

  /** Returns the `HUD`. */
  GetHUD: () => HUD;

  /** Returns the `EntityPlayer` associated with the `PlayerHUD`. */
  GetPlayer: () => EntityPlayer;

  /**
   * Renders the active item sprite and chargebar on the HUD.
   *
   * @param slot
   * @param position
   * @param alpha Optional. Default is 1.
   * @param scale Optional. Default is 1.
   */
  RenderActiveItem: (
    slot: ActiveSlot,
    position: Vector,
    alpha?: number,
    scale?: number,
  ) => void;
}
