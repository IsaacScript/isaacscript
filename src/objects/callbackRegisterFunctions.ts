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
import { postGridEntityBrokenRegister } from "../callbacks/subscriptions/postGridEntityBroken";
import { postGridEntityCollisionRegister } from "../callbacks/subscriptions/postGridEntityCollision";
import { postGridEntityInitRegister } from "../callbacks/subscriptions/postGridEntityInit";
import { postGridEntityRemoveRegister } from "../callbacks/subscriptions/postGridEntityRemove";
import { postGridEntityStateChangedRegister } from "../callbacks/subscriptions/postGridEntityStateChanged";
import { postGridEntityUpdateRegister } from "../callbacks/subscriptions/postGridEntityUpdate";
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
import { AddCallbackParametersCustom } from "../types/AddCallbackParametersCustom";

export const CALLBACK_REGISTER_FUNCTIONS: {
  readonly [key in ModCallbacksCustom]: (
    ...args: AddCallbackParametersCustom[key]
  ) => void;
} = {
  [ModCallbacksCustom.MC_POST_BOMB_INIT_LATE]: postBombInitLateRegister,
  [ModCallbacksCustom.MC_POST_BONE_SWING]: postBoneSwingRegister,
  [ModCallbacksCustom.MC_POST_COLLECTIBLE_INIT_FIRST]:
    postCollectibleInitFirstRegister,
  [ModCallbacksCustom.MC_POST_CURSED_TELEPORT]: postCursedTeleportRegister,
  [ModCallbacksCustom.MC_POST_CUSTOM_DOOR_ENTER]: postCustomDoorEnterRegister,
  [ModCallbacksCustom.MC_POST_CUSTOM_REVIVE]: postCustomReviveRegister,
  [ModCallbacksCustom.MC_POST_EFFECT_INIT_LATE]: postEffectInitLateRegister,
  [ModCallbacksCustom.MC_POST_EFFECT_STATE_CHANGED]:
    postEffectStateChangedRegister,
  [ModCallbacksCustom.MC_POST_ESAU_JR]: postEsauJrRegister,
  [ModCallbacksCustom.MC_POST_FAMILIAR_INIT_LATE]: postFamiliarInitLateRegister,
  [ModCallbacksCustom.MC_POST_FAMILIAR_STATE_CHANGED]:
    postFamiliarStateChangedRegister,
  [ModCallbacksCustom.MC_POST_FIRST_ESAU_JR]: postFirstEsauJrRegister,
  [ModCallbacksCustom.MC_POST_FIRST_FLIP]: postFirstFlipRegister,
  [ModCallbacksCustom.MC_POST_FLIP]: postFlipRegister,
  [ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED]:
    postGameStartedReorderedRegister,
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_BROKEN]: postGridEntityBrokenRegister,
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_COLLISION]:
    postGridEntityCollisionRegister,
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_INIT]: postGridEntityInitRegister,
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_REMOVE]: postGridEntityRemoveRegister,
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_STATE_CHANGED]:
    postGridEntityStateChangedRegister,
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE]: postGridEntityUpdateRegister,
  [ModCallbacksCustom.MC_POST_ITEM_DISCHARGE]: postItemDischargeRegister,
  [ModCallbacksCustom.MC_POST_ITEM_PICKUP]: postItemPickupRegister,
  [ModCallbacksCustom.MC_POST_KNIFE_INIT_LATE]: postKnifeInitLateRegister,
  [ModCallbacksCustom.MC_POST_LASER_INIT_LATE]: postLaserInitLateRegister,
  [ModCallbacksCustom.MC_POST_NEW_LEVEL_REORDERED]:
    postNewLevelReorderedRegister,
  [ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY]: postNewRoomEarlyRegister,
  [ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED]: postNewRoomReorderedRegister,
  [ModCallbacksCustom.MC_POST_NPC_INIT_LATE]: postNPCInitLateRegister,
  [ModCallbacksCustom.MC_POST_NPC_STATE_CHANGED]: postNPCStateChangedRegister,
  [ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED]:
    postPEffectUpdateReorderedRegister,
  [ModCallbacksCustom.MC_POST_PICKUP_COLLECT]: postPickupCollectRegister,
  [ModCallbacksCustom.MC_POST_PICKUP_INIT_LATE]: postPickupInitLateRegister,
  [ModCallbacksCustom.MC_POST_PICKUP_STATE_CHANGED]:
    postPickupStateChangedRegister,
  [ModCallbacksCustom.MC_POST_PLAYER_CHANGE_HEALTH]:
    postPlayerChangeHealthRegister,
  [ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE]: postPlayerChangeTypeRegister,
  [ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE]:
    postPlayerFatalDamageRegister,
  [ModCallbacksCustom.MC_POST_PLAYER_INIT_LATE]: postPlayerInitLateRegister,
  [ModCallbacksCustom.MC_POST_PLAYER_INIT_REORDERED]:
    postPlayerInitReorderedRegister,
  [ModCallbacksCustom.MC_POST_PLAYER_RENDER_REORDERED]:
    postPlayerRenderReorderedRegister,
  [ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED]:
    postPlayerUpdateReorderedRegister,
  [ModCallbacksCustom.MC_POST_PROJECTILE_INIT_LATE]:
    postProjectileInitLateRegister,
  [ModCallbacksCustom.MC_POST_PURCHASE]: postPurchaseRegister,
  [ModCallbacksCustom.MC_POST_ROOM_CLEAR_CHANGED]: postRoomClearChangedRegister,
  [ModCallbacksCustom.MC_POST_SACRIFICE]: postSacrificeRegister,
  [ModCallbacksCustom.MC_POST_SLOT_ANIMATION_CHANGED]:
    postSlotAnimationChangedRegister,
  [ModCallbacksCustom.MC_POST_SLOT_DESTROYED]: postSlotDestroyedRegister,
  [ModCallbacksCustom.MC_POST_SLOT_INIT]: postSlotInitRegister,
  [ModCallbacksCustom.MC_POST_SLOT_RENDER]: postSlotRenderRegister,
  [ModCallbacksCustom.MC_POST_SLOT_UPDATE]: postSlotUpdateRegister,
  [ModCallbacksCustom.MC_POST_TEAR_INIT_LATE]: postTearInitLateRegister,
  [ModCallbacksCustom.MC_POST_TEAR_INIT_VERY_LATE]:
    postTearInitVeryLateRegister,
  [ModCallbacksCustom.MC_POST_TRANSFORMATION]: postTransformationRegister,
  [ModCallbacksCustom.MC_POST_TRINKET_BREAK]: postTrinketBreakRegister,
  [ModCallbacksCustom.MC_PRE_BERSERK_DEATH]: preBerserkDeathRegister,
  [ModCallbacksCustom.MC_PRE_CUSTOM_REVIVE]: preCustomReviveRegister,
  [ModCallbacksCustom.MC_PRE_ITEM_PICKUP]: preItemPickupRegister,
  [ModCallbacksCustom.MC_PRE_NEW_LEVEL]: preNewLevelRegister,
};
