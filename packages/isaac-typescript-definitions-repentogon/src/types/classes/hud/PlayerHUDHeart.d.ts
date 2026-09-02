import type { HeartFlashType } from "../../../enums/HeartFlashType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface PlayerHUDHeart extends IsaacAPIClass {
    /** Returns the heart's flash type. */
    readonly GetFlashType: () => HeartFlashType;

    /** Returns the name of the animation currently playing on the heart. */
    readonly GetHeartAnim: () => string;

    /** Returns the name of the overlay animation currently playing on the heart. */
    readonly GetHeartOverlayAnim: () => string;

    /** Returns whether the Eternal Heart overlay is visible. */
    readonly IsEternalHeartOverlayVisible: () => boolean;

    /** Returns whether the heart is fading. */
    readonly IsFadingHeart: () => boolean;

    /** Returns whether the golden heart overlay is visible on the heart. */
    readonly IsGoldenHeartOverlayVisible: () => boolean;

    /** Returns whether the heart is visible. */
    readonly IsVisible: () => boolean;
  }
}
