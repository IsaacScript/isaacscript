/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface Capsule extends IsaacAPIClass {
  Collide: (otherCapsule: Capsule, point: Vector) => boolean;
  GetDirection: () => Vector;
  GetF1: () => number;
  GetF2: () => number;
  GetPosition: () => Vector;
  GetVec2: () => Vector;
  GetVec3: () => Vector;
}

/**
 * Constructs a new capsule class.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export function Capsule(
  this: void,
  position: Vector,
  direction: number,
  size: number,
): Capsule;
