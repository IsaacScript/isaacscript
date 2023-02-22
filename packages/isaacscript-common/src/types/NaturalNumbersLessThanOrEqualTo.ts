import { Increment } from "./Increment";
import { NaturalNumbersLessThan } from "./NaturalNumbersLessThan";

/**
 * Helper type to get a range of integers between 0 and N.
 *
 * From:
 * https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
 */
export type NaturalNumbersLessThanOrEqualTo<N extends number> =
  // @ts-expect-error The return value of increment is a number, but TypeScript gets confused.
  NaturalNumbersLessThan<Increment<N>>;
