import { addFlag } from "./flag";
import { assertDefined } from "./utils";

/** Helper function to convert a set of flags to a single `BitFlags` object. */
export function arrayToBitFlags<T extends BitFlag | BitFlag128>(
  array: T[] | readonly T[],
): BitFlags<T> {
  let flags = 0 as BitFlags<T>;
  for (const flag of array) {
    flags = addFlag(flags, flag);
  }

  return flags;
}

/** Helper function to convert an array of bits to the resulting decimal number. */
export function convertBinaryToDecimal(bits: int[]): number {
  const bitsString = bits.join("");
  return Number.parseInt(bitsString, 2);
}

/**
 * Helper function to convert a number to an array of bits.
 *
 * @param num The number to convert.
 * @param minLength Optional. Equal to the minimum amount of bits that should be returned. If the
 *                  converted number of bits is below this number, 0's will be padded to the left
 *                  side until the minimum length is met. Default is undefined (which will not cause
 *                  any padding).
 */
export function convertDecimalToBinary(num: number, minLength?: int): int[] {
  const bits: int[] = [];

  const bitsString = num.toString(2);
  for (const bitString of bitsString) {
    const bit = tonumber(bitString);
    assertDefined(
      bit,
      `Failed to convert the following number to binary: ${num}`,
    );

    bits.push(bit);
  }

  if (minLength !== undefined) {
    while (bits.length < minLength) {
      bits.unshift(0);
    }
  }

  return bits;
}

/**
 * Helper function to count the number of bits that are set to 1 in a binary representation of a
 * number.
 */
export function countSetBits(n: int): int {
  let count = 0;

  while (n > 0) {
    n &= n - 1;
    count++;
  }

  return count;
}

/** Helper function to get the value of a specific but in a binary representation of a number. */
export function getKBitOfN(k: int, n: int): int {
  return (n >>> k) & 1;
}

/** Helper function to get the number of bits in a binary representation of a number. */
export function getNumBitsOfN(n: int): int {
  let numBits = 0;
  while (n > 0) {
    numBits++;
    n >>>= 1;
  }

  return numBits;
}

/** Helper function to convert a set of flags to a single `BitFlags` object. */
export function setToBitFlags<T extends BitFlag | BitFlag128>(
  set: Set<T> | ReadonlySet<T>,
): BitFlags<T> {
  let flags = 0 as BitFlags<T>;
  for (const flag of set.values()) {
    flags = addFlag(flags, flag);
  }

  return flags;
}
