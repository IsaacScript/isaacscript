declare class EntityNPC extends Entity {
  AnimWalkFrame(
    horizontalAnim: string,
    verticalAnim: string,
    speedThreshold: float,
  ): void;
  CalcTargetPosition(distanceLimit: float): Vector;
  CanBeDamagedFromVelocity(velocity: Vector): boolean;
  CanReroll(): boolean;
  FireBossProjectiles(
    numProjectiles: int,
    targetPos: Vector,
    trajectoryModifier: float,
    projectileParams: ProjectileParams,
  ): EntityProjectile;
  FireProjectiles(
    position: Vector,
    velocity: Vector,
    projectilesMode: ProjectilesMode,
    projectileParams: ProjectileParams,
  ): void;
  GetAliveEnemyCount(): int;
  GetBossColorIdx(): int;
  GetChampionColorIdx(): ChampionColorIdx;
  GetPlayerTarget(): Entity;
  IsBoss(): boolean;
  IsChampion(): boolean;
  KillUnique(): void;
  /**
   * @param seed
   * @param championColorIdx The type of champion to turn this enemy into
   * (ChampionColorIdx.REGULAR results in a random champion type)
   * @param init Set to true when called while initializing the enemy, false otherwise
   */
  MakeChampion(
    seed: int,
    championColorIdx?: ChampionColorIdx, // Default is ChampionColorIdx.REGULAR
    init?: boolean, // Default is false
  ): void;
  MakeSplat(size: float): EntityEffect;
  Morph(
    entityType: EntityType | int,
    variant: EntityVariantForAC,
    subType: int,
    championColorIdx: ChampionColorIdx,
  ): boolean;
  PlaySound(
    soundEffect: SoundEffect | int,
    volume: float,
    frameDelay: int,
    loop: boolean,
    pitch: float,
  ): void;
  QueryNPCsGroup(groupIdx: int): EntityList;
  QueryNPCsSpawnerType(
    spawnerType: EntityType | int,
    entityType: EntityType | int,
    onlyEnemies: boolean,
  ): EntityList;
  QueryNPCsType(entityType: EntityNPC, variant: EntityVariantForAC): EntityList;
  ResetPathFinderTarget(): void;
  static ThrowSpider(
    this: void,
    position: Vector,
    spawner: Entity,
    targetPos: Vector,
    big: boolean,
    yOffset: float,
  ): void;

  // CanShutDoors: boolean; // Should use CanShutDoors() instead
  readonly ChildNPC: Readonly<EntityNPC>;
  EntityRef: Entity;
  GroupIdx: int;
  I1: int;
  I2: int;
  readonly ParentNPC: Readonly<EntityNPC>;
  Pathfinder: PathFinder;
  ProjectileCooldown: int;
  ProjectileDelay: int;
  Scale: float;
  StateFrame: int;
  State: int;
  V1: Vector;
  V2: Vector;
}
