/** Helper type to check if an object or class has one or more functions/methods. */
export type HasFunction<T> =
  Record<string, unknown> extends {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof T as T[K] extends Function ? K : never]-?: 1;
  }
    ? never
    : T;
