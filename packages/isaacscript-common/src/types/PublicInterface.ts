/** Helper type to extract only the public interface of a class. */
export type PublicInterface<T> = Pick<T, keyof T>;
