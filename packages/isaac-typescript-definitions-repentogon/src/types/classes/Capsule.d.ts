/**
 * Constructs a new `Capsule` class.
 *
 * Capsules are used by the game for collision detection. All entities have a collision capsule
 * whose shape is defined by their XML markup. Additionally, you can use a null layer frame's size
 * and position in a sprite's animation to generate a null capsule.
 *
 * Null layers are added in the sprite's .anm2 file by setting the type to "Null" when adding a
 * layer. The size and relative position of the null layer is dependant on the position and scale of
 * the frame.
 *
 * You can use `Entity.GetNullCapsule` to generate a capsule of the current frame in a specified
 * null layer.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare function Capsule(
  this: void,
  position: Vector,
  sizeMultiplier: Vector,
  rotation: number,
  size: number,
): Capsule;

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface Capsule extends IsaacAPIClass {
  Collide: (capsule: Capsule, point: Vector) => boolean;
  GetDirection: () => Vector;
  GetF1: () => number;
  GetF2: () => number;
  GetPosition: () => Vector;
  GetVec2: () => Vector;
  GetVec3: () => Vector;
}
