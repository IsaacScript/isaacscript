import { PostBombInitRegisterParameters } from "../callbacks/subscriptions/postBombInitLate";
import { PostBoneSwingRegisterParameters } from "../callbacks/subscriptions/postBoneSwing";
import { PostCollectibleInitFirstRegisterParameters } from "../callbacks/subscriptions/postCollectibleInitFirst";
import { PostCursedTeleportRegisterParameters } from "../callbacks/subscriptions/postCursedTeleport";
import { PostCustomDoorEnterRegisterParameters } from "../callbacks/subscriptions/postCustomDoorEnter";
import { PostCustomReviveRegisterParameters } from "../callbacks/subscriptions/postCustomRevive";
import { PostEffectInitLateRegisterParameters } from "../callbacks/subscriptions/postEffectInitLate";
import { PostEffectStateChangedRegisterParameters } from "../callbacks/subscriptions/postEffectStateChanged";
import { PostEsauJrRegisterParameters } from "../callbacks/subscriptions/postEsauJr";
import { PostFamiliarInitLateRegisterParameters } from "../callbacks/subscriptions/postFamiliarInitLate";
import { PostFamiliarStateChangedRegisterParameters } from "../callbacks/subscriptions/postFamiliarStateChanged";
import { PostFirstEsauJrRegisterParameters } from "../callbacks/subscriptions/postFirstEsauJr";
import { PostFirstFlipRegisterParameters } from "../callbacks/subscriptions/postFirstFlip";
import { PostFlipRegisterParameters } from "../callbacks/subscriptions/postFlip";
import { PostGameStartedReorderedRegisterParameters } from "../callbacks/subscriptions/postGameStartedReordered";
import { PostGreedModeWaveRegisterParameters } from "../callbacks/subscriptions/postGreedModeWave";
import { PostGridEntityBrokenRegisterParameters } from "../callbacks/subscriptions/postGridEntityBroken";
import { PostGridEntityCollisionRegisterParameters } from "../callbacks/subscriptions/postGridEntityCollision";
import { PostGridEntityInitRegisterParameters } from "../callbacks/subscriptions/postGridEntityInit";
import { PostGridEntityRemoveRegisterParameters } from "../callbacks/subscriptions/postGridEntityRemove";
import { PostGridEntityStateChangedRegisterParameters } from "../callbacks/subscriptions/postGridEntityStateChanged";
import { PostGridEntityUpdateRegisterParameters } from "../callbacks/subscriptions/postGridEntityUpdate";
import { PostHolyMantleRemovedRegisterParameters } from "../callbacks/subscriptions/postHolyMantleRemoved";
import { PostItemDischargedRegisterParameters } from "../callbacks/subscriptions/postItemDischarged";
import { PostItemPickupRegisterParameters } from "../callbacks/subscriptions/postItemPickup";
import { PostKnifeInitLateRegisterParameters } from "../callbacks/subscriptions/postKnifeInitLate";
import { PostLaserInitLateRegisterParameters } from "../callbacks/subscriptions/postLaserInitLate";
import { PostNewLevelReorderedRegisterParameters } from "../callbacks/subscriptions/postNewLevelReordered";
import { PostNewRoomEarlyRegisterParameters } from "../callbacks/subscriptions/postNewRoomEarly";
import { PostNewRoomReorderedRegisterParameters } from "../callbacks/subscriptions/postNewRoomReordered";
import { PostNPCInitLateRegisterParameters } from "../callbacks/subscriptions/postNPCInitLate";
import { PostNPCStateChangedRegisterParameters } from "../callbacks/subscriptions/postNPCStateChanged";
import { PostPEffectUpdateReorderedRegisterParameters } from "../callbacks/subscriptions/postPEffectUpdateReordered";
import { PostPickupCollectRegisterParameters } from "../callbacks/subscriptions/postPickupCollect";
import { PostPickupInitLateRegisterParameters } from "../callbacks/subscriptions/postPickupInitLate";
import { PostPickupStateChangedRegisterParameters } from "../callbacks/subscriptions/postPickupStateChanged";
import { PostPlayerChangeHealthRegisterParameters } from "../callbacks/subscriptions/postPlayerChangeHealth";
import { PostPlayerChangeTypeRegisterParameters } from "../callbacks/subscriptions/postPlayerChangeType";
import { PostPlayerFatalDamageRegisterParameters } from "../callbacks/subscriptions/postPlayerFatalDamage";
import { PostPlayerInitLateRegisterParameters } from "../callbacks/subscriptions/postPlayerInitLate";
import { PostPlayerInitReorderedRegisterParameters } from "../callbacks/subscriptions/postPlayerInitReordered";
import { PostPlayerRenderReorderedRegisterParameters } from "../callbacks/subscriptions/postPlayerRenderReordered";
import { PostPlayerUpdateReorderedRegisterParameters } from "../callbacks/subscriptions/postPlayerUpdateReordered";
import { PostProjectileInitLateRegisterParameters } from "../callbacks/subscriptions/postProjectileInitLate";
import { PostPurchaseRegisterParameters } from "../callbacks/subscriptions/postPurchase";
import { PostRoomClearChangedRegisterParameters } from "../callbacks/subscriptions/postRoomClearChanged";
import { PostSacrificeRegisterParameters } from "../callbacks/subscriptions/postSacrifice";
import { PostSlotAnimationChangedRegisterParameters } from "../callbacks/subscriptions/postSlotAnimationChanged";
import { PostSlotDestroyedRegisterParameters } from "../callbacks/subscriptions/postSlotDestroyed";
import { PostSlotInitRegisterParameters } from "../callbacks/subscriptions/postSlotInit";
import { PostSlotRenderRegisterParameters } from "../callbacks/subscriptions/postSlotRender";
import { PostSlotUpdateRegisterParameters } from "../callbacks/subscriptions/postSlotUpdate";
import { PostTearInitLateRegisterParameters } from "../callbacks/subscriptions/postTearInitLate";
import { PostTearInitVeryLateRegisterParameters } from "../callbacks/subscriptions/postTearInitVeryLate";
import { PostTransformationRegisterParameters } from "../callbacks/subscriptions/postTransformation";
import { PostTrinketBreakRegisterParameters } from "../callbacks/subscriptions/postTrinketBreak";
import { PreBerserkDeathRegisterParameters } from "../callbacks/subscriptions/preBerserkDeath";
import { PreCustomReviveRegisterParameters } from "../callbacks/subscriptions/preCustomRevive";
import { PreItemPickupRegisterParameters } from "../callbacks/subscriptions/preItemPickup";
import { PreNewLevelRegisterParameters } from "../callbacks/subscriptions/preNewLevel";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";

export interface AddCallbackParameterCustom {
  [ModCallbackCustom.POST_BOMB_INIT_LATE]: PostBombInitRegisterParameters;
  [ModCallbackCustom.POST_BONE_SWING]: PostBoneSwingRegisterParameters;
  [ModCallbackCustom.POST_COLLECTIBLE_INIT_FIRST]: PostCollectibleInitFirstRegisterParameters;
  [ModCallbackCustom.POST_CURSED_TELEPORT]: PostCursedTeleportRegisterParameters;
  [ModCallbackCustom.POST_CUSTOM_DOOR_ENTER]: PostCustomDoorEnterRegisterParameters;
  [ModCallbackCustom.POST_CUSTOM_REVIVE]: PostCustomReviveRegisterParameters;
  [ModCallbackCustom.POST_EFFECT_INIT_LATE]: PostEffectInitLateRegisterParameters;
  [ModCallbackCustom.POST_EFFECT_STATE_CHANGED]: PostEffectStateChangedRegisterParameters;
  [ModCallbackCustom.POST_ESAU_JR]: PostEsauJrRegisterParameters;
  [ModCallbackCustom.POST_FAMILIAR_INIT_LATE]: PostFamiliarInitLateRegisterParameters;
  [ModCallbackCustom.POST_FAMILIAR_STATE_CHANGED]: PostFamiliarStateChangedRegisterParameters;
  [ModCallbackCustom.POST_FIRST_ESAU_JR]: PostFirstEsauJrRegisterParameters;
  [ModCallbackCustom.POST_FIRST_FLIP]: PostFirstFlipRegisterParameters;
  [ModCallbackCustom.POST_FLIP]: PostFlipRegisterParameters;
  [ModCallbackCustom.POST_GAME_STARTED_REORDERED]: PostGameStartedReorderedRegisterParameters;
  [ModCallbackCustom.POST_GREED_MODE_WAVE]: PostGreedModeWaveRegisterParameters;
  [ModCallbackCustom.POST_GRID_ENTITY_BROKEN]: PostGridEntityBrokenRegisterParameters;
  [ModCallbackCustom.POST_GRID_ENTITY_COLLISION]: PostGridEntityCollisionRegisterParameters;
  [ModCallbackCustom.POST_GRID_ENTITY_INIT]: PostGridEntityInitRegisterParameters;
  [ModCallbackCustom.POST_GRID_ENTITY_REMOVE]: PostGridEntityRemoveRegisterParameters;
  [ModCallbackCustom.POST_GRID_ENTITY_STATE_CHANGED]: PostGridEntityStateChangedRegisterParameters;
  [ModCallbackCustom.POST_GRID_ENTITY_UPDATE]: PostGridEntityUpdateRegisterParameters;
  [ModCallbackCustom.POST_HOLY_MANTLE_REMOVED]: PostHolyMantleRemovedRegisterParameters;
  [ModCallbackCustom.POST_ITEM_DISCHARGE]: PostItemDischargedRegisterParameters;
  [ModCallbackCustom.POST_ITEM_PICKUP]: PostItemPickupRegisterParameters;
  [ModCallbackCustom.POST_KNIFE_INIT_LATE]: PostKnifeInitLateRegisterParameters;
  [ModCallbackCustom.POST_LASER_INIT_LATE]: PostLaserInitLateRegisterParameters;
  [ModCallbackCustom.POST_NEW_LEVEL_REORDERED]: PostNewLevelReorderedRegisterParameters;
  [ModCallbackCustom.POST_NEW_ROOM_EARLY]: PostNewRoomEarlyRegisterParameters;
  [ModCallbackCustom.POST_NEW_ROOM_REORDERED]: PostNewRoomReorderedRegisterParameters;
  [ModCallbackCustom.POST_NPC_INIT_LATE]: PostNPCInitLateRegisterParameters;
  [ModCallbackCustom.POST_NPC_STATE_CHANGED]: PostNPCStateChangedRegisterParameters;
  [ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED]: PostPEffectUpdateReorderedRegisterParameters;
  [ModCallbackCustom.POST_PICKUP_COLLECT]: PostPickupCollectRegisterParameters;
  [ModCallbackCustom.POST_PICKUP_INIT_LATE]: PostPickupInitLateRegisterParameters;
  [ModCallbackCustom.POST_PICKUP_STATE_CHANGED]: PostPickupStateChangedRegisterParameters;
  [ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH]: PostPlayerChangeHealthRegisterParameters;
  [ModCallbackCustom.POST_PLAYER_CHANGE_TYPE]: PostPlayerChangeTypeRegisterParameters;
  [ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE]: PostPlayerFatalDamageRegisterParameters;
  [ModCallbackCustom.POST_PLAYER_INIT_LATE]: PostPlayerInitLateRegisterParameters;
  [ModCallbackCustom.POST_PLAYER_INIT_REORDERED]: PostPlayerInitReorderedRegisterParameters;
  [ModCallbackCustom.POST_PLAYER_RENDER_REORDERED]: PostPlayerRenderReorderedRegisterParameters;
  [ModCallbackCustom.POST_PLAYER_UPDATE_REORDERED]: PostPlayerUpdateReorderedRegisterParameters;
  [ModCallbackCustom.POST_PROJECTILE_INIT_LATE]: PostProjectileInitLateRegisterParameters;
  [ModCallbackCustom.POST_PURCHASE]: PostPurchaseRegisterParameters;
  [ModCallbackCustom.POST_ROOM_CLEAR_CHANGED]: PostRoomClearChangedRegisterParameters;
  [ModCallbackCustom.POST_SACRIFICE]: PostSacrificeRegisterParameters;
  [ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED]: PostSlotAnimationChangedRegisterParameters;
  [ModCallbackCustom.POST_SLOT_DESTROYED]: PostSlotDestroyedRegisterParameters;
  [ModCallbackCustom.POST_SLOT_INIT]: PostSlotInitRegisterParameters;
  [ModCallbackCustom.POST_SLOT_RENDER]: PostSlotRenderRegisterParameters;
  [ModCallbackCustom.POST_SLOT_UPDATE]: PostSlotUpdateRegisterParameters;
  [ModCallbackCustom.POST_TEAR_INIT_LATE]: PostTearInitLateRegisterParameters;
  [ModCallbackCustom.POST_TEAR_INIT_VERY_LATE]: PostTearInitVeryLateRegisterParameters;
  [ModCallbackCustom.POST_TRANSFORMATION]: PostTransformationRegisterParameters;
  [ModCallbackCustom.POST_TRINKET_BREAK]: PostTrinketBreakRegisterParameters;
  [ModCallbackCustom.PRE_BERSERK_DEATH]: PreBerserkDeathRegisterParameters;
  [ModCallbackCustom.PRE_CUSTOM_REVIVE]: PreCustomReviveRegisterParameters;
  [ModCallbackCustom.PRE_ITEM_PICKUP]: PreItemPickupRegisterParameters;
  [ModCallbackCustom.PRE_NEW_LEVEL]: PreNewLevelRegisterParameters;
}

// Make copies of the objects we need to verify so that we can easily re-use the code block below
type EnumToCheck = ModCallbackCustom;
type InterfaceToCheck = AddCallbackParameterCustom;

// Throw a compiler error if InterfaceToCheck does not match the values of EnumToCheck
// From: https://stackoverflow.com/questions/51829842
type KeysMissing = Exclude<EnumToCheck, keyof InterfaceToCheck>;
type ExtraKeys = {
  [K in keyof InterfaceToCheck]: Extract<EnumToCheck, K> extends never
    ? K
    : never;
}[keyof InterfaceToCheck];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Verify<
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _Missing extends never = KeysMissing,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _Extra extends never = ExtraKeys,
> = 0;
