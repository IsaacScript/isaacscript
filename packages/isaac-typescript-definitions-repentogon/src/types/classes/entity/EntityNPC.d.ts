import type {
  BackdropType,
  ControllerIndex,
  ProjectilesMode,
  RockSpiderVariant,
} from "isaac-typescript-definitions";

declare global {
  interface EntityNPC extends Entity {
    /** Clears the flying override set by `EntityNPC.SetFlyingOverride`. */
    ClearFlyingOverride: () => void;

    /**
     * Behaves the same as `EntityNPC.FireProjectiles` except it returns an array of the projectiles
     * fired.
     */
    FireBossProjectilesEx: (
      numProjectiles: int,
      targetPos: Vector,
      trajectoryModifier: number,
      params: ProjectileParams,
    ) => EntityProjectile[];

    /**
     * Fires a grid entity.
     *
     * @param sprite
     * @param desc
     * @param velocity
     * @param backdrop Optional. Default is `BackdropType.BASEMENT`.
     */
    FireGridEntity: (
      sprite: Sprite,
      desc: GridEntityDesc,
      velocity: Vector,
      backdrop?: BackdropType,
    ) => EntityProjectile;

    /**
     * Behaves the same as `EntityNPC.FireProjectilesEX` except it returns an array of the
     * projectiles fired.
     *
     * Use this over Isaacscript Common's `fireProjectiles` function as it's significantly more
     * optimized and safe.
     */
    FireProjectilesEx: (
      position: Vector,
      velocity: Vector,
      mode: ProjectilesMode,
      params: ProjectileParams,
    ) => EntityProjectile[];

    /**
     * Returns the NPC's boss color index, as specified in `bosscolors.xml`. Returns -1 if the NPC
     * is not a boss or if the boss color index is not defined.
     */
    GetBossColorIdx: () => int;

    /** Returns the NPC's `ControllerIndex`, which indicates a player is controlling it. */
    GetControllerId: () => ControllerIndex;

    /**
     * Returns the number of frames until the NPC regenerates back to normal if it is currently a
     * pile of goo. This is only for dark red champions.
     */
    GetDarkRedChampionRegenTimer: () => int;

    /** Returns the NPC's dynamic dirt color. */
    GetDirtColor: () => Color;

    GetFireplaceLoot: () => LootList;

    GetHitList: () => int[];

    /** Returns the NPC's shield strength/armor. */
    GetShieldStrength: () => number;

    GetShopkeeperLoot: () => LootList;

    GetSirenPlayerEntity: () => EntityPlayer | undefined;
    IsBossColor: () => boolean;

    /**
     * Sets the NPC's `ControllerIndex`, which allows a player to control it. If the controller
     * index is `ControllerIndex.NONE`, the NPC will continue its normal behavior.
     */
    SetControllerId: (index: ControllerIndex) => void;

    /**
     * Applies an override to the return value of the `EntityNPC.IsFlying` method, which is normally
     * based on the entity's `GridCollisionClass` property.
     *
     * This method can be used to make grounded enemies ignore creep or flying enemies take damage
     * from creep.
     */
    SetFlyingOverride: (override: boolean) => void;

    /** Sets the NPC's shield strength/armor. */
    SetShieldStrength: (strength: number) => void;

    /** Spawns a blood cloud effect. */
    SpawnBloodCloud: (position: Vector, color: Color) => EntityEffect;

    /** Spawns a blood splash effect. */
    SpawnBloodSplash: () => void;

    /**
     * Attempts to change the NPC's target. This is used by Lost Fly to force NPCs to target it.
     * Returns whether the NPCs target changed successfully.
     */
    TryForceTarget: (target: Entity, duration: int) => void;

    /**
     * Attempts to split the NPC in half. This is used by the Meat Cleaver collectible when
     * activated.
     *
     * Returns whether the NPC was split successfully.
     *
     * This method currently has a bug where calling `TrySplit` repeatedly on a NPC that can no
     * longer be split any further will still return true.
     *
     * @param defaultDamage
     * @param source
     * @param doScreenEffects Optional. If true, the split sound effect is played and the screen
     *                        shakes. Default is false.
     */
    TrySplit: (
      defaultDamage: number,
      source: EntityRef,
      doScreenEffects?: boolean,
    ) => boolean;

    TryThrow: (source: EntityRef, direction: Vector, force: number) => boolean;

    /**
     * Updates the NPC's dirt color.
     *
     * @param immediate If true, the dirt color will be set to exactly what is beneath the entity.
     *                  Otherwise, it will be updated smoothly over the course of multiple frames.
     */
    UpdateDirtColor: (immediate: boolean) => void;
  }

  /** @noSelf */
  namespace EntityNPC {
    /**
     * Shoots a maggot projectile in the same way a Level 2 Horf shoot them.
     *
     * @param origin
     * @param target
     * @param fallingSpeed Optional. Default is -8.
     * @param yOffset Optional. The smaller the yOffset is, the higher the maggot is from the
     *                ground. Default is -24.
     */
    function ShootMaggotProjectile(
      origin: Vector,
      target: Vector,
      fallingSpeed?: number,
      yOffset?: number,
    ): EntityNPC;

    /**
     * @param origin
     * @param source
     * @param target
     * @param yPosOffset Optional. Default is -10.
     * @param big Optional. Default is false.
     */
    function ThrowLeech(
      origin: Vector,
      source: Entity,
      target: Vector,
      yPosOffset?: number,
      big?: number,
    ): EntityNPC;

    /**
     * @param origin
     * @param target
     * @param yOffset Optional. Default is -8.
     */
    function ThrowMaggotAtPos(
      origin: Vector,
      target: Vector,
      yOffset?: number,
    ): EntityNPC;

    /**
     * @param position
     * @param source
     * @param velocity
     * @param variant Optional. Default is `RockSpiderVariant.ROCK_SPIDER`.
     * @param yPosOffset Optional. Default is -10.
     */
    function ThrowRockSpider(
      position: Vector,
      source: Entity,
      velocity: Vector,
      variant?: RockSpiderVariant,
      yPosOffset?: number,
    ): EntityNPC;

    function ThrowStrider(
      position: Vector,
      source: Entity,
      target: Vector,
    ): EntityNPC;
  }
}
