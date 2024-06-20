import type { ChampionColor } from "../../enums/ChampionColor";
import type { EntityType } from "../../enums/EntityType";
import type { NPCState } from "../../enums/NPCState";
import type { ProjectilesMode } from "../../enums/ProjectilesMode";
import type { SoundEffect } from "../../enums/SoundEffect";

declare global {
  interface EntityNPC extends Entity {
    AnimWalkFrame: (
      horizontalAnim: string,
      verticalAnim: string,
      speedThreshold: float,
    ) => void;

    CalcTargetPosition: (distanceLimit: float) => Vector;
    CanBeDamagedFromVelocity: (velocity: Vector) => boolean;
    CanReroll: () => boolean;

    FireBossProjectiles: (
      numProjectiles: int,
      targetPos: Vector,
      trajectoryModifier: float,
      projectileParams: ProjectileParams,
    ) => EntityProjectile;

    FireProjectiles: (
      position: Vector,
      velocity: Vector,
      projectilesMode: ProjectilesMode,
      projectileParams: ProjectileParams,
    ) => void;

    GetAliveEnemyCount: () => int;
    GetBossColorIdx: () => int;
    GetChampionColorIdx: () => ChampionColor;
    GetPlayerTarget: () => Entity;
    IsBoss: () => boolean;
    IsChampion: () => boolean;
    KillUnique: () => void;

    /**
     * @param seed
     * @param championColor The type of champion to turn this enemy into. (-1 results in a random
     *                      champion type.) Default is -1.
     * @param init Set to true when called while initializing the enemy, false otherwise. Default is
     *             false.
     */
    MakeChampion: (
      seed: Seed,
      championColorIdx?: ChampionColor,
      init?: boolean,
    ) => void;

    MakeSplat: (size: float) => EntityEffect;

    /**
     * Change the NPC into another one.
     *
     * @param entityType
     * @param variant
     * @param subType
     * @param championColorIdx Pass -1 to morph into a non-champion.
     */
    Morph: (
      entityType: EntityType,
      variant: int,
      subType: int,
      championColorIdx: ChampionColor | -1,
    ) => boolean;

    PlaySound: (
      soundEffect: SoundEffect,
      volume: float,
      frameDelay: int,
      loop: boolean,
      pitch: float,
    ) => void;

    QueryNPCsGroup: (groupIdx: int) => EntityList;

    QueryNPCsSpawnerType: (
      spawnerType: EntityType,
      entityType: EntityType,
      onlyEnemies: boolean,
    ) => EntityList;

    QueryNPCsType: (entityType: EntityNPC, variant: int) => EntityList;
    ResetPathFinderTarget: () => void;

    /**
     * The `EntityNPC.CanShutDoors` field conflicts with the `Entity.CanShutDoors` method, but the
     * latter is deliberately not implemented so that we can utilize this field.
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
    State: NPCState;

    StateFrame: int;
    V1: Vector;
    V2: Vector;
  }

  /** @noSelf */
  namespace EntityNPC {
    /**
     * Helper function to spawn an enemy spider. Use this in situations where you want the spider to
     * "jump" out of something.
     *
     * This method returns a read-only version of the `EntityNPC` class. If you need to mutate the
     * properties of the spider, then you can spawn it with `Game.Spawn` instead. Alternatively, you
     * can re-acquire the entity after it has already been spawned.
     *
     * @param position
     * @param spawner
     * @param targetPos
     * @param big If false, will spawn `EntityType.SPIDER` (85). If true, will spawn
     *            `EntityType.BIG_SPIDER` (94).
     * @param yOffset
     */
    function ThrowSpider(
      position: Vector,
      spawner: Entity | undefined,
      targetPos: Vector,
      big: boolean,
      yOffset: float,
    ): Readonly<EntityNPC>;
  }
}
