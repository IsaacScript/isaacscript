declare class PathFinder {
  Reset(): void;
  MoveRandomly(ignoreStatusEffects: boolean): boolean;
  MoveRandomlyBoss(ignoreStatusEffects: boolean): void;
  MoveRandomlyAxisAligned(speed: float, ignoreStatusEffects: boolean): void;
  FindGridPath(
    position: Vector,
    speed: float,
    pathMarker: int,
    useDirectPath: boolean,
  ): void;
  HasPathToPos(position: Vector, ignorePoop: boolean): boolean;
  HasDirectPath(): boolean;
  EvadeTarget(targetPos: Vector): void;
  GetEvadeMovementCountdown(): int;
  ResetMovementTarget(): void;
  UpdateGridIndex(): void;
  GetGridIndex(): int;
  SetCanCrushRocks(value: boolean): void;
}
