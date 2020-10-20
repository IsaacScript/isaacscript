declare class EntityFamiliar extends Entity {
  AddCoins(value: int): void;
  AddHearts(hearts: int): void;
  AddKeys(keys: int): void;
  PickEnemyTarget(maxDistance: float, frameInterval: int): void;
  FollowParent(): void;
  FollowPosition(position: Vector): void;
  GetOrbitPosition(position: Vector): Vector;
  Shoot(): void;
  FireProjectile(direction: Vector): EntityTear;
  PlayChargeAnim(direction: Direction): void;
  PlayShootAnim(direction: Direction): void;
  PlayFloatAnim(direction: Direction): void;
  MoveDelayed(numFrames: int): void;
  MoveDiagonally(speed: float): void;
  RecalculateOrbitOffset(layer: int, add: boolean): int;
  AddToFollowers(): void;
  AddToDelayed(): void;
  AddToOrbit(layer: int): void;
  RemoveFromFollowers(): void;
  RemoveFromDelayed(): void;
  RemoveFromOrbit(): void;

  Player: EntityPlayer;
  Coins: int;
  Hearts: int;
  Keys: int;
  FireCooldown: int;
  HeadFrameDelay: int;
  MoveDirection: Direction;
  ShootDirection: Direction;
  LastDirection: Direction;
  OrbitAngleOffset: float;
  OrbitDistance: Vector;
  State: int;
  RoomClearCount: int;
}
