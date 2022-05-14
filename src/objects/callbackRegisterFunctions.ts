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
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { AddCallbackParameterCustom } from "../types/AddCallbackParameterCustom";

export const CALLBACK_REGISTER_FUNCTIONS: {
  readonly [key in ModCallbackCustom]: (
    ...args: AddCallbackParameterCustom[key]
  ) => void;
} = {
  [ModCallbackCustom.POST_BOMB_INIT_LATE]: postBombInitLateRegister,
  [ModCallbackCustom.POST_BONE_SWING]: postBoneSwingRegister,
  [ModCallbackCustom.POST_COLLECTIBLE_INIT_FIRST]:
    postCollectibleInitFirstRegister,
  [ModCallbackCustom.POST_CURSED_TELEPORT]: postCursedTeleportRegister,
  [ModCallbackCustom.POST_CUSTOM_DOOR_ENTER]: postCustomDoorEnterRegister,
  [ModCallbackCustom.POST_CUSTOM_REVIVE]: postCustomReviveRegister,
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
  [ModCallbackCustom.POST_GREED_MODE_WAVE]: postGreedModeWaveRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_BROKEN]: postGridEntityBrokenRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_COLLISION]:
    postGridEntityCollisionRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_INIT]: postGridEntityInitRegister,
  [ModCallbackCustom.POST_GRID_ENTITY_REMOVE]: postGridEntityRemoveRegister,
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
  [ModCallbackCustom.POST_PICKUP_INIT_LATE]: postPickupInitLateRegister,
  [ModCallbackCustom.POST_PICKUP_STATE_CHANGED]: postPickupStateChangedRegister,
  [ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH]: postPlayerChangeHealthRegister,
  [ModCallbackCustom.POST_PLAYER_CHANGE_TYPE]: postPlayerChangeTypeRegister,
  [ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE]: postPlayerFatalDamageRegister,
  [ModCallbackCustom.POST_PLAYER_INIT_LATE]: postPlayerInitLateRegister,
  [ModCallbackCustom.POST_PLAYER_INIT_REORDERED]:
    postPlayerInitReorderedRegister,
  [ModCallbackCustom.POST_PLAYER_RENDER_REORDERED]:
    postPlayerRenderReorderedRegister,
  [ModCallbackCustom.POST_PLAYER_UPDATE_REORDERED]:
    postPlayerUpdateReorderedRegister,
  [ModCallbackCustom.POST_PROJECTILE_INIT_LATE]: postProjectileInitLateRegister,
  [ModCallbackCustom.POST_PURCHASE]: postPurchaseRegister,
  [ModCallbackCustom.POST_ROOM_CLEAR_CHANGED]: postRoomClearChangedRegister,
  [ModCallbackCustom.POST_SACRIFICE]: postSacrificeRegister,
  [ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED]:
    postSlotAnimationChangedRegister,
  [ModCallbackCustom.POST_SLOT_DESTROYED]: postSlotDestroyedRegister,
  [ModCallbackCustom.POST_SLOT_INIT]: postSlotInitRegister,
  [ModCallbackCustom.POST_SLOT_RENDER]: postSlotRenderRegister,
  [ModCallbackCustom.POST_SLOT_UPDATE]: postSlotUpdateRegister,
  [ModCallbackCustom.POST_TEAR_INIT_LATE]: postTearInitLateRegister,
  [ModCallbackCustom.POST_TEAR_INIT_VERY_LATE]: postTearInitVeryLateRegister,
  [ModCallbackCustom.POST_TRANSFORMATION]: postTransformationRegister,
  [ModCallbackCustom.POST_TRINKET_BREAK]: postTrinketBreakRegister,
  [ModCallbackCustom.PRE_BERSERK_DEATH]: preBerserkDeathRegister,
  [ModCallbackCustom.PRE_CUSTOM_REVIVE]: preCustomReviveRegister,
  [ModCallbackCustom.PRE_ITEM_PICKUP]: preItemPickupRegister,
  [ModCallbackCustom.PRE_NEW_LEVEL]: preNewLevelRegister,
};
