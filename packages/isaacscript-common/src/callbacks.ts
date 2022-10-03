import { PostAmbushFinished } from "./classes/callbacks/PostAmbushFinished";
import { PostAmbushStarted } from "./classes/callbacks/PostAmbushStarted";
import { PostBombExploded } from "./classes/callbacks/PostBombExploded";
import { PostBombInitLate } from "./classes/callbacks/PostBombInitLate";
import { PostBoneSwing } from "./classes/callbacks/PostBoneSwing";
import { PostCollectibleEmpty } from "./classes/callbacks/PostCollectibleEmpty";
import { PostCollectibleInitFirst } from "./classes/callbacks/PostCollectibleInitFirst";
import { PostCursedTeleport } from "./classes/callbacks/PostCursedTeleport";
import { PostCustomRevive } from "./classes/callbacks/PostCustomRevive";
import { PostDiceRoomActivated } from "./classes/callbacks/PostDiceRoomActivated";
import { PostDoorRender } from "./classes/callbacks/PostDoorRender";
import { PostDoorUpdate } from "./classes/callbacks/PostDoorUpdate";
import { PostEffectInitLate } from "./classes/callbacks/PostEffectInitLate";
import { PostEffectStateChanged } from "./classes/callbacks/PostEffectStateChanged";
import { PostEsauJr } from "./classes/callbacks/PostEsauJr";
import { PostFamiliarInitLate } from "./classes/callbacks/PostFamiliarInitLate";
import { PostFamiliarStateChanged } from "./classes/callbacks/PostFamiliarStateChanged";
import { PostFirstEsauJr } from "./classes/callbacks/PostFirstEsauJr";
import { PostFirstFlip } from "./classes/callbacks/PostFirstFlip";
import { PostFlip } from "./classes/callbacks/PostFlip";
import { PostGameStartedReordered } from "./classes/callbacks/PostGameStartedReordered";
import { PostGameStartedReorderedLast } from "./classes/callbacks/PostGameStartedReorderedLast";
import { PostGreedModeWave } from "./classes/callbacks/PostGreedModeWave";
import { PostGridEntityBroken } from "./classes/callbacks/PostGridEntityBroken";
import { PostGridEntityCollision } from "./classes/callbacks/PostGridEntityCollision";
import { PostGridEntityCustomBroken } from "./classes/callbacks/PostGridEntityCustomBroken";
import { PostGridEntityCustomCollision } from "./classes/callbacks/PostGridEntityCustomCollision";
import { PostGridEntityCustomInit } from "./classes/callbacks/PostGridEntityCustomInit";
import { PostGridEntityCustomRemove } from "./classes/callbacks/PostGridEntityCustomRemove";
import { PostGridEntityCustomRender } from "./classes/callbacks/PostGridEntityCustomRender";
import { PostGridEntityCustomStateChanged } from "./classes/callbacks/PostGridEntityCustomStateChanged";
import { PostGridEntityCustomUpdate } from "./classes/callbacks/PostGridEntityCustomUpdate";
import { PostGridEntityInit } from "./classes/callbacks/PostGridEntityInit";
import { PostGridEntityRemove } from "./classes/callbacks/PostGridEntityRemove";
import { PostGridEntityRender } from "./classes/callbacks/PostGridEntityRender";
import { PostGridEntityStateChanged } from "./classes/callbacks/PostGridEntityStateChanged";
import { PostGridEntityUpdate } from "./classes/callbacks/PostGridEntityUpdate";
import { PostHolyMantleRemoved } from "./classes/callbacks/PostHolyMantleRemoved";
import { PostItemDischarge } from "./classes/callbacks/PostItemDischarge";
import { PostItemPickup } from "./classes/callbacks/PostItemPickup";
import { PostKnifeInitLate } from "./classes/callbacks/PostKnifeInitLate";
import { PostLaserInitLate } from "./classes/callbacks/PostLaserInitLate";
import { PostNewLevelReordered } from "./classes/callbacks/PostNewLevelReordered";
import { PostNewRoomEarly } from "./classes/callbacks/PostNewRoomEarly";
import { PostNewRoomReordered } from "./classes/callbacks/PostNewRoomReordered";
import { PostNPCInitLate } from "./classes/callbacks/PostNPCInitLate";
import { PostNPCStateChanged } from "./classes/callbacks/PostNPCStateChanged";
import { PostPEffectUpdateReordered } from "./classes/callbacks/PostPEffectUpdateReordered";
import { PostPickupCollect } from "./classes/callbacks/PostPickupCollect";
import { PostPickupInitFirst } from "./classes/callbacks/PostPickupInitFirst";
import { PostPickupInitLate } from "./classes/callbacks/PostPickupInitLate";
import { PostPickupStateChanged } from "./classes/callbacks/PostPickupStateChanged";
import { PostPitRender } from "./classes/callbacks/PostPitRender";
import { PostPitUpdate } from "./classes/callbacks/PostPitUpdate";
import { PostPlayerChangeHealth } from "./classes/callbacks/PostPlayerChangeHealth";
import { PostPlayerChangeStat } from "./classes/callbacks/PostPlayerChangeStat";
import { PostPlayerChangeType } from "./classes/callbacks/PostPlayerChangeType";
import { PostPlayerCollectibleAdded } from "./classes/callbacks/PostPlayerCollectibleAdded";
import { PostPlayerCollectibleRemoved } from "./classes/callbacks/PostPlayerCollectibleRemoved";
import { PostPlayerFatalDamage } from "./classes/callbacks/PostPlayerFatalDamage";
import { PostPlayerInitFirst } from "./classes/callbacks/PostPlayerInitFirst";
import { PostPlayerInitLate } from "./classes/callbacks/PostPlayerInitLate";
import { PostPlayerRenderReordered } from "./classes/callbacks/PostPlayerRenderReordered";
import { PostPlayerUpdateReordered } from "./classes/callbacks/PostPlayerUpdateReordered";
import { PostPoopRender } from "./classes/callbacks/PostPoopRender";
import { PostPoopUpdate } from "./classes/callbacks/PostPoopUpdate";
import { PostPressurePlateRender } from "./classes/callbacks/PostPressurePlateRender";
import { PostPressurePlateUpdate } from "./classes/callbacks/PostPressurePlateUpdate";
import { PostProjectileInitLate } from "./classes/callbacks/PostProjectileInitLate";
import { PostPurchase } from "./classes/callbacks/PostPurchase";
import { PostRockRender } from "./classes/callbacks/PostRockRender";
import { PostRockUpdate } from "./classes/callbacks/PostRockUpdate";
import { PostRoomClearChanged } from "./classes/callbacks/PostRoomClearChanged";
import { PostSacrifice } from "./classes/callbacks/PostSacrifice";
import { PostSlotAnimationChanged } from "./classes/callbacks/PostSlotAnimationChanged";
import { PostSlotCollision } from "./classes/callbacks/PostSlotCollision";
import { PostSlotDestroyed } from "./classes/callbacks/PostSlotDestroyed";
import { PostSlotInit } from "./classes/callbacks/PostSlotInit";
import { PostSlotRender } from "./classes/callbacks/PostSlotRender";
import { PostSlotUpdate } from "./classes/callbacks/PostSlotUpdate";
import { PostSpikesRender } from "./classes/callbacks/PostSpikesRender";
import { PostSpikesUpdate } from "./classes/callbacks/PostSpikesUpdate";
import { PostTearInitLate } from "./classes/callbacks/PostTearInitLate";
import { PostTearInitVeryLate } from "./classes/callbacks/PostTearInitVeryLate";
import { PostTNTRender } from "./classes/callbacks/PostTNTRender";
import { PostTNTUpdate } from "./classes/callbacks/PostTNTUpdate";
import { PostTransformation } from "./classes/callbacks/PostTransformation";
import { PostTrinketBreak } from "./classes/callbacks/PostTrinketBreak";
import { PreBerserkDeath } from "./classes/callbacks/PreBerserkDeath";
import { PreCustomRevive } from "./classes/callbacks/PreCustomRevive";
import { PreGetPedestal } from "./classes/callbacks/PreGetPedestal";
import { PreItemPickup } from "./classes/callbacks/PreItemPickup";
import { PreNewLevel } from "./classes/callbacks/PreNewLevel";
import { ModCallbackCustom } from "./enums/ModCallbackCustom";
import { getEnumValues } from "./functions/enums";
import { newObjectWithEnumKeys } from "./functions/utils";

const MOD_CALLBACK_CUSTOM_TO_CLASS = newObjectWithEnumKeys(ModCallbackCustom, {
  [ModCallbackCustom.POST_AMBUSH_FINISHED]: PostAmbushFinished,
  [ModCallbackCustom.POST_AMBUSH_STARTED]: PostAmbushStarted,
  [ModCallbackCustom.POST_BOMB_EXPLODED]: PostBombExploded,
  [ModCallbackCustom.POST_BOMB_INIT_LATE]: PostBombInitLate,
  [ModCallbackCustom.POST_BONE_SWING]: PostBoneSwing,
  [ModCallbackCustom.POST_COLLECTIBLE_EMPTY]: PostCollectibleEmpty,
  [ModCallbackCustom.POST_COLLECTIBLE_INIT_FIRST]: PostCollectibleInitFirst,
  [ModCallbackCustom.POST_CURSED_TELEPORT]: PostCursedTeleport,
  [ModCallbackCustom.POST_CUSTOM_REVIVE]: PostCustomRevive,
  [ModCallbackCustom.POST_DICE_ROOM_ACTIVATED]: PostDiceRoomActivated,
  [ModCallbackCustom.POST_DOOR_RENDER]: PostDoorRender,
  [ModCallbackCustom.POST_DOOR_UPDATE]: PostDoorUpdate,
  [ModCallbackCustom.POST_EFFECT_INIT_LATE]: PostEffectInitLate,
  [ModCallbackCustom.POST_EFFECT_STATE_CHANGED]: PostEffectStateChanged,
  [ModCallbackCustom.POST_ESAU_JR]: PostEsauJr,
  [ModCallbackCustom.POST_FAMILIAR_INIT_LATE]: PostFamiliarInitLate,
  [ModCallbackCustom.POST_FAMILIAR_STATE_CHANGED]: PostFamiliarStateChanged,
  [ModCallbackCustom.POST_FIRST_FLIP]: PostFirstFlip,
  [ModCallbackCustom.POST_FIRST_ESAU_JR]: PostFirstEsauJr,
  [ModCallbackCustom.POST_FLIP]: PostFlip,
  [ModCallbackCustom.POST_GAME_STARTED_REORDERED]: PostGameStartedReordered,
  [ModCallbackCustom.POST_GAME_STARTED_REORDERED_LAST]:
    PostGameStartedReorderedLast,
  [ModCallbackCustom.POST_GREED_MODE_WAVE]: PostGreedModeWave,
  [ModCallbackCustom.POST_GRID_ENTITY_BROKEN]: PostGridEntityBroken,
  [ModCallbackCustom.POST_GRID_ENTITY_COLLISION]: PostGridEntityCollision,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_BROKEN]:
    PostGridEntityCustomBroken,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_COLLISION]:
    PostGridEntityCustomCollision,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_INIT]: PostGridEntityCustomInit,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_REMOVE]:
    PostGridEntityCustomRemove,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_RENDER]:
    PostGridEntityCustomRender,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_STATE_CHANGED]:
    PostGridEntityCustomStateChanged,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_UPDATE]:
    PostGridEntityCustomUpdate,
  [ModCallbackCustom.POST_GRID_ENTITY_INIT]: PostGridEntityInit,
  [ModCallbackCustom.POST_GRID_ENTITY_REMOVE]: PostGridEntityRemove,
  [ModCallbackCustom.POST_GRID_ENTITY_RENDER]: PostGridEntityRender,
  [ModCallbackCustom.POST_GRID_ENTITY_STATE_CHANGED]:
    PostGridEntityStateChanged,
  [ModCallbackCustom.POST_GRID_ENTITY_UPDATE]: PostGridEntityUpdate,
  [ModCallbackCustom.POST_HOLY_MANTLE_REMOVED]: PostHolyMantleRemoved,
  [ModCallbackCustom.POST_ITEM_DISCHARGE]: PostItemDischarge,
  [ModCallbackCustom.POST_ITEM_PICKUP]: PostItemPickup,
  [ModCallbackCustom.POST_KNIFE_INIT_LATE]: PostKnifeInitLate,
  [ModCallbackCustom.POST_LASER_INIT_LATE]: PostLaserInitLate,
  [ModCallbackCustom.POST_NEW_LEVEL_REORDERED]: PostNewLevelReordered,
  [ModCallbackCustom.POST_NEW_ROOM_EARLY]: PostNewRoomEarly,
  [ModCallbackCustom.POST_NEW_ROOM_REORDERED]: PostNewRoomReordered,
  [ModCallbackCustom.POST_NPC_INIT_LATE]: PostNPCInitLate,
  [ModCallbackCustom.POST_NPC_STATE_CHANGED]: PostNPCStateChanged,
  [ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED]: PostPEffectUpdateReordered,
  [ModCallbackCustom.POST_PICKUP_COLLECT]: PostPickupCollect,
  [ModCallbackCustom.POST_PICKUP_INIT_FIRST]: PostPickupInitFirst,
  [ModCallbackCustom.POST_PICKUP_INIT_LATE]: PostPickupInitLate,
  [ModCallbackCustom.POST_PICKUP_STATE_CHANGED]: PostPickupStateChanged,
  [ModCallbackCustom.POST_PIT_RENDER]: PostPitRender,
  [ModCallbackCustom.POST_PIT_UPDATE]: PostPitUpdate,
  [ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH]: PostPlayerChangeHealth,
  [ModCallbackCustom.POST_PLAYER_CHANGE_STAT]: PostPlayerChangeStat,
  [ModCallbackCustom.POST_PLAYER_CHANGE_TYPE]: PostPlayerChangeType,
  [ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED]: PostPlayerCollectibleAdded,
  [ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED]:
    PostPlayerCollectibleRemoved,
  [ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE]: PostPlayerFatalDamage,
  [ModCallbackCustom.POST_PLAYER_INIT_FIRST]: PostPlayerInitFirst,
  [ModCallbackCustom.POST_PLAYER_INIT_LATE]: PostPlayerInitLate,
  [ModCallbackCustom.POST_PLAYER_RENDER_REORDERED]: PostPlayerRenderReordered,
  [ModCallbackCustom.POST_PLAYER_UPDATE_REORDERED]: PostPlayerUpdateReordered,
  [ModCallbackCustom.POST_POOP_RENDER]: PostPoopRender,
  [ModCallbackCustom.POST_POOP_UPDATE]: PostPoopUpdate,
  [ModCallbackCustom.POST_PRESSURE_PLATE_RENDER]: PostPressurePlateRender,
  [ModCallbackCustom.POST_PRESSURE_PLATE_UPDATE]: PostPressurePlateUpdate,
  [ModCallbackCustom.POST_PROJECTILE_INIT_LATE]: PostProjectileInitLate,
  [ModCallbackCustom.POST_PURCHASE]: PostPurchase,
  [ModCallbackCustom.POST_ROCK_RENDER]: PostRockRender,
  [ModCallbackCustom.POST_ROCK_UPDATE]: PostRockUpdate,
  [ModCallbackCustom.POST_ROOM_CLEAR_CHANGED]: PostRoomClearChanged,
  [ModCallbackCustom.POST_SACRIFICE]: PostSacrifice,
  [ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED]: PostSlotAnimationChanged,
  [ModCallbackCustom.POST_SLOT_COLLISION]: PostSlotCollision,
  [ModCallbackCustom.POST_SLOT_DESTROYED]: PostSlotDestroyed,
  [ModCallbackCustom.POST_SLOT_INIT]: PostSlotInit,
  [ModCallbackCustom.POST_SLOT_RENDER]: PostSlotRender,
  [ModCallbackCustom.POST_SLOT_UPDATE]: PostSlotUpdate,
  [ModCallbackCustom.POST_SPIKES_RENDER]: PostSpikesRender,
  [ModCallbackCustom.POST_SPIKES_UPDATE]: PostSpikesUpdate,
  [ModCallbackCustom.POST_TEAR_INIT_LATE]: PostTearInitLate,
  [ModCallbackCustom.POST_TEAR_INIT_VERY_LATE]: PostTearInitVeryLate,
  [ModCallbackCustom.POST_TNT_RENDER]: PostTNTRender,
  [ModCallbackCustom.POST_TNT_UPDATE]: PostTNTUpdate,
  [ModCallbackCustom.POST_TRANSFORMATION]: PostTransformation,
  [ModCallbackCustom.POST_TRINKET_BREAK]: PostTrinketBreak,
  [ModCallbackCustom.PRE_BERSERK_DEATH]: PreBerserkDeath,
  [ModCallbackCustom.PRE_CUSTOM_REVIVE]: PreCustomRevive,
  [ModCallbackCustom.PRE_GET_PEDESTAL]: PreGetPedestal,
  [ModCallbackCustom.PRE_ITEM_PICKUP]: PreItemPickup,
  [ModCallbackCustom.PRE_NEW_LEVEL]: PreNewLevel,
} as const);

export type ModCallbackCustomToClass = {
  readonly [key in keyof typeof MOD_CALLBACK_CUSTOM_TO_CLASS]: InstanceType<
    typeof MOD_CALLBACK_CUSTOM_TO_CLASS[key]
  >;
};

export function getCallbacks(): ModCallbackCustomToClass {
  const instantiatedClasses: Record<number, unknown> = {};

  for (const modCallbackCustom of getEnumValues(ModCallbackCustom)) {
    const constructor = MOD_CALLBACK_CUSTOM_TO_CLASS[modCallbackCustom];
    instantiatedClasses[modCallbackCustom] = new constructor();
  }

  return instantiatedClasses as unknown as ModCallbackCustomToClass;
}
