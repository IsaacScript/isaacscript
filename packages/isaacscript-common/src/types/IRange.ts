import type { NaturalNumbersLessThan } from "./NaturalNumbersLessThan";
import type { NaturalNumbersLessThanOrEqualTo } from "./NaturalNumbersLessThanOrEqualTo";

/**
 * Helper type to get a range of integers. It is inclusive on both ends. (The "I" in the type name
 * stands for inclusive.)
 *
 * For example, `IRange<3, 5>` will return `3 | 4 | 5`.
 *
 * From:
 * https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
 */
export type IRange<Low extends number, High extends number> = Exclude<
  NaturalNumbersLessThanOrEqualTo<High>,
  NaturalNumbersLessThan<Low>
>;
