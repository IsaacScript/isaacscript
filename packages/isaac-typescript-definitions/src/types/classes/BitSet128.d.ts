declare function BitSet128(this: void, l: int, h: int): BitSet128;

/**
 * A class used to represent a 128-bit number. This is used because Lua only has 64-bit numbers and
 * C++ uses 128-bit numbers for certain things.
 */
declare interface BitSet128 {
  /**
   * These methods are used to transpile:
   *
   * ```ts
   * tearFlags.bor(TearFlag.TEAR_SPECTRAL)
   * ```
   *
   * To:
   *
   * ```lua
   * tearFlags | TearFlag.TEAR_SPECTRAL
   * ```
   *
   * https://typescripttolua.github.io/docs/advanced/language-extensions/#operator-map-types
   */

  band: LuaBitwiseAndMethod<BitSet128, BitSet128>;
  bnot: LuaBitwiseNotMethod<BitSet128>;
  bor: LuaBitwiseOrMethod<BitSet128, BitSet128>;
  bshl: LuaBitwiseLeftShiftMethod<BitSet128, BitSet128>;
  bshr: LuaBitwiseRightShiftMethod<BitSet128, BitSet128>;
}
