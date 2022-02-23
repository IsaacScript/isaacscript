import { PostBombInitLateCallbackType } from "../callbacks/subscriptions/postBombInitLate";
import { PostBoneSwingCallbackType } from "../callbacks/subscriptions/postBoneSwing";
import { PostCursedTeleportCallbackType } from "../callbacks/subscriptions/postCursedTeleport";
import { PostCustomReviveCallbackType } from "../callbacks/subscriptions/postCustomRevive";
import { PostEffectInitLateCallbackType } from "../callbacks/subscriptions/postEffectInitLate";
import { PostEsauJrCallbackType } from "../callbacks/subscriptions/postEsauJr";
import { PostFamiliarInitLateCallbackType } from "../callbacks/subscriptions/postFamiliarInitLate";
import { PostFirstEsauJrCallbackType } from "../callbacks/subscriptions/postFirstEsauJr";
import { PostFirstFlipCallbackType } from "../callbacks/subscriptions/postFirstFlip";
import { PostFlipCallbackType } from "../callbacks/subscriptions/postFlip";
import { PostGameStartedReorderedCallbackType } from "../callbacks/subscriptions/postGameStartedReordered";
import { PostGridEntityCollisionCallbackType } from "../callbacks/subscriptions/postGridEntityCollision";
import { PostGridEntityInitCallbackType } from "../callbacks/subscriptions/postGridEntityInit";
import { PostGridEntityRemoveCallbackType } from "../callbacks/subscriptions/postGridEntityRemove";
import { PostGridEntityUpdateCallbackType } from "../callbacks/subscriptions/postGridEntityUpdate";
import { PostItemPickupCallbackType } from "../callbacks/subscriptions/postItemPickup";
import { PostKnifeInitLateCallbackType } from "../callbacks/subscriptions/postKnifeInitLate";
import { PostLaserInitLateCallbackType } from "../callbacks/subscriptions/postLaserInitLate";
import { PostNewLevelReorderedCallbackType } from "../callbacks/subscriptions/postNewLevelReordered";
import { PostNewRoomEarlyCallbackType } from "../callbacks/subscriptions/postNewRoomEarly";
import { PostNewRoomReorderedCallbackType } from "../callbacks/subscriptions/postNewRoomReordered";
import { PostNPCInitLateCallbackType } from "../callbacks/subscriptions/postNPCInitLate";
import { PostPEffectUpdateReorderedCallbackType } from "../callbacks/subscriptions/postPEffectUpdateReordered";
import { PostPickupCollectCallbackType } from "../callbacks/subscriptions/postPickupCollect";
import { PostPickupInitLateCallbackType } from "../callbacks/subscriptions/postPickupInitLate";
import { PostPlayerChangeHealthCallbackType } from "../callbacks/subscriptions/postPlayerChangeHealth";
import { PostPlayerChangeTypeCallbackType } from "../callbacks/subscriptions/postPlayerChangeType";
import { PostPlayerFatalDamageCallbackType } from "../callbacks/subscriptions/postPlayerFatalDamage";
import { PostPlayerInitLateCallbackType } from "../callbacks/subscriptions/postPlayerInitLate";
import { PostPlayerInitReorderedCallbackType } from "../callbacks/subscriptions/postPlayerInitReordered";
import { PostPlayerRenderReorderedCallbackType } from "../callbacks/subscriptions/postPlayerRenderReordered";
import { PostPlayerUpdateReorderedCallbackType } from "../callbacks/subscriptions/postPlayerUpdateReordered";
import { PostProjectileInitLateCallbackType } from "../callbacks/subscriptions/postProjectileInitLate";
import { PostPurchaseCallbackType } from "../callbacks/subscriptions/postPurchase";
import { PostSacrificeCallbackType } from "../callbacks/subscriptions/postSacrifice";
import { PostSlotDestroyedCallbackType } from "../callbacks/subscriptions/postSlotDestroyed";
import { PostSlotInitCallbackType } from "../callbacks/subscriptions/postSlotInit";
import { PostSlotRenderCallbackType } from "../callbacks/subscriptions/postSlotRender";
import { PostSlotUpdateCallbackType } from "../callbacks/subscriptions/postSlotUpdate";
import { PostTearInitLateCallbackType } from "../callbacks/subscriptions/postTearInitLate";
import { PostTearInitVeryLateCallbackType } from "../callbacks/subscriptions/postTearInitVeryLate";
import { PostTransformationCallbackType } from "../callbacks/subscriptions/postTransformation";
import { PostTrinketBreakCallbackType } from "../callbacks/subscriptions/postTrinketBreak";
import { PreBerserkDeathCallbackType } from "../callbacks/subscriptions/preBerserkDeath";
import { PreCustomReviveCallbackType } from "../callbacks/subscriptions/preCustomRevive";
import { PreItemPickupCallbackType } from "../callbacks/subscriptions/preItemPickup";
import { PreNewLevelCallbackType } from "../callbacks/subscriptions/preNewLevel";
import { ModCallbacksCustom } from "./ModCallbacksCustom";

export interface CallbackParametersCustom {
  [ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED]: [
    callback: PostGameStartedReorderedCallbackType,
  ];

  [ModCallbacksCustom.MC_POST_NEW_LEVEL_REORDERED]: [
    callback: PostNewLevelReorderedCallbackType,
  ];

  [ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED]: [
    callback: PostNewRoomReorderedCallbackType,
  ];

  [ModCallbacksCustom.MC_POST_PLAYER_INIT_REORDERED]: [
    callback: PostPlayerInitReorderedCallbackType,
    playerVariant?: PlayerVariant,
  ];

  [ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED]: [
    callback: PostPEffectUpdateReorderedCallbackType,
    character?: PlayerType,
  ];

  [ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED]: [
    callback: PostPlayerUpdateReorderedCallbackType,
    playerVariant?: PlayerVariant,
  ];

  [ModCallbacksCustom.MC_POST_PLAYER_RENDER_REORDERED]: [
    callback: PostPlayerRenderReorderedCallbackType,
    playerVariant?: PlayerVariant,
  ];

  [ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY]: [
    callback: PostNewRoomEarlyCallbackType,
  ];

  [ModCallbacksCustom.MC_PRE_NEW_LEVEL]: [callback: PreNewLevelCallbackType];

  [ModCallbacksCustom.MC_POST_PLAYER_INIT_LATE]: [
    callback: PostPlayerInitLateCallbackType,
    playerVariant?: PlayerVariant,
  ];

  [ModCallbacksCustom.MC_POST_TEAR_INIT_LATE]: [
    callback: PostTearInitLateCallbackType,
    tearVariant?: TearVariant | int,
  ];

  [ModCallbacksCustom.MC_POST_TEAR_INIT_VERY_LATE]: [
    callback: PostTearInitVeryLateCallbackType,
    tearVariant?: TearVariant | int,
  ];

  [ModCallbacksCustom.MC_POST_FAMILIAR_INIT_LATE]: [
    callback: PostFamiliarInitLateCallbackType,
    familiarVariant?: FamiliarVariant | int,
  ];

  [ModCallbacksCustom.MC_POST_BOMB_INIT_LATE]: [
    callback: PostBombInitLateCallbackType,
    bombVariant?: BombVariant | int,
  ];

  [ModCallbacksCustom.MC_POST_PICKUP_INIT_LATE]: [
    callback: PostPickupInitLateCallbackType,
    pickupVariant?: PickupVariant | int,
  ];

  [ModCallbacksCustom.MC_POST_LASER_INIT_LATE]: [
    callback: PostLaserInitLateCallbackType,
    laserVariant?: LaserVariant | int,
  ];

  [ModCallbacksCustom.MC_POST_KNIFE_INIT_LATE]: [
    callback: PostKnifeInitLateCallbackType,
    knifeVariant?: KnifeVariant | int,
  ];

  [ModCallbacksCustom.MC_POST_PROJECTILE_INIT_LATE]: [
    callback: PostProjectileInitLateCallbackType,
    projectileVariant?: ProjectileVariant | int,
  ];

  [ModCallbacksCustom.MC_POST_NPC_INIT_LATE]: [
    callback: PostNPCInitLateCallbackType,
    entityType?: EntityType,
  ];

  [ModCallbacksCustom.MC_POST_EFFECT_INIT_LATE]: [
    callback: PostEffectInitLateCallbackType,
    effectVariant?: EffectVariant,
  ];

  [ModCallbacksCustom.MC_POST_PICKUP_COLLECT]: [
    callback: PostPickupCollectCallbackType,
    pickupVariant?: PickupVariant | int,
  ];

  [ModCallbacksCustom.MC_PRE_ITEM_PICKUP]: [
    callback: PreItemPickupCallbackType,
    itemType?: ItemType,
    itemID?: CollectibleType | TrinketType | int,
  ];

  [ModCallbacksCustom.MC_POST_ITEM_PICKUP]: [
    callback: PostItemPickupCallbackType,
    itemType?: ItemType,
    itemID?: CollectibleType | TrinketType | int,
  ];

  [ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE]: [
    callback: PostPlayerChangeTypeCallbackType,
  ];

  [ModCallbacksCustom.MC_POST_PLAYER_CHANGE_HEALTH]: [
    callback: PostPlayerChangeHealthCallbackType,
    playerVariant?: PlayerVariant,
  ];

  [ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE]: [
    callback: PostPlayerFatalDamageCallbackType,
    playerVariant?: PlayerVariant,
  ];

  [ModCallbacksCustom.MC_PRE_BERSERK_DEATH]: [
    callback: PreBerserkDeathCallbackType,
    playerVariant?: PlayerVariant,
  ];

  [ModCallbacksCustom.MC_PRE_CUSTOM_REVIVE]: [
    callback: PreCustomReviveCallbackType,
  ];

  [ModCallbacksCustom.MC_POST_CUSTOM_REVIVE]: [
    callback: PostCustomReviveCallbackType,
    revivalType?: int,
  ];

  [ModCallbacksCustom.MC_POST_FLIP]: [callback: PostFlipCallbackType];

  [ModCallbacksCustom.MC_POST_FIRST_FLIP]: [
    callback: PostFirstFlipCallbackType,
  ];

  [ModCallbacksCustom.MC_POST_ESAU_JR]: [callback: PostEsauJrCallbackType];

  [ModCallbacksCustom.MC_POST_FIRST_ESAU_JR]: [
    callback: PostFirstEsauJrCallbackType,
  ];

  [ModCallbacksCustom.MC_POST_TRANSFORMATION]: [
    callback: PostTransformationCallbackType,
  ];

  [ModCallbacksCustom.MC_POST_PURCHASE]: [
    callback: PostPurchaseCallbackType,
    pickupVariant?: PickupVariant | int,
    pickupSubType?: int,
  ];

  [ModCallbacksCustom.MC_POST_SACRIFICE]: [callback: PostSacrificeCallbackType];

  [ModCallbacksCustom.MC_POST_CURSED_TELEPORT]: [
    callback: PostCursedTeleportCallbackType,
  ];

  [ModCallbacksCustom.MC_POST_TRINKET_BREAK]: [
    callback: PostTrinketBreakCallbackType,
    trinketType?: TrinketType | int,
  ];

  [ModCallbacksCustom.MC_POST_SLOT_INIT]: [
    callback: PostSlotInitCallbackType,
    slotVariant?: SlotVariant,
  ];

  [ModCallbacksCustom.MC_POST_SLOT_UPDATE]: [
    callback: PostSlotUpdateCallbackType,
    slotVariant?: SlotVariant,
  ];

  [ModCallbacksCustom.MC_POST_SLOT_RENDER]: [
    callback: PostSlotRenderCallbackType,
    slotVariant?: SlotVariant,
  ];

  [ModCallbacksCustom.MC_POST_SLOT_DESTROYED]: [
    callback: PostSlotDestroyedCallbackType,
    slotVariant?: SlotVariant,
  ];

  [ModCallbacksCustom.MC_POST_GRID_ENTITY_INIT]: [
    callback: PostGridEntityInitCallbackType,
    gridEntityType?: GridEntityType,
  ];

  [ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE]: [
    callback: PostGridEntityUpdateCallbackType,
    gridEntityType?: GridEntityType,
  ];

  [ModCallbacksCustom.MC_POST_GRID_ENTITY_REMOVE]: [
    callback: PostGridEntityRemoveCallbackType,
    gridEntityType?: GridEntityType,
  ];

  [ModCallbacksCustom.MC_POST_GRID_ENTITY_COLLISION]: [
    callback: PostGridEntityCollisionCallbackType,
    gridEntityType?: GridEntityType,
  ];

  [ModCallbacksCustom.MC_POST_BONE_SWING]: [
    callback: PostBoneSwingCallbackType,
  ];
}

// Make copies of the objects we need to verify so that we can easily re-use the code block below
type EnumToCheck = ModCallbacksCustom;
type InterfaceToCheck = CallbackParametersCustom;

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
  _Missing extends never = KeysMissing, // eslint-disable-line
  _Extra extends never = ExtraKeys, // eslint-disable-line
> = 0;
