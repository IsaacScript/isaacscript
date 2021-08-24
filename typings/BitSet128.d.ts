declare function BitSet128(this: void, l: int, h: int): BitSet128;

declare interface BitSet128 {
  // If you call these methods directly, the game will crash; see the below methods instead
  /*
  __band(right: BitSet128): BitSet128;
  __bnot(right: BitSet128): BitSet128;
  __bor(right: BitSet128 | TearFlags): BitSet128;
  __bshl(right: BitSet128): BitSet128;
  __bshr(right: BitSet128): BitSet128;
  __eq(right: BitSet128): boolean; // eslint-disable-line no-underscore-dangle
  __le(right: BitSet128): boolean; // eslint-disable-line no-underscore-dangle
  __lt(right: BitSet128): boolean; // eslint-disable-line no-underscore-dangle
  */

  // These are used to transpile:
  // tearFlags.bor(TearFlags.TEAR_SPECTRAL)
  // to:
  // tearFlags | TearFlags.TEAR_SPECTRAL
  // https://typescripttolua.github.io/docs/advanced/language-extensions/#operator-map-types
  band: LuaBitwiseAndMethod<BitSet128 | TearFlags, BitSet128>;
  bnot: LuaBitwiseNotMethod<BitSet128 | TearFlags>;
  bor: LuaBitwiseOrMethod<BitSet128 | TearFlags, BitSet128>;
  bshl: LuaBitwiseLeftShiftMethod<BitSet128 | TearFlags, BitSet128>;
  bshr: LuaBitwiseRightShiftMethod<BitSet128 | TearFlags, BitSet128>;
}
