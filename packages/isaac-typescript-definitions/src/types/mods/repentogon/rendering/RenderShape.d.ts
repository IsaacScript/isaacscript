import type { Capsule } from "../Capsule";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface RenderShape {
    GetTimeout: () => int;
    SetTimeout: (timeout: int) => void;

    /** Assigns a capsule collider to the shape. */
    Capsule: (capsule: Capsule) => void;
  }
}
