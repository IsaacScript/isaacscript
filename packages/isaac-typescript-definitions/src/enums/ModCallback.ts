export enum ModCallback {
  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postNPCUpdate(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_UPDATE = 0,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postUpdate(): void {}
   * ```
   */
  POST_UPDATE = 1,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postRender(): void {}
   * ```
   */
  POST_RENDER = 2,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function useItem(
   *   collectibleType: CollectibleType,
   *   rng: RNG,
   *   player: EntityPlayer,
   *   useFlags: BitFlags<UseFlag>,
   *   activeSlot: int,
   *   customVarData: int,
   * ):
   *   | boolean
   *   | { Discharge: boolean; Remove: boolean; ShowAnim: boolean }
   *   | undefined;
   * ```
   */
  POST_USE_ITEM = 3,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPEffectUpdate(player: EntityPlayer): void {}
   * ```
   *
   * @deprecated Consider using the `ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED` callback from
   *             `isaacscript-common` instead, since it will fire in the correct order and prevent
   *             bugs relating to data structures not being properly initialized.
   */
  POST_PEFFECT_UPDATE = 4,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CardType` provided.
   *
   * ```ts
   * function postUseCard(
   *   cardType: CardType,
   *   player: EntityPlayer,
   *   useFlags: BitFlags<UseFlag>,
   * ): void {}
   * ```
   */
  POST_USE_CARD = 5,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarUpdate(familiar: EntityFamiliar): void {}
   * ```
   */
  POST_FAMILIAR_UPDATE = 6,

  /**
   * Unlike in Afterbirth+, in Repentance this callback properly populates the following fields:
   *
   * - `Position`
   * - `SpawnerEntity`
   * - `SpawnerType`
   * - `SpawnerVariant`
   * - `Velocity`
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarInit(familiar: EntityFamiliar): void {}
   * ```
   */
  POST_FAMILIAR_INIT = 7,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CacheFlag` provided.
   *
   * Note that you can only use single `CacheFlag` values as a third argument. (You cannot use a
   * combination of two or more `CacheFlag`.)
   *
   * ```ts
   * function evaluateCache(player: EntityPlayer, cacheFlag: CacheFlag): void {}
   * ```
   */
  EVALUATE_CACHE = 8,

  /**
   * This will fire at the beginning of a run, upon continuing a saved run, and when a player enters
   * a Genesis room.
   *
   * For most cases of general purpose player initialization, you should use the
   * `POST_PLAYER_INIT_FIRST` custom callback instead (in order to exclude the case of a player
   * continuing a saved run).
   *
   * This callback has a special property where most `EntityPlayer` methods (such as e.g.
   * `EntityPlayer.AddCollectible`) will silently fail if the player is continuing a saved run.
   * (This behavior was introduced in Repentance.) See the docs for more details about which
   * specific methods are affected.
   *
   * The `isChildPlayer` helper function does not work in this callback (because
   * `EntityPlayer.Parent` is not initialized yet at this point). If you want to exclude non-real
   * players, use the `POST_PLAYER_INIT_FIRST` or the `POST_PLAYER_INIT_LATE` custom callbacks
   * instead.
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function postPlayerInit(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_INIT = 9,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PillEffect` provided.
   *
   * ```ts
   * function postUsePill(
   *   pillEffect: PillEffect,
   *   player: EntityPlayer,
   *   useFlags: BitFlags<UseFlag>,
   * ): void {}
   * ```
   */
  POST_USE_PILL = 10,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function entityTakeDmg(
   *   entity: Entity,
   *   amount: float,
   *   damageFlags: BitFlags<DamageFlag>,
   *   source: EntityRef,
   *   countdownFrames: int,
   * ): boolean | undefined {}
   * ```
   */
  ENTITY_TAKE_DMG = 11,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postCurseEval(curses: BitFlags<LevelCurse>): BitFlags<LevelCurse> | undefined {}
   * ```
   */
  POST_CURSE_EVAL = 12,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `InputHook` provided.
   *
   * ```ts
   * function inputAction(
   *   entity: Entity | undefined,
   *   inputHook: InputHook,
   *   buttonAction: ButtonAction,
   * ): boolean | float | undefined {}
   * ```
   */
  INPUT_ACTION = 13,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postGameStarted(isContinued: boolean): void {}
   * ```
   *
   * @deprecated Consider using the `ModCallbackCustom.POST_GAME_STARTED_REORDERED` callback from
   *             `isaacscript-common` instead, since it will fire in the correct order and prevent
   *             bugs relating to data structures not being properly initialized.
   */
  POST_GAME_STARTED = 15,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postGameEnd(isGameOver: boolean): void {}
   * ```
   */
  POST_GAME_END = 16,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preGameExit(shouldSave: boolean): void {}
   * ```
   */
  PRE_GAME_EXIT = 17,

  /**
   * Unlike the `POST_GAME_STARTED` callback, this callback does not fire when resuming a saved run.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function postNewLevel(): void {}
   * ```
   *
   * @deprecated Consider using the `ModCallbackCustom.POST_NEW_LEVEL_REORDERED` callback from
   *             `isaacscript-common` instead, since it will fire in the correct order and prevent
   *             bugs relating to data structures not being properly initialized.
   */
  POST_NEW_LEVEL = 18,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postNewRoom(): void {}
   * ```
   *
   * @deprecated Consider using the `ModCallbackCustom.POST_NEW_ROOM_REORDERED` callback from
   *             `isaacscript-common` instead, since it will fire in the correct order and prevent
   *             bugs relating to data structures not being properly initialized.
   */
  POST_NEW_ROOM = 19,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function getCard(
   *   rng: RNG,
   *   cardType: CardType,
   *   includePlayingCards: boolean,
   *   includeRunes: boolean,
   *   onlyRunes: boolean,
   * ): CardType | undefined {}
   * ```
   */
  GET_CARD = 20,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function getShaderParams(shaderName: string): Record<string, unknown> {}
   * ```
   */
  GET_SHADER_PARAMS = 21,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function executeCmd(
   *   command: string,
   *   parameters: string,
   *   player: EntityPlayer,
   * ): void {}
   * ```
   */
  EXECUTE_CMD = 22,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function preUseItem(
   *   collectibleType: CollectibleType,
   *   rng: RNG,
   *   player: EntityPlayer,
   *   useFlags: BitFlags<UseFlag>,
   *   activeSlot: ActiveSlot,
   *   customVarData: int,
   * ): boolean | undefined {}
   * ```
   */
  PRE_USE_ITEM = 23,

  /**
   * If you want to prevent an entity from spawning, you cannot return an `EntityType` of 0, since
   * that will cause the game to crash.
   *
   * Sometimes, if you return a type other than the original type (e.g. replacing a pickup with an
   * effect), the game will crash. Thus, you should replace a pickup with a new pickup, and so on.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preEntitySpawn(
   *   entityType: EntityType,
   *   variant: int,
   *   subType: int,
   *   position: Vector,
   *   velocity: Vector,
   *   spawner: Entity | undefined,
   *   initSeed: Seed,
   * ): [entityType: EntityType, variant: int, subType: int, initSeed: Seed] | undefined {}
   * ```
   */
  PRE_ENTITY_SPAWN = 24,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarRender(
   *   entityFamiliar: EntityFamiliar,
   *   renderOffset: Vector,
   * ): void {}
   * ```
   */
  POST_FAMILIAR_RENDER = 25,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function preFamiliarCollision(
   *   familiar: EntityFamiliar,
   *   collider: Entity,
   *   low: boolean,
   * ): boolean | undefined {}
   * ```
   */
  PRE_FAMILIAR_COLLISION = 26,

  /**
   * Unlike in Afterbirth+, in Repentance this callback properly populates the following fields:
   *
   * - `Position`
   * - `SpawnerEntity`
   * - `SpawnerType`
   * - `SpawnerVariant`
   * - `Velocity`
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postNPCInit(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_INIT = 27,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postNPCRender(npc: EntityNPC, renderOffset: Vector): void {}
   * ```
   */
  POST_NPC_RENDER = 28,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postNPCDeath(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_DEATH = 29,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCCollision(
   *   npc: EntityNPC,
   *   collider: Entity,
   *   low: boolean,
   * ): boolean | undefined {}
   * ```
   */
  PRE_NPC_COLLISION = 30,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function postPlayerUpdate(player: EntityPlayer): void {}
   * ```
   *
   * @deprecated Consider using the `ModCallbackCustom.POST_PLAYER_UPDATE_REORDERED` callback from
   *             `isaacscript-common` instead, since it will fire in the correct order and prevent
   *             bugs relating to data structures not being properly initialized.
   */
  POST_PLAYER_UPDATE = 31,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function postPlayerRender(player: EntityPlayer, renderOffset: Vector): void {}
   * ```
   *
   * @deprecated Consider using the `ModCallbackCustom.POST_PLAYER_RENDER_REORDERED` callback from
   *             `isaacscript-common` instead, since it will fire in the correct order and prevent
   *             bugs relating to data structures not being properly initialized.
   */
  POST_PLAYER_RENDER = 32,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerCollision(
   *   player: EntityPlayer,
   *   collider: Entity,
   *   low: boolean,
   * ): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_COLLISION = 33,

  /**
   * Unlike in Afterbirth+, in Repentance this callback properly populates the following fields:
   *
   * - `Position`
   * - `SpawnerEntity`
   * - `SpawnerType`
   * - `SpawnerVariant`
   * - `Velocity`
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function postPickupInit(pickup: EntityPickup): void {}
   * ```
   */
  POST_PICKUP_INIT = 34,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function postPickupUpdate(pickup: EntityPickup): void {}
   * ```
   */
  POST_PICKUP_UPDATE = 35,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function postPickupRender(pickup: EntityPickup, renderOffset: Vector): void {}
   * ```
   */
  POST_PICKUP_RENDER = 36,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postPickupSelection(
   *   pickup: EntityPickup,
   *   variant: PickupVariant,
   *   subType: int,
   * ): [PickupVariant, int] | undefined {}
   * ```
   */
  POST_PICKUP_SELECTION = 37,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupCollision(
   *   pickup: EntityPickup,
   *   collider: Entity,
   *   low: boolean,
   * ): boolean | undefined {}
   * ```
   */
  PRE_PICKUP_COLLISION = 38,

  /**
   * Unlike in Afterbirth+, in Repentance this callback properly populates the following fields:
   *
   * - `Position`
   * - `SpawnerEntity`
   * - `SpawnerType`
   * - `SpawnerVariant`
   * - `Velocity`
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function postTearInit(tear: EntityTear): void {}
   * ```
   */
  POST_TEAR_INIT = 39,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function postTearUpdate(tear: EntityTear): void {}
   * ```
   */
  POST_TEAR_UPDATE = 40,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function postTearRender(tear: EntityTear, renderOffset: Vector): void {}
   * ```
   */
  POST_TEAR_RENDER = 41,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function preTearCollision(
   *   tear: EntityTear,
   *   collider: Entity,
   *   low: boolean,
   * ): boolean | undefined {}
   * ```
   */
  PRE_TEAR_COLLISION = 42,

  /**
   * Unlike in Afterbirth+, in Repentance this callback properly populates the following fields:
   *
   * - `Position`
   * - `SpawnerEntity`
   * - `SpawnerType`
   * - `SpawnerVariant`
   * - `Velocity`
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function postProjectileInit(projectile: EntityProjectile): void {}
   * ```
   */
  POST_PROJECTILE_INIT = 43,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function postProjectileUpdate(projectile: EntityProjectile): void {}
   * ```
   */
  POST_PROJECTILE_UPDATE = 44,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function postProjectileRender(
   *   projectile: EntityProjectile,
   *   renderOffset: Vector,
   * ): void {}
   * ```
   */
  POST_PROJECTILE_RENDER = 45,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function preProjectileCollision(
   *   projectile: EntityProjectile,
   *   collider: Entity,
   *   low: boolean,
   * ): boolean | undefined {}
   * ```
   */
  PRE_PROJECTILE_COLLISION = 46,

  /**
   * Unlike in Afterbirth+, in Repentance this callback properly populates the following fields:
   *
   * - `Position`
   * - `SpawnerEntity`
   * - `SpawnerType`
   * - `SpawnerVariant`
   * - `Velocity`
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   *
   * ```ts
   * function postLaserInit(laser: EntityLaser): void {}
   * ```
   */
  POST_LASER_INIT = 47,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   *
   * ```ts
   * function postLaserUpdate(laser: EntityLaser): void {}
   * ```
   */
  POST_LASER_UPDATE = 48,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   *
   * ```ts
   * function postLaserRender(laser: EntityLaser, renderOffset: Vector): void {}
   * ```
   */
  POST_LASER_RENDER = 49,

  /**
   * Unlike in Afterbirth+, in Repentance this callback properly populates the following fields:
   *
   * - `Position`
   * - `SpawnerEntity`
   * - `SpawnerType`
   * - `SpawnerVariant`
   * - `Velocity`
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the sub-type provided. (This is bugged and is NOT the `KnifeVariant` like you would
   *   expect!)
   *
   * ```ts
   * function postKnifeInit(knife: EntityKnife): void {}
   * ```
   */
  POST_KNIFE_INIT = 50,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the sub-type provided. (This is bugged and is NOT the `KnifeVariant` like you would
   *   expect!)
   *
   * ```ts
   * function postKnifeUpdate(knife: EntityKnife): void {}
   * ```
   */
  POST_KNIFE_UPDATE = 51,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the sub-type provided. (This is bugged and is NOT the `KnifeVariant` like you would
   *   expect!)
   *
   * ```ts
   * function postKnifeRender(knife: EntityKnife, renderOffset: Vector): void {}
   * ```
   */
  POST_KNIFE_RENDER = 52,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the sub-type provided. (This is bugged and is NOT the `KnifeVariant` like you would
   *   expect!)
   *
   * ```ts
   * function preKnifeCollision(
   *   knife: EntityKnife,
   *   collider: Entity,
   *   low: boolean,
   * ): boolean | undefined {}
   * ```
   */
  PRE_KNIFE_COLLISION = 53,

  /**
   * Unlike in Afterbirth+, in Repentance this callback properly populates the following fields:
   *
   * - `Position`
   * - `SpawnerEntity`
   * - `SpawnerType`
   * - `SpawnerVariant`
   * - `Velocity`
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EffectVariant` provided.
   *
   * ```ts
   * function postEffectInit(effect: EntityEffect): void {}
   * ```
   */
  POST_EFFECT_INIT = 54,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EffectVariant` provided.
   *
   * ```ts
   * function postEffectUpdate(effect: EntityEffect): void {}
   * ```
   */
  POST_EFFECT_UPDATE = 55,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EffectVariant` provided.
   *
   * ```ts
   * function postEffectRender(effect: EntityEffect, renderOffset: Vector): void {}
   * ```
   */
  POST_EFFECT_RENDER = 56,

  /**
   * Unlike in Afterbirth+, in Repentance this callback properly populates the following fields:
   *
   * - `Position`
   * - `SpawnerEntity`
   * - `SpawnerType`
   * - `SpawnerVariant`
   * - `Velocity`
   *
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function postBombInit(bomb: EntityBomb): void {}
   * ```
   */
  POST_BOMB_INIT = 57,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function postBombUpdate(bomb: EntityBomb): void {}
   * ```
   */
  POST_BOMB_UPDATE = 58,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function postBombRender(bomb: EntityBomb, renderOffset: Vector): void {}
   * ```
   */
  POST_BOMB_RENDER = 59,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function preBombCollision(
   *   bomb: EntityBomb,
   *   collider: Entity,
   *   low: boolean,
   * ): boolean | undefined {}
   * ```
   */
  PRE_BOMB_COLLISION = 60,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postFireTear(tear: EntityTear): void {}
   * ```
   */
  POST_FIRE_TEAR = 61,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preGetCollectible(
   *   itemPoolType: ItemPoolType,
   *   decrease: boolean,
   *   seed: Seed,
   * ): CollectibleType | undefined {}
   * ```
   */
  PRE_GET_COLLECTIBLE = 62,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function postGetCollectible(
   *   collectibleType: CollectibleType,
   *   itemPoolType: ItemPoolType,
   *   decrease: boolean,
   *   seed: Seed,
   * ): CollectibleType | undefined {}
   * ```
   */
  POST_GET_COLLECTIBLE = 63,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function getPillColor(seed: Seed): PillColor | undefined {}
   * ```
   */
  GET_PILL_COLOR = 64,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function getPillEffect(
   *   pillEffect: PillEffect,
   *   pillColor: PillColor,
   * ): PillEffect | undefined {}
   * ```
   */
  GET_PILL_EFFECT = 65,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function getTrinket(
   *   trinketType: TrinketType,
   *   rng: RNG,
   * ): TrinketType | undefined {}
   * ```
   */
  GET_TRINKET = 66,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postEntityRemove(entity: Entity): void {}
   * ```
   */
  POST_ENTITY_REMOVE = 67,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postEntityKill(entity: Entity): void {}
   * ```
   */
  POST_ENTITY_KILL = 68,

  /**
   * When registering this callback with the `Mod.AddCallback` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCUpdate(entity: Entity): boolean | undefined {}
   * ```
   */
  PRE_NPC_UPDATE = 69,

  /**
   * In vanilla, this is `PRE_SPAWN_CLEAN_AWARD`, which is a typo.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preSpawnClearAward(
   *   rng: RNG,
   *   spawnPosition: Vector,
   * ): boolean | undefined {}
   * ```
   */
  PRE_SPAWN_CLEAR_AWARD = 70,

  /**
   * You can use the `isGridEntityXMLType` helper function to convert the
   * `entityTypeOrGridEntityXMLType` argument to an `EntityType` or `GridEntityXMLType`, if needed.
   *
   * You cannot filter this callback.
   *
   * ```ts
   * function preRoomEntitySpawn(
   *   entityTypeOrGridEntityXMLType: EntityType | GridEntityXMLType,
   *   variant: int,
   *   subType: int,
   *   gridIndex: int,
   *   initSeed: Seed,
   * ): [type: EntityType | GridEntityXMLType, variant: int, subType: int] | undefined {}
   * ```
   */
  PRE_ROOM_ENTITY_SPAWN = 71,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preEntityDevolve(entity: Entity): boolean | undefined {}
   * ```
   */
  PRE_ENTITY_DEVOLVE = 72,

  /**
   * You cannot filter this callback.
   *
   * ```ts
   * function preModUnload(mod: Mod): void {}
   * ```
   */
  PRE_MOD_UNLOAD = 73,
}
