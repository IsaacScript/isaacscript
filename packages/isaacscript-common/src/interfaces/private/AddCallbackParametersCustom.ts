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
  readonly [ModCallbackCustom.ENTITY_TAKE_DMG_FILTER]: readonly [
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

  readonly [ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER]: readonly [
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

  readonly [ModCallbackCustom.INPUT_ACTION_FILTER]: readonly [
    callback: (
      entity: Entity | undefined,
      inputHook: InputHook,
      buttonAction: ButtonAction,
    ) => boolean | float | undefined,
    inputHook?: InputHook,
    buttonAction?: ButtonAction,
  ];

  readonly [ModCallbackCustom.INPUT_ACTION_PLAYER]: readonly [
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

  readonly [ModCallbackCustom.POST_AMBUSH_FINISHED]: readonly [
    callback: (ambushType: AmbushType) => void,
    ambushType?: AmbushType,
  ];

  readonly [ModCallbackCustom.POST_AMBUSH_STARTED]: readonly [
    callback: (ambushType: AmbushType) => void,
    ambushType?: AmbushType,
  ];

  readonly [ModCallbackCustom.POST_BOMB_EXPLODED]: readonly [
    callback: (bomb: EntityBomb) => void,
    bombVariant?: BombVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_BOMB_INIT_FILTER]: readonly [
    callback: (bomb: EntityBomb) => void,
    bombVariant?: BombVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_BOMB_INIT_LATE]: readonly [
    callback: (bomb: EntityBomb) => void,
    bombVariant?: BombVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_BOMB_RENDER_FILTER]: readonly [
    callback: (bomb: EntityBomb, renderOffset: Vector) => void,
    bombVariant?: BombVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_BOMB_UPDATE_FILTER]: readonly [
    callback: (bomb: EntityBomb) => void,
    bombVariant?: BombVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_BONE_SWING]: readonly [
    callback: (knife: EntityKnife) => void,
  ];

  readonly [ModCallbackCustom.POST_COLLECTIBLE_EMPTY]: readonly [
    callback: (
      collectible: EntityPickupCollectible,
      oldCollectibleType: CollectibleType,
    ) => void,
    collectibleType?: CollectibleType,
  ];

  readonly [ModCallbackCustom.POST_CURSED_TELEPORT]: readonly [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  readonly [ModCallbackCustom.POST_CUSTOM_REVIVE]: readonly [
    callback: (player: EntityPlayer, revivalType: int) => void,
    revivalType?: int,
  ];

  readonly [ModCallbackCustom.POST_DICE_ROOM_ACTIVATED]: readonly [
    callback: (
      player: EntityPlayer,
      diceFloorSubType: DiceFloorSubType,
    ) => void,
    diceFloorSubType?: DiceFloorSubType,
  ];

  readonly [ModCallbackCustom.POST_DOOR_RENDER]: readonly [
    callback: (door: GridEntityDoor) => void,
    doorVariant?: DoorVariant,
  ];

  readonly [ModCallbackCustom.POST_DOOR_UPDATE]: readonly [
    callback: (door: GridEntityDoor) => void,
    doorVariant?: DoorVariant,
  ];

  readonly [ModCallbackCustom.POST_EFFECT_INIT_FILTER]: readonly [
    callback: (effect: EntityEffect) => void,
    effectVariant?: EffectVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_EFFECT_INIT_LATE]: readonly [
    callback: (effect: EntityEffect) => void,
    effectVariant?: EffectVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_EFFECT_RENDER_FILTER]: readonly [
    callback: (effect: EntityEffect, renderOffset: Vector) => void,
    effectVariant?: EffectVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_EFFECT_STATE_CHANGED]: readonly [
    callback: (
      effect: EntityEffect,
      previousState: int,
      currentState: int,
    ) => void,
    effectVariant?: EffectVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_EFFECT_UPDATE_FILTER]: readonly [
    callback: (effect: EntityEffect) => void,
    effectVariant?: EffectVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_ENTITY_KILL_FILTER]: readonly [
    callback: (entity: Entity) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_ENTITY_REMOVE_FILTER]: readonly [
    callback: (entity: Entity) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  // - Co-op babies cannot turn into Esau Jr, so it does not make sense to filter by
  //   `PlayerVariant`.
  // - The character of Esau Jr. is equal to `PlayerType.ISAAC`, so it does not make sense to filter
  //   by character.
  readonly [ModCallbackCustom.POST_ESAU_JR]: readonly [
    callback: (player: EntityPlayer) => void,
  ];

  readonly [ModCallbackCustom.POST_FAMILIAR_INIT_FILTER]: readonly [
    callback: (familiar: EntityFamiliar) => void,
    familiarVariant?: FamiliarVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_FAMILIAR_INIT_LATE]: readonly [
    callback: (familiar: EntityFamiliar) => void,
    familiarVariant?: FamiliarVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_FAMILIAR_RENDER_FILTER]: readonly [
    callback: (familiar: EntityFamiliar, renderOffset: Vector) => void,
    familiarVariant?: FamiliarVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_FAMILIAR_STATE_CHANGED]: readonly [
    callback: (
      familiar: EntityFamiliar,
      previousState: int,
      currentState: int,
    ) => void,
    familiarVariant?: FamiliarVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_FAMILIAR_UPDATE_FILTER]: readonly [
    callback: (familiar: EntityFamiliar) => void,
    familiarVariant?: FamiliarVariant,
    subType?: int,
  ];

  // - Co-op babies cannot turn into Esau Jr, so it does not make sense to filter by
  //   `PlayerVariant`.
  // - The character of Esau Jr. is equal to `PlayerType.ISAAC`, so it does not make sense to filter
  //   by character.
  readonly [ModCallbackCustom.POST_FIRST_ESAU_JR]: readonly [
    callback: (player: EntityPlayer) => void,
  ];

  readonly [ModCallbackCustom.POST_FIRST_FLIP]: readonly [
    callback: (newLazarus: EntityPlayer, oldLazarus: EntityPlayer) => void,
  ];

  readonly [ModCallbackCustom.POST_FLIP]: readonly [
    callback: (newLazarus: EntityPlayer, oldLazarus: EntityPlayer) => void,
  ];

  readonly [ModCallbackCustom.POST_GAME_END_FILTER]: readonly [
    callback: (isGameOver: boolean) => void,
    isGameOver?: boolean,
  ];

  readonly [ModCallbackCustom.POST_GAME_STARTED_REORDERED]: readonly [
    callback: (isContinued: boolean) => void,
    // `isContinued` is mandatory to prevent users from shooting themselves in the foot.
    isContinued: boolean | undefined,
  ];

  readonly [ModCallbackCustom.POST_GAME_STARTED_REORDERED_LAST]: readonly [
    callback: (isContinued: boolean) => void,
    // `isContinued` is mandatory to prevent users from shooting themselves in the foot.
    isContinued: boolean | undefined,
  ];

  readonly [ModCallbackCustom.POST_GREED_MODE_WAVE]: readonly [
    callback: (oldWave: int, newWave: int) => void,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_BROKEN]: readonly [
    callback: (gridEntity: GridEntity) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_COLLISION]: readonly [
    callback: (gridEntity: GridEntity, entity: Entity) => void,
    gridEntityType?: GridEntityType,
    gridEntityVariant?: int,
    entityType?: EntityType,
    entityVariant?: int,
    entitySubType?: int,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_BROKEN]: readonly [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_COLLISION]: readonly [
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

  readonly [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_INIT]: readonly [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_REMOVE]: readonly [
    callback: (gridIndex: int, gridEntityTypeCustom: GridEntityType) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_RENDER]: readonly [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_STATE_CHANGED]: readonly [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
      oldState: int,
      newState: int,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_UPDATE]: readonly [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_INIT]: readonly [
    callback: (gridEntity: GridEntity) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_REMOVE]: readonly [
    callback: (
      gridIndex: int,
      gridEntityType: GridEntityType,
      variant: int,
    ) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_RENDER]: readonly [
    callback: (gridEntity: GridEntity) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_STATE_CHANGED]: readonly [
    callback: (gridEntity: GridEntity, oldState: int, newState: int) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  readonly [ModCallbackCustom.POST_GRID_ENTITY_UPDATE]: readonly [
    callback: (gridEntity: GridEntity) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  readonly [ModCallbackCustom.POST_HOLY_MANTLE_REMOVED]: readonly [
    callback: (
      player: EntityPlayer,
      oldNumHolyMantles: int,
      newNumHolyMantles: int,
    ) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  readonly [ModCallbackCustom.POST_ITEM_DISCHARGE]: readonly [
    callback: (
      player: EntityPlayer,
      collectibleType: CollectibleType,
      activeSlot: ActiveSlot,
    ) => void,
    collectibleType?: CollectibleType,
  ];

  readonly [ModCallbackCustom.POST_ITEM_PICKUP]:
    | readonly [
        callback: (player: EntityPlayer, pickingUpItem: PickingUpItem) => void,
      ]
    | readonly [
        callback: (
          player: EntityPlayer,
          pickingUpItem: PickingUpItemCollectible,
        ) => void,
        itemType: ItemType.PASSIVE | ItemType.ACTIVE | ItemType.FAMILIAR,
        collectibleType?: CollectibleType,
      ]
    | readonly [
        callback: (
          player: EntityPlayer,
          pickingUpItem: PickingUpItemTrinket,
        ) => void,
        itemType: ItemType.TRINKET,
        trinketType?: TrinketType,
      ];

  readonly [ModCallbackCustom.POST_KEYBOARD_CHANGED]: readonly [
    callback: (keyboard: Keyboard, pressed: boolean) => void,
    keyboard?: Keyboard,
    pressed?: boolean,
  ];

  readonly [ModCallbackCustom.POST_KNIFE_INIT_FILTER]: readonly [
    callback: (knife: EntityKnife) => void,
    knifeVariant?: KnifeVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_KNIFE_INIT_LATE]: readonly [
    callback: (knife: EntityKnife) => void,
    knifeVariant?: KnifeVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_KNIFE_RENDER_FILTER]: readonly [
    callback: (knife: EntityKnife, renderOffset: Vector) => void,
    knifeVariant?: KnifeVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_KNIFE_UPDATE_FILTER]: readonly [
    callback: (knife: EntityKnife) => void,
    knifeVariant?: KnifeVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_LASER_INIT_FILTER]: readonly [
    callback: (laser: EntityLaser) => void,
    laserVariant?: LaserVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_LASER_INIT_LATE]: readonly [
    callback: (laser: EntityLaser) => void,
    laserVariant?: LaserVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_LASER_RENDER_FILTER]: readonly [
    callback: (laser: EntityLaser, renderOffset: Vector) => void,
    laserVariant?: LaserVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_LASER_UPDATE_FILTER]: readonly [
    callback: (laser: EntityLaser) => void,
    laserVariant?: LaserVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_NEW_LEVEL_REORDERED]: readonly [
    callback: (stage: LevelStage, stageType: StageType) => void,
    stage?: LevelStage,
    stageType?: StageType,
  ];

  readonly [ModCallbackCustom.POST_NEW_ROOM_EARLY]: readonly [
    callback: (roomType: RoomType) => void,
    roomType?: RoomType,
  ];

  readonly [ModCallbackCustom.POST_NEW_ROOM_REORDERED]: readonly [
    callback: (roomType: RoomType) => void,
    roomType?: RoomType,
  ];

  readonly [ModCallbackCustom.POST_NPC_DEATH_FILTER]: readonly [
    callback: (npc: EntityNPC) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_NPC_INIT_FILTER]: readonly [
    callback: (npc: EntityNPC) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_NPC_INIT_LATE]: readonly [
    callback: (npc: EntityNPC) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_NPC_RENDER_FILTER]: readonly [
    callback: (npc: EntityNPC, renderOffset: Vector) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_NPC_STATE_CHANGED]: readonly [
    callback: (npc: EntityNPC, previousState: int, currentState: int) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_NPC_UPDATE_FILTER]: readonly [
    callback: (npc: EntityNPC) => void,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED]: readonly [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  readonly [ModCallbackCustom.POST_PICKUP_CHANGED]: readonly [
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

  readonly [ModCallbackCustom.POST_PICKUP_COLLECT]: readonly [
    callback: (pickup: EntityPickup, player: EntityPlayer) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PICKUP_INIT_FILTER]: readonly [
    callback: (pickup: EntityPickup) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PICKUP_INIT_FIRST]: readonly [
    callback: (pickup: EntityPickup) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PICKUP_INIT_LATE]: readonly [
    callback: (pickup: EntityPickup) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PICKUP_RENDER_FILTER]: readonly [
    callback: (pickup: EntityPickup, renderOffset: Vector) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PICKUP_SELECTION_FILTER]: readonly [
    callback: (
      pickup: EntityPickup,
      variant: PickupVariant,
      subType: int,
    ) => [pickupVariant: PickupVariant, subType: int] | undefined,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PICKUP_STATE_CHANGED]: readonly [
    callback: (
      pickup: EntityPickup,
      previousState: int,
      currentState: int,
    ) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PICKUP_UPDATE_FILTER]: readonly [
    callback: (pickup: EntityPickup) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PIT_RENDER]: readonly [
    callback: (pit: GridEntityPit) => void,
    pitVariant?: PitVariant,
  ];

  readonly [ModCallbackCustom.POST_PIT_UPDATE]: readonly [
    callback: (pit: GridEntityPit) => void,
    pitVariant?: PitVariant,
  ];

  readonly [ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH]: readonly [
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

  readonly [ModCallbackCustom.POST_PLAYER_CHANGE_STAT]: readonly [
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

  readonly [ModCallbackCustom.POST_PLAYER_CHANGE_TYPE]: readonly [
    callback: (
      player: EntityPlayer,
      oldCharacter: PlayerType,
      newCharacter: PlayerType,
    ) => void,
    playerVariant?: PlayerVariant,
  ];

  readonly [ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED]: readonly [
    callback: (player: EntityPlayer, collectibleType: CollectibleType) => void,
    collectibleType?: CollectibleType,
  ];

  readonly [ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED]: readonly [
    callback: (player: EntityPlayer, collectibleType: CollectibleType) => void,
    collectibleType?: CollectibleType,
  ];

  readonly [ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE]: readonly [
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

  readonly [ModCallbackCustom.POST_PLAYER_INIT_FIRST]: readonly [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  readonly [ModCallbackCustom.POST_PLAYER_INIT_LATE]: readonly [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  readonly [ModCallbackCustom.POST_PLAYER_RENDER_REORDERED]: readonly [
    callback: (player: EntityPlayer, renderOffset: Vector) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  readonly [ModCallbackCustom.POST_PLAYER_UPDATE_REORDERED]: readonly [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  readonly [ModCallbackCustom.POST_POOP_RENDER]: readonly [
    callback: (poop: GridEntityPoop) => void,
    poopVariant?: PoopGridEntityVariant,
  ];

  readonly [ModCallbackCustom.POST_POOP_UPDATE]: readonly [
    callback: (poop: GridEntityPoop) => void,
    poopVariant?: PoopGridEntityVariant,
  ];

  readonly [ModCallbackCustom.POST_PRESSURE_PLATE_RENDER]: readonly [
    callback: (pressurePlate: GridEntityPressurePlate) => void,
    pressurePlateVariant?: PressurePlateVariant,
  ];

  readonly [ModCallbackCustom.POST_PRESSURE_PLATE_UPDATE]: readonly [
    callback: (pressurePlate: GridEntityPressurePlate) => void,
    pressurePlateVariant?: PressurePlateVariant,
  ];

  readonly [ModCallbackCustom.POST_PROJECTILE_INIT_FILTER]: readonly [
    callback: (projectile: EntityProjectile) => void,
    projectileVariant?: ProjectileVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PROJECTILE_INIT_LATE]: readonly [
    callback: (projectile: EntityProjectile) => void,
    projectileVariant?: ProjectileVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PROJECTILE_KILL]: readonly [
    callback: (projectile: EntityProjectile) => void,
    projectileVariant?: ProjectileVariant,
    subType?: number,
  ];

  readonly [ModCallbackCustom.POST_PROJECTILE_UPDATE_FILTER]: readonly [
    callback: (projectile: EntityProjectile) => void,
    projectileVariant?: ProjectileVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PROJECTILE_RENDER_FILTER]: readonly [
    callback: (projectile: EntityProjectile, renderOffset: Vector) => void,
    projectileVariant?: ProjectileVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_PURCHASE]: readonly [
    callback: (player: EntityPlayer, pickup: EntityPickup) => void,
    pickupVariant?: PickupVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_ROCK_RENDER]: readonly [
    callback: (rock: GridEntityRock) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  readonly [ModCallbackCustom.POST_ROCK_UPDATE]: readonly [
    callback: (rock: GridEntityRock) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  readonly [ModCallbackCustom.POST_ROOM_CLEAR_CHANGED]: readonly [
    callback: (roomClear: boolean) => void,
    roomClear?: boolean,
  ];

  readonly [ModCallbackCustom.POST_SACRIFICE]: readonly [
    callback: (player: EntityPlayer, numSacrifices: int) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  readonly [ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED]: readonly [
    callback: (
      slot: EntitySlot,
      previousAnimation: string,
      currentAnimation: string,
    ) => void,
    slotVariant?: SlotVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_SLOT_COLLISION]: readonly [
    callback: (slot: EntitySlot, player: EntityPlayer) => void,
    slotVariant?: SlotVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_SLOT_DESTROYED]: readonly [
    callback: (
      slot: EntitySlot,
      slotDestructionType: SlotDestructionType,
    ) => void,
    slotVariant?: SlotVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_SLOT_INIT]: readonly [
    callback: (slot: EntitySlot) => void,
    slotVariant?: SlotVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_SLOT_RENDER]: readonly [
    callback: (slot: EntitySlot) => void,
    slotVariant?: SlotVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_SLOT_UPDATE]: readonly [
    callback: (slot: EntitySlot) => void,
    slotVariant?: SlotVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_SPIKES_RENDER]: readonly [
    callback: (spikes: GridEntitySpikes) => void,
    variant?: int,
  ];

  readonly [ModCallbackCustom.POST_SPIKES_UPDATE]: readonly [
    callback: (spikes: GridEntitySpikes) => void,
    variant?: int,
  ];

  readonly [ModCallbackCustom.POST_TEAR_INIT_FILTER]: readonly [
    callback: (tear: EntityTear) => void,
    tearVariant?: TearVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_TEAR_INIT_LATE]: readonly [
    callback: (tear: EntityTear) => void,
    tearVariant?: TearVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_TEAR_INIT_VERY_LATE]: readonly [
    callback: (tear: EntityTear) => void,
    tearVariant?: TearVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_TEAR_KILL]: readonly [
    callback: (tear: EntityTear) => void,
    tearVariant?: TearVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_TEAR_RENDER_FILTER]: readonly [
    callback: (tear: EntityTear, renderOffset: Vector) => void,
    tearVariant?: TearVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_TEAR_UPDATE_FILTER]: readonly [
    callback: (tear: EntityTear) => void,
    tearVariant?: TearVariant,
    subType?: int,
  ];

  readonly [ModCallbackCustom.POST_TNT_RENDER]: readonly [
    callback: (tnt: GridEntityTNT) => void,
    variant?: int,
  ];

  readonly [ModCallbackCustom.POST_TNT_UPDATE]: readonly [
    callback: (tnt: GridEntityTNT) => void,
    variant?: int,
  ];

  readonly [ModCallbackCustom.POST_TRANSFORMATION]: readonly [
    callback: (
      player: EntityPlayer,
      playerForm: PlayerForm,
      hasForm: boolean,
    ) => void,
    playerForm?: PlayerForm,
  ];

  readonly [ModCallbackCustom.POST_TRINKET_BREAK]: readonly [
    callback: (player: EntityPlayer, trinketType: TrinketType) => void,
    trinketType?: TrinketType,
  ];

  readonly [ModCallbackCustom.POST_USE_PILL_FILTER]: readonly [
    callback: (
      pillEffect: PillEffect,
      pillColor: PillColor,
      player: EntityPlayer,
      useFlags: BitFlags<UseFlag>,
    ) => void,
    pillEffect?: PillEffect,
    pillColor?: PillColor,
  ];

  readonly [ModCallbackCustom.PRE_BERSERK_DEATH]: readonly [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  readonly [ModCallbackCustom.PRE_BOMB_COLLISION_FILTER]: readonly [
    callback: (
      bomb: EntityBomb,
      collider: Entity,
      low: boolean,
    ) => boolean | undefined,
    bombVariant?: BombVariant,
    subtype?: int,
  ];

  readonly [ModCallbackCustom.PRE_CUSTOM_REVIVE]: readonly [
    callback: (player: EntityPlayer) => int | undefined,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  readonly [ModCallbackCustom.PRE_ENTITY_SPAWN_FILTER]: readonly [
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

  readonly [ModCallbackCustom.PRE_FAMILIAR_COLLISION_FILTER]: readonly [
    callback: (
      familiar: EntityFamiliar,
      collider: Entity,
      low: boolean,
    ) => boolean | undefined,
    familiarVariant?: FamiliarVariant,
    subtype?: int,
  ];

  readonly [ModCallbackCustom.PRE_GET_PEDESTAL]: readonly [
    callback: (
      player: EntityPlayer,
      collectible: EntityPickupCollectible,
    ) => boolean | undefined,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  readonly [ModCallbackCustom.PRE_ITEM_PICKUP]:
    | readonly [
        callback: (
          player: EntityPlayer,
          pickingUpItem: PickingUpItem,
        ) => boolean | undefined,
      ]
    | readonly [
        callback: (
          player: EntityPlayer,
          pickingUpItem: PickingUpItemCollectible,
        ) => boolean | undefined,
        itemType: ItemType.PASSIVE | ItemType.ACTIVE | ItemType.FAMILIAR,
        collectibleType?: CollectibleType,
      ]
    | readonly [
        callback: (
          player: EntityPlayer,
          pickingUpItem: PickingUpItemTrinket,
        ) => boolean | undefined,
        itemType: ItemType.TRINKET,
        trinketType?: TrinketType,
      ];

  readonly [ModCallbackCustom.PRE_KNIFE_COLLISION_FILTER]: readonly [
    callback: (
      knife: EntityKnife,
      collider: Entity,
      low: boolean,
    ) => boolean | undefined,
    knifeVariant?: KnifeVariant,
    subtype?: int,
  ];

  readonly [ModCallbackCustom.PRE_NEW_LEVEL]: readonly [
    callback: (player: EntityPlayer) => void,
  ];

  readonly [ModCallbackCustom.PRE_NPC_COLLISION_FILTER]: readonly [
    callback: (
      npc: EntityNPC,
      collider: Entity,
      low: boolean,
    ) => undefined | boolean,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  readonly [ModCallbackCustom.PRE_NPC_UPDATE_FILTER]: readonly [
    callback: (npc: EntityNPC) => undefined | boolean,
    entityType?: EntityType,
    variant?: int,
    subType?: int,
  ];

  readonly [ModCallbackCustom.PRE_PROJECTILE_COLLISION_FILTER]: readonly [
    callback: (
      projectile: EntityProjectile,
      collider: Entity,
      low: boolean,
    ) => boolean | undefined,
    projectileVariant?: ProjectileVariant,
    subtype?: int,
  ];

  readonly [ModCallbackCustom.PRE_ROOM_ENTITY_SPAWN_FILTER]: readonly [
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

  readonly [ModCallbackCustom.PRE_TEAR_COLLISION_FILTER]: readonly [
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
