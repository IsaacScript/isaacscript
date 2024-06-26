import type {
  ActiveSlot,
  BombVariant,
  ButtonAction,
  CollectibleType,
  DamageFlag,
  DiceFloorSubType,
  DoorVariant,
  EffectVariant,
  EntityType,
  FamiliarVariant,
  GridEntityType,
  GridEntityXMLType,
  InputHook,
  ItemType,
  Keyboard,
  KnifeVariant,
  LaserVariant,
  LevelStage,
  PickupVariant,
  PillColor,
  PillEffect,
  PitVariant,
  PlayerForm,
  PlayerType,
  PlayerVariant,
  PoopGridEntityVariant,
  PressurePlateVariant,
  ProjectileVariant,
  RoomType,
  SlotVariant,
  StageType,
  TearVariant,
  TrinketType,
  UseFlag,
} from "isaac-typescript-definitions";
import type { AmbushType } from "../../enums/AmbushType";
import type { HealthType } from "../../enums/HealthType";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import type { PlayerStat } from "../../enums/PlayerStat";
import type { SlotDestructionType } from "../../enums/SlotDestructionType";
import { interfaceSatisfiesEnum } from "../../functions/enums";
import type {
  PickingUpItem,
  PickingUpItemCollectible,
  PickingUpItemTrinket,
} from "../../types/PickingUpItem";
import type { PlayerStats } from "../PlayerStats";

export interface AddCallbackParametersCustom {
  [ModCallbackCustom.ENTITY_TAKE_DMG_FILTER]: [
    callback: (
      entity: Entity,
      amount: float,
      damageFlags: BitFlags<DamageFlag>,
      source: EntityRef,
      countdownFrames: int,
    ) => boolean | undefined,
    entityType?: EntityType,
    variant?: number,
    subType?: number,
  ];

  [ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER]: [
    callback: (
      player: EntityPlayer,
      amount: float,
      damageFlags: BitFlags<DamageFlag>,
      source: EntityRef,
      countdownFrames: int,
    ) => boolean | undefined,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.INPUT_ACTION_FILTER]: [
    callback: (
      entity: Entity | undefined,
      inputHook: InputHook,
      buttonAction: ButtonAction,
    ) => boolean | float | undefined,
    inputHook?: InputHook,
    buttonAction?: ButtonAction,
  ];

  [ModCallbackCustom.INPUT_ACTION_PLAYER]: [
    callback: (
      player: EntityPlayer,
      inputHook: InputHook,
      buttonAction: ButtonAction,
    ) => boolean | float | undefined,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
    inputHook?: InputHook,
    buttonAction?: ButtonAction,
  ];

  [ModCallbackCustom.POST_AMBUSH_FINISHED]: [
    callback: (ambushType: AmbushType) => void,
    ambushType?: AmbushType,
  ];

  [ModCallbackCustom.POST_AMBUSH_STARTED]: [
    callback: (ambushType: AmbushType) => void,
    ambushType?: AmbushType,
  ];

  [ModCallbackCustom.POST_BOMB_EXPLODED]: [
    callback: (bomb: EntityBomb) => void,
    bombVariant?: BombVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_BOMB_INIT_FILTER]: [
    callback: (bomb: EntityBomb) => void,
    bombVariant?: BombVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_BOMB_INIT_LATE]: [
    callback: (bomb: EntityBomb) => void,
    bombVariant?: BombVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_BOMB_RENDER_FILTER]: [
    callback: (bomb: EntityBomb, renderOffset: Vector) => void,
    bombVariant?: BombVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_BOMB_UPDATE_FILTER]: [
    callback: (bomb: EntityBomb) => void,
    bombVariant?: BombVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_BONE_SWING]: [callback: (knife: EntityKnife) => void];

  [ModCallbackCustom.POST_COLLECTIBLE_EMPTY]: [
    callback: (
      collectible: EntityPickupCollectible,
      oldCollectibleType: CollectibleType,
    ) => void,
    collectibleType?: CollectibleType,
  ];

  [ModCallbackCustom.POST_CURSED_TELEPORT]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.POST_CUSTOM_REVIVE]: [
    callback: (player: EntityPlayer, revivalType: int) => void,
    revivalType?: int,
  ];

  [ModCallbackCustom.POST_DICE_ROOM_ACTIVATED]: [
    callback: (
      player: EntityPlayer,
      diceFloorSubType: DiceFloorSubType,
    ) => void,
    diceFloorSubType?: DiceFloorSubType,
  ];

  [ModCallbackCustom.POST_DOOR_RENDER]: [
    callback: (door: GridEntityDoor) => void,
    doorVariant?: DoorVariant,
  ];

  [ModCallbackCustom.POST_DOOR_UPDATE]: [
    callback: (door: GridEntityDoor) => void,
    doorVariant?: DoorVariant,
  ];

  [ModCallbackCustom.POST_EFFECT_INIT_FILTER]: [
    callback: (effect: EntityEffect) => void,
    effectVariant?: EffectVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_EFFECT_INIT_LATE]: [
    callback: (effect: EntityEffect) => void,
    effectVariant?: EffectVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_EFFECT_RENDER_FILTER]: [
    callback: (effect: EntityEffect, renderOffset: Vector) => void,
    effectVariant?: EffectVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_EFFECT_STATE_CHANGED]: [
    callback: (
      effect: EntityEffect,
      previousState: int,
      currentState: int,
    ) => void,
    effectVariant?: EffectVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_EFFECT_UPDATE_FILTER]: [
    callback: (effect: EntityEffect) => void,
    effectVariant?: EffectVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_ENTITY_KILL_FILTER]: [
    callback: (entity: Entity) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  // - Co-op babies cannot turn into Esau Jr, so it does not make sense to filter by
  //   `PlayerVariant`.
  // - The character of Esau Jr. is equal to `PlayerType.ISAAC`, so it does not make sense to filter
  //   by character.
  [ModCallbackCustom.POST_ESAU_JR]: [callback: (player: EntityPlayer) => void];

  [ModCallbackCustom.POST_FAMILIAR_INIT_FILTER]: [
    callback: (familiar: EntityFamiliar) => void,
    familiarVariant?: FamiliarVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_FAMILIAR_INIT_LATE]: [
    callback: (familiar: EntityFamiliar) => void,
    familiarVariant?: FamiliarVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_FAMILIAR_RENDER_FILTER]: [
    callback: (familiar: EntityFamiliar, renderOffset: Vector) => void,
    familiarVariant?: FamiliarVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_FAMILIAR_STATE_CHANGED]: [
    callback: (
      familiar: EntityFamiliar,
      previousState: int,
      currentState: int,
    ) => void,
    familiarVariant?: FamiliarVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_FAMILIAR_UPDATE_FILTER]: [
    callback: (familiar: EntityFamiliar) => void,
    familiarVariant?: FamiliarVariant,
    subType?: int,
  ];

  // - Co-op babies cannot turn into Esau Jr, so it does not make sense to filter by
  //   `PlayerVariant`.
  // - The character of Esau Jr. is equal to `PlayerType.ISAAC`, so it does not make sense to filter
  //   by character.
  [ModCallbackCustom.POST_FIRST_ESAU_JR]: [
    callback: (player: EntityPlayer) => void,
  ];

  [ModCallbackCustom.POST_FIRST_FLIP]: [
    callback: (newLazarus: EntityPlayer, oldLazarus: EntityPlayer) => void,
  ];

  [ModCallbackCustom.POST_FLIP]: [
    callback: (newLazarus: EntityPlayer, oldLazarus: EntityPlayer) => void,
  ];

  [ModCallbackCustom.POST_GAME_END_FILTER]: [
    callback: (isGameOver: boolean) => void,
    isGameOver?: boolean,
  ];

  [ModCallbackCustom.POST_GAME_STARTED_REORDERED]: [
    callback: (isContinued: boolean) => void,
    // `isContinued` is mandatory to prevent users from shooting themselves in the foot.
    isContinued: boolean | undefined,
  ];

  [ModCallbackCustom.POST_GAME_STARTED_REORDERED_LAST]: [
    callback: (isContinued: boolean) => void,
    // `isContinued` is mandatory to prevent users from shooting themselves in the foot.
    isContinued: boolean | undefined,
  ];

  [ModCallbackCustom.POST_GREED_MODE_WAVE]: [
    callback: (oldWave: int, newWave: int) => void,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_BROKEN]: [
    callback: (gridEntity: GridEntity) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_COLLISION]: [
    callback: (gridEntity: GridEntity, entity: Entity) => void,
    gridEntityType?: GridEntityType,
    gridEntityVariant?: int,
    entityType?: EntityType,
    entityVariant?: int,
    entitySubType?: int,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_BROKEN]: [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_COLLISION]: [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
      entity: Entity,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
    entityType?: EntityType,
    entityVariant?: int,
    entitySubType?: int,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_INIT]: [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_REMOVE]: [
    callback: (gridIndex: int, gridEntityTypeCustom: GridEntityType) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_RENDER]: [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_STATE_CHANGED]: [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
      oldState: int,
      newState: int,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_UPDATE]: [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_INIT]: [
    callback: (gridEntity: GridEntity) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_REMOVE]: [
    callback: (
      gridIndex: int,
      gridEntityType: GridEntityType,
      variant: int,
    ) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_RENDER]: [
    callback: (gridEntity: GridEntity) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_STATE_CHANGED]: [
    callback: (gridEntity: GridEntity, oldState: int, newState: int) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  [ModCallbackCustom.POST_GRID_ENTITY_UPDATE]: [
    callback: (gridEntity: GridEntity) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  [ModCallbackCustom.POST_HOLY_MANTLE_REMOVED]: [
    callback: (
      player: EntityPlayer,
      oldNumHolyMantles: int,
      newNumHolyMantles: int,
    ) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.POST_ITEM_DISCHARGE]: [
    callback: (
      player: EntityPlayer,
      collectibleType: CollectibleType,
      activeSlot: ActiveSlot,
    ) => void,
    collectibleType?: CollectibleType,
  ];

  [ModCallbackCustom.POST_ITEM_PICKUP]:
    | [callback: (player: EntityPlayer, pickingUpItem: PickingUpItem) => void]
    | [
        callback: (
          player: EntityPlayer,
          pickingUpItem: PickingUpItemCollectible,
        ) => void,
        itemType: ItemType.PASSIVE | ItemType.ACTIVE | ItemType.FAMILIAR,
        collectibleType?: CollectibleType,
      ]
    | [
        callback: (
          player: EntityPlayer,
          pickingUpItem: PickingUpItemTrinket,
        ) => void,
        itemType: ItemType.TRINKET,
        trinketType?: TrinketType,
      ];

  [ModCallbackCustom.POST_KEYBOARD_CHANGED]: [
    callback: (keyboard: Keyboard, pressed: boolean) => void,
    keyboard?: Keyboard,
    pressed?: boolean,
  ];

  [ModCallbackCustom.POST_KNIFE_INIT_FILTER]: [
    callback: (knife: EntityKnife) => void,
    knifeVariant?: KnifeVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_KNIFE_INIT_LATE]: [
    callback: (knife: EntityKnife) => void,
    knifeVariant?: KnifeVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_KNIFE_RENDER_FILTER]: [
    callback: (knife: EntityKnife, renderOffset: Vector) => void,
    knifeVariant?: KnifeVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_KNIFE_UPDATE_FILTER]: [
    callback: (knife: EntityKnife) => void,
    knifeVariant?: KnifeVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_LASER_INIT_FILTER]: [
    callback: (laser: EntityLaser) => void,
    laserVariant?: LaserVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_LASER_INIT_LATE]: [
    callback: (laser: EntityLaser) => void,
    laserVariant?: LaserVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_LASER_RENDER_FILTER]: [
    callback: (laser: EntityLaser, renderOffset: Vector) => void,
    laserVariant?: LaserVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_LASER_UPDATE_FILTER]: [
    callback: (laser: EntityLaser) => void,
    laserVariant?: LaserVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_NEW_LEVEL_REORDERED]: [
    callback: (stage: LevelStage, stageType: StageType) => void,
    stage?: LevelStage,
    stageType?: StageType,
  ];

  [ModCallbackCustom.POST_NEW_ROOM_EARLY]: [
    callback: (roomType: RoomType) => void,
    roomType?: RoomType,
  ];

  [ModCallbackCustom.POST_NEW_ROOM_REORDERED]: [
    callback: (roomType: RoomType) => void,
    roomType?: RoomType,
  ];

  [ModCallbackCustom.POST_NPC_DEATH_FILTER]: [
    callback: (npc: EntityNPC) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  [ModCallbackCustom.POST_NPC_INIT_FILTER]: [
    callback: (npc: EntityNPC) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  [ModCallbackCustom.POST_NPC_INIT_LATE]: [
    callback: (npc: EntityNPC) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  [ModCallbackCustom.POST_NPC_RENDER_FILTER]: [
    callback: (npc: EntityNPC, renderOffset: Vector) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  [ModCallbackCustom.POST_NPC_STATE_CHANGED]: [
    callback: (npc: EntityNPC, previousState: int, currentState: int) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  [ModCallbackCustom.POST_NPC_UPDATE_FILTER]: [
    callback: (npc: EntityNPC) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.POST_PICKUP_CHANGED]: [
    callback: (
      pickup: EntityPickup,
      oldVariant: PickupVariant,
      oldSubType: int,
      newVariant: PickupVariant,
      newSubType: int,
    ) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PICKUP_COLLECT]: [
    callback: (pickup: EntityPickup, player: EntityPlayer) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PICKUP_INIT_FILTER]: [
    callback: (pickup: EntityPickup) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PICKUP_INIT_FIRST]: [
    callback: (pickup: EntityPickup) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PICKUP_INIT_LATE]: [
    callback: (pickup: EntityPickup) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PICKUP_RENDER_FILTER]: [
    callback: (pickup: EntityPickup, renderOffset: Vector) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PICKUP_SELECTION_FILTER]: [
    callback: (
      pickup: EntityPickup,
      variant: PickupVariant,
      subType: int,
    ) => [pickupVariant: PickupVariant, subType: int] | undefined,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PICKUP_STATE_CHANGED]: [
    callback: (
      pickup: EntityPickup,
      previousState: int,
      currentState: int,
    ) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PICKUP_UPDATE_FILTER]: [
    callback: (pickup: EntityPickup) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PIT_RENDER]: [
    callback: (pit: GridEntityPit) => void,
    pitVariant?: PitVariant,
  ];

  [ModCallbackCustom.POST_PIT_UPDATE]: [
    callback: (pit: GridEntityPit) => void,
    pitVariant?: PitVariant,
  ];

  [ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH]: [
    callback: (
      player: EntityPlayer,
      healthType: HealthType,
      difference: int,
      oldValue: int,
      newValue: int,
    ) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.POST_PLAYER_CHANGE_STAT]: [
    callback: <T extends PlayerStat>(
      player: EntityPlayer,
      playerStat: PlayerStat,
      difference: int,
      oldValue: PlayerStats[T],
      newValue: PlayerStats[T],
    ) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.POST_PLAYER_CHANGE_TYPE]: [
    callback: (
      player: EntityPlayer,
      oldCharacter: PlayerType,
      newCharacter: PlayerType,
    ) => void,
    playerVariant?: PlayerVariant,
  ];

  [ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED]: [
    callback: (player: EntityPlayer, collectibleType: CollectibleType) => void,
    collectibleType?: CollectibleType,
  ];

  [ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED]: [
    callback: (player: EntityPlayer, collectibleType: CollectibleType) => void,
    collectibleType?: CollectibleType,
  ];

  [ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE]: [
    callback: (
      player: EntityPlayer,
      amount: float,
      damageFlags: BitFlags<DamageFlag>,
      source: EntityRef,
      countdownFrames: int,
    ) => boolean | undefined,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.POST_PLAYER_INIT_FIRST]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.POST_PLAYER_INIT_LATE]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.POST_PLAYER_RENDER_REORDERED]: [
    callback: (player: EntityPlayer, renderOffset: Vector) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.POST_PLAYER_UPDATE_REORDERED]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.POST_POOP_RENDER]: [
    callback: (poop: GridEntityPoop) => void,
    poopVariant?: PoopGridEntityVariant,
  ];

  [ModCallbackCustom.POST_POOP_UPDATE]: [
    callback: (poop: GridEntityPoop) => void,
    poopVariant?: PoopGridEntityVariant,
  ];

  [ModCallbackCustom.POST_PRESSURE_PLATE_RENDER]: [
    callback: (pressurePlate: GridEntityPressurePlate) => void,
    pressurePlateVariant?: PressurePlateVariant,
  ];

  [ModCallbackCustom.POST_PRESSURE_PLATE_UPDATE]: [
    callback: (pressurePlate: GridEntityPressurePlate) => void,
    pressurePlateVariant?: PressurePlateVariant,
  ];

  [ModCallbackCustom.POST_PROJECTILE_INIT_FILTER]: [
    callback: (projectile: EntityProjectile) => void,
    projectileVariant?: ProjectileVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PROJECTILE_INIT_LATE]: [
    callback: (projectile: EntityProjectile) => void,
    projectileVariant?: ProjectileVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PROJECTILE_KILL]: [
    callback: (projectile: EntityProjectile) => void,
    projectileVariant?: ProjectileVariant,
    subType?: number,
  ];

  [ModCallbackCustom.POST_PROJECTILE_UPDATE_FILTER]: [
    callback: (projectile: EntityProjectile) => void,
    projectileVariant?: ProjectileVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PROJECTILE_RENDER_FILTER]: [
    callback: (projectile: EntityProjectile, renderOffset: Vector) => void,
    projectileVariant?: ProjectileVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_PURCHASE]: [
    callback: (player: EntityPlayer, pickup: EntityPickup) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_ROCK_RENDER]: [
    callback: (rock: GridEntityRock) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  [ModCallbackCustom.POST_ROCK_UPDATE]: [
    callback: (rock: GridEntityRock) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  [ModCallbackCustom.POST_ROOM_CLEAR_CHANGED]: [
    callback: (roomClear: boolean) => void,
    roomClear?: boolean,
  ];

  [ModCallbackCustom.POST_SACRIFICE]: [
    callback: (player: EntityPlayer, numSacrifices: int) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED]: [
    callback: (
      slot: EntitySlot,
      previousAnimation: string,
      currentAnimation: string,
    ) => void,
    slotVariant?: SlotVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_SLOT_COLLISION]: [
    callback: (slot: EntitySlot, player: EntityPlayer) => void,
    slotVariant?: SlotVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_SLOT_DESTROYED]: [
    callback: (
      slot: EntitySlot,
      slotDestructionType: SlotDestructionType,
    ) => void,
    slotVariant?: SlotVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_SLOT_INIT]: [
    callback: (slot: EntitySlot) => void,
    slotVariant?: SlotVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_SLOT_RENDER]: [
    callback: (slot: EntitySlot) => void,
    slotVariant?: SlotVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_SLOT_UPDATE]: [
    callback: (slot: EntitySlot) => void,
    slotVariant?: SlotVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_SPIKES_RENDER]: [
    callback: (spikes: GridEntitySpikes) => void,
    variant?: int,
  ];

  [ModCallbackCustom.POST_SPIKES_UPDATE]: [
    callback: (spikes: GridEntitySpikes) => void,
    variant?: int,
  ];

  [ModCallbackCustom.POST_TEAR_INIT_FILTER]: [
    callback: (tear: EntityTear) => void,
    tearVariant?: TearVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_TEAR_INIT_LATE]: [
    callback: (tear: EntityTear) => void,
    tearVariant?: TearVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_TEAR_INIT_VERY_LATE]: [
    callback: (tear: EntityTear) => void,
    tearVariant?: TearVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_TEAR_KILL]: [
    callback: (tear: EntityTear) => void,
    tearVariant?: TearVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_TEAR_RENDER_FILTER]: [
    callback: (tear: EntityTear, renderOffset: Vector) => void,
    tearVariant?: TearVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_TEAR_UPDATE_FILTER]: [
    callback: (tear: EntityTear) => void,
    tearVariant?: TearVariant,
    subType?: int,
  ];

  [ModCallbackCustom.POST_TNT_RENDER]: [
    callback: (tnt: GridEntityTNT) => void,
    variant?: int,
  ];

  [ModCallbackCustom.POST_TNT_UPDATE]: [
    callback: (tnt: GridEntityTNT) => void,
    variant?: int,
  ];

  [ModCallbackCustom.POST_TRANSFORMATION]: [
    callback: (
      player: EntityPlayer,
      playerForm: PlayerForm,
      hasForm: boolean,
    ) => void,
    playerForm?: PlayerForm,
  ];

  [ModCallbackCustom.POST_TRINKET_BREAK]: [
    callback: (player: EntityPlayer, trinketType: TrinketType) => void,
    trinketType?: TrinketType,
  ];

  [ModCallbackCustom.POST_USE_PILL_FILTER]: [
    callback: (
      pillEffect: PillEffect,
      pillColor: PillColor,
      player: EntityPlayer,
      useFlags: BitFlags<UseFlag>,
    ) => void,
    pillEffect?: PillEffect,
    pillColor?: PillColor,
  ];

  [ModCallbackCustom.PRE_BERSERK_DEATH]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.PRE_BOMB_COLLISION_FILTER]: [
    callback: (
      bomb: EntityBomb,
      collider: Entity,
      low: boolean,
    ) => boolean | undefined,
    bombVariant?: BombVariant,
    subtype?: int,
  ];

  [ModCallbackCustom.PRE_CUSTOM_REVIVE]: [
    callback: (player: EntityPlayer) => int | undefined,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.PRE_ENTITY_SPAWN_FILTER]: [
    callback: (
      entityType: EntityType,
      variant: int,
      subType: int,
      position: Vector,
      velocity: Vector,
      spawner: Entity | undefined,
      initSeed: Seed,
    ) =>
      | [entityType: EntityType, variant: int, subType: int, initSeed: Seed]
      | undefined,
    entityType?: EntityType,
    variant?: int,
    subtype?: int,
  ];

  [ModCallbackCustom.PRE_FAMILIAR_COLLISION_FILTER]: [
    callback: (
      familiar: EntityFamiliar,
      collider: Entity,
      low: boolean,
    ) => boolean | undefined,
    familiarVariant?: FamiliarVariant,
    subtype?: int,
  ];

  [ModCallbackCustom.PRE_GET_PEDESTAL]: [
    callback: (
      player: EntityPlayer,
      collectible: EntityPickupCollectible,
    ) => boolean | undefined,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom.PRE_ITEM_PICKUP]:
    | [
        callback: (
          player: EntityPlayer,
          pickingUpItem: PickingUpItem,
        ) => boolean | undefined,
      ]
    | [
        callback: (
          player: EntityPlayer,
          pickingUpItem: PickingUpItemCollectible,
        ) => boolean | undefined,
        itemType: ItemType.PASSIVE | ItemType.ACTIVE | ItemType.FAMILIAR,
        collectibleType?: CollectibleType,
      ]
    | [
        callback: (
          player: EntityPlayer,
          pickingUpItem: PickingUpItemTrinket,
        ) => boolean | undefined,
        itemType: ItemType.TRINKET,
        trinketType?: TrinketType,
      ];

  [ModCallbackCustom.PRE_KNIFE_COLLISION_FILTER]: [
    callback: (
      knife: EntityKnife,
      collider: Entity,
      low: boolean,
    ) => boolean | undefined,
    knifeVariant?: KnifeVariant,
    subtype?: int,
  ];

  [ModCallbackCustom.PRE_NEW_LEVEL]: [callback: (player: EntityPlayer) => void];

  [ModCallbackCustom.PRE_NPC_COLLISION_FILTER]: [
    callback: (
      npc: EntityNPC,
      collider: Entity,
      low: boolean,
    ) => undefined | boolean,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  [ModCallbackCustom.PRE_NPC_UPDATE_FILTER]: [
    callback: (npc: EntityNPC) => undefined | boolean,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  [ModCallbackCustom.PRE_PROJECTILE_COLLISION_FILTER]: [
    callback: (
      projectile: EntityProjectile,
      collider: Entity,
      low: boolean,
    ) => boolean | undefined,
    projectileVariant?: ProjectileVariant,
    subtype?: int,
  ];

  [ModCallbackCustom.PRE_ROOM_ENTITY_SPAWN_FILTER]: [
    callback: (
      entityTypeOrGridEntityXMLType: EntityType | GridEntityXMLType,
      variant: int,
      subType: int,
      gridIndex: int,
      initSeed: Seed,
    ) =>
      | [type: EntityType | GridEntityXMLType, variant: int, subType: int]
      | undefined,
    entityTypeOrGridEntityXMLType?: EntityType | GridEntityXMLType,
    variant?: int,
    subType?: int,
  ];

  [ModCallbackCustom.PRE_TEAR_COLLISION_FILTER]: [
    callback: (
      tear: EntityTear,
      collider: Entity,
      low: boolean,
    ) => boolean | undefined,
    tearVariant?: TearVariant,
    subtype?: int,
  ];
}

interfaceSatisfiesEnum<AddCallbackParametersCustom, ModCallbackCustom>();
