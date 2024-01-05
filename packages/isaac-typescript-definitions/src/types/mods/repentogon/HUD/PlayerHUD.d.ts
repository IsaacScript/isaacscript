import type { ActiveSlot } from "../../../../enums/ActiveSlot";
import type { PlayerHUDHeart } from "./PlayerHUDHeart";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface PlayerHUD {
    GetHeartByIndex: (index: int) => PlayerHUDHeart | undefined;
    GetHearts: () => PlayerHUDHeart[];
    GetHUD: () => HUD;
    GetPlayer: () => EntityPlayer;

    /**
     * Renders an active item.
     *
     * @param slot
     * @param position
     * @param alpha Default is 1.
     * @param unknown Default is 1.
     */
    RenderActiveItem: (
      slot: ActiveSlot,
      position: Vector,
      alpha?: number,
      unknown?: number,
    ) => void;
  }
}
