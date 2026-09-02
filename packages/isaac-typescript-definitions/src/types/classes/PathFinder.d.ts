declare interface PathFinder extends IsaacAPIClass {
  readonly EvadeTarget: (targetPos: Vector) => void;

  readonly FindGridPath: (
    position: Vector,
    speed: float,
    pathMarker: int,
    useDirectPath: boolean,
  ) => void;

  readonly GetEvadeMovementCountdown: () => int;
  readonly GetGridIndex: () => int;
  readonly HasDirectPath: () => boolean;
  readonly HasPathToPos: (position: Vector, ignorePoop: boolean) => boolean;
  readonly MoveRandomly: (ignoreStatusEffects: boolean) => boolean;
  readonly MoveRandomlyAxisAligned: (
    speed: float,
    ignoreStatusEffects: boolean,
  ) => void;
  readonly MoveRandomlyBoss: (ignoreStatusEffects: boolean) => void;
  readonly Reset: () => void;
  readonly ResetMovementTarget: () => void;
  readonly SetCanCrushRocks: (value: boolean) => void;
  readonly UpdateGridIndex: () => void;
}
