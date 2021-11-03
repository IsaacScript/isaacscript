declare interface EntityNPC extends Entity {
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
  GetChampionColorIdx(): ChampionColor;
  GetPlayerTarget(): Entity;
  IsBoss(): boolean;
  IsChampion(): boolean;
  KillUnique(): void;
  /**
   * @param seed
   * @param championColor The type of champion to turn this enemy into.
   * (-1 results in a random champion type.)
   * Default is -1.
   * @param init Set to true when called while initializing the enemy, false otherwise.
   * Default is false.
   */
  MakeChampion(
    seed: int,
    championColorIdx?: ChampionColor,
    init?: boolean,
  ): void;
  MakeSplat(size: float): EntityEffect;
  Morph(
    entityType: EntityType | int,
    variant: int,
    subType: int,
    championColorIdx: ChampionColor,
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
  QueryNPCsType(entityType: EntityNPC, variant: int): EntityList;
  ResetPathFinderTarget(): void;

  // EntityNPC.CanShutDoors conflicts with Entity.CanShutDoors(),
  // but the latter is deliberately not implemented so that we can use the property in EntityNPC
  CanShutDoors: boolean;
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
  /**
   * This has a type of `NpcState | int` so that other enums can be used to represent more specific
   * entities.
   */
  State: NpcState | int;
  StateFrame: int;
  V1: Vector;
  V2: Vector;
}

declare namespace EntityNPC {
  /**
   * This function is bugged and returns a read-only version of the EntityNPC class. If you need to
   * mutate the properties of the spider, then you should spawn it with `Isaac.Spawn()` or
   * `Game.Spawn()` instead.
   */
  function ThrowSpider(
    this: void,
    position: Vector,
    spawner: Entity,
    targetPos: Vector,
    big: boolean,
    yOffset: float,
  ): Readonly<EntityNPC>;
}
