import type { HeartFlashType } from "../../../enums/HeartFlashType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface PlayerHUDHeart extends IsaacAPIClass {
    GetFlashType: () => HeartFlashType;

    /** Returns the name of the animation currently playing on the heart. */
    GetHeartAnim: () => string;

    /** Returns the name of the overlay animation currently playing on the heart. */
    GetHeartOverlayAnim: () => string;

    /** Returns whether the golden heart overlay is visible on the heart. */
    IsGoldenHeartOverlayVisible: () => boolean;

    /** Returns whether the heart is visible. */
    IsVisible: () => boolean;
  }
}
