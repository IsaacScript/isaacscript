import type { CopyableIsaacAPIClassType } from "../../enums/CopyableIsaacAPIClassType";

declare global {
  interface KColor extends IsaacAPIClass {
    Alpha: float;
    Blue: float;
    Green: float;
    Red: float;

    /** An identifier that does not exist at run-time. */
    __kind: CopyableIsaacAPIClassType.K_COLOR;
  }

  function KColor(this: void, r: float, g: float, b: float, a: float): KColor;

  // The `KColor` presets are deliberately not implemented, since they are unsafe. See the
  // `K_COLORS` constant.
}
