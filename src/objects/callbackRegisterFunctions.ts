import { postBombInitLateRegister } from "../callbacks/subscriptions/postBombInitLate";
import { postBoneSwingRegister } from "../callbacks/subscriptions/postBoneSwing";
import { postCollectibleInitFirstRegister } from "../callbacks/subscriptions/postCollectibleInitFirst";
import { postCursedTeleportRegister } from "../callbacks/subscriptions/postCursedTeleport";
import { postCustomDoorEnterRegister } from "../callbacks/subscriptions/postCustomDoorEnter";
import { postCustomReviveRegister } from "../callbacks/subscriptions/postCustomRevive";
import { postEffectInitLateRegister } from "../callbacks/subscriptions/postEffectInitLate";
import { postEffectStateChangedRegister } from "../callbacks/subscriptions/postEffectStateChanged";
import { postEsauJrRegister } from "../callbacks/subscriptions/postEsauJr";
import { postFamiliarInitLateRegister } from "../callbacks/subscriptions/postFamiliarInitLate";
import { postFamiliarStateChangedRegister } from "../callbacks/subscriptions/postFamiliarStateChanged";
import { postFirstEsauJrRegister } from "../callbacks/subscriptions/postFirstEsauJr";
import { postFirstFlipRegister } from "../callbacks/subscriptions/postFirstFlip";
import { postFlipRegister } from "../callbacks/subscriptions/postFlip";
import { postGameStartedReorderedRegister } from "../callbacks/subscriptions/postGameStartedReordered";
import { postGreedModeWaveRegister } from "../callbacks/subscriptions/postGreedModeWave";
import { postGridEntityBrokenRegister } from "../callbacks/subscriptions/postGridEntityBroken";
import { postGridEntityCollisionRegister } from "../callbacks/subscriptions/postGridEntityCollision";
import { postGridEntityInitRegister } from "../callbacks/subscriptions/postGridEntityInit";
import { postGridEntityRemoveRegister } from "../callbacks/subscriptions/postGridEntityRemove";
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
import { postPickupInitLateRegister } from "../callbacks/subscriptions/postPickupInitLate";
import { postPickupStateChangedRegister } from "../callbacks/subscriptions/postPickupStateChanged";
import { postPlayerChangeHealthRegister } from "../callbacks/subscriptions/postPlayerChangeHealth";
import { postPlayerChangeTypeRegister } from "../callbacks/subscriptions/postPlayerChangeType";
import { postPlayerFatalDamageRegister } from "../callbacks/subscriptions/postPlayerFatalDamage";
import { postPlayerInitLateRegister } from "../callbacks/subscriptions/postPlayerInitLate";
import { postPlayerInitReorderedRegister } from "../callbacks/subscriptions/postPlayerInitReordered";
import { postPlayerRenderReorderedRegister } from "../callbacks/subscriptions/postPlayerRenderReordered";
import { postPlayerUpdateReorderedRegister } from "../callbacks/subscriptions/postPlayerUpdateReordered";
import { postProjectileInitLateRegister } from "../callbacks/subscriptions/postProjectileInitLate";
import { postPurchaseRegister } from "../callbacks/subscriptions/postPurchase";
import { postRoomClearChangedRegister } from "../callbacks/subscriptions/postRoomClearChanged";
import { postSacrificeRegister } from "../callbacks/subscriptions/postSacrifice";
import { postSlotAnimationChangedRegister } from "../callbacks/subscriptions/postSlotAnimationChanged";
import { postSlotDestroyedRegister } from "../callbacks/subscriptions/postSlotDestroyed";
import { postSlotInitRegister } from "../callbacks/subscriptions/postSlotInit";
import { postSlotRenderRegister } from "../callbacks/subscriptions/postSlotRender";
import { postSlotUpdateRegister } from "../callbacks/subscriptions/postSlotUpdate";
import { postTearInitLateRegister } from "../callbacks/subscriptions/postTearInitLate";
import { postTearInitVeryLateRegister } from "../callbacks/subscriptions/postTearInitVeryLate";
import { postTransformationRegister } from "../callbacks/subscriptions/postTransformation";
import { postTrinketBreakRegister } from "../callbacks/subscriptions/postTrinketBreak";
import { preBerserkDeathRegister } from "../callbacks/subscriptions/preBerserkDeath";
import { preCustomReviveRegister } from "../callbacks/subscriptions/preCustomRevive";
import { preItemPickupRegister } from "../callbacks/subscriptions/preItemPickup";
import { preNewLevelRegister } from "../callbacks/subscriptions/preNewLevel";
import { ModCallbacksCustom } from "../enums/ModCallbacksCustom";
import { AddCallbackParameterCustom } from "../types/AddCallbackParameterCustom";

export const CALLBACK_REGISTER_FUNCTIONS: {
  readonly [key in ModCallbacksCustom]: (
    ...args: AddCallbackParameterCustom[key]
  ) => void;
} = {
  [ModCallbacksCustom.POST_BOMB_INIT_LATE]: postBombInitLateRegister,
  [ModCallbacksCustom.POST_BONE_SWING]: postBoneSwingRegister,
  [ModCallbacksCustom.POST_COLLECTIBLE_INIT_FIRST]:
    postCollectibleInitFirstRegister,
  [ModCallbacksCustom.POST_CURSED_TELEPORT]: postCursedTeleportRegister,
  [ModCallbacksCustom.POST_CUSTOM_DOOR_ENTER]: postCustomDoorEnterRegister,
  [ModCallbacksCustom.POST_CUSTOM_REVIVE]: postCustomReviveRegister,
  [ModCallbacksCustom.POST_EFFECT_INIT_LATE]: postEffectInitLateRegister,
  [ModCallbacksCustom.POST_EFFECT_STATE_CHANGED]:
    postEffectStateChangedRegister,
  [ModCallbacksCustom.POST_ESAU_JR]: postEsauJrRegister,
  [ModCallbacksCustom.POST_FAMILIAR_INIT_LATE]: postFamiliarInitLateRegister,
  [ModCallbacksCustom.POST_FAMILIAR_STATE_CHANGED]:
    postFamiliarStateChangedRegister,
  [ModCallbacksCustom.POST_FIRST_ESAU_JR]: postFirstEsauJrRegister,
  [ModCallbacksCustom.POST_FIRST_FLIP]: postFirstFlipRegister,
  [ModCallbacksCustom.POST_FLIP]: postFlipRegister,
  [ModCallbacksCustom.POST_GAME_STARTED_REORDERED]:
    postGameStartedReorderedRegister,
  [ModCallbacksCustom.POST_GREED_MODE_WAVE]: postGreedModeWaveRegister,
  [ModCallbacksCustom.POST_GRID_ENTITY_BROKEN]: postGridEntityBrokenRegister,
  [ModCallbacksCustom.POST_GRID_ENTITY_COLLISION]:
    postGridEntityCollisionRegister,
  [ModCallbacksCustom.POST_GRID_ENTITY_INIT]: postGridEntityInitRegister,
  [ModCallbacksCustom.POST_GRID_ENTITY_REMOVE]: postGridEntityRemoveRegister,
  [ModCallbacksCustom.POST_GRID_ENTITY_STATE_CHANGED]:
    postGridEntityStateChangedRegister,
  [ModCallbacksCustom.POST_GRID_ENTITY_UPDATE]: postGridEntityUpdateRegister,
  [ModCallbacksCustom.POST_HOLY_MANTLE_REMOVED]: postHolyMantleRemovedRegister,
  [ModCallbacksCustom.POST_ITEM_DISCHARGE]: postItemDischargeRegister,
  [ModCallbacksCustom.POST_ITEM_PICKUP]: postItemPickupRegister,
  [ModCallbacksCustom.POST_KNIFE_INIT_LATE]: postKnifeInitLateRegister,
  [ModCallbacksCustom.POST_LASER_INIT_LATE]: postLaserInitLateRegister,
  [ModCallbacksCustom.POST_NEW_LEVEL_REORDERED]: postNewLevelReorderedRegister,
  [ModCallbacksCustom.POST_NEW_ROOM_EARLY]: postNewRoomEarlyRegister,
  [ModCallbacksCustom.POST_NEW_ROOM_REORDERED]: postNewRoomReorderedRegister,
  [ModCallbacksCustom.POST_NPC_INIT_LATE]: postNPCInitLateRegister,
  [ModCallbacksCustom.POST_NPC_STATE_CHANGED]: postNPCStateChangedRegister,
  [ModCallbacksCustom.POST_PEFFECT_UPDATE_REORDERED]:
    postPEffectUpdateReorderedRegister,
  [ModCallbacksCustom.POST_PICKUP_COLLECT]: postPickupCollectRegister,
  [ModCallbacksCustom.POST_PICKUP_INIT_LATE]: postPickupInitLateRegister,
  [ModCallbacksCustom.POST_PICKUP_STATE_CHANGED]:
    postPickupStateChangedRegister,
  [ModCallbacksCustom.POST_PLAYER_CHANGE_HEALTH]:
    postPlayerChangeHealthRegister,
  [ModCallbacksCustom.POST_PLAYER_CHANGE_TYPE]: postPlayerChangeTypeRegister,
  [ModCallbacksCustom.POST_PLAYER_FATAL_DAMAGE]: postPlayerFatalDamageRegister,
  [ModCallbacksCustom.POST_PLAYER_INIT_LATE]: postPlayerInitLateRegister,
  [ModCallbacksCustom.POST_PLAYER_INIT_REORDERED]:
    postPlayerInitReorderedRegister,
  [ModCallbacksCustom.POST_PLAYER_RENDER_REORDERED]:
    postPlayerRenderReorderedRegister,
  [ModCallbacksCustom.POST_PLAYER_UPDATE_REORDERED]:
    postPlayerUpdateReorderedRegister,
  [ModCallbacksCustom.POST_PROJECTILE_INIT_LATE]:
    postProjectileInitLateRegister,
  [ModCallbacksCustom.POST_PURCHASE]: postPurchaseRegister,
  [ModCallbacksCustom.POST_ROOM_CLEAR_CHANGED]: postRoomClearChangedRegister,
  [ModCallbacksCustom.POST_SACRIFICE]: postSacrificeRegister,
  [ModCallbacksCustom.POST_SLOT_ANIMATION_CHANGED]:
    postSlotAnimationChangedRegister,
  [ModCallbacksCustom.POST_SLOT_DESTROYED]: postSlotDestroyedRegister,
  [ModCallbacksCustom.POST_SLOT_INIT]: postSlotInitRegister,
  [ModCallbacksCustom.POST_SLOT_RENDER]: postSlotRenderRegister,
  [ModCallbacksCustom.POST_SLOT_UPDATE]: postSlotUpdateRegister,
  [ModCallbacksCustom.POST_TEAR_INIT_LATE]: postTearInitLateRegister,
  [ModCallbacksCustom.POST_TEAR_INIT_VERY_LATE]: postTearInitVeryLateRegister,
  [ModCallbacksCustom.POST_TRANSFORMATION]: postTransformationRegister,
  [ModCallbacksCustom.POST_TRINKET_BREAK]: postTrinketBreakRegister,
  [ModCallbacksCustom.PRE_BERSERK_DEATH]: preBerserkDeathRegister,
  [ModCallbacksCustom.PRE_CUSTOM_REVIVE]: preCustomReviveRegister,
  [ModCallbacksCustom.PRE_ITEM_PICKUP]: preItemPickupRegister,
  [ModCallbacksCustom.PRE_NEW_LEVEL]: preNewLevelRegister,
};
