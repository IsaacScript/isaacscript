import { postAmbushFinishedRegister } from "../callbacks/subscriptions/postAmbushFinished";
import { postAmbushStartedRegister } from "../callbacks/subscriptions/postAmbushStarted";
import { postBombInitLateRegister } from "../callbacks/subscriptions/postBombInitLate";
import { postBombExplodedRegister } from "../callbacks/subscriptions/postBoneExploded";
import { postBoneSwingRegister } from "../callbacks/subscriptions/postBoneSwing";
import { postCollectibleEmptyRegister } from "../callbacks/subscriptions/postCollectibleEmpty";
import { postCollectibleInitFirstRegister } from "../callbacks/subscriptions/postCollectibleInitFirst";
import { postCursedTeleportRegister } from "../callbacks/subscriptions/postCursedTeleport";
import { postCustomDoorEnterRegister } from "../callbacks/subscriptions/postCustomDoorEnter";
import { postCustomReviveRegister } from "../callbacks/subscriptions/postCustomRevive";
import { postDiceRoomActivatedRegister } from "../callbacks/subscriptions/postDiceRoomActivated";
import { postDoorRenderRegister } from "../callbacks/subscriptions/postDoorRender";
import { postDoorUpdateRegister } from "../callbacks/subscriptions/postDoorUpdate";
import { postEffectInitLateRegister } from "../callbacks/subscriptions/postEffectInitLate";
import { postEffectStateChangedRegister } from "../callbacks/subscriptions/postEffectStateChanged";
import { postEsauJrRegister } from "../callbacks/subscriptions/postEsauJr";
import { postFamiliarInitLateRegister } from "../callbacks/subscriptions/postFamiliarInitLate";
import { postFamiliarStateChangedRegister } from "../callbacks/subscriptions/postFamiliarStateChanged";
import { postFirstEsauJrRegister } from "../callbacks/subscriptions/postFirstEsauJr";
import { postFirstFlipRegister } from "../callbacks/subscriptions/postFirstFlip";
import { postFlipRegister } from "../callbacks/subscriptions/postFlip";
import { postGameStartedReorderedRegister } from "../callbacks/subscriptions/postGameStartedReordered";
import { postGameStartedReorderedLastRegister } from "../callbacks/subscriptions/postGameStartedReorderedLast";
import { postGreedModeWaveRegister } from "../callbacks/subscriptions/postGreedModeWave";
import { postGridEntityBrokenRegister } from "../callbacks/subscriptions/postGridEntityBroken";
import { postGridEntityCollisionRegister } from "../callbacks/subscriptions/postGridEntityCollision";
import { postGridEntityCustomBrokenRegister } from "../callbacks/subscriptions/postGridEntityCustomBroken";
import { postGridEntityCustomCollisionRegister } from "../callbacks/subscriptions/postGridEntityCustomCollision";
import { postGridEntityCustomInitRegister } from "../callbacks/subscriptions/postGridEntityCustomInit";
import { postGridEntityCustomRemoveRegister } from "../callbacks/subscriptions/postGridEntityCustomRemove";
import { postGridEntityCustomRenderRegister } from "../callbacks/subscriptions/postGridEntityCustomRender";
import { postGridEntityCustomStateChangedRegister } from "../callbacks/subscriptions/postGridEntityCustomStateChanged";
import { postGridEntityCustomUpdateRegister } from "../callbacks/subscriptions/postGridEntityCustomUpdate";
import { postGridEntityInitRegister } from "../callbacks/subscriptions/postGridEntityInit";
import { postGridEntityRemoveRegister } from "../callbacks/subscriptions/postGridEntityRemove";
import { postGridEntityRenderRegister } from "../callbacks/subscriptions/postGridEntityRender";
import { postGridEntityStateChangedRegister } from "../callbacks/subscriptions/postGridEntityStateChanged";
import { postGridEntityUpdateRegister } from "../callbacks/subscriptions/postGridEntityUpdate";
import { postHolyMantleRemovedRegister } from "../callbacks/subscriptions/postHolyMantleRemoved";
import { postItemDischargeRegister } from "../callbacks/subscriptions/postItemDischarged";
import { postItemPickupRegister } from "../callbacks/subscriptions/postItemPickup";
import { postKnifeInitLateRegister } from "../callbacks/subscriptions/postKnifeInitLate";
import { postLaserInitLateRegister } from "../callbacks/subscriptions/postLaserInitLate";
import { postNewLevelReorderedRegister } from "../callbacks/subscriptions/postNewLevelReordered";
import { postNewRoomEarlyRegister } from "../callbacks/subscriptions/postNewRoomEarly";
import { postNewRoomReorderedRegister } from "../callbacks/subscriptions/postNewRoomReordered";
import { postNPCInitLateRegister } from "../callbacks/subscriptions/postNPCInitLate";
import { postNPCStateChangedRegister } from "../callbacks/subscriptions/postNPCStateChanged";
import { postPEffectUpdateReorderedRegister } from "../callbacks/subscriptions/postPEffectUpdateReordered";
import { postPickupCollectRegister } from "../callbacks/subscriptions/postPickupCollect";
import { postPickupInitFirstRegister } from "../callbacks/subscriptions/postPickupInitFirst";
import { postPickupInitLateRegister } from "../callbacks/subscriptions/postPickupInitLate";
import { postPickupStateChangedRegister } from "../callbacks/subscriptions/postPickupStateChanged";
import { postPitRenderRegister } from "../callbacks/subscriptions/postPitRender";
import { postPitUpdateRegister } from "../callbacks/subscriptions/postPitUpdate";
import { postPlayerChangeHealthRegister } from "../callbacks/subscriptions/postPlayerChangeHealth";
import { postPlayerChangeStatRegister } from "../callbacks/subscriptions/postPlayerChangeStat";
import { postPlayerChangeTypeRegister } from "../callbacks/subscriptions/postPlayerChangeType";
import { postPlayerCollectibleAddedRegister } from "../callbacks/subscriptions/postPlayerCollectibleAdded";
import { postPlayerCollectibleRemovedRegister } from "../callbacks/subscriptions/postPlayerCollectibleRemoved";
import { postPlayerFatalDamageRegister } from "../callbacks/subscriptions/postPlayerFatalDamage";
import { postPlayerInitFirstRegister } from "../callbacks/subscriptions/postPlayerInitFirst";
import { postPlayerInitLateRegister } from "../callbacks/subscriptions/postPlayerInitLate";
import { postPlayerRenderReorderedRegister } from "../callbacks/subscriptions/postPlayerRenderReordered";
import { postPlayerUpdateReorderedRegister } from "../callbacks/subscriptions/postPlayerUpdateReordered";
import { postPoopRenderRegister } from "../callbacks/subscriptions/postPoopRender";
import { postPoopUpdateRegister } from "../callbacks/subscriptions/postPoopUpdate";
import { postPressurePlateRenderRegister } from "../callbacks/subscriptions/postPressurePlateRender";
import { postPressurePlateUpdateRegister } from "../callbacks/subscriptions/postPressurePlateUpdate";
import { postProjectileInitLateRegister } from "../callbacks/subscriptions/postProjectileInitLate";
import { postPurchaseRegister } from "../callbacks/subscriptions/postPurchase";
import { postRockRenderRegister } from "../callbacks/subscriptions/postRockRender";
import { postRockUpdateRegister } from "../callbacks/subscriptions/postRockUpdate";
import { postRoomClearChangedRegister } from "../callbacks/subscriptions/postRoomClearChanged";
import { postSacrificeRegister } from "../callbacks/subscriptions/postSacrifice";
import { postSlotAnimationChangedRegister } from "../callbacks/subscriptions/postSlotAnimationChanged";
import { postSlotCollisionRegister } from "../callbacks/subscriptions/postSlotCollision";
import { postSlotDestroyedRegister } from "../callbacks/subscriptions/postSlotDestroyed";
import { postSlotInitRegister } from "../callbacks/subscriptions/postSlotInit";
import { postSlotRenderRegister } from "../callbacks/subscriptions/postSlotRender";
import { postSlotUpdateRegister } from "../callbacks/subscriptions/postSlotUpdate";
import { postSpikesRenderRegister } from "../callbacks/subscriptions/postSpikesRender";
import { postSpikesUpdateRegister } from "../callbacks/subscriptions/postSpikesUpdate";
import { postTearInitLateRegister } from "../callbacks/subscriptions/postTearInitLate";
import { postTearInitVeryLateRegister } from "../callbacks/subscriptions/postTearInitVeryLate";
import { postTNTRenderRegister } from "../callbacks/subscriptions/postTNTRender";
import { postTNTUpdateRegister } from "../callbacks/subscriptions/postTNTUpdate";
import { postTransformationRegister } from "../callbacks/subscriptions/postTransformation";
import { postTrinketBreakRegister } from "../callbacks/subscriptions/postTrinketBreak";
import { preBerserkDeathRegister } from "../callbacks/subscriptions/preBerserkDeath";
import { preCustomReviveRegister } from "../callbacks/subscriptions/preCustomRevive";
import { preGetPedestalRegister } from "../callbacks/subscriptions/preGetPedestal";
import { preItemPickupRegister } from "../callbacks/subscriptions/preItemPickup";
import { preNewLevelRegister } from "../callbacks/subscriptions/preNewLevel";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { AddCallbackParameterCustom } from "../interfaces/private/AddCallbackParameterCustom";

export const CALLBACK_REGISTER_FUNCTIONS: {
  readonly [key in ModCallbackCustom]: (
    ...args: AddCallbackParameterCustom[key]
  ) => void;
} = {
  [ModCallbackCustom.POST_AMBUSH_FINISHED]: postAmbushFinishedRegister,
  [ModCallbackCustom.POST_AMBUSH_STARTED]: postAmbushStartedRegister,
  [ModCallbackCustom.POST_BOMB_EXPLODED]: postBombExplodedRegister,
  [ModCallbackCustom.POST_BOMB_INIT_LATE]: postBombInitLateRegister,
  [ModCallbackCustom.POST_BONE_SWING]: postBoneSwingRegister,
  [ModCallbackCustom.POST_COLLECTIBLE_EMPTY]: postCollectibleEmptyRegister,
  [ModCallbackCustom.POST_COLLECTIBLE_INIT_FIRST]:
    postCollectibleInitFirstRegister,
  [ModCallbackCustom.POST_CURSED_TELEPORT]: postCursedTeleportRegister,
  [ModCallbackCustom.POST_CUSTOM_DOOR_ENTER]: postCustomDoorEnterRegister,
  [ModCallbackCustom.POST_CUSTOM_REVIVE]: postCustomReviveRegister,
  [ModCallbackCustom.POST_DICE_ROOM_ACTIVATED]: postDiceRoomActivatedRegister,
  [ModCallbackCustom.POST_DOOR_RENDER]: postDoorRenderRegister,
  [ModCallbackCustom.POST_DOOR_UPDATE]: postDoorUpdateRegister,
  [ModCallbackCustom.POST_EFFECT_INIT_LATE]: postEffectInitLateRegister,
  [ModCallbackCustom.POST_EFFECT_STATE_CHANGED]: postEffectStateChangedRegister,
  [ModCallbackCustom.POST_ESAU_JR]: postEsauJrRegister,
  [ModCallbackCustom.POST_FAMILIAR_INIT_LATE]: postFamiliarInitLateRegister,
  [ModCallbackCustom.POST_FAMILIAR_STATE_CHANGED]:
    postFamiliarStateChangedRegister,
  [ModCallbackCustom.POST_FIRST_ESAU_JR]: postFirstEsauJrRegister,
  [ModCallbackCustom.POST_FIRST_FLIP]: postFirstFlipRegister,
  [ModCallbackCustom.POST_FLIP]: postFlipRegister,
  [ModCallbackCustom.POST_GAME_STARTED_REORDERED]:
    postGameStartedReorderedRegister,
  [ModCallbackCustom.POST_GAME_STARTED_REORDERED_LAST]:
    postGameStartedReorderedLastRegister,
  [ModCallbackCustom.POST_GREED_MODE_WAVE]: postGreedModeWaveRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_BROKEN]: postGridEntityBrokenRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_COLLISION]:
    postGridEntityCollisionRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_BROKEN]:
    postGridEntityCustomBrokenRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_COLLISION]:
    postGridEntityCustomCollisionRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_INIT]:
    postGridEntityCustomInitRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_REMOVE]:
    postGridEntityCustomRemoveRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_RENDER]:
    postGridEntityCustomRenderRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_STATE_CHANGED]:
    postGridEntityCustomStateChangedRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_UPDATE]:
    postGridEntityCustomUpdateRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_INIT]: postGridEntityInitRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_REMOVE]: postGridEntityRemoveRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_RENDER]: postGridEntityRenderRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_STATE_CHANGED]:
    postGridEntityStateChangedRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_UPDATE]: postGridEntityUpdateRegister,
  [ModCallbackCustom.POST_HOLY_MANTLE_REMOVED]: postHolyMantleRemovedRegister,
  [ModCallbackCustom.POST_ITEM_DISCHARGE]: postItemDischargeRegister,
  [ModCallbackCustom.POST_ITEM_PICKUP]: postItemPickupRegister,
  [ModCallbackCustom.POST_KNIFE_INIT_LATE]: postKnifeInitLateRegister,
  [ModCallbackCustom.POST_LASER_INIT_LATE]: postLaserInitLateRegister,
  [ModCallbackCustom.POST_NEW_LEVEL_REORDERED]: postNewLevelReorderedRegister,
  [ModCallbackCustom.POST_NEW_ROOM_EARLY]: postNewRoomEarlyRegister,
  [ModCallbackCustom.POST_NEW_ROOM_REORDERED]: postNewRoomReorderedRegister,
  [ModCallbackCustom.POST_NPC_INIT_LATE]: postNPCInitLateRegister,
  [ModCallbackCustom.POST_NPC_STATE_CHANGED]: postNPCStateChangedRegister,
  [ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED]:
    postPEffectUpdateReorderedRegister,
  [ModCallbackCustom.POST_PICKUP_COLLECT]: postPickupCollectRegister,
  [ModCallbackCustom.POST_PICKUP_INIT_FIRST]: postPickupInitFirstRegister,
  [ModCallbackCustom.POST_PICKUP_INIT_LATE]: postPickupInitLateRegister,
  [ModCallbackCustom.POST_PICKUP_STATE_CHANGED]: postPickupStateChangedRegister,
  [ModCallbackCustom.POST_PIT_RENDER]: postPitRenderRegister,
  [ModCallbackCustom.POST_PIT_UPDATE]: postPitUpdateRegister,
  [ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH]: postPlayerChangeHealthRegister,
  [ModCallbackCustom.POST_PLAYER_CHANGE_STAT]: postPlayerChangeStatRegister,
  [ModCallbackCustom.POST_PLAYER_CHANGE_TYPE]: postPlayerChangeTypeRegister,
  [ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED]:
    postPlayerCollectibleAddedRegister,
  [ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED]:
    postPlayerCollectibleRemovedRegister,
  [ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE]: postPlayerFatalDamageRegister,
  [ModCallbackCustom.POST_PLAYER_INIT_FIRST]: postPlayerInitFirstRegister,
  [ModCallbackCustom.POST_PLAYER_INIT_LATE]: postPlayerInitLateRegister,
  [ModCallbackCustom.POST_PLAYER_RENDER_REORDERED]:
    postPlayerRenderReorderedRegister,
  [ModCallbackCustom.POST_PLAYER_UPDATE_REORDERED]:
    postPlayerUpdateReorderedRegister,
  [ModCallbackCustom.POST_POOP_RENDER]: postPoopRenderRegister,
  [ModCallbackCustom.POST_POOP_UPDATE]: postPoopUpdateRegister,
  [ModCallbackCustom.POST_PRESSURE_PLATE_RENDER]:
    postPressurePlateRenderRegister,
  [ModCallbackCustom.POST_PRESSURE_PLATE_UPDATE]:
    postPressurePlateUpdateRegister,
  [ModCallbackCustom.POST_PROJECTILE_INIT_LATE]: postProjectileInitLateRegister,
  [ModCallbackCustom.POST_PURCHASE]: postPurchaseRegister,
  [ModCallbackCustom.POST_ROCK_RENDER]: postRockRenderRegister,
  [ModCallbackCustom.POST_ROCK_UPDATE]: postRockUpdateRegister,
  [ModCallbackCustom.POST_ROOM_CLEAR_CHANGED]: postRoomClearChangedRegister,
  [ModCallbackCustom.POST_SACRIFICE]: postSacrificeRegister,
  [ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED]:
    postSlotAnimationChangedRegister,
  [ModCallbackCustom.POST_SLOT_COLLISION]: postSlotCollisionRegister,
  [ModCallbackCustom.POST_SLOT_DESTROYED]: postSlotDestroyedRegister,
  [ModCallbackCustom.POST_SLOT_INIT]: postSlotInitRegister,
  [ModCallbackCustom.POST_SLOT_RENDER]: postSlotRenderRegister,
  [ModCallbackCustom.POST_SLOT_UPDATE]: postSlotUpdateRegister,
  [ModCallbackCustom.POST_SPIKES_RENDER]: postSpikesRenderRegister,
  [ModCallbackCustom.POST_SPIKES_UPDATE]: postSpikesUpdateRegister,
  [ModCallbackCustom.POST_TEAR_INIT_LATE]: postTearInitLateRegister,
  [ModCallbackCustom.POST_TEAR_INIT_VERY_LATE]: postTearInitVeryLateRegister,
  [ModCallbackCustom.POST_TNT_RENDER]: postTNTRenderRegister,
  [ModCallbackCustom.POST_TNT_UPDATE]: postTNTUpdateRegister,
  [ModCallbackCustom.POST_TRANSFORMATION]: postTransformationRegister,
  [ModCallbackCustom.POST_TRINKET_BREAK]: postTrinketBreakRegister,
  [ModCallbackCustom.PRE_BERSERK_DEATH]: preBerserkDeathRegister,
  [ModCallbackCustom.PRE_CUSTOM_REVIVE]: preCustomReviveRegister,
  [ModCallbackCustom.PRE_GET_PEDESTAL]: preGetPedestalRegister,
  [ModCallbackCustom.PRE_ITEM_PICKUP]: preItemPickupRegister,
  [ModCallbackCustom.PRE_NEW_LEVEL]: preNewLevelRegister,
} as const;
