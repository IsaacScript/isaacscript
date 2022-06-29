export enum ModCallback {
  /**
   * ```ts
   * function postNPCUpdate(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_UPDATE = 0,

  /**
   * ```ts
   * function postUpdate(): void {}
   * ```
   */
  POST_UPDATE = 1,

  /**
   * ```ts
   * function postRender(): void {}
   * ```
   */
  POST_RENDER = 2,

  /**
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
   * ```ts
   * function postPEffectUpdate(player: EntityPlayer): void {}
   * ```
   */
  POST_PEFFECT_UPDATE = 4,

  /**
   * ```ts
   * function postUseCard(
   *   card: Card,
   *   player: EntityPlayer,
   *   useFlags: BitFlags<UseFlag>,
   * ): void {}
   * ```
   */
  POST_USE_CARD = 5,

  /**
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
   * ```ts
   * function postFamiliarInit(familiar: EntityFamiliar): void {}
   * ```
   */
  POST_FAMILIAR_INIT = 7,

  /**
   * ```ts
   * function evaluateCache(player: EntityPlayer, cacheFlag: CacheFlag): void {}
   * ```
   */
  EVALUATE_CACHE = 8,

  /**
   * This will fire at the beginning of a run and upon continuing a saved run.
   *
   * ```ts
   * function postPlayerInit(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_INIT = 9,

  /**
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
   * ```ts
   * function entityTakeDmg(
   *   tookDamage: Entity,
   *   damageAmount: float,
   *   damageFlags: BitFlags<DamageFlag>,
   *   damageSource: EntityRef,
   *   damageCountdownFrames: int,
   * ): boolean | undefined {}
   * ```
   */
  ENTITY_TAKE_DMG = 11,

  /**
   * ```ts
   * function postCurseEval(curses: int): int | undefined {}
   * ```
   */
  POST_CURSE_EVAL = 12,

  /**
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
   * ```ts
   * function postGameStarted(isContinued: boolean): void {}
   * ```
   */
  POST_GAME_STARTED = 15,

  /**
   * ```ts
   * function postGameEnd(isGameOver: boolean): void {}
   * ```
   */
  POST_GAME_END = 16,

  /**
   * ```ts
   * function preGameExit(shouldSave: boolean): void {}
   * ```
   */
  PRE_GAME_EXIT = 17,

  /**
   * ```ts
   * function postNewLevel(): void {}
   * ```
   */
  POST_NEW_LEVEL = 18,

  /**
   * ```ts
   * function postNewRoom(): void {}
   * ```
   */
  POST_NEW_ROOM = 19,

  /**
   * ```ts
   * function getCard(
   *   rng: RNG,
   *   card: Card,
   *   includePlayingCards: boolean,
   *   includeRunes: boolean,
   *   onlyRunes: boolean,
   * ): Card | undefined {}
   * ```
   */
  GET_CARD = 20,

  /**
   * ```ts
   * function getShaderParams(shaderName: string): Record<string, unknown> {}
   * ```
   */
  GET_SHADER_PARAMS = 21,

  /**
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
   * ```ts
   * function preUseItem(
   *   collectibleType: CollectibleType,
   *   rng: RNG,
   * ): boolean | undefined {}
   * ```
   */
  PRE_USE_ITEM = 23,

  /**
   * ```ts
   * function preEntitySpawn(
   *   entityType: EntityType,
   *   variant: int,
   *   subType: int,
   *   position: Vector,
   *   velocity: Vector,
   *   spawner: Entity,
   *   initSeed: int,
   * ): [EntityType, int, int, int] | undefined {}
   * ```
   */
  PRE_ENTITY_SPAWN = 24,

  /**
   * ```ts
   * function postFamiliarRender(
   *   entityFamiliar: EntityFamiliar,
   *   renderOffset: Vector,
   * ): void {}
   * ```
   */
  POST_FAMILIAR_RENDER = 25,

  /**
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
   * ```ts
   * function postNPCInit(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_INIT = 27,

  /**
   * ```ts
   * function postNPCRender(npc: EntityNPC, renderOffset: Vector): void {}
   * ```
   */
  POST_NPC_RENDER = 28,

  /**
   * ```ts
   * function postNPCDeath(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_DEATH = 29,

  /**
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
   * ```ts
   * function postPlayerUpdate(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_UPDATE = 31,

  /**
   * ```ts
   * function postPlayerRender(player: EntityPlayer, renderOffset: Vector): void {}
   * ```
   */
  POST_PLAYER_RENDER = 32,

  /**
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
   * ```ts
   * function postPickupInit(pickup: EntityPickup): void {}
   * ```
   */
  POST_PICKUP_INIT = 34,

  /**
   * ```ts
   * function postPickupUpdate(pickup: EntityPickup): void {}
   * ```
   */
  POST_PICKUP_UPDATE = 35,

  /**
   * ```ts
   * function postPickupRender(pickup: EntityPickup, renderOffset: Vector): void {}
   * ```
   */
  POST_PICKUP_RENDER = 36,

  /**
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
   * ```ts
   * function postTearInit(tear: EntityTear): void {}
   * ```
   */
  POST_TEAR_INIT = 39,

  /**
   * ```ts
   * function postTearUpdate(tear: EntityTear): void {}
   * ```
   */
  POST_TEAR_UPDATE = 40,

  /**
   * ```ts
   * function postTearRender(tear: EntityTear, renderOffset: Vector): void {}
   * ```
   */
  POST_TEAR_RENDER = 41,

  /**
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
   * ```ts
   * function postProjectileInit(projectile: EntityProjectile): void {}
   * ```
   */
  POST_PROJECTILE_INIT = 43,

  /**
   * ```ts
   * function postProjectileUpdate(projectile: EntityProjectile): void {}
   * ```
   */
  POST_PROJECTILE_UPDATE = 44,

  /**
   * ```ts
   * function postProjectileRender(
   *   projectile: EntityProjectile,
   *   renderOffset: Vector,
   * ): void {}
   * ```
   */
  POST_PROJECTILE_RENDER = 45,

  /**
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
   * ```ts
   * function postLaserInit(laser: EntityLaser): void {}
   * ```
   */
  POST_LASER_INIT = 47,

  /**
   * ```ts
   * function postLaserUpdate(laser: EntityLaser): void {}
   * ```
   */
  POST_LASER_UPDATE = 48,

  /**
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
   * ```ts
   * function postKnifeInit(knife: EntityKnife): void {}
   * ```
   */
  POST_KNIFE_INIT = 50,

  /**
   * ```ts
   * function postKnifeUpdate(knife: EntityKnife): void {}
   * ```
   */
  POST_KNIFE_UPDATE = 51,

  /**
   * ```ts
   * function postKnifeRender(knife: EntityKnife, renderOffset: Vector): void {}
   * ```
   */
  POST_KNIFE_RENDER = 52,

  /**
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
   * ```ts
   * function postEffectInit(effect: EntityEffect): void {}
   * ```
   */
  POST_EFFECT_INIT = 54,

  /**
   * ```ts
   * function postEffectUpdate(effect: EntityEffect): void {}
   * ```
   */
  POST_EFFECT_UPDATE = 55,

  /**
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
   * ```ts
   * function postBombInit(bomb: EntityBomb): void {}
   * ```
   */
  POST_BOMB_INIT = 57,

  /**
   * ```ts
   * function postBombUpdate(bomb: EntityBomb): void {}
   * ```
   */
  POST_BOMB_UPDATE = 58,

  /**
   * ```ts
   * function postBombRender(bomb: EntityBomb, renderOffset: Vector): void {}
   * ```
   */
  POST_BOMB_RENDER = 59,

  /**
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
   * ```ts
   * function postFireTear(tear: EntityTear): void {}
   * ```
   */
  POST_FIRE_TEAR = 61,

  /**
   * ```ts
   * function preGetCollectible(
   *   itemPoolType: ItemPoolType,
   *   decrease: boolean,
   *   seed: int,
   * ): CollectibleType | undefined {}
   * ```
   */
  PRE_GET_COLLECTIBLE = 62,

  /**
   * ```ts
   * function postGetCollectible(
   *   collectibleType: CollectibleType,
   *   itemPoolType: ItemPoolType,
   *   decrease: boolean,
   *   seed: int,
   * ): CollectibleType | undefined {}
   * ```
   */
  POST_GET_COLLECTIBLE = 63,

  /**
   * ```ts
   * function getPillColor(seed: int): PillColor | undefined {}
   * ```
   */
  GET_PILL_COLOR = 64,

  /**
   * ```ts
   * function getPillEffect(
   *   pillEffect: PillEffect,
   *   pillColor: PillColor,
   * ): PillEffect | undefined {}
   * ```
   */
  GET_PILL_EFFECT = 65,

  /**
   * ```ts
   * function getTrinket(
   *   trinketType: TrinketType,
   *   rng: RNG,
   * ): TrinketType | undefined {}
   * ```
   */
  GET_TRINKET = 66,

  /**
   * ```ts
   * function postEntityRemove(entity: Entity): void {}
   * ```
   */
  POST_ENTITY_REMOVE = 67,

  /**
   * ```ts
   * function postEntityKill(entity: Entity): void {}
   * ```
   */
  POST_ENTITY_KILL = 68,

  /**
   * ```ts
   * function preNPCUpdate(entity: Entity): boolean | undefined {}
   * ```
   */
  PRE_NPC_UPDATE = 69,

  /**
   * ```ts
   * function preSpawnClearAward(
   *   rng: RNG,
   *   spawnPosition: Vector,
   * ): boolean | undefined {}
   * ```
   */
  PRE_SPAWN_CLEAN_AWARD = 70,

  /**
   * ```ts
   * function preRoomEntitySpawn(
   *   entityTypeOrGridEntityXMLType: EntityType | GridEntityXMLType,
   *   variant: int,
   *   subType: int,
   *   gridIndex: int,
   *   seed: int,
   * ): [EntityType | GridEntityXMLType, int, int] | undefined {}
   * ```
   */
  PRE_ROOM_ENTITY_SPAWN = 71,
}
