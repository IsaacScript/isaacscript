/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export interface PlayerHUDHeart {
  GetFlashType: () => int;
  GetHeartAnim: () => string;
  GetHeartOverlayAnim: () => string;
  IsGoldenHeartOverlayVisible: () => boolean;
  IsVisible: () => boolean;
}
