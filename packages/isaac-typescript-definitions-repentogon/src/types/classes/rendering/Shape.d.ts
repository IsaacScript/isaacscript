/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface Shape extends IsaacAPIClass {
  readonly Circle: (pos: Vector, size: number) => void;
  readonly GetTimeout: () => int;
  readonly SetTimeout: (timeout: int) => void;

  /** Assigns a capsule collider to the shape. */
  readonly Capsule: (capsule: Capsule) => void;
}
