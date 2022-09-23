import {
  BombVariant,
  CollectibleType,
  DiceFloorSubType,
  KnifeVariant,
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

  // -------------------------------------------

  [ModCallbackCustom2.POST_KNIFE_INIT_LATE]: [
    callback: (knife: EntityKnife) => void,
    knifeVariant?: KnifeVariant,
  ];

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

  [ModCallbackCustom2.PRE_CUSTOM_REVIVE]: [
    callback: (player: EntityPlayer) => int | undefined,
    playerVariant?: PlayerVariant,
    character?: PlayerType,
  ];
}
