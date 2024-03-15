/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface PlayerHUDHeart {
  /** TODO: Document each value and create an enum. */
  GetFlashType: () => int;

  /** Returns the name of the animation currently playing on the heart. */
  GetHeartAnim: () => string;

  /** Returns the name of the overlay animation currently playing on the heart. */
  GetHeartOverlayAnim: () => string;

  /** Returns whether the golden heart overlay is visible on the heart. */
  IsGoldenHeartOverlayVisible: () => boolean;

  /** Returns whether the heart is visible. */
  IsVisible: () => boolean;
}
