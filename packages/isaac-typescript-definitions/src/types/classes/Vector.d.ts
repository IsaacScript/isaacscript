import type { CopyableIsaacAPIClassType } from "../../enums/CopyableIsaacAPIClassType";

declare global {
  interface Vector extends IsaacAPIClass {
    readonly Clamp: (minX: float, minY: float, maxX: float, maxY: float) => void;
    readonly Clamped: (minX: float, minY: float, maxX: float, maxY: float) => Vector;
    readonly Cross: (secondVector: Vector) => float;
    readonly Distance: (secondVector: Vector) => float;
    readonly DistanceSquared: (secondVector: Vector) => float;
    readonly Dot: (secondVector: Vector) => float;

    /**
     * This method returns a value from -180 to 180.
     *
     * Note that this function considers 0 degrees to be pointing to the right, which is unusual
     * because 0 normally corresponds to up.
     *
     * - Right: 0
     * - Up: -90
     * - Left: 180
     * - Down: 90
     */
    readonly GetAngleDegrees: () => float;

    readonly Length: () => float;
    readonly LengthSquared: () => float;
    readonly Lerp: (secondVector: Vector, t: float) => Vector;
    readonly Normalize: () => void;
    readonly Normalized: () => Vector;
    readonly Resize: (newLength: float) => void;
    readonly Resized: (newLength: float) => Vector;
    readonly Rotated: (angleDegrees: float) => Vector;

    X: float;
    Y: float;

    /** An identifier that does not exist at run-time. */
    __kind: CopyableIsaacAPIClassType.VECTOR;

    // The underscore methods like `__add` are not implemented in favor of having `add` and so on.
    // https://typescripttolua.github.io/docs/advanced/language-extensions/#operator-map-types

    readonly add: LuaAdditionMethod<Vector, Vector>;

    /**
     * Vector multiplication was extended to allow numbers or vectors in Repentance. However, this
     * functionality does not apply to division.
     */
    readonly div: LuaDivisionMethod<number, Vector>;

    /** Vector multiplication was extended to allow numbers or vectors in Repentance. */
    readonly mul: LuaMultiplicationMethod<number | Vector, Vector>;

    readonly sub: LuaSubtractionMethod<Vector, Vector>;
  }

  function Vector(this: void, x: float, y: float): Vector;

  /** @noSelf */
  namespace Vector {
    function FromAngle(angleDegrees: float): Vector;

    // The `One` and `Zero` constants are deliberately not implemented, since they are unsafe. See
    // the `VectorOne` and `VectorZero` constants.
  }
}
