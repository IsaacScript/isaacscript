declare class EntityFamiliar extends Entity {
  AddCoins(value: int): void;
  AddHearts(hearts: int): void;
  AddKeys(keys: int): void;
  AddToDelayed(): void;
  AddToFollowers(): void;
  AddToOrbit(layer: int): void;
  FireProjectile(direction: Vector): EntityTear;
  FollowParent(): void;
  FollowPosition(position: Vector): void;
  static GetOrbitDistance(this: void, layer: int): Vector;
  GetOrbitPosition(position: Vector): Vector;
  MoveDelayed(numFrames: int): void;
  MoveDiagonally(speed: float): void;
  /**
   * @param maxDistance
   * @param frameInterval
   * @param flags
   * A combination of the following flags (none of these are set by default):
   * 1: Allow switching to a better target even if we already have one
   * 2: Don't prioritize enemies that are close to our owner
   * 4: Prioritize enemies with higher HP
   * 8: Prioritize enemies with lower HP
   * 16: Give lower priority to our current target
   * (this makes us more likely to switch between targets)
   * @param coneDir
   * If ~= Vector.Zero, searches for targets in a cone pointing in this direction.
   * @param coneAngle
   * If ConeDir ~= Vector.Zero, sets the half angle of the search cone in degrees
   * (45 results in a search angle of 90 degrees).
   */
  PickEnemyTarget(
    maxDistance: float,
    frameInterval?: int, // Default is 13
    flags?: int, // Default is 0
    coneDir?: Vector, // Default is Vector.Zero
    coneAngle?: float, // Default is 15
  ): void;
  PlayChargeAnim(direction: Direction): void;
  PlayFloatAnim(direction: Direction): void;
  PlayShootAnim(direction: Direction): void;
  RecalculateOrbitOffset(layer: int, add: boolean): int;
  RemoveFromDelayed(): void;
  RemoveFromFollowers(): void;
  RemoveFromOrbit(): void;
  Shoot(): void;

  Coins: int;
  FireCooldown: int;
  HeadFrameDelay: int;
  Hearts: int;
  Keys: int;
  LastDirection: Direction;
  MoveDirection: Direction;
  OrbitAngleOffset: float;
  OrbitDistance: Vector;
  Player: EntityPlayer;
  RoomClearCount: int;
  ShootDirection: Direction;
  State: int;
}
