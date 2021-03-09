interface CallbackParameters {
  [ModCallbacks.MC_NPC_UPDATE]: [
    callback: (entityNPC: EntityNPC) => void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_POST_UPDATE]: [callback: () => void];
  [ModCallbacks.MC_POST_RENDER]: [callback: () => void];
  [ModCallbacks.MC_USE_ITEM]: [
    callback: (collectibleType: CollectibleType | int, rng: RNG) => boolean,
    collectibleType?: CollectibleType | int,
  ];
  [ModCallbacks.MC_POST_PEFFECT_UPDATE]: [
    callback: (entityPlayer: EntityPlayer) => void,
    playerType?: PlayerType,
  ];
  [ModCallbacks.MC_USE_CARD]: [
    callback: (card: Card | int) => void,
    card?: Card | int,
  ];
  [ModCallbacks.MC_FAMILIAR_UPDATE]: [
    callback: (entityFamiliar: EntityFamiliar) => void,
    familiarVariant?: FamiliarVariant | int,
  ];
  [ModCallbacks.MC_FAMILIAR_INIT]: [
    callback: (entityFamiliar: EntityFamiliar) => void,
    familiarVariant?: FamiliarVariant | int,
  ];
  [ModCallbacks.MC_EVALUATE_CACHE]: [
    callback: (entityPlayer: EntityPlayer, cacheFlag: CacheFlag) => void,
    cacheFlag?: CacheFlag,
  ];
  [ModCallbacks.MC_POST_PLAYER_INIT]: [
    callback: (entityPlayer: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
  ];
  [ModCallbacks.MC_USE_PILL]: [
    callback: (pillEffect: PillEffect | int) => void,
    pillEffect?: PillEffect | int,
  ];
  [ModCallbacks.MC_ENTITY_TAKE_DMG]: [
    callback: (
      tookDamage: Entity,
      damageAmount: float,
      damageFlags: DamageFlag,
      damageSource: EntityRef,
      damageCountdownFrames: int,
    ) => boolean | null,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_POST_CURSE_EVAL]: [
    callback: (curses: LevelCurse | int) => LevelCurse | int,
  ];
  [ModCallbacks.MC_INPUT_ACTION]: [
    callback: (
      entityPlayer: EntityPlayer,
      inputHook: InputHook,
      buttonAction: ButtonAction,
    ) => boolean | float | null,
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
    ) => Card | int | null,
  ];
  [ModCallbacks.MC_GET_SHADER_PARAMS]: [
    callback: (shaderName: string) => Record<string, unknown>,
  ];
  [ModCallbacks.MC_EXECUTE_CMD]: [
    callback: (command: string, parameters: string) => void,
  ];
  [ModCallbacks.MC_PRE_USE_ITEM]: [
    callback: (collectibleType: CollectibleType | int, rng: RNG) => boolean,
    collectibleType?: CollectibleType | int,
  ];
  [ModCallbacks.MC_PRE_ENTITY_SPAWN]: [
    callback: (
      entityType: EntityType | int,
      variant: EntityVariantForAC,
      subType: int,
      position: Vector,
      velocity: Vector,
      spawner: Entity,
      initSeed: int,
    ) => [EntityType | int, EntityVariantForAC, int, int] | null,
  ];
  [ModCallbacks.MC_POST_FAMILIAR_RENDER]: [
    callback: (entityFamiliar: EntityFamiliar, renderOffset: Vector) => void,
    familiarVariant?: FamiliarVariant | int,
  ];
  [ModCallbacks.MC_PRE_FAMILIAR_COLLISION]: [
    callback: (
      entityFamiliar: EntityFamiliar,
      collider: Entity,
      low: boolean,
    ) => boolean | null,
    familiarVariant?: FamiliarVariant | int,
  ];
  [ModCallbacks.MC_POST_NPC_INIT]: [
    callback: (entityNPC: EntityNPC) => void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_POST_NPC_RENDER]: [
    callback: (entityNPC: EntityNPC, renderOffset: Vector) => void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_POST_NPC_DEATH]: [
    callback: (entityNPC: EntityNPC) => void,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_PRE_NPC_COLLISION]: [
    callback: (
      entityNPC: EntityNPC,
      collider: Entity,
      low: boolean,
    ) => boolean | null,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_POST_PLAYER_UPDATE]: [
    callback: (entityPlayer: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
  ];
  [ModCallbacks.MC_POST_PLAYER_RENDER]: [
    callback: (entityPlayer: EntityPlayer, renderOffset: Vector) => void,
    playerVariant?: PlayerVariant,
  ];
  [ModCallbacks.MC_PRE_PLAYER_COLLISION]: [
    callback: (
      entityPlayer: EntityPlayer,
      collider: Entity,
      low: boolean,
    ) => boolean | null,
    playerVariant?: PlayerVariant,
  ];
  [ModCallbacks.MC_POST_PICKUP_INIT]: [
    callback: (entityPickup: EntityPickup) => void,
    pickupVariant?: PickupVariant | int,
  ];
  [ModCallbacks.MC_POST_PICKUP_UPDATE]: [
    callback: (entityPickup: EntityPickup) => void,
    pickupVariant?: PickupVariant | int,
  ];
  [ModCallbacks.MC_POST_PICKUP_RENDER]: [
    callback: (entityPickup: EntityPickup, renderOffset: Vector) => void,
    pickupVariant?: PickupVariant | int,
  ];
  [ModCallbacks.MC_POST_PICKUP_SELECTION]: [
    callback: (
      entityPickup: EntityPickup,
      variant: PickupVariant | int,
      subType: int,
    ) => [PickupVariant | int, int] | null,
  ];
  [ModCallbacks.MC_PRE_PICKUP_COLLISION]: [
    callback: (
      entityPickup: EntityPickup,
      collider: Entity,
      low: boolean,
    ) => boolean | null,
    pickupVariant?: PickupVariant | int,
  ];
  [ModCallbacks.MC_POST_TEAR_INIT]: [
    callback: (entityTear: EntityTear) => void,
    tearVariant?: TearVariant | int,
  ];
  [ModCallbacks.MC_POST_TEAR_UPDATE]: [
    callback: (entityTear: EntityTear) => void,
    tearVariant?: TearVariant | int,
  ];
  [ModCallbacks.MC_POST_TEAR_RENDER]: [
    callback: (entityTear: EntityTear, renderOffset: Vector) => void,
    tearVariant?: TearVariant | int,
  ];
  [ModCallbacks.MC_PRE_TEAR_COLLISION]: [
    callback: (
      entityTear: EntityTear,
      collider: Entity,
      low: boolean,
    ) => boolean | null,
    tearVariant?: TearVariant | int,
  ];
  [ModCallbacks.MC_POST_PROJECTILE_INIT]: [
    callback: (entityProjectile: EntityProjectile) => void,
    projectileVariant?: ProjectileVariant | int,
  ];
  [ModCallbacks.MC_POST_PROJECTILE_UPDATE]: [
    callback: (entityProjectile: EntityProjectile) => void,
    projectileVariant?: ProjectileVariant | int,
  ];
  [ModCallbacks.MC_POST_PROJECTILE_RENDER]: [
    callback: (
      entityProjectile: EntityProjectile,
      renderOffset: Vector,
    ) => void,
    projectileVariant?: ProjectileVariant | int,
  ];
  [ModCallbacks.MC_PRE_PROJECTILE_COLLISION]: [
    callback: (
      entityProjectile: EntityProjectile,
      collider: Entity,
      low: boolean,
    ) => boolean | null,
    projectileVariant?: ProjectileVariant | int,
  ];
  [ModCallbacks.MC_POST_LASER_INIT]: [
    callback: (entityLaser: EntityLaser) => void,
    laserVariant?: LaserVariant | int,
  ];
  [ModCallbacks.MC_POST_LASER_UPDATE]: [
    callback: (entityLaser: EntityLaser) => void,
    laserVariant?: LaserVariant | int,
  ];
  [ModCallbacks.MC_POST_LASER_RENDER]: [
    callback: (entityLaser: EntityLaser, renderOffset: Vector) => void,
    laserVariant?: LaserVariant | int,
  ];
  [ModCallbacks.MC_POST_KNIFE_INIT]: [
    callback: (entityKnife: EntityKnife) => void,
    knifeSubType?: int,
  ];
  [ModCallbacks.MC_POST_KNIFE_UPDATE]: [
    callback: (entityKnife: EntityKnife) => void,
    knifeSubType?: int,
  ];
  [ModCallbacks.MC_POST_KNIFE_RENDER]: [
    callback: (entityKnife: EntityKnife, renderOffset: Vector) => void,
    knifeSubType?: int,
  ];
  [ModCallbacks.MC_PRE_KNIFE_COLLISION]: [
    callback: (
      entityKnife: EntityKnife,
      collider: Entity,
      low: boolean,
    ) => boolean | null,
    knifeSubType?: int,
  ];
  [ModCallbacks.MC_POST_EFFECT_INIT]: [
    callback: (entityEffect: EntityEffect) => void,
    effectVariant?: EffectVariant | int,
  ];
  [ModCallbacks.MC_POST_EFFECT_UPDATE]: [
    callback: (entityEffect: EntityEffect) => void,
    effectVariant?: EffectVariant | int,
  ];
  [ModCallbacks.MC_POST_EFFECT_RENDER]: [
    callback: (entityEffect: EntityEffect, renderOffset: Vector) => void,
    effectVariant?: EffectVariant | int,
  ];
  [ModCallbacks.MC_POST_BOMB_INIT]: [
    callback: (entityBomb: EntityBomb) => void,
    bombVariant?: BombVariant | int,
  ];
  [ModCallbacks.MC_POST_BOMB_UPDATE]: [
    callback: (entityBomb: EntityBomb) => void,
    bombVariant?: BombVariant | int,
  ];
  [ModCallbacks.MC_POST_BOMB_RENDER]: [
    callback: (entityBomb: EntityBomb, renderOffset: Vector) => void,
    bombVariant?: BombVariant | int,
  ];
  [ModCallbacks.MC_PRE_BOMB_COLLISION]: [
    callback: (
      entityBomb: EntityBomb,
      collider: Entity,
      low: boolean,
    ) => boolean | null,
    bombVariant?: BombVariant | int,
  ];
  [ModCallbacks.MC_POST_FIRE_TEAR]: [
    callback: (entityTear: EntityTear) => void,
  ];
  [ModCallbacks.MC_PRE_GET_COLLECTIBLE]: [
    callback: (
      itemPoolType: ItemPoolType,
      decrease: boolean,
      seed: int,
    ) => CollectibleType | int | null,
  ];
  [ModCallbacks.MC_POST_GET_COLLECTIBLE]: [
    callback: (
      collectibleType: CollectibleType | int,
      itemPoolType: ItemPoolType,
      decrease: boolean,
      seed: int,
    ) => CollectibleType | int | null,
  ];
  [ModCallbacks.MC_GET_PILL_COLOR]: [
    callback: (seed: int) => PillColor | int | null,
  ];
  [ModCallbacks.MC_GET_PILL_EFFECT]: [
    callback: (
      pillEffect: PillEffect | int,
      pillColor: PillColor | int,
    ) => PillEffect | int | null,
  ];
  [ModCallbacks.MC_GET_TRINKET]: [
    callback: (
      trinketType: TrinketType | int,
      rng: RNG,
    ) => TrinketType | int | null,
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
    callback: (entityNPC: EntityNPC) => boolean,
    entityType?: EntityType | int,
  ];
  [ModCallbacks.MC_PRE_SPAWN_CLEAN_AWARD]: [
    callback: (rng: RNG, spawnPosition: Vector) => boolean,
  ];
  [ModCallbacks.MC_PRE_ROOM_ENTITY_SPAWN]: [
    callback: (
      entityType: EntityType | int,
      variant: EntityVariantForAC,
      subType: int,
      gridIndex: int,
      seed: int,
    ) => [EntityType | int, EntityVariantForAC, int] | null,
  ];
}

declare class Mod {
  Name: string;
  AddCallback<T extends keyof CallbackParameters>(
    callbackID: T,
    ...args: CallbackParameters[T]
  ): void;
  RemoveCallback(callbackID: ModCallbacks, callback: () => void): void;
  SaveData(data: string): void;
  LoadData(): string;
  HasData(): boolean;
  RemoveData(): void;
}
