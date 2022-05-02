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
import { ModCallbacksCustom } from "../enums/ModCallbacksCustom";

export interface AddCallbackParametersCustom {
  [ModCallbacksCustom.MC_POST_BOMB_INIT_LATE]: PostBombInitRegisterParameters;
  [ModCallbacksCustom.MC_POST_BONE_SWING]: PostBoneSwingRegisterParameters;
  [ModCallbacksCustom.MC_POST_COLLECTIBLE_INIT_FIRST]: PostCollectibleInitFirstRegisterParameters;
  [ModCallbacksCustom.MC_POST_CURSED_TELEPORT]: PostCursedTeleportRegisterParameters;
  [ModCallbacksCustom.MC_POST_CUSTOM_DOOR_ENTER]: PostCustomDoorEnterRegisterParameters;
  [ModCallbacksCustom.MC_POST_CUSTOM_REVIVE]: PostCustomReviveRegisterParameters;
  [ModCallbacksCustom.MC_POST_EFFECT_INIT_LATE]: PostEffectInitLateRegisterParameters;
  [ModCallbacksCustom.MC_POST_EFFECT_STATE_CHANGED]: PostEffectStateChangedRegisterParameters;
  [ModCallbacksCustom.MC_POST_ESAU_JR]: PostEsauJrRegisterParameters;
  [ModCallbacksCustom.MC_POST_FAMILIAR_INIT_LATE]: PostFamiliarInitLateRegisterParameters;
  [ModCallbacksCustom.MC_POST_FAMILIAR_STATE_CHANGED]: PostFamiliarStateChangedRegisterParameters;
  [ModCallbacksCustom.MC_POST_FIRST_ESAU_JR]: PostFirstEsauJrRegisterParameters;
  [ModCallbacksCustom.MC_POST_FIRST_FLIP]: PostFirstFlipRegisterParameters;
  [ModCallbacksCustom.MC_POST_FLIP]: PostFlipRegisterParameters;
  [ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED]: PostGameStartedReorderedRegisterParameters;
  [ModCallbacksCustom.MC_POST_GREED_MODE_WAVE]: PostGreedModeWaveRegisterParameters;
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_BROKEN]: PostGridEntityBrokenRegisterParameters;
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_COLLISION]: PostGridEntityCollisionRegisterParameters;
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_INIT]: PostGridEntityInitRegisterParameters;
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_REMOVE]: PostGridEntityRemoveRegisterParameters;
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_STATE_CHANGED]: PostGridEntityStateChangedRegisterParameters;
  [ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE]: PostGridEntityUpdateRegisterParameters;
  [ModCallbacksCustom.MC_POST_HOLY_MANTLE_REMOVED]: PostHolyMantleRemovedRegisterParameters;
  [ModCallbacksCustom.MC_POST_ITEM_DISCHARGE]: PostItemDischargedRegisterParameters;
  [ModCallbacksCustom.MC_POST_ITEM_PICKUP]: PostItemPickupRegisterParameters;
  [ModCallbacksCustom.MC_POST_KNIFE_INIT_LATE]: PostKnifeInitLateRegisterParameters;
  [ModCallbacksCustom.MC_POST_LASER_INIT_LATE]: PostLaserInitLateRegisterParameters;
  [ModCallbacksCustom.MC_POST_NEW_LEVEL_REORDERED]: PostNewLevelReorderedRegisterParameters;
  [ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY]: PostNewRoomEarlyRegisterParameters;
  [ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED]: PostNewRoomReorderedRegisterParameters;
  [ModCallbacksCustom.MC_POST_NPC_INIT_LATE]: PostNPCInitLateRegisterParameters;
  [ModCallbacksCustom.MC_POST_NPC_STATE_CHANGED]: PostNPCStateChangedRegisterParameters;
  [ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED]: PostPEffectUpdateReorderedRegisterParameters;
  [ModCallbacksCustom.MC_POST_PICKUP_COLLECT]: PostPickupCollectRegisterParameters;
  [ModCallbacksCustom.MC_POST_PICKUP_INIT_LATE]: PostPickupInitLateRegisterParameters;
  [ModCallbacksCustom.MC_POST_PICKUP_STATE_CHANGED]: PostPickupStateChangedRegisterParameters;
  [ModCallbacksCustom.MC_POST_PLAYER_CHANGE_HEALTH]: PostPlayerChangeHealthRegisterParameters;
  [ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE]: PostPlayerChangeTypeRegisterParameters;
  [ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE]: PostPlayerFatalDamageRegisterParameters;
  [ModCallbacksCustom.MC_POST_PLAYER_INIT_LATE]: PostPlayerInitLateRegisterParameters;
  [ModCallbacksCustom.MC_POST_PLAYER_INIT_REORDERED]: PostPlayerInitReorderedRegisterParameters;
  [ModCallbacksCustom.MC_POST_PLAYER_RENDER_REORDERED]: PostPlayerRenderReorderedRegisterParameters;
  [ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED]: PostPlayerUpdateReorderedRegisterParameters;
  [ModCallbacksCustom.MC_POST_PROJECTILE_INIT_LATE]: PostProjectileInitLateRegisterParameters;
  [ModCallbacksCustom.MC_POST_PURCHASE]: PostPurchaseRegisterParameters;
  [ModCallbacksCustom.MC_POST_ROOM_CLEAR_CHANGED]: PostRoomClearChangedRegisterParameters;
  [ModCallbacksCustom.MC_POST_SACRIFICE]: PostSacrificeRegisterParameters;
  [ModCallbacksCustom.MC_POST_SLOT_ANIMATION_CHANGED]: PostSlotAnimationChangedRegisterParameters;
  [ModCallbacksCustom.MC_POST_SLOT_DESTROYED]: PostSlotDestroyedRegisterParameters;
  [ModCallbacksCustom.MC_POST_SLOT_INIT]: PostSlotInitRegisterParameters;
  [ModCallbacksCustom.MC_POST_SLOT_RENDER]: PostSlotRenderRegisterParameters;
  [ModCallbacksCustom.MC_POST_SLOT_UPDATE]: PostSlotUpdateRegisterParameters;
  [ModCallbacksCustom.MC_POST_TEAR_INIT_LATE]: PostTearInitLateRegisterParameters;
  [ModCallbacksCustom.MC_POST_TEAR_INIT_VERY_LATE]: PostTearInitVeryLateRegisterParameters;
  [ModCallbacksCustom.MC_POST_TRANSFORMATION]: PostTransformationRegisterParameters;
  [ModCallbacksCustom.MC_POST_TRINKET_BREAK]: PostTrinketBreakRegisterParameters;
  [ModCallbacksCustom.MC_PRE_BERSERK_DEATH]: PreBerserkDeathRegisterParameters;
  [ModCallbacksCustom.MC_PRE_CUSTOM_REVIVE]: PreCustomReviveRegisterParameters;
  [ModCallbacksCustom.MC_PRE_ITEM_PICKUP]: PreItemPickupRegisterParameters;
  [ModCallbacksCustom.MC_PRE_NEW_LEVEL]: PreNewLevelRegisterParameters;
}

// Make copies of the objects we need to verify so that we can easily re-use the code block below
type EnumToCheck = ModCallbacksCustom;
type InterfaceToCheck = AddCallbackParametersCustom;

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
  // eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars
  _Missing extends never = KeysMissing,
  // eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars
  _Extra extends never = ExtraKeys,
> = 0;
