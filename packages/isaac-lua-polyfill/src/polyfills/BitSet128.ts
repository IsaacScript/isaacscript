globalThis.BitSet128 = function BitSet128(low = 0, high = 0) {
  return Number((BigInt(high) << 64n) + BigInt(low)) as unknown as BitSet128;
};
