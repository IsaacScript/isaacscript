import type {
  BackdropType,
  ControllerIndex,
  ProjectilesMode,
  RockSpiderVariant,
  TearFlag,
} from "isaac-typescript-definitions";

declare global {
  interface EntityNPC extends Entity {
    /**
     * @param position
     * @param flags
     * @param source Optional. Default is undefined.
     * @param damage Optional. Default is 3.5.
     */
    readonly ApplyTearflagEffects: (
      position: Vector,
      flags: BitFlags<TearFlag>,
      source?: Entity,
      damage?: number,
    ) => void;

    /** Clears the flying override set by `EntityNPC.SetFlyingOverride`. */
    readonly ClearFlyingOverride: () => void;

    /**
     * Behaves the same as `EntityNPC.FireBossProjectiles` except it returns an array of the
     * projectiles fired.
     */
    readonly FireBossProjectilesEx: (
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
    readonly FireGridEntity: (
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
    readonly FireProjectilesEx: (
      position: Vector,
      velocity: Vector,
      mode: ProjectilesMode,
      params: ProjectileParams,
    ) => EntityProjectile[];

    /** Returns the NPC's `ControllerIndex`, which indicates a player is controlling it. */
    readonly GetControllerId: () => ControllerIndex;

    /**
     * Returns the number of frames until the NPC regenerates back to normal if it is currently a
     * pile of goo. This is only for dark red champions.
     */
    readonly GetDarkRedChampionRegenTimer: () => int;

    /** Returns the NPC's dynamic dirt color. */
    readonly GetDirtColor: () => Color;

    /** Returns a unique `LootList` used by fireplaces when they are extinguished. */
    readonly GetFireplaceLoot: () => LootList;

    /** Returns whether the NPC's flying override was set. */
    readonly GetFlyingOverride: () => boolean;

    /** Returns an array of entity indexes that the NPC is hitting. */
    readonly GetHitList: () => int[];

    /**
     * Returns the NPC's pathfinder with fixed bindings.
     *
     * Due to a bug with the vanilla API, accessing the NPC's pathfinder through the
     * `EntityNPC.Pathfinder` field returns a version of the Pathfinder with broken bindings,
     * leading to multiple methods not working as intended, such as some function arguments not
     * working at all.
     *
     * To not break existing mods, the Pathfinder object returned from the `Pathfinder` field is
     * unchanged, so you should use `EntityNPC.GetPathfinder` whenever possible.
     */
    readonly GetPathfinder: () => PathFinder;

    /** Returns the NPC's shield strength/armor. */
    readonly GetShieldStrength: () => number;

    /** Returns a unique `LootList` used by Shopkeepers when they are blown up. */
    readonly GetShopkeeperLoot: () => LootList;

    readonly GetSirenPlayerEntity: () => EntityPlayer | undefined;

    /** Returns whether the entity has a boss champion color. */
    readonly IsBossColor: () => boolean;

    /**
     * Changes the ".png" file associated with a specific layer of the NPC's sprite.
     *
     * The game will append "_champion" and the stage suffix to the PNG file's path if possible. If
     * this behavior is not desired, use `Sprite.ReplaceSpritesheet` instead.
     *
     * This does not change any layers other than the one that is explicitly specified.
     *
     * After replacing a spritesheet, you must call the `Sprite.LoadGraphics` method afterwards if
     * the `loadGraphics` argument is not true.
     *
     * @param layerID
     * @param pngPath The full path to the PNG file. For example:
     * "gfx/items/collectibles/questionmark.png"
     * @param loadGraphics Optional. If true, `Sprite.LoadGraphics()` is immediately fired. Default
     *                     is false.
     */
    readonly ReplaceSpritesheet: (
      layerID: int,
      pngPath: string,
      loadGraphics?: boolean,
    ) => void;

    /**
     * Sets the NPC's `ControllerIndex`, which allows a player to control it. If the controller
     * index is `ControllerIndex.NONE`, the NPC will continue its normal behavior.
     */
    readonly SetControllerId: (index: ControllerIndex) => void;

    /**
     * Applies an override to the return value of the `EntityNPC.IsFlying` method, which is normally
     * based on the entity's `GridCollisionClass` property.
     *
     * This method can be used to make grounded enemies ignore creep or flying enemies take damage
     * from creep.
     */
    readonly SetFlyingOverride: (override: boolean) => void;

    /** Sets the NPC's shield strength/armor. */
    readonly SetShieldStrength: (strength: number) => void;

    /**
     * Spawns a blood cloud effect.
     *
     * @param position Optional. Default is the entity's current position.
     * @param color Optional. Default is `ColorDefault`.
     */
    readonly SpawnBloodCloud: (position?: Vector, color?: Color) => EntityEffect;

    /** Spawns a blood splash effect. */
    readonly SpawnBloodSplash: () => void;

    /**
     * Attempts to change the NPC's target. This is used by Lost Fly to force NPCs to target it.
     * Returns whether the NPCs target changed successfully.
     */
    readonly TryForceTarget: (target: Entity, duration: int) => boolean;

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
    readonly TrySplit: (
      defaultDamage: number,
      source: EntityRef,
      doScreenEffects?: boolean,
    ) => boolean;

    /**
     * Attempts to throw the NPC. Returns whether the NPC was thrown.
     *
     * @param source
     * @param direction
     * @param force This is only used by `EntityNPC` poops.
     */
    readonly TryThrow: (source: EntityRef, direction: Vector, force: number) => boolean;

    /**
     * Updates the NPC's dirt color.
     *
     * @param immediate If true, the dirt color will be set to exactly what is beneath the entity.
     *                  Otherwise, it will be updated smoothly over the course of multiple frames.
     */
    readonly UpdateDirtColor: (immediate: boolean) => void;
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
      source: Entity | undefined,
      target: Vector,
      yPosOffset?: number,
      big?: number,
    ): EntityNPC;

    /**
     * @param origin
     * @param target
     * @param yOffset Optional. Default is -10.
     * @param fallSpeed Optional. Default is -8.
     */
    function ThrowMaggot(
      origin: Vector,
      target: Vector,
      yOffset?: number,
      fallSpeed?: number,
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
      source: Entity | undefined,
      velocity: Vector,
      variant?: RockSpiderVariant,
      yPosOffset?: number,
    ): EntityNPC;

    function ThrowStrider(
      position: Vector,
      source: Entity | undefined,
      target: Vector,
    ): EntityNPC;
  }
}
