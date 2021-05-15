/* eslint-disable no-underscore-dangle */
declare function BitSet128(this: void, l: int, h: int): BitSet128;

declare class BitSet128 {
  __band(right: BitSet128): BitSet128;
  __bnot(right: BitSet128): BitSet128;
  __bor(right: BitSet128): BitSet128;
  __bshl(right: BitSet128): BitSet128;
  __bshr(right: BitSet128): BitSet128;
  __eq(right: BitSet128): boolean;
  __le(right: BitSet128): boolean;
  __lt(right: BitSet128): boolean;
}
