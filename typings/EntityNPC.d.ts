declare class EntityNPC extends Entity {
  Morph(
    entityType: int,
    variant: int,
    subType: int,
    championColorIdx: int,
  ): boolean;
  KillUnique(): void;
  IsBoss(): boolean;
  GetPlayerTarget(): Entity;
  CalcTargetPosition(distanceLimit: float): Vector;
  GetBossColorIdx(): int;
  GetChampionColorIdx(): int;
  ResetPathFinderTarget(): void;
  CanBeDamagedFromVelocity(velocity: Vector): boolean;
  CanReroll(): boolean;
  IsChampion(): boolean;
  MakeChampion(seed: int): void;
  PlaySound(
    soundEffect: int,
    volume: float,
    frameDelay: int,
    loop: boolean,
    pitch: float,
  ): void;
  MakeSplat(size: float): EntityEffect;
  GetAliveEnemyCount(): int;
  FireProjectiles(
    position: Vector,
    velocity: Vector,
    projectilesMode: ProjectilesMode,
    projectileParams: ProjectileParams,
  ): void;
  FireBossProjectiles(
    numProjectiles: int,
    targetPos: Vector,
    trajectoryModifier: float,
    projectileParams: ProjectileParams,
  ): EntityProjectile;
  AnimWalkFrame(
    horizontalAnim: string,
    verticalAnim: string,
    speedThreshold: float,
  ): void;
  QueryNPCsType(entityType: int, variant: int): EntityList;
  QueryNPCsSpawnerType(
    spawnerType: int,
    entityType: int,
    onlyEnemies: boolean,
  ): EntityList;
  QueryNPCsGroup(groupIdx: int): EntityList;

  /** @noSelf */
  static ThrowSpider(
    position: Vector,
    spawner: Entity,
    targetPos: Vector,
    big: boolean,
    yOffset: float,
  ): void;

  Scale: float;
  readonly ParentNPC: Readonly<EntityNPC>;
  readonly ChildNPC: Readonly<EntityNPC>;
  EntityRef: Entity;
  StateFrame: int;
  Pathfinder: PathFinder;
  State: int;
  ProjectileCooldown: int;
  ProjectileDelay: int;
  V1: Vector;
  V2: Vector;
  I1: int;
  I2: int;
  GroupIdx: int;
}
