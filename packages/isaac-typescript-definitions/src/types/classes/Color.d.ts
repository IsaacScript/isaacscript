import type { CopyableIsaacAPIClassType } from "../../enums/CopyableIsaacAPIClassType";

declare global {
  /**
   * @param r Range is from 0-1.
   * @param g Range is from 0-1.
   * @param b Range is from 0-1.
   * @param a Default is 1. Range is from 0-1.
   * @param ro Default is 0. Range is from 0-1.
   * @param go Default is 0. Range is from 0-1.
   * @param bo Default is 0. Range is from 0-1.
   */
  function Color(
    this: void,
    r: float,
    g: float,
    b: float,
    a?: float,
    ro?: int,
    go?: int,
    bo?: int,
  ): Color;

  interface Color extends IsaacAPIClass {
    Reset: () => void;
    SetColorize: (red: float, green: float, blue: float, amount: float) => void;
    SetOffset: (
      redOffset: float,
      greenOffset: float,
      blueOffset: float,
    ) => void;
    SetTint: (
      redTint: float,
      greenTint: float,
      blueTint: float,
      alphaTint: float,
    ) => void;

    /** Range is from 0-1. */
    A: float;

    /** Range is from 0-1. */
    B: float;

    /** Range is from 0-1. */
    BO: float;

    /** Range is from 0-1. */
    G: float;

    /** Range is from 0-1. */
    GO: float;

    /** Range is from 0-1. */
    R: float;

    /** Range is from 0-1. */
    RO: float;

    /** An identifier that does not exist at run-time. */
    __kind: CopyableIsaacAPIClassType.COLOR;
  }

  /** @noSelf */
  namespace Color {
    function Lerp(m1: Color, m2: Color, t: float): Color;

    // The `Default` preset is not implemented, since it is unsafe. See the `ColorDefault` constant.
  }
}
