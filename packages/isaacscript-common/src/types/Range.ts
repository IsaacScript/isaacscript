type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

/**
 * Helper type to get a range of integers between low and high. It is inclusive on the lower end and
 * exclusive on the higher end.
 *
 * From:
 * https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range
 */
export type Range<Low extends number, High extends number> = Exclude<
  Enumerate<High>,
  Enumerate<Low>
>;
