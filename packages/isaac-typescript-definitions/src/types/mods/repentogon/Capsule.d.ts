declare interface RepentogonCapsule extends IsaacAPIClass {
  Collide: (otherCapsule: RepentogonCapsule, point: Vector) => boolean;
  GetDirection: () => Vector;
  GetF1: () => number;
  GetF2: () => number;
  GetPosition: () => Vector;
  GetVec2: () => Vector;
  GetVec3: () => Vector;
}

/** @customName Capsule */
export function RepentogonCapsule(
  this: void,
  position: Vector,
  direction: number,
  size: number,
): RepentogonCapsule;
