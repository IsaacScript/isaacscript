declare interface PathFinder extends IsaacAPIClass {
  EvadeTarget: (targetPos: Vector) => void;

  FindGridPath: (
    position: Vector,
    speed: float,
    pathMarker: int,
    useDirectPath: boolean,
  ) => void;

  GetEvadeMovementCountdown: () => int;
  GetGridIndex: () => int;
  HasDirectPath: () => boolean;
  HasPathToPos: (position: Vector, ignorePoop: boolean) => boolean;
  MoveRandomly: (ignoreStatusEffects: boolean) => boolean;
  MoveRandomlyAxisAligned: (speed: float, ignoreStatusEffects: boolean) => void;
  MoveRandomlyBoss: (ignoreStatusEffects: boolean) => void;
  Reset: () => void;
  ResetMovementTarget: () => void;
  SetCanCrushRocks: (value: boolean) => void;
  UpdateGridIndex: () => void;
}
