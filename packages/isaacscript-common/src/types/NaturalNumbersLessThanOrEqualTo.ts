/**
 * Helper type to get a range of integers between 0 and N.
 *
 * From:
 * https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
 */
export type NaturalNumbersLessThanOrEqualTo<
  N extends number,
  Acc extends number[] = [],
> = Acc extends [unknown, ...infer Tail]
  ? Tail["length"] extends N
    ? Acc[number]
    : NaturalNumbersLessThanOrEqualTo<N, [...Acc, Acc["length"]]>
  : NaturalNumbersLessThanOrEqualTo<N, [...Acc, Acc["length"]]>;
