export const DIRECTION_TO_VECTOR: {
  readonly [key in Direction]: Readonly<Vector>;
} = {
  [Direction.NO_DIRECTION]: Vector.Zero, // -1
  [Direction.LEFT]: Vector(-1, 0), // 0
  [Direction.UP]: Vector(0, 1), // 1
  [Direction.RIGHT]: Vector(1, 0), // 2
  [Direction.DOWN]: Vector(0, -1), // 3
};
