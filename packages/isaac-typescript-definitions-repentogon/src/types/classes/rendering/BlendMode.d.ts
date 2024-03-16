import type { BlendFactor } from "../../../enums/BlendFactor";
import type { BlendType } from "../../../enums/BlendType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface BlendMode extends IsaacAPIClass {
    SetMode: (blendType: BlendType) => void;

    AlphaDestinationFactor: BlendFactor;
    AlphaSourceFactor: BlendFactor;
    RGBDestinationFactor: BlendFactor;
    RGBSourceFactor: BlendFactor;
  }
}
