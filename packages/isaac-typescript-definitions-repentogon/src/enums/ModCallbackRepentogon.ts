/**
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export enum ModCallbackRepentogon {
  /**
   * A modified version of `ModCallback.POST_USE_PILL`. This callback provides a `PillColor`
   * parameter.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PillEffect` provided.
   *
   * ```ts
   * function postUsePill(
   *   effect: PillEffect,
   *   player: EntityPlayer,
   *   flags: BitFlags<UseFlag>,
   *   color: PillColor)
   * : void {}
   * ```
   */
  POST_USE_PILL = 10,

  /**
   * A modified version of `ModCallback.ENTITY_TAKE_DMG`. This callback now allows an interface to
   * be returned to further modify how the entity takes damage.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preEntityTakeDmg(
   *   entity: Entity,
   *   damage: number,
   *   damageFlags: BitFlags<DamageFlag>,
   *   source: EntityRef,
   *   damageCountdown: int
   * ):
   *   | boolean
   *   | {
   *       Damage?: number;
   *       DamageFlags?: BitFlags<DamageFlag>;
   *       DamageCountdown?: number;
   *     }
   *   | undefined {}
   * ```
   */
  PRE_ENTITY_TAKE_DMG = 11,

  /**
   * A modified version of `ModCallback.PRE_FAMILIAR_COLLISION`. This callback now allows an
   * interface to be returned to further modify the collision behavior.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function preFamiliarCollision(
   *   familiar: EntityFamiliar,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   *   ```
   */
  PRE_FAMILIAR_COLLISION = 26,

  /**
   * A modified version of `ModCallback.PRE_NPC_COLLISION`. This callback now allows an interface to
   * be returned to further modify the collision behavior.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCCollision(
   *   npc: EntityNPC,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   *   ```
   */
  PRE_NPC_COLLISION = 30,

  /**
   * A modified version of `ModCallback.PRE_PLAYER_COLLISION`. This callback now allows an interface
   * to be returned to further modify the collision behavior.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerCollision(
   *   player: EntityPlayer,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   *   ```
   */
  PRE_PLAYER_COLLISION = 33,

  /**
   * A modified version of `ModCallback.PRE_PICKUP_COLLISION`. This callback now allows an interface
   * to be returned to further modify the collision behavior.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupCollision(
   *   pickup: EntityPickup,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   *   ```
   */
  PRE_PICKUP_COLLISION = 38,

  /**
   * A modified version of `ModCallback.PRE_TEAR_COLLISION`. This callback now allows an interface
   * to be returned to further modify the collision behavior.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function preTearCollision(
   *   tear: EntityTear,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   *   ```
   */
  PRE_TEAR_COLLISION = 42,

  /**
   * A modified version of `ModCallback.PRE_PROJECTILE_COLLISION`. This callback now allows an
   * interface to be returned to further modify the collision behavior.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function preProjectileCollision(
   *   projectile: EntityProjectile,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_PROJECTILE_COLLISION = 46,

  /**
   * A modified version of `ModCallback.PRE_KNIFE_COLLISION`. This callback now allows an interface
   * to be returned to further modify the collision behavior.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   *
   * ```ts
   * function preKnifeCollision(
   *   knife: EntityKnife,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_KNIFE_COLLISION = 53,

  /**
   * A modified version of `ModCallback.PRE_BOMB_COLLISION`. This callback now allows an interface
   * to be returned to further modify the collision behavior.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function preBombCollision(
   *   bomb: EntityBomb,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_BOMB_COLLISION = 60,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function preAddCollectible(
   *   collectible: CollectibleType,
   *   charge: int,
   *   firstTime: boolean,
   *   slot: ActiveSlot,
   *   varData: int,
   *   player: EntityPlayer,
   * ):
   *   | boolean
   *   | {
   *       Type?: CollectibleType;
   *       Charge?: int;
   *       FirstTime?: boolean;
   *       Slot?: ActiveSlot;
   *       VarData?: int;
   *       Player?: EntityPlayer;
   *     }
   *   | CollectibleType
   *   | undefined {}
   *   ```
   */
  PRE_ADD_COLLECTIBLE = 1004,

  /**
   * Use this over Isaacscript-Common's `ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED` callback
   * as this is a lot more optimized.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function postAddCollectible(
   *   collectible: CollectibleType,
   *   charge: int,
   *   firstTime: boolean,
   *   slot: ActiveSlot,
   *   varData: int,
   *   player: EntityPlayer,
   * ): void {}
   *   ```
   */
  POST_ADD_COLLECTIBLE = 1005,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Challenge` provided.
   *
   * ```ts
   * function postChallengeDone(challenge: Challenge): void {}
   */

  /**
   * Returning a Dimension that does not exist in the current floor will crash the game.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preChangeRoom(
   *   targetRoomIndex: int,
   *   dimension: Dimension
   * ): { TargetRoomIdx?: int, Dimension?: Dimension } | undefined {}
   * ```
   */
  PRE_CHANGE_ROOM = 1061,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function preBombRender(bomb: EntityBomb, offset: Vector): VectoR | boolean | undefined {}
   * ```
   */
  PRE_BOMB_RENDER = 1088,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preBackdropRenderWalls(): void {}
   * ```
   */
  PRE_BACKDROP_RENDER_WALLS = 1106,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preBackdropRenderFloor(): void {}
   * ```
   */
  PRE_BACKDROP_RENDER_FLOOR = 1107,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preBackdropRenderWater(): void {}
   * ```
   */
  PRE_BACKDROP_RENDER_WATER = 1108,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postBackdropPreRenderWalls(): void {}
   * ```
   */
  POST_BACKDROP_PRE_RENDER_WALLS = 1109,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preBackdropChange(backdrop: BackdropType): BackdropType {}
   * ```
   */
  PRE_BACKDROP_CHANGE = 1141,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function postBombCollision(bomb: EntityBomb, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_BOMB_COLLISION = 1237,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Challenge` provided.
   *
   * ```ts
   * function preChallengeDone(challenge: Challenge, player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_CHALLENGE_DONE = 1471,
}
