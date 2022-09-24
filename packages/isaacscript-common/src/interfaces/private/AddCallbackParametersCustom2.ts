import {
  BombVariant,
  CollectibleType,
  DamageFlag,
  DiceFloorSubType,
  DoorVariant,
  EffectVariant,
  EntityType,
  FamiliarVariant,
  GridEntityType,
  KnifeVariant,
  PitVariant,
  PlayerType,
  PlayerVariant,
} from "isaac-typescript-definitions";
import { AmbushType } from "../../enums/AmbushType";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { validateInterfaceMatchesEnum } from "../../functions/utils";

export interface AddCallbackParametersCustom2 {
  [ModCallbackCustom2.POST_AMBUSH_FINISHED]: [
    callback: (ambushType: AmbushType) => void,
    ambushType?: AmbushType,
  ];

  [ModCallbackCustom2.POST_AMBUSH_STARTED]: [
    callback: (ambushType: AmbushType) => void,
    ambushType?: AmbushType,
  ];

  [ModCallbackCustom2.POST_BOMB_EXPLODED]: [
    callback: (bomb: EntityBomb) => void,
    bombVariant?: BombVariant,
  ];

  [ModCallbackCustom2.POST_BOMB_INIT_LATE]: [
    callback: (bomb: EntityBomb) => void,
    bombVariant?: BombVariant,
  ];

  [ModCallbackCustom2.POST_BONE_SWING]: [
    callback: (knife: EntityKnife) => void,
  ];

  [ModCallbackCustom2.POST_COLLECTIBLE_EMPTY]: [
    callback: (
      collectible: EntityPickupCollectible,
      oldCollectibleType: CollectibleType,
    ) => void,
    collectibleType?: CollectibleType,
  ];

  [ModCallbackCustom2.POST_COLLECTIBLE_INIT_FIRST]: [
    callback: (collectible: EntityPickupCollectible) => void,
    collectibleType?: CollectibleType,
  ];

  [ModCallbackCustom2.POST_CURSED_TELEPORT]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom2.POST_CUSTOM_REVIVE]: [
    callback: (player: EntityPlayer, revivalType: int) => void,
    revivalType?: int,
  ];

  [ModCallbackCustom2.POST_DICE_ROOM_ACTIVATED]: [
    callback: (
      player: EntityPlayer,
      diceFloorSubType: DiceFloorSubType,
    ) => void,
    diceFloorSubType?: DiceFloorSubType,
  ];

  [ModCallbackCustom2.POST_DOOR_RENDER]: [
    callback: (door: GridEntityDoor) => void,
    doorVariant?: DoorVariant,
  ];

  [ModCallbackCustom2.POST_DOOR_UPDATE]: [
    callback: (door: GridEntityDoor) => void,
    doorVariant?: DoorVariant,
  ];

  [ModCallbackCustom2.POST_EFFECT_INIT_LATE]: [
    callback: (effect: EntityEffect) => void,
    effectVariant?: EffectVariant,
  ];

  [ModCallbackCustom2.POST_EFFECT_STATE_CHANGED]: [
    callback: (
      effect: EntityEffect,
      previousState: int,
      currentState: int,
    ) => void,
    effectVariant?: EffectVariant,
  ];

  // - Co-op babies cannot turn into Esau Jr, so it does not make sense to filter by
  //   `PlayerVariant`.
  // - The character of Esau Jr. is equal to `PlayerType.ISAAC`, so it does not make sense to filter
  //   by character.
  [ModCallbackCustom2.POST_ESAU_JR]: [callback: (player: EntityPlayer) => void];

  [ModCallbackCustom2.POST_FAMILIAR_INIT_LATE]: [
    callback: (familiar: EntityFamiliar) => void,
    familiarVariant?: FamiliarVariant,
  ];

  [ModCallbackCustom2.POST_FAMILIAR_STATE_CHANGED]: [
    callback: (
      familiar: EntityFamiliar,
      previousState: int,
      currentState: int,
    ) => void,
    familiarVariant?: FamiliarVariant,
  ];

  // - Co-op babies cannot turn into Esau Jr, so it does not make sense to filter by
  //   `PlayerVariant`.
  // - The character of Esau Jr. is equal to `PlayerType.ISAAC`, so it does not make sense to filter
  //   by character.
  [ModCallbackCustom2.POST_FIRST_ESAU_JR]: [
    callback: (player: EntityPlayer) => void,
  ];

  [ModCallbackCustom2.POST_FIRST_FLIP]: [
    callback: (newLazarus: EntityPlayer, oldLazarus: EntityPlayer) => void,
  ];

  [ModCallbackCustom2.POST_FLIP]: [
    callback: (newLazarus: EntityPlayer, oldLazarus: EntityPlayer) => void,
  ];

  [ModCallbackCustom2.POST_GAME_STARTED_REORDERED]: [
    callback: (isContinued: boolean) => void,
  ];

  [ModCallbackCustom2.POST_GAME_STARTED_REORDERED_LAST]: [
    callback: (isContinued: boolean) => void,
  ];

  [ModCallbackCustom2.POST_GREED_MODE_WAVE]: [
    callback: (oldWave: int, newWave: int) => void,
  ];

  [ModCallbackCustom2.POST_GRID_ENTITY_BROKEN]: [
    callback: (gridEntity: GridEntity) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  [ModCallbackCustom2.POST_GRID_ENTITY_COLLISION]: [
    callback: (gridEntity: GridEntity, entity: Entity) => void,
    gridEntityType?: GridEntityType,
    gridEntityVariant?: int,
    entityType?: EntityType,
    entityVariant?: int,
  ];

  [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_BROKEN]: [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_COLLISION]: [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
      entity: Entity,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
    entityType?: EntityType,
    entityVariant?: int,
  ];

  [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_INIT]: [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_REMOVE]: [
    callback: (gridIndex: int, gridEntityTypeCustom: GridEntityType) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  /*
  [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_RENDER]: [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];
  */

  [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_STATE_CHANGED]: [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
      oldState: int,
      newState: int,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_UPDATE]: [
    callback: (
      gridEntity: GridEntity,
      gridEntityTypeCustom: GridEntityType,
    ) => void,
    gridEntityTypeCustom?: GridEntityType,
  ];

  [ModCallbackCustom2.POST_GRID_ENTITY_INIT]: [
    callback: (gridEntity: GridEntity) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  [ModCallbackCustom2.POST_GRID_ENTITY_REMOVE]: [
    callback: (
      gridIndex: int,
      gridEntityType: GridEntityType,
      variant: int,
    ) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  /*
  [ModCallbackCustom2.POST_GRID_ENTITY_RENDER]: [
    callback: (gridEntity: GridEntity) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ]
  */

  [ModCallbackCustom2.POST_GRID_ENTITY_STATE_CHANGED]: [
    callback: (gridEntity: GridEntity, oldState: int, newState: int) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  [ModCallbackCustom2.POST_GRID_ENTITY_UPDATE]: [
    callback: (gridEntity: GridEntity) => void,
    gridEntityType?: GridEntityType,
    variant?: int,
  ];

  [ModCallbackCustom2.POST_HOLY_MANTLE_REMOVED]: [
    callback: (
      player: EntityPlayer,
      oldNumHolyMantles: int,
      newNumHolyMantles: int,
    ) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  // -------------------------------------------

  [ModCallbackCustom2.POST_NEW_LEVEL_REORDERED]: [callback: () => void];

  [ModCallbackCustom2.POST_KNIFE_INIT_LATE]: [
    callback: (knife: EntityKnife) => void,
    knifeVariant?: KnifeVariant,
  ];

  [ModCallbackCustom2.POST_NEW_ROOM_EARLY]: [callback: () => void];

  [ModCallbackCustom2.POST_NEW_ROOM_REORDERED]: [callback: () => void];

  [ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom2.POST_PIT_RENDER]: [
    callback: (pit: GridEntityPit) => void,
    pitVariant?: PitVariant,
  ];

  [ModCallbackCustom2.POST_PLAYER_FATAL_DAMAGE]: [
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

  [ModCallbackCustom2.POST_PLAYER_RENDER_REORDERED]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom2.POST_PLAYER_UPDATE_REORDERED]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom2.POST_ROOM_CLEAR_CHANGED]: [
    callback: (roomClear: boolean) => void,
    roomClear?: boolean,
  ];

  [ModCallbackCustom2.POST_SPIKES_RENDER]: [
    callback: (spikes: GridEntitySpikes) => void,
    variant?: int,
  ];

  [ModCallbackCustom2.PRE_BERSERK_DEATH]: [
    callback: (player: EntityPlayer) => void,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];

  [ModCallbackCustom2.PRE_CUSTOM_REVIVE]: [
    callback: (player: EntityPlayer) => int | undefined,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];
}

validateInterfaceMatchesEnum<
  AddCallbackParametersCustom2,
  ModCallbackCustom2
>();
