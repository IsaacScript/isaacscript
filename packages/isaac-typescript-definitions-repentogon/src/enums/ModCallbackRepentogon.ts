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
   *   color: PillColor
   * ): void {}
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
   *       DamageCountdown?: int;
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
   * ```
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
   * ```
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
   * ```
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
   * ```
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
   * ```
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
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postEntityTakeDmg(
   *   entity: Entity,
   *   damage: number,
   *   flags: BitFlags<DamageFlag>
   *   source: EntityRef,
   *   damageCountdown: int
   * ): void {}
   */
  POST_ENTITY_TAKE_DMG = 1006,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerRender(
   *   player: EntityPlayer,
   *   damage: number,
   *   flags: BitFlags<DamageFlag>
   *   source: EntityRef,
   *   damageCountdown: int
   * ): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_TAKE_DMG = 1008,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `AddHealthTypeFlag` provided.
   *
   * ```ts
   * function prePlayerAddHearts(
   *   player: EntityPlayer,
   *   amount: int,
   *   addHealthTypeFlag: AddHealthTypeFlag,
   *   optionalArg: boolean
   * ): int | undefined {}
   * ```
   */
  PRE_PLAYER_ADD_HEARTS = 1009,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `AddHealthTypeFlag` provided.
   *
   * ```ts
   * function postPlayerAddHearts(
   *   player: EntityPlayer,
   *   amount: int,
   *   addHealthTypeFlag: AddHealthTypeFlag,
   *   optionalArg: boolean
   * ): void {}
   * ```
   */
  POST_PLAYER_ADD_HEARTS = 1010,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridRockDestroy(
   *   rock: GridEntityRock,
   *   gridEntityType: GridEntityType,
   *   immediate: boolean
   * ): void {}
   * ```
   */
  POST_GRID_ROCK_DESTROY = 1011,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridHurtDamage(
   *   gridEntity: GridEntity,
   *   entity: Entity,
   *   damageAmount: number,
   *   damageFlags: BitFlags<DamageFlag>,
   *   unknownFloat: float,
   *   unknownBoolean: boolean
   * ): boolean | undefined {}
   * ```
   */
  PRE_GRID_HURT_DAMAGE = 1012,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridHurtDamage(
   *   gridEntity: GridEntity,
   *   entity: Entity,
   *   damageAmount: number,
   *   damageFlags: BitFlags<DamageFlag>,
   *   unknownFloat: number,
   *   unknownBoolean: boolean
   * ): void {}
   * ```
   */
  POST_GRID_HURT_DAMAGE = 1013,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preHUDUpdate(): void {}
   * ```
   */
  PRE_HUD_UPDATE = 1020,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postHUDUpdate(): void {}
   * ```
   */
  POST_HUD_UPDATE = 1021,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preHUDRender(): void {}
   * ```
   */
  PRE_HUD_RENDER = 1022,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postMainMenuRender(): void {}
   * ```
   */
  POST_MAIN_MENU_RENDER = 1023,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postHUDRender(): void {}
   * ```
   */
  POST_HUD_RENDER = 1024,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SoundEffect` provided.
   *
   * ```ts
   * function preSFXPlay(
   *   sound: SoundEffect,
   *   volume: number,
   *   frameDelay: int,
   *   loop: boolean,
   *   pitch: number,
   *   pan: number
   * ): SoundEffect | [SoundEffect, number, int, boolean, number, number] | boolean | undefined {}
   * ```
   */
  PRE_SFX_PLAY = 1030,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SoundEffect` provided.
   *
   * ```ts
   * function postSFXPlay(
   *   sound: SoundEffect,
   *   volume: number,
   *   frameDelay: int,
   *   loop: boolean,
   *   pitch: number,
   *   pan: number
   * ): void {}
   * ```
   */
  POST_SFX_PLAY = 1031,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Music` provided.
   *
   * ```ts
   * function preMusicPlay(
   *   music: Music,
   *   volumeOrFadeRate: float,
   *   isFade: boolean
   * ): Music | { ID?: Music, Volume?: float, FadeRate?: float } | boolean | undefined {}
   * ```
   */
  PRE_MUSIC_PLAY = 1034,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Music` provided.
   *
   * ```ts
   * function preMusicLayerToggle(music: Music, enabled: boolean): boolean | Music | undefined {}
   * ```
   */
  PRE_MUSIC_LAYER_TOGGLE = 1035,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preRenderPlayerHead(
   *   player: EntityPlayer,
   *   renderPos: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_RENDER_PLAYER_HEAD = 1038,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preRenderPlayerBody(
   *   player: EntityPlayer,
   *   renderPos: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_RENDER_PLAYER_BODY = 1039,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preEntityThrow(
   *   throwingPlayer: EntityPlayer,
   *   heldEntity: Entity,
   *   velocity: Vector
   * ): Vector | undefined {}
   * ```
   */
  PRE_ENTITY_THROW = 1040,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postEntityThrow(
   *   throwingPlayer: EntityPlayer,
   *   heldEntity: Entity,
   *   velocity: Vector
   * ): void {}
   * ```
   */
  POST_ENTITY_THROW = 1041,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerInitLevelStats(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_INIT_LEVEL_STATS = 1042,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preRoomExit(player: EntityPlayer, newLevel: boolean): void {}
   * ```
   */
  PRE_ROOM_EXIT = 1043,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preCompletionMarkGet(
   *   completion: CompletionType,
   *   playerType: PlayerType
   *  ): boolean | undefined {}
   */
  PRE_COMPLETION_MARK_GET = 1047,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postCompletionMarkGet(completion: CompletionType, playerType: PlayerType): void {}
   */
  POST_COMPLETION_MARK_GET = 1048,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preCompletionEvent(completion: CompletionType): boolean | undefined {}
   * ```
   */
  PRE_COMPLETION_EVENT = 1049,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preTriggerPlayerDeath(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_TRIGGER_PLAYER_DEATH = 1050,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preLevelInit(): void {}
   * ```
   */
  PRE_LEVEL_INIT = 1060,

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
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * postPickupShopPurchase(pickup: EntityPickup, player: EntityPlayer, moneySpent: int): void {}
   * ```
   */
  POST_PICKUP_SHOP_PURCHASE = 1062,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function getFollowerPriority(familiar: EntityFamiliar): FollowerPriority | undefined {}
   * ```
   */
  GET_FOLLOWER_PRIORITY = 1063,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preUseCard(
   *   card: CardType,
   *   player: EntityPlayer,
   *   useFlags: BitFlags<UseFlag>
   * ): boolean | undefined {}
   * ```
   */
  PRE_USE_CARD = 1064,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preUsePill(
   *   pillEffect: PillEffect,
   *   pillColor: PillColor,
   *   player: EntityPlayer,
   *   useFlags: BitFlags<UseFlag>
   * ): boolean | undefined {}
   * ```
   */
  PRE_USE_PILL = 1065,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function getShopItemPrice(
   *   pickupVariant: PickupVariant,
   *   pickupSubType: int,
   *   shopItemID: int,
   *   price: int
   *  ): int | undefined {}
   * ```
   */
  GET_SHOP_ITEM_PRICE = 1066,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function getPlayerHealthType(player: EntityPlayer): HealthType | undefined {}
   * ```
   */
  GET_PLAYER_HEALTH_TYPE = 1067,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preRoomTriggerClear(playSound: boolean): void {}
   * ```
   */
  PRE_ROOM_TRIGGER_CLEAR = 1068,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preRestockShop(partial: boolean): boolean | undefined {}
   * ```
   */
  PRE_RESTOCK_SHOP = 1070,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postRestockShop(partial: boolean): void {}
   * ```
   */
  POST_RESTOCK_SHOP = 1071,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function getActiveMaxCharge(
   *   collectible: CollectibleType,
   *   player: EntityPlayer,
   *   varData: int
   * ): int | undefined {}
   * ```
   */
  GET_ACTIVE_MAX_CHARGE = 1072,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function getActiveMinUsableCharge(
   *   slot: ActiveSlot,
   *   player: EntityPlayer,
   * ): int | undefined {}
   * ```
   */
  GET_ACTIVE_MIN_USABLE_CHARGE = 1073,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function getPlayerHeartLimit(
   *   player: EntityPlayer,
   *   heartLimit: int,
   *   isKeeper: boolean
   * ): int | undefined {}
   * ```
   */
  GET_PLAYER_HEART_LIMIT = 1074,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GiantbookType` provided.
   *
   * ```ts
   * function postItemOverlayUpdate(): void {}
   * ```
   */
  POST_ITEM_OVERLAY_UPDATE = 1075,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GiantbookType` provided.
   *
   * ```ts
   * function preItemOverlayShow(
   *   giantbook: GiantbookType,
   *   delay: int,
   *   player: EntityPlayer
   * ): boolean | GiantbookType | undefined {}
   * ```
   */
  PRE_ITEM_OVERLAY_SHOW = 1076,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerNewRoomTempEffects(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_NEW_ROOM_TEMP_EFFECTS = 1077,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerNewLevel(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_NEW_LEVEL = 1078,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postPlayerHUDRenderActiveItem(
   *   player: EntityPlayer,
   *   slot: ActiveSlot,
   *   offset: Vector,
   *   alpha: float,
   *   scale: float,
   *   chargeBarOffset: Vector
   * ): void {}
   * ```
   */
  POST_PLAYER_HUD_RENDER_ACTIVE_ITEM = 1079,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function preFamiliarRender(
   *   familiar: EntityFamiliar,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_FAMILIAR_RENDER = 1080,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCRender(npc: EntityNPC, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_NPC_RENDER = 1081,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerRender(player: EntityPlayer, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_PLAYER_RENDER = 1082,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupRender(pickup: EntityPickup, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_PICKUP_RENDER = 1083,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function preTearRender(tear: EntityTear, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_TEAR_RENDER = 1084,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   *
   * ```ts
   * function preProjectileRender(
   *   projectile: EntityProjectile,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_PROJECTILE_RENDER = 1085,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   *
   * ```ts
   * function preKnifeRender(knife: EntityKnife, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_KNIFE_RENDER = 1086,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EffectVariant` provided.
   *
   * ```ts
   * function preEffectRender(effect: EntityEffect, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_EFFECT_RENDER = 1087,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function preBombRender(bomb: EntityBomb, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_BOMB_RENDER = 1088,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotRender(slot: EntitySlot, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_SLOT_RENDER = 1089,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotRender(slot: EntitySlot, offset: Vector): void {}
   * ```
   */
  POST_SLOT_RENDER = 1090,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postPlayerHUDRenderHearts(
   *   offset: Vector,
   *   heartsSprite: Sprite,
   *   position: Vector,
   *   unknown: float,
   *   player: EntityPlayer
   * ): void {}
   * ```
   */
  POST_PLAYER_HUD_RENDER_HEARTS = 1091,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlayerApplyInnateCollectibleNumber(
   *   modCount: int,
   *   player: EntityPlayer,
   *   collectible: CollectibleType,
   *   onlyCountTrueItems: boolean
   * ): int | undefined {}
   * ```
   */
  PRE_PLAYER_APPLY_INNATE_COLLECTIBLE_NUMBER = 1092,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Music` provided.
   *
   * ```ts
   * function preMusicPlayJingle(music: Music): Music | boolean | undefined {}
   * ```
   */
  PRE_MUSIC_PLAY_JINGLE = 1094,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function postCollectibleRemoved(player: EntityPlayer, collectible: CollectibleType): void {}
   * ```
   */
  POST_COLLECTIBLE_REMOVED = 1095,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TrinketType` provided.
   *
   * ```ts
   * function postTrinketAdded(
   *   player: EntityPlayer,
   *   trinket: TrinketType,
   *   firstTimePickingUp: boolean
   * ): void {}
   * ```
   */
  POST_TRINKET_ADDED = 1096,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TrinketType` provided.
   *
   * ```ts
   * function postTrinketRemoved(player: EntityPlayer, trinket: TrinketType): void {}
   * ```
   */
  POST_TRINKET_REMOVED = 1097,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `WeaponType` provided.
   *
   * ```ts
   * function postTriggerWeaponFired(
   *   fireDirection: Vector,
   *   fireAmount: int,
   *   owner: Entity,
   *   weapon: Weapon
   * ): void {}
   * ```
   */
  POST_TRIGGER_WEAPON_FIRED = 1098,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postLevelLayoutGenerated(levelGenerator: LevelGenerator): void {}
   * ```
   */
  POST_LEVEL_LAYOUT_GENERATED = 1099,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   *  function preGridEntitySpawn(
   *   gridEntityType: GridEntityType,
   *   variant: int,
   *   varData: int,
   *   gridIndex: int,
   *   spawnSeed: Seed,
   *   desc: GridEntityDesc | undefined,
   * ):
   *   | GridEntityDesc
   *   | boolean
   *   | { Type?: GridEntityType; Variant?: int; Vardata?: int; SpawnSeed?: Seed }
   *   | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_SPAWN = 1100,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntitySpawn(grid: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_SPAWN = 1101,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postNightmareSceneShow(unknown: boolean): void {}
   * ```
   */
  POST_NIGHTMARE_SCENE_SHOW = 1103,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preLevelSelect(
   *   level: LevelStage,
   *   stageType: StageType
   * ): [LevelStage?, StageType?] | undefined {}
   * ```
   */
  PRE_LEVEL_SELECT = 1104,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `WeaponType` provided.
   *
   * ```ts
   * function postWeaponFire(
   *   weapon: Weapon,
   *   fireDirection: Vector,
   *   isShooting: boolean,
   *   isInterpolated: boolean
   * ): void {}
   */
  POST_WEAPON_FIRE = 1105,

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
   * function prePlanetariumApplyStagePenalty(): boolean | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_STAGE_PENALTY = 1110,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlanetariumApplyPlanetariumPenalty(): void {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_PLANETARIUM_PENALTY = 1111,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlanetariumApplyTreasureRoomPenalty(): boolean | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_TREASURE_ROOM_PENALTY = 1112,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlanetariumApplyItems(chance: float): float | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_ITEMS = 1113,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlanetariumApplyTelescopeLens(chance: float): float | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_TELESCOPE_LENS = 1114,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlanetariumCalculateFinal(chance: float): float | undefined {}
   * ```
   */
  PRE_PLANETARIUM_CALCULATE_FINAL = 1115,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the string provided.
   *
   * ```ts
   * function preReplaceSpritesheet(layerId: int, fileName: string): [int, string] | undefined {}
   * ```
   */
  PRE_REPLACE_SPRITESHEET = 1116,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the string provided.
   *
   * ```ts
   * function preReplaceSpritesheet(layerId: int, fileName: string): void {}
   * ```
   */
  POST_REPLACE_SPRITESHEET = 1117,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlayerHUDRenderHearts(
   *   offset: Vector,
   *   heartsSprite: Sprite,
   *   position: Vector,
   *   unknown: float,
   *   player: EntityPlayer
   * ): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_HUD_RENDER_HEARTS = 1118,

  /**
   * This callback will only fire for commands using `AutocompleteType.CUSTOM`.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the string provided.
   *
   * ```ts
   * function consoleAutocomplete(
   *   command: string,
   *   params: string
   * ): Array<string | string[]>| undefined {}
   * ```
   */
  CONSOLE_AUTOCOMPLETE = 1120,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotInit(slot: EntitySlot): void {}
   * ```
   */
  POST_SLOT_INIT = 1121,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotUpdate(slot: EntitySlot): void {}
   * ```
   */
  POST_SLOT_UPDATE = 1122,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotCreateExplosionDrops(slot: EntitySlot): boolean | undefined {}
   * ```
   */
  PRE_SLOT_CREATE_EXPLOSION_DROPS = 1123,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotSetPrizeCollectible(
   *   slot: EntitySlot,
   *   collectible: CollectibleType
   * ): CollectibleType | undefined {}
   * ```
   */
  PRE_SLOT_SET_PRIZE_COLLECTIBLE = 1125,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotCreateExplosionDrops(slot: EntitySlot, collectible: CollectibleType): void {}
   * ```
   */
  POST_SLOT_SET_PRIZE_COLLECTIBLE = 1126,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotCreateExplosionDrops(slot: EntitySlot): void {}
   * ```
   */
  POST_SLOT_CREATE_EXPLOSION_DROPS = 1124,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function prePlayerLevelInitStats(player: EntityPlayer): void {}
   * ```
   */
  PRE_PLAYER_LEVEL_INIT_STATS = 1127,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preDevilApplyItems(chance: number): number | undefined {}
   * ```
   */
  PRE_DEVIL_APPLY_ITEMS = 1130,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preDevilApplyStagePenalty(): boolean | undefined {}
   * ```
   */
  PRE_DEVIL_APPLY_STAGE_PENALTY = 1131,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preDevilApplySpecialItems(chance: number): number | undefined {}
   * ```
   */
  PRE_DEVIL_APPLY_SPECIAL_ITEMS = 1132,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preDevilCalculateFinal(chance: number): number | undefined {}
   * ```
   */
  PRE_DEVIL_CALCULATE_FINAL = 1133,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GiantbookType` provided.
   *
   * ```ts
   * function postItemOverlayShow(
   *   giantbook: GiantbookType,
   *   delay: int,
   *   player: EntityPlayer
   * ): void {}
   * ```
   */
  POST_ITEM_OVERLAY_SHOW = 1134,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preRender(): void {}
   * ```
   */
  PRE_RENDER = 1135,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preLevelPlaceRoom(
   *   slot: LevelGeneratorRoom,
   *   roomConfig: RoomConfigRoom,
   *   seed: Seed
   * ): RoomConfigRoom | undefined {}
   * ```
   */
  PRE_LEVEL_PLACE_ROOM = 1137,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preBackdropChange(backdrop: BackdropType): BackdropType {}
   * ```
   */
  PRE_BACKDROP_CHANGE = 1141,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preGetLightingAlpha(float: number): float | undefined {}
   * ```
   */
  PRE_GET_LIGHTING_ALPHA = 1150,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preRenderGridLighting(
   *   grid: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_RENDER_GRID_LIGHTING = 1151,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preRenderEntityLighting(
   *   entity: Entity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_RENDER_ENTITY_LIGHTING = 1152,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preMMorphActive(
   *   player: EntityPlayer,
   *   collectible: CollectibleType
   * ): CollectibleType | boolean | undefined {}
   * ```
   */
  PRE_M_MORPH_ACTIVE = 1190,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCSplit(npc: EntityNPC, isBlacklisted: boolean): boolean | undefined {}
   * ```
   */
  PRE_NPC_SPLIT = 1191,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preRoomGridEntitySpawn(
   *   gridEntityType: GridEntityType,
   *   variant: int,
   *   varData: int,
   *   gridIndex: int,
   *   spawnSeed: Seed
   * ): boolean | [ GridEntityType, int, int, Seed ] | undefined {}
   * ```
   */
  PRE_ROOM_GRID_ENTITY_SPAWN = 1192,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preNewRoom(room: Room, descriptor: RoomDescriptor): void {}
   * ```
   */
  PRE_NEW_ROOM = 1200,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preMegaSatanEnding(): boolean | undefined {}
   * ```
   */
  PRE_MEGA_SATAN_ENDING = 1201,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postModsLoaded(): void {}
   * ```
   */
  POST_MODS_LOADED = 1210,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preNPCMorph(
   *   npc: EntityNPC,
   *   entityType: EntityType,
   *   variant: int,
   *   subType: int,
   *   championColor: ChampionColor
   * ): boolean | [ EntityType, int, int, ChampionColor? ] | undefined {}
   * ```
   */
  PRE_NPC_MORPH = 1212,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function prePickupMorph(
   *   pickup: EntityPickup,
   *   entityType: EntityType,
   *   variant: int,
   *   subType: int,
   *   keepPrice: boolean,
   *   keepSeed: boolean,
   *   ignoreModifiers: boolean
   * ): boolean | [ EntityType, int, int, boolean?, boolean?, boolean? ] | undefined {}
   * ```
   */
  PRE_PICKUP_MORPH = 1213,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postNPCMorph(
   *   npc: EntityNPC,
   *   previousType: EntityType,
   *   previousVariant: int,
   *   previousSubType: int
   * ): void {}
   * ```
   */
  POST_NPC_MORPH = 1214,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postPickupMorph(
   *   pickup: EntityPickup,
   *   previousType: EntityType,
   *   previousVariant: int,
   *   previousSubType: int,
   *   keptPrice: boolean,
   *   keptSeed: boolean,
   *   ignoredModifiers: boolean
   * ): void {}
   * ```
   */
  POST_PICKUP_MORPH = 1215,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preCompletionMarksRender(
   *   completionMarksSprite: Sprite,
   *   renderPos: Vector,
   *   renderScale: Vector
   *   playerType: PlayerType
   * ): boolean | undefined {}
   * ```
   */
  PRE_COMPLETION_MARKS_RENDER = 1216,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postCompletionMarksRender(
   *   completionMarksSprite: Sprite,
   *   renderPos: Vector,
   *   renderScale: Vector
   *   playerType: PlayerType
   * ): void {}
   * ```
   */
  POST_COMPLETION_MARKS_RENDER = 1217,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function prePauseScreenRender(pauseBody: Sprite, pauseStats: Sprite): boolean | undefined {}
   * ```
   */
  PRE_PAUSE_SCREEN_RENDER = 1218,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postPauseScreenRender(pauseBody: Sprite, pauseStats: Sprite): void {}
   * ```
   */
  POST_PAUSE_SCREEN_RENDER = 1219,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerUseBomb(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_USE_BOMB = 1220,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function postPlayerUseBomb(player: EntityPlayer, bomb: EntityBomb): void {}
   * ```
   */
  POST_PLAYER_USE_BOMB = 1221,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCPickTarget(npc: EntityNPC, target: Entity): Entity | undefined {}
   * ```
   */
  PRE_NPC_PICK_TARGET = 1222,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postNPCDarkRedChampionRegen(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_DARK_RED_CHAMPION_REGEN = 1223,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function postPlayerCollision(
   *   player: EntityPlayer,
   *   collider: Entity,
   *   low: boolean
   * ): void {}
   * ```
   */
  POST_PLAYER_COLLISION = 1231,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function postTearCollision(tear: EntityTear, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_TEAR_COLLISION = 1233,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarCollision(
   *   familiar: EntityFamiliar,
   *   collider: Entity,
   *   low: boolean
   * ): void {}
   * ```
   */
  POST_FAMILIAR_COLLISION = 1235,

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
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function postPickupCollision(pickup: EntityPickup, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_PICKUP_COLLISION = 1239,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotCollision(
   *   slot: EntitySlot,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide?: boolean, SkipCollisionEffects?: boolean } | undefined {}
   * ```
   */
  PRE_SLOT_COLLISION = 1240,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotCollision(
   *   slot: EntitySlot,
   *   collider: Entity,
   *   low: boolean
   * ): void {}
   * ```
   */
  POST_SLOT_COLLISION = 1241,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   *
   * ```ts
   * function postKnifeCollision(knife: EntityKnife, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_KNIFE_COLLISION = 1243,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function postProjectileCollision(
   *   projectile: EntityProjectile,
   *   collider: Entity,
   *   low: boolean
   * ): void {}
   * ```
   */
  POST_PROJECTILE_COLLISION = 1245,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postNPCCollision(npc: EntityNPC, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_NPC_COLLISION = 1247,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   *
   * ```ts
   * function preLaserCollision(laser: EntityLaser, collider: Entity): boolean | undefined {}
   * ```
   */
  PRE_LASER_COLLISION = 1248,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   *
   * ```ts
   * function postLaserCollision(laser: EntityLaser, collider: Entity): void {}
   * ```
   */
  POST_LASER_COLLISION = 1249,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CoinSubType` provided.
   *
   * ```ts
   * function getCoinValue(coin: EntityPickup): int | undefined {}
   * ```
   */
  GET_COIN_VALUE = 1250,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function prePlayerGetMultiShotParams(player: EntityPlayer): MultiShotParams | undefined {}
   * ```
   */
  PRE_PLAYER_GET_MULTI_SHOT_PARAMS = 1251,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarFireProjectile(tear: EntityTear): void {}
   * ```
   */
  POST_FAMILIAR_FIRE_PROJECTILE = 1252,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireBomb(bomb: EntityBomb): void {}
   * ```
   */
  POST_FIRE_BOMB = 1253,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireBoneClub(knife: EntityKnife): void {}
   * ```
   */
  POST_FIRE_BONE_CLUB = 1254,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireBrimstone(laser: EntityLaser): void {}
   * ```
   */
  POST_FIRE_BRIMSTONE = 1255,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireBrimstoneBall(ball: EntityEffect): void {}
   * ```
   */
  POST_FIRE_BRIMSTONE_BALL = 1256,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireKnife(knife: EntityKnife): void {}
   * ```
   */
  POST_FIRE_KNIFE = 1257,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireSword(sword: EntityKnife): void {}
   * ```
   */
  POST_FIRE_SWORD = 1258,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireTechLaser(laser: EntityLaser): void {}
   * ```
   */
  POST_FIRE_TECH_LASER = 1259,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireTechXLaser(laser: EntityLaser): void {}
   * ```
   */
  POST_FIRE_TECH_X_LASER = 1260,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarFireBrimstone(laser: EntityLaser): void {}
   * ```
   */
  POST_FAMILIAR_FIRE_BRIMSTONE = 1261,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarFireTechLaser(laser: EntityLaser): void {}
   * ```
   */
  POST_FAMILIAR_FIRE_TECH_LASER = 1262,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function getIsPersistentRoomEntity(
   *   entityType: EntityType,
   *   variant: int
   * ): boolean | undefined {}
   * ```
   */
  GET_IS_PERSISTENT_ROOM_ENTITY = 1263,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function prePlayerHUDRenderTrinket(
   *   slot: TrinketSlot,
   *   position: Vector,
   *   scale: number,
   *   player: EntityPlayer
   * ): { Position?: Vector, Scale?: number } | boolean | undefined {}
   * ```
   */
  PRE_PLAYER_HUD_RENDER_TRINKET = 1264,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupVoided(pickup: EntityPickup, isBlackRune: boolean): boolean | undefined {}
   * ```
   */
  PRE_PICKUP_VOIDED = 1265,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupVoidedAbyss(pickup: EntityPickup): boolean | undefined {}
   * ```
   */
  PRE_PICKUP_VOIDED_ABYSS = 1266,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupComposted(pickup: EntityPickup): boolean | undefined {}
   * ```
   */
  PRE_PICKUP_COMPOSTED = 1267,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preRenderCustomCharacterMenu(
   *   playerType: PlayerType,
   *   renderPos: Vector,
   *   defaultSprite: Sprite
   * ): void {}
   * ```
   */
  PRE_RENDER_CUSTOM_CHARACTER_MENU = 1333,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDecorationUpdate(
   *   decoration: GridEntity
   * ): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_DECORATION_UPDATE = 1400,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDecorationUpdate(decoration: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_DECORATION_UPDATE = 1401,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDoorUpdate(door: GridEntityDoor): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_DOOR_UPDATE = 1402,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDoorUpdate(door: GridEntityDoor): void {}
   * ```
   */
  POST_GRID_ENTITY_DOOR_UPDATE = 1403,

  /**
   * Fire grid entities are largely unused and in most cases you'll want to target the `EntityNPC`
   * fireplaces with `ModCallback.PRE_NPC_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDoorUpdate(fire: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_FIRE_UPDATE = 1404,

  /**
   * Fire grid entities are largely unused and in most cases you'll want to target the `EntityNPC`
   * fireplaces with `ModCallback.POST_NPC_UPDATE`.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDoorUpdate(fire: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_FIRE_UPDATE = 1405,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityGravityUpdate(gravity: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_GRAVITY_UPDATE = 1406,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityGravityUpdate(gravity: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_GRAVITY_UPDATE = 1407,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityLockUpdate(lock: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_LOCK_UPDATE = 1408,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityLockUpdate(lock: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_LOCK_UPDATE = 1409,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPitUpdate(pit: GridEntityPit): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_PIT_UPDATE = 1410,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPitUpdate(pit: GridEntityPit): void {}
   * ```
   */
  POST_GRID_ENTITY_PIT_UPDATE = 1411,

  /**
   * This does not include the `EntityNPC` poops used by Tainted Blue Baby. Use
   * `ModCallback.PRE_NPC_UPDATE` if you wish to target them.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPoopUpdate(poop): GridEntityPoop): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_POOP_UPDATE = 1412,

  /**
   * This does not include the `EntityNPC` poops used by Tainted Blue Baby. Use
   * `ModCallback.POST_NPC_UPDATE` if you wish to target them.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPoopUpdate(poop): GridEntityPoop): boolean | undefined {}
   * ```
   */
  POST_GRID_ENTITY_POOP_UPDATE = 1413,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPressurePlateUpdate(
   *   pressurePlate: GridEntityPressurePlate
   * ): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_PRESSURE_PLATE_UPDATE = 1414,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPressurePlateUpdate(pressurePlate: GridEntityPressurePlate): void {}
   * ```
   */
  POST_GRID_ENTITY_PRESSURE_PLATE_UPDATE = 1415,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityRockUpdate(rock: GridEntityRock): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_ROCK_UPDATE = 1416,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityRockUpdate(rock: GridEntityRock): void {}
   * ```
   */
  POST_GRID_ENTITY_ROCK_UPDATE = 1417,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntitySpikesUpdate(spikes: GridEntitySpikes): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_SPIKES_UPDATE = 1418,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntitySpikesUpdate(spikes: GridEntitySpikes): void {}
   * ```
   */
  POST_GRID_ENTITY_SPIKES_UPDATE = 1419,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityStaircaseUpdate(staircase: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_STAIRCASE_UPDATE = 1420,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityStaircaseUpdate(staircase: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_STAIRCASE_UPDATE = 1421,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityStatueUpdate(statue: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_STATUE_UPDATE = 1422,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityStatueUpdate(statue: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_STATUE_UPDATE = 1423,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTeleporterUpdate(
   *   teleporter: GridEntity
   * ): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TELEPORTER_UPDATE = 1424,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTeleporterUpdate(teleporter: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_TELEPORTER_UPDATE = 1425,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTrapdoorUpdate(trapdoor: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TRAPDOOR_UPDATE = 1426,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTrapdoorUpdate(trapdoor: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_TRAPDOOR_UPDATE = 1427,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityWebUpdate(web: GridEntity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_WEB_UPDATE = 1428,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityWebUpdate(web: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_WEB_UPDATE = 1429,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTNTUpdate(tnt: GridEntityTNT): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TNT_UPDATE = 1430,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTNTUpdate(tnt: GridEntityTNT): void {}
   * ```
   */
  POST_GRID_ENTITY_TNT_UPDATE = 1431,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntitySpikesRender(
   *   spikes: GridEntitySpikes,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_SPIKES_RENDER = 1432,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntitySpikesRender(spikes: GridEntitySpikes, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_SPIKES_RENDER = 1433,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityWebRender(
   *   web: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_WEB_RENDER = 1434,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityWebRender(spikes: GridEntity, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_WEB_RENDER = 1435,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTNTRender(
   *   tnt: GridEntityTNT,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TNT_RENDER = 1436,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTNTRender(web: GridEntityTNT, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_TNT_RENDER = 1437,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTrapdoorRender(
   *   trapdoor: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TRAPDOOR_RENDER = 1438,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTrapdoorRender(trapdoor: GridEntity, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_TRAPDOOR_RENDER = 1439,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityStaircaseRender(
   *   staircase: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_STAIRCASE_RENDER = 1440,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityStaircaseRender(staircase: GridEntity, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_STAIRCASE_RENDER = 1441,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDecorationRender(
   *   decoration: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_DECORATION_RENDER = 1444,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDecorationRender(
   *   decoration: GridEntity,
   *   offset: Vector
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_DECORATION_RENDER = 1445,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDoorRender(
   *   door: GridEntityDoor,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_DOOR_RENDER = 1446,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDoorRender(door: GridEntityDoor, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_DOOR_RENDER = 1447,

  /**
   * Fire grid entities are largely unused and in most cases you'll want to target the `EntityNPC`
   * fireplaces with `ModCallback.PRE_NPC_RENDER`.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityFireRender(
   *   fire: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_FIRE_RENDER = 1448,

  /**
   * Fire grid entities are largely unused and in most cases you'll want to target the `EntityNPC`
   * fireplaces with `ModCallback.POST_NPC_RENDER`.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityFireRender(fire: GridEntity, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_FIRE_RENDER = 1449,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityLockRender(
   *   lock: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_LOCK_RENDER = 1450,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityLockRender(lock: GridEntity, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_LOCK_RENDER = 1451,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTeleporterRender(
   *   teleporter: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TELEPORTER_RENDER = 1452,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTeleporterRender(
   *   teleporter: GridEntity,
   *   offset: Vector
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_TELEPORTER_RENDER = 1453,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPitRender(
   *   pit: GridEntityPit,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_PIT_RENDER = 1454,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPitRender(pit: GridEntityPit, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_PIT_RENDER = 1455,

  /**
   * This does not include the `EntityNPC` poops used by Tainted Blue Baby. Use
   * `ModCallback.PRE_NPC_RENDER` if you wish to target them.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPoopRender(
   *   poop: GridEntityPoop,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_POOP_RENDER = 1456,

  /**
   * This does not include the `EntityNPC` poops used by Tainted Blue Baby. Use
   * `ModCallback.POST_NPC_RENDER` if you wish to target them.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPoopRender(poop: GridEntityPoop, offset: Vector): void {}
   * ```
   */
  POOP_GRID_ENTITY_POOP_RENDER = 1457,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityRock` provided.
   *
   * ```ts
   * function preGridEntityRockRender(
   *   rock: GridEntityRock,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_ROCK_RENDER = 1458,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityRockRender(lock: GridEntityRock, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_ROCK_RENDER = 1459,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPressurePlateRender(
   *   pressurePlate: GridEntityPressurePlate,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_PRESSURE_PLATE_RENDER = 1460,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPressurePlateRender(
   *   pressurePlate: GridEntityPressurePlate,
   *   offset: Vector
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_PRESSURE_PLATE_RENDER = 1461,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityWallRender(
   *   wall: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_WALL_RENDER = 1462,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityWallRender(wall: GridEntity, offset: Vector): void {}
   * ```
   */
  POST_GRID_ENTITY_WALL_RENDER = 1463,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `InputHook` provided.
   *
   * ```ts
   * function menuInputAction(
   *   entity: Entity | undefined,
   *   hook: InputHook,
   *   buttonAction: ButtonAction
   * ): boolean | float | undefined {}
   * ```
   */
  MENU_INPUT_ACTION = 1464,

  /**
   * This callback cannot be filtered.
   *
   * ```ts
   * function postSaveSlotLoad(saveSlot: int, isSlotSelected: boolean, rawSlot: int): void {}
   */
  POST_SAVE_SLOT_LOAD = 1470,

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

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Challenge` provided.
   *
   * ```ts
   * function postChallengeDone(challenge: Challenge, player: EntityPlayer): void {}
   * ```
   */
  POST_CHALLENGE_DONE = 1472,
}
