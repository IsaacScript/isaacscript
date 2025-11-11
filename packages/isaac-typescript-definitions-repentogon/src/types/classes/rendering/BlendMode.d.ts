import type { BlendEquation } from "../../../enums/BlendEquation";
import type { BlendFactor } from "../../../enums/BlendFactor";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface BlendMode extends IsaacAPIClass {
    /**
     * @param rgbSrc Optional. Default is its current value.
     * @param rgbDst Optional. Default is its current value.
     * @param alphaSrc Optional. Default is its current value.
     * @param alphaDst Optional. Default is its current value.
     * @param equation Optional. Default is its current value.
     */
    SetMode: ((blendMode: BlendMode) => void)
      & ((
        rgbSrc?: int,
        rgbDst?: int,
        alphaSrc?: int,
        alphaDst?: int,
        equation?: BlendEquation,
      ) => void);

    AlphaDestinationFactor: BlendFactor;
    AlphaSourceFactor: BlendFactor;
    Equation: BlendEquation;
    RGBDestinationFactor: BlendFactor;
    RGBSourceFactor: BlendFactor;
  }
}
