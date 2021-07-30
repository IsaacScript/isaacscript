/** The Mod class is defined in the "scripts/main.lua" file. */
declare class Mod {
  AddCallback<T extends keyof CallbackParameters>(
    callbackID: T,
    ...args: CallbackParameters[T]
  ): void;
  HasData(): boolean;
  LoadData(): string;
  RemoveCallback(callbackID: ModCallbacks, callback: () => void): void;
  RemoveData(): void;
  SaveData(data: string): void;

  Name: string;
}

interface CallbackParameters {
  [ModCallbacks.MC_NPC_UPDATE]: [
    callback: (npc: EntityNPC) => void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_POST_UPDATE]: [callback: () => void];
  [ModCallbacks.MC_POST_RENDER]: [callback: () => void];
  [ModCallbacks.MC_USE_ITEM]: [
    callback: (
      collectibleType: CollectibleType | int,
      rng: RNG,
      player: EntityPlayer,
      useFlags: int,
      activeSlot: int,
      customVarData: int,
    ) =>
      | boolean
      | { Discharge: boolean; Remove: boolean; ShowAnim: boolean }
      | void,
    collectibleType?: CollectibleType | int,
  ];
  [ModCallbacks.MC_POST_PEFFECT_UPDATE]: [
    callback: (player: EntityPlayer) => void,
    playerType?: PlayerType,
  ];
  [ModCallbacks.MC_USE_CARD]: [
    callback: (card: Card | int, player: EntityPlayer, useFlags: int) => void,
    card?: Card | int,
  ];
  [ModCallbacks.MC_FAMILIAR_UPDATE]: [
    callback: (familiar: EntityFamiliar) => void,
    familiarVariant?: FamiliarVariant | int,
  ];
  [ModCallbacks.MC_FAMILIAR_INIT]: [
    callback: (familiar: EntityFamiliar) => void,
    familiarVariant?: FamiliarVariant | int,
  ];
  [ModCallbacks.MC_EVALUATE_CACHE]: [
    callback: (player: EntityPlayer, cacheFlag: CacheFlag) => void,
    cacheFlag?: CacheFlag,
  ];
  [ModCallbacks.MC_POST_PLAYER_INIT]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
  ];
  [ModCallbacks.MC_USE_PILL]: [
    callback: (
      pillEffect: PillEffect | int,
      player: EntityPlayer,
      useFlags: int,
    ) => void,
    pillEffect?: PillEffect | int,
  ];
  [ModCallbacks.MC_ENTITY_TAKE_DMG]: [
    callback: (
      tookDamage: Entity,
      damageAmount: float,
      damageFlags: DamageFlag,
      damageSource: EntityRef,
      damageCountdownFrames: int,
    ) => boolean | void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_POST_CURSE_EVAL]: [
    callback: (curses: LevelCurse | int) => LevelCurse | int | void,
  ];
  [ModCallbacks.MC_INPUT_ACTION]: [
    callback: (
      entity: Entity | null,
      inputHook: InputHook,
      buttonAction: ButtonAction,
    ) => boolean | float | void,
    inputHook?: InputHook,
  ];
  [ModCallbacks.MC_POST_GAME_STARTED]: [
    callback: (isContinued: boolean) => void,
  ];
  [ModCallbacks.MC_POST_GAME_END]: [callback: (isGameOver: boolean) => void];
  [ModCallbacks.MC_PRE_GAME_EXIT]: [callback: (shouldSave: boolean) => void];
  [ModCallbacks.MC_POST_NEW_LEVEL]: [callback: () => void];
  [ModCallbacks.MC_POST_NEW_ROOM]: [callback: () => void];
  [ModCallbacks.MC_GET_CARD]: [
    callback: (
      rng: RNG,
      card: Card | int,
      includePlayingCards: boolean,
      includeRunes: boolean,
      onlyRunes: boolean,
    ) => Card | int | void,
  ];
  [ModCallbacks.MC_GET_SHADER_PARAMS]: [
    callback: (shaderName: string) => Record<string, unknown> | void,
  ];
  [ModCallbacks.MC_EXECUTE_CMD]: [
    callback: (command: string, parameters: string) => void,
  ];
  [ModCallbacks.MC_PRE_USE_ITEM]: [
    callback: (
      collectibleType: CollectibleType | int,
      rng: RNG,
      player: EntityPlayer,
      useFlags: int,
      activeSlot: int,
      customVarData: int,
    ) => boolean | void,
    collectibleType?: CollectibleType | int,
  ];
  [ModCallbacks.MC_PRE_ENTITY_SPAWN]: [
    callback: (
      entityType: EntityType | int,
      variant: int,
      subType: int,
      position: Vector,
      velocity: Vector,
      spawner: Entity,
      initSeed: int,
    ) => [EntityType | int, int, int, int] | void,
  ];
  [ModCallbacks.MC_POST_FAMILIAR_RENDER]: [
    callback: (entityFamiliar: EntityFamiliar, renderOffset: Vector) => void,
    familiarVariant?: FamiliarVariant | int,
  ];
  [ModCallbacks.MC_PRE_FAMILIAR_COLLISION]: [
    callback: (
      familiar: EntityFamiliar,
      collider: Entity,
      low: boolean,
    ) => boolean | void,
    familiarVariant?: FamiliarVariant | int,
  ];
  [ModCallbacks.MC_POST_NPC_INIT]: [
    callback: (npc: EntityNPC) => void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_POST_NPC_RENDER]: [
    callback: (npc: EntityNPC, renderOffset: Vector) => void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_POST_NPC_DEATH]: [
    callback: (npc: EntityNPC) => void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_PRE_NPC_COLLISION]: [
    callback: (
      npc: EntityNPC,
      collider: Entity,
      low: boolean,
    ) => boolean | void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_POST_PLAYER_UPDATE]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
  ];
  [ModCallbacks.MC_POST_PLAYER_RENDER]: [
    callback: (player: EntityPlayer, renderOffset: Vector) => void,
    playerVariant?: PlayerVariant,
  ];
  [ModCallbacks.MC_PRE_PLAYER_COLLISION]: [
    callback: (
      player: EntityPlayer,
      collider: Entity,
      low: boolean,
    ) => boolean | void,
    playerVariant?: PlayerVariant,
  ];
  [ModCallbacks.MC_POST_PICKUP_INIT]: [
    callback: (pickup: EntityPickup) => void,
    pickupVariant?: PickupVariant | int,
  ];
  [ModCallbacks.MC_POST_PICKUP_UPDATE]: [
    callback: (pickup: EntityPickup) => void,
    pickupVariant?: PickupVariant | int,
  ];
  [ModCallbacks.MC_POST_PICKUP_RENDER]: [
    callback: (pickup: EntityPickup, renderOffset: Vector) => void,
    pickupVariant?: PickupVariant | int,
  ];
  [ModCallbacks.MC_POST_PICKUP_SELECTION]: [
    callback: (
      pickup: EntityPickup,
      variant: PickupVariant | int,
      subType: int,
    ) => [PickupVariant | int, int] | void,
  ];
  [ModCallbacks.MC_PRE_PICKUP_COLLISION]: [
    callback: (
      pickup: EntityPickup,
      collider: Entity,
      low: boolean,
    ) => boolean | void,
    pickupVariant?: PickupVariant | int,
  ];
  [ModCallbacks.MC_POST_TEAR_INIT]: [
    callback: (tear: EntityTear) => void,
    tearVariant?: TearVariant | int,
  ];
  [ModCallbacks.MC_POST_TEAR_UPDATE]: [
    callback: (tear: EntityTear) => void,
    tearVariant?: TearVariant | int,
  ];
  [ModCallbacks.MC_POST_TEAR_RENDER]: [
    callback: (tear: EntityTear, renderOffset: Vector) => void,
    tearVariant?: TearVariant | int,
  ];
  [ModCallbacks.MC_PRE_TEAR_COLLISION]: [
    callback: (
      tear: EntityTear,
      collider: Entity,
      low: boolean,
    ) => boolean | void,
    tearVariant?: TearVariant | int,
  ];
  [ModCallbacks.MC_POST_PROJECTILE_INIT]: [
    callback: (projectile: EntityProjectile) => void,
    projectileVariant?: ProjectileVariant | int,
  ];
  [ModCallbacks.MC_POST_PROJECTILE_UPDATE]: [
    callback: (projectile: EntityProjectile) => void,
    projectileVariant?: ProjectileVariant | int,
  ];
  [ModCallbacks.MC_POST_PROJECTILE_RENDER]: [
    callback: (projectile: EntityProjectile, renderOffset: Vector) => void,
    projectileVariant?: ProjectileVariant | int,
  ];
  [ModCallbacks.MC_PRE_PROJECTILE_COLLISION]: [
    callback: (
      projectile: EntityProjectile,
      collider: Entity,
      low: boolean,
    ) => boolean | void,
    projectileVariant?: ProjectileVariant | int,
  ];
  [ModCallbacks.MC_POST_LASER_INIT]: [
    callback: (laser: EntityLaser) => void,
    laserVariant?: LaserVariant | int,
  ];
  [ModCallbacks.MC_POST_LASER_UPDATE]: [
    callback: (laser: EntityLaser) => void,
    laserVariant?: LaserVariant | int,
  ];
  [ModCallbacks.MC_POST_LASER_RENDER]: [
    callback: (laser: EntityLaser, renderOffset: Vector) => void,
    laserVariant?: LaserVariant | int,
  ];
  [ModCallbacks.MC_POST_KNIFE_INIT]: [
    callback: (knife: EntityKnife) => void,
    knifeSubType?: int,
  ];
  [ModCallbacks.MC_POST_KNIFE_UPDATE]: [
    callback: (knife: EntityKnife) => void,
    knifeSubType?: int,
  ];
  [ModCallbacks.MC_POST_KNIFE_RENDER]: [
    callback: (knife: EntityKnife, renderOffset: Vector) => void,
    knifeSubType?: int,
  ];
  [ModCallbacks.MC_PRE_KNIFE_COLLISION]: [
    callback: (
      knife: EntityKnife,
      collider: Entity,
      low: boolean,
    ) => boolean | void,
    knifeSubType?: int,
  ];
  [ModCallbacks.MC_POST_EFFECT_INIT]: [
    callback: (effect: EntityEffect) => void,
    effectVariant?: EffectVariant | int,
  ];
  [ModCallbacks.MC_POST_EFFECT_UPDATE]: [
    callback: (effect: EntityEffect) => void,
    effectVariant?: EffectVariant | int,
  ];
  [ModCallbacks.MC_POST_EFFECT_RENDER]: [
    callback: (effect: EntityEffect, renderOffset: Vector) => void,
    effectVariant?: EffectVariant | int,
  ];
  [ModCallbacks.MC_POST_BOMB_INIT]: [
    callback: (bomb: EntityBomb) => void,
    bombVariant?: BombVariant | int,
  ];
  [ModCallbacks.MC_POST_BOMB_UPDATE]: [
    callback: (bomb: EntityBomb) => void,
    bombVariant?: BombVariant | int,
  ];
  [ModCallbacks.MC_POST_BOMB_RENDER]: [
    callback: (bomb: EntityBomb, renderOffset: Vector) => void,
    bombVariant?: BombVariant | int,
  ];
  [ModCallbacks.MC_PRE_BOMB_COLLISION]: [
    callback: (
      bomb: EntityBomb,
      collider: Entity,
      low: boolean,
    ) => boolean | void,
    bombVariant?: BombVariant | int,
  ];
  [ModCallbacks.MC_POST_FIRE_TEAR]: [callback: (tear: EntityTear) => void];
  [ModCallbacks.MC_PRE_GET_COLLECTIBLE]: [
    callback: (
      itemPoolType: ItemPoolType,
      decrease: boolean,
      seed: int,
    ) => CollectibleType | int | void,
  ];
  [ModCallbacks.MC_POST_GET_COLLECTIBLE]: [
    callback: (
      collectibleType: CollectibleType | int,
      itemPoolType: ItemPoolType,
      decrease: boolean,
      seed: int,
    ) => CollectibleType | int | void,
  ];
  [ModCallbacks.MC_GET_PILL_COLOR]: [
    callback: (seed: int) => PillColor | int | void,
  ];
  [ModCallbacks.MC_GET_PILL_EFFECT]: [
    callback: (
      pillEffect: PillEffect | int,
      pillColor: PillColor | int,
    ) => PillEffect | int | void,
  ];
  [ModCallbacks.MC_GET_TRINKET]: [
    callback: (
      trinketType: TrinketType | int,
      rng: RNG,
    ) => TrinketType | int | void,
  ];
  [ModCallbacks.MC_POST_ENTITY_REMOVE]: [
    callback: (entity: Entity) => void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_POST_ENTITY_KILL]: [
    callback: (entity: Entity) => void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_PRE_NPC_UPDATE]: [
    callback: (npc: EntityNPC) => boolean | void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_PRE_SPAWN_CLEAN_AWARD]: [
    callback: (rng: RNG, spawnPosition: Vector) => boolean | void,
  ];
  [ModCallbacks.MC_PRE_ROOM_ENTITY_SPAWN]: [
    callback: (
      entityType: EntityType | int,
      variant: int,
      subType: int,
      gridIndex: int,
      seed: int,
    ) => [EntityType | int, int, int] | void,
  ];
}
