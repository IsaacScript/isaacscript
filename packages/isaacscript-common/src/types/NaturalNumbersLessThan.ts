export type NaturalNumbersLessThan<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : NaturalNumbersLessThan<N, [...Acc, Acc["length"]]>;
