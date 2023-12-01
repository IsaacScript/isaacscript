export type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<
  Record<K, V>
>;
