import { ChampionColor } from "../enums/ChampionColor";
import {
  GaperVariant,
  RaglingVariant,
  SuckerVariant,
} from "../enums/collections/variants";
import { EntityType } from "../enums/EntityType";
import { NpcState } from "../enums/NpcState";
import { ProjectilesMode } from "../enums/ProjectilesMode";
import { SoundEffect } from "../enums/SoundEffect";

declare global {
  interface EntityNPC extends Entity {
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
     * @param championColor The type of champion to turn this enemy into. (-1 results in a random
     *                      champion type.) Default is -1.
     * @param init Set to true when called while initializing the enemy, false otherwise. Default is
     *             false.
     */
    MakeChampion(
      seed: Seed,
      championColorIdx?: ChampionColor,
      init?: boolean,
    ): void;

    MakeSplat(size: float): EntityEffect;

    /**
     * Change the NPC into another one.
     *
     * @param entityType
     * @param variant
     * @param subType
     * @param championColorIdx Pass -1 to morph into a non-champion.
     */
    Morph(
      entityType: EntityType,
      variant: int,
      subType: int,
      championColorIdx: ChampionColor,
    ): boolean;

    PlaySound(
      soundEffect: SoundEffect,
      volume: float,
      frameDelay: int,
      loop: boolean,
      pitch: float,
    ): void;

    QueryNPCsGroup(groupIdx: int): EntityList;

    QueryNPCsSpawnerType(
      spawnerType: EntityType,
      entityType: EntityType,
      onlyEnemies: boolean,
    ): EntityList;

    QueryNPCsType(entityType: EntityNPC, variant: int): EntityList;
    ResetPathFinderTarget(): void;

    /**
     * The `EntityNPC.CanShutDoors` property conflicts with the `Entity.CanShutDoors` method, but
     * the latter is deliberately not implemented so that we can utilize the property.
     */
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
    State: NpcState;

    StateFrame: int;
    V1: Vector;
    V2: Vector;
  }

  namespace EntityNPC {
    /**
     * This function is bugged and returns a read-only version of the EntityNPC class. If you need
     * to mutate the properties of the spider, then you should spawn it with `Isaac.Spawn` or
     * `Game.Spawn` instead.
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

  /** For EntityType.GAPER (10) */
  interface EntityNPCGaper extends EntityNPC {
    Type: EntityType.GAPER;
    Variant: GaperVariant;
  }

  /** For EntityType.SUCKER (61) */
  interface EntityNPCSucker extends EntityNPC {
    Type: EntityType.SUCKER;
    Variant: SuckerVariant;
  }

  /** For EntityType.RAGLING (246) */
  interface EntityNPCRagling extends EntityNPC {
    Type: EntityType.RAGLING;
    Variant: RaglingVariant;
  }
}
