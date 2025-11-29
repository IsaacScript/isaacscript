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
 * @see https://repentogon.com/
 */
declare function Capsule(
  this: void,
  position: Vector,
  sizeMultiplierOrTargetPosition: Vector,
  rotationOrSize: number,
  size?: number,
): Capsule;

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface Capsule extends IsaacAPIClass {
  /**
   * Attempts to trigger a collision between two capsules at a specific position. Returns whether
   * the capsules have collided or not.
   */
  Collide: (capsule1: Capsule, capsule2: Capsule, point: Vector) => boolean;

  /**
   * Returns a unit vector corresponding to the direction the capsule relative to its origin. This
   * takes its rotation and size into account.
   */
  GetDirection: () => Vector;

  /** Returns the end point of the capsule. */
  GetEndPoint: () => Vector;

  /** Returns the capsule's position. */
  GetPosition: () => Vector;

  /** Returns the size of the capsule. */
  GetSize: () => number;

  /** Returns the start point of the capsule. */
  GetStartPoint: () => Vector;

  /** Returns the size difference of the capsule. */
  GetSizeDifference: () => number;

  // DEPRECATED METHODS

  /**
   * Returns the capsule's radius.
   *
   * The original name of this method is `GetF1` as the purpose of the function has remained unknown
   * for some time. When compiling the mod, the compiler will rename this method from "GetRadius" to
   * "GetF1" to prevent errors. REPENTOGON will give these methods proper names in a later update.
   *
   * @customName GetF1
   * @deprecated Use `Capsule.GetSize` instead as REPENTOGON added new methods that accurately
   *             reflect what the capsule does.
   */
  GetRadius: () => number;

  /**
   * Returns the distance between the two endpoints of the capsule.
   *
   * The original name of this method is `GetF2` as the purpose of the function has remained unknown
   * for some time. When compiling the mod, the compiler will rename this method from
   * "GetEndpointsDistance" to "GetF2" to prevent errors. REPENTOGON will give these methods proper
   * names in a later update.
   *
   * @customName GetF2
   * @deprecated Use `Capsule.GetSizeDifference` instead as REPENTOGON added new methods that
   *             accurately reflect what the capsule does.
   */
  GetEndpointsDistance: () => number;

  /**
   * Returns the position of one of the two capsule's endpoints.
   *
   * The original name of this method is `GetVec2` as the purpose of the function has remained
   * unknown for some time. When compiling the mod, the compiler will rename this method from
   * "GetEndpoint1Position" to "GetVec2" to prevent errors. REPENTOGON will give these methods
   * proper names in a later update.
   *
   * @customName GetVec2
   * @deprecated Use `Capsule.GetStartPoint` instead as REPENTOGON added new methods that accurately
   *             reflect what the capsule does.
   */
  GetEndpoint1Position: () => Vector;

  /**
   * Returns the position of one of the two capsule's endpoints.
   *
   * The original name of this method is `GetVec2` as the purpose of the function has remained
   * unknown for some time. When compiling the mod, the compiler will rename this method from
   * "GetEndpoint2Position" to "GetVec3" to prevent errors. REPENTOGON will give these methods
   * proper names in a later update.
   *
   * @customName GetVec3
   * @deprecated Use `Capsule.GetEndPoint` instead as REPENTOGON added new methods that accurately
   *             reflect what the capsule does.
   */
  GetEndpoint2Position: () => Vector;
}
