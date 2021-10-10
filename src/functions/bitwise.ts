export function getKBitOfN(k: int, n: int): int {
  return (n >>> k) & 1;
}

export function getNumBitsOfN(n: int): int {
  let numBits = 0;
  while (n > 0) {
    numBits += 1;
    n >>>= 1;
  }

  return numBits;
}
