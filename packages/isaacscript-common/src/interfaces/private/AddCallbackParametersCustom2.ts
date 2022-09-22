import {
  BombVariant,
  CollectibleType,
  Direction,
  DoorSlot,
  PitVariant,
  PlayerType,
  PlayerVariant,
} from "isaac-typescript-definitions";
import { AmbushType } from "../../enums/AmbushType";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";

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

  [ModCallbackCustom2.POST_CUSTOM_DOOR_ENTER]: [
    callback: (
      player: EntityPlayer,
      effectVariant: int,
      doorSlot: DoorSlot,
      direction: Direction,
    ) => void,
    effectVariant?: int,
  ];

  // -------------------------------------------

  [ModCallbackCustom2.POST_NEW_ROOM_EARLY]: [callback: () => void];

  [ModCallbackCustom2.POST_PIT_RENDER]: [
    callback: (pit: GridEntityPit) => void,
    pitVariant?: PitVariant,
  ];

  [ModCallbackCustom2.POST_ROOM_CLEAR_CHANGED]: [
    callback: (roomClear: boolean) => void,
    roomClear?: boolean,
  ];

  [ModCallbackCustom2.POST_SPIKES_RENDER]: [
    callback: (spikes: GridEntitySpikes) => void,
    gridEntityVariant?: int,
  ];
}
