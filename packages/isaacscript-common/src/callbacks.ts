import { MOD_CALLBACK_CUSTOM_VALUES } from "./cachedEnumValues";
import * as cc from "./callbackClasses";
import { ModCallbackCustom } from "./enums/ModCallbackCustom";
import type { AnyClass } from "./types/AnyClass";

const MOD_CALLBACK_CUSTOM_TO_CLASS = {
  [ModCallbackCustom.ENTITY_TAKE_DMG_FILTER]: cc.EntityTakeDmgFilter,
  [ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER]: cc.EntityTakeDmgPlayer,
  [ModCallbackCustom.INPUT_ACTION_FILTER]: cc.InputActionFilter,
  [ModCallbackCustom.INPUT_ACTION_PLAYER]: cc.InputActionPlayer,
  [ModCallbackCustom.POST_AMBUSH_FINISHED]: cc.PostAmbushFinished,
  [ModCallbackCustom.POST_AMBUSH_STARTED]: cc.PostAmbushStarted,
  [ModCallbackCustom.POST_BOMB_EXPLODED]: cc.PostBombExploded,
  [ModCallbackCustom.POST_BOMB_INIT_FILTER]: cc.PostBombInitFilter,
  [ModCallbackCustom.POST_BOMB_INIT_LATE]: cc.PostBombInitLate,
  [ModCallbackCustom.POST_BOMB_RENDER_FILTER]: cc.PostBombRenderFilter,
  [ModCallbackCustom.POST_BOMB_UPDATE_FILTER]: cc.PostBombUpdateFilter,
  [ModCallbackCustom.POST_BONE_SWING]: cc.PostBoneSwing,
  [ModCallbackCustom.POST_COLLECTIBLE_EMPTY]: cc.PostCollectibleEmpty,
  [ModCallbackCustom.POST_CURSED_TELEPORT]: cc.PostCursedTeleport,
  [ModCallbackCustom.POST_CUSTOM_REVIVE]: cc.PostCustomRevive,
  [ModCallbackCustom.POST_DICE_ROOM_ACTIVATED]: cc.PostDiceRoomActivated,
  [ModCallbackCustom.POST_DOOR_RENDER]: cc.PostDoorRender,
  [ModCallbackCustom.POST_DOOR_UPDATE]: cc.PostDoorUpdate,
  [ModCallbackCustom.POST_EFFECT_INIT_FILTER]: cc.PostEffectInitFilter,
  [ModCallbackCustom.POST_EFFECT_INIT_LATE]: cc.PostEffectInitLate,
  [ModCallbackCustom.POST_EFFECT_RENDER_FILTER]: cc.PostEffectRenderFilter,
  [ModCallbackCustom.POST_EFFECT_STATE_CHANGED]: cc.PostEffectStateChanged,
  [ModCallbackCustom.POST_EFFECT_UPDATE_FILTER]: cc.PostEffectUpdateFilter,
  [ModCallbackCustom.POST_ENTITY_KILL_FILTER]: cc.PostEntityKillFilter,
  [ModCallbackCustom.POST_ENTITY_REMOVE_FILTER]: cc.PostEntityRemoveFilter,
  [ModCallbackCustom.POST_ESAU_JR]: cc.PostEsauJr,
  [ModCallbackCustom.POST_FAMILIAR_INIT_FILTER]: cc.PostFamiliarInitFilter,
  [ModCallbackCustom.POST_FAMILIAR_INIT_LATE]: cc.PostFamiliarInitLate,
  [ModCallbackCustom.POST_FAMILIAR_RENDER_FILTER]: cc.PostFamiliarRenderFilter,
  [ModCallbackCustom.POST_FAMILIAR_STATE_CHANGED]: cc.PostFamiliarStateChanged,
  [ModCallbackCustom.POST_FAMILIAR_UPDATE_FILTER]: cc.PostFamiliarUpdateFilter,
  [ModCallbackCustom.POST_FIRST_FLIP]: cc.PostFirstFlip,
  [ModCallbackCustom.POST_FIRST_ESAU_JR]: cc.PostFirstEsauJr,
  [ModCallbackCustom.POST_FLIP]: cc.PostFlip,
  [ModCallbackCustom.POST_GAME_END_FILTER]: cc.PostGameEndFilter,
  [ModCallbackCustom.POST_GAME_STARTED_REORDERED]: cc.PostGameStartedReordered,
  [ModCallbackCustom.POST_GAME_STARTED_REORDERED_LAST]:
    cc.PostGameStartedReorderedLast,
  [ModCallbackCustom.POST_GREED_MODE_WAVE]: cc.PostGreedModeWave,
  [ModCallbackCustom.POST_GRID_ENTITY_BROKEN]: cc.PostGridEntityBroken,
  [ModCallbackCustom.POST_GRID_ENTITY_COLLISION]: cc.PostGridEntityCollision,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_BROKEN]:
    cc.PostGridEntityCustomBroken,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_COLLISION]:
    cc.PostGridEntityCustomCollision,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_INIT]: cc.PostGridEntityCustomInit,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_REMOVE]:
    cc.PostGridEntityCustomRemove,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_RENDER]:
    cc.PostGridEntityCustomRender,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_STATE_CHANGED]:
    cc.PostGridEntityCustomStateChanged,
  [ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_UPDATE]:
    cc.PostGridEntityCustomUpdate,
  [ModCallbackCustom.POST_GRID_ENTITY_INIT]: cc.PostGridEntityInit,
  [ModCallbackCustom.POST_GRID_ENTITY_REMOVE]: cc.PostGridEntityRemove,
  [ModCallbackCustom.POST_GRID_ENTITY_RENDER]: cc.PostGridEntityRender,
  [ModCallbackCustom.POST_GRID_ENTITY_STATE_CHANGED]:
    cc.PostGridEntityStateChanged,
  [ModCallbackCustom.POST_GRID_ENTITY_UPDATE]: cc.PostGridEntityUpdate,
  [ModCallbackCustom.POST_HOLY_MANTLE_REMOVED]: cc.PostHolyMantleRemoved,
  [ModCallbackCustom.POST_ITEM_DISCHARGE]: cc.PostItemDischarge,
  [ModCallbackCustom.POST_ITEM_PICKUP]: cc.PostItemPickup,
  [ModCallbackCustom.POST_KEYBOARD_CHANGED]: cc.PostKeyboardPressed,
  [ModCallbackCustom.POST_KNIFE_INIT_FILTER]: cc.PostKnifeInitFilter,
  [ModCallbackCustom.POST_KNIFE_INIT_LATE]: cc.PostKnifeInitLate,
  [ModCallbackCustom.POST_KNIFE_RENDER_FILTER]: cc.PostKnifeRenderFilter,
  [ModCallbackCustom.POST_KNIFE_UPDATE_FILTER]: cc.PostKnifeUpdateFilter,
  [ModCallbackCustom.POST_LASER_INIT_FILTER]: cc.PostLaserInitFilter,
  [ModCallbackCustom.POST_LASER_INIT_LATE]: cc.PostLaserInitLate,
  [ModCallbackCustom.POST_LASER_RENDER_FILTER]: cc.PostLaserRenderFilter,
  [ModCallbackCustom.POST_LASER_UPDATE_FILTER]: cc.PostLaserUpdateFilter,
  [ModCallbackCustom.POST_NEW_LEVEL_REORDERED]: cc.PostNewLevelReordered,
  [ModCallbackCustom.POST_NEW_ROOM_EARLY]: cc.PostNewRoomEarly,
  [ModCallbackCustom.POST_NEW_ROOM_REORDERED]: cc.PostNewRoomReordered,
  [ModCallbackCustom.POST_NPC_DEATH_FILTER]: cc.PostNPCDeathFilter,
  [ModCallbackCustom.POST_NPC_INIT_FILTER]: cc.PostNPCInitFilter,
  [ModCallbackCustom.POST_NPC_INIT_LATE]: cc.PostNPCInitLate,
  [ModCallbackCustom.POST_NPC_RENDER_FILTER]: cc.PostNPCRenderFilter,
  [ModCallbackCustom.POST_NPC_STATE_CHANGED]: cc.PostNPCStateChanged,
  [ModCallbackCustom.POST_NPC_UPDATE_FILTER]: cc.PostNPCUpdateFilter,
  [ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED]:
    cc.PostPEffectUpdateReordered,
  [ModCallbackCustom.POST_PICKUP_CHANGED]: cc.PostPickupChanged,
  [ModCallbackCustom.POST_PICKUP_COLLECT]: cc.PostPickupCollect,
  [ModCallbackCustom.POST_PICKUP_INIT_FILTER]: cc.PostPickupInitFilter,
  [ModCallbackCustom.POST_PICKUP_INIT_FIRST]: cc.PostPickupInitFirst,
  [ModCallbackCustom.POST_PICKUP_INIT_LATE]: cc.PostPickupInitLate,
  [ModCallbackCustom.POST_PICKUP_RENDER_FILTER]: cc.PostPickupRenderFilter,
  [ModCallbackCustom.POST_PICKUP_SELECTION_FILTER]:
    cc.PostPickupSelectionFilter,
  [ModCallbackCustom.POST_PICKUP_STATE_CHANGED]: cc.PostPickupStateChanged,
  [ModCallbackCustom.POST_PICKUP_UPDATE_FILTER]: cc.PostPickupUpdateFilter,
  [ModCallbackCustom.POST_PIT_RENDER]: cc.PostPitRender,
  [ModCallbackCustom.POST_PIT_UPDATE]: cc.PostPitUpdate,
  [ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH]: cc.PostPlayerChangeHealth,
  [ModCallbackCustom.POST_PLAYER_CHANGE_STAT]: cc.PostPlayerChangeStat,
  [ModCallbackCustom.POST_PLAYER_CHANGE_TYPE]: cc.PostPlayerChangeType,
  [ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED]:
    cc.PostPlayerCollectibleAdded,
  [ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED]:
    cc.PostPlayerCollectibleRemoved,
  [ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE]: cc.PostPlayerFatalDamage,
  [ModCallbackCustom.POST_PLAYER_INIT_FIRST]: cc.PostPlayerInitFirst,
  [ModCallbackCustom.POST_PLAYER_INIT_LATE]: cc.PostPlayerInitLate,
  [ModCallbackCustom.POST_PLAYER_RENDER_REORDERED]:
    cc.PostPlayerRenderReordered,
  [ModCallbackCustom.POST_PLAYER_UPDATE_REORDERED]:
    cc.PostPlayerUpdateReordered,
  [ModCallbackCustom.POST_POOP_RENDER]: cc.PostPoopRender,
  [ModCallbackCustom.POST_POOP_UPDATE]: cc.PostPoopUpdate,
  [ModCallbackCustom.POST_PRESSURE_PLATE_RENDER]: cc.PostPressurePlateRender,
  [ModCallbackCustom.POST_PRESSURE_PLATE_UPDATE]: cc.PostPressurePlateUpdate,
  [ModCallbackCustom.POST_PROJECTILE_INIT_FILTER]: cc.PostProjectileInitFilter,
  [ModCallbackCustom.POST_PROJECTILE_INIT_LATE]: cc.PostProjectileInitLate,
  [ModCallbackCustom.POST_PROJECTILE_KILL]: cc.PostProjectileKill,
  [ModCallbackCustom.POST_PROJECTILE_RENDER_FILTER]:
    cc.PostProjectileRenderFilter,
  [ModCallbackCustom.POST_PROJECTILE_UPDATE_FILTER]:
    cc.PostProjectileUpdateFilter,
  [ModCallbackCustom.POST_PURCHASE]: cc.PostPurchase,
  [ModCallbackCustom.POST_ROCK_RENDER]: cc.PostRockRender,
  [ModCallbackCustom.POST_ROCK_UPDATE]: cc.PostRockUpdate,
  [ModCallbackCustom.POST_ROOM_CLEAR_CHANGED]: cc.PostRoomClearChanged,
  [ModCallbackCustom.POST_SACRIFICE]: cc.PostSacrifice,
  [ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED]: cc.PostSlotAnimationChanged,
  [ModCallbackCustom.POST_SLOT_COLLISION]: cc.PostSlotCollision,
  [ModCallbackCustom.POST_SLOT_DESTROYED]: cc.PostSlotDestroyed,
  [ModCallbackCustom.POST_SLOT_INIT]: cc.PostSlotInit,
  [ModCallbackCustom.POST_SLOT_RENDER]: cc.PostSlotRender,
  [ModCallbackCustom.POST_SLOT_UPDATE]: cc.PostSlotUpdate,
  [ModCallbackCustom.POST_SPIKES_RENDER]: cc.PostSpikesRender,
  [ModCallbackCustom.POST_SPIKES_UPDATE]: cc.PostSpikesUpdate,
  [ModCallbackCustom.POST_TEAR_INIT_FILTER]: cc.PostTearInitFilter,
  [ModCallbackCustom.POST_TEAR_INIT_LATE]: cc.PostTearInitLate,
  [ModCallbackCustom.POST_TEAR_INIT_VERY_LATE]: cc.PostTearInitVeryLate,
  [ModCallbackCustom.POST_TEAR_KILL]: cc.PostTearKill,
  [ModCallbackCustom.POST_TEAR_RENDER_FILTER]: cc.PostTearRenderFilter,
  [ModCallbackCustom.POST_TEAR_UPDATE_FILTER]: cc.PostTearUpdateFilter,
  [ModCallbackCustom.POST_TNT_RENDER]: cc.PostTNTRender,
  [ModCallbackCustom.POST_TNT_UPDATE]: cc.PostTNTUpdate,
  [ModCallbackCustom.POST_TRANSFORMATION]: cc.PostTransformation,
  [ModCallbackCustom.POST_TRINKET_BREAK]: cc.PostTrinketBreak,
  [ModCallbackCustom.POST_USE_PILL_FILTER]: cc.PostUsePillFilter,
  [ModCallbackCustom.PRE_BERSERK_DEATH]: cc.PreBerserkDeath,
  [ModCallbackCustom.PRE_BOMB_COLLISION_FILTER]: cc.PreBombCollisionFilter,
  [ModCallbackCustom.PRE_CUSTOM_REVIVE]: cc.PreCustomRevive,
  [ModCallbackCustom.PRE_ENTITY_SPAWN_FILTER]: cc.PreEntitySpawnFilter,
  [ModCallbackCustom.PRE_FAMILIAR_COLLISION_FILTER]:
    cc.PreFamiliarCollisionFilter,
  [ModCallbackCustom.PRE_GET_PEDESTAL]: cc.PreGetPedestal,
  [ModCallbackCustom.PRE_ITEM_PICKUP]: cc.PreItemPickup,
  [ModCallbackCustom.PRE_KNIFE_COLLISION_FILTER]: cc.PreKnifeCollisionFilter,
  [ModCallbackCustom.PRE_NEW_LEVEL]: cc.PreNewLevel,
  [ModCallbackCustom.PRE_NPC_COLLISION_FILTER]: cc.PreNPCCollisionFilter,
  [ModCallbackCustom.PRE_NPC_UPDATE_FILTER]: cc.PreNPCUpdateFilter,
  [ModCallbackCustom.PRE_PROJECTILE_COLLISION_FILTER]:
    cc.PreProjectileCollisionFilter,
  [ModCallbackCustom.PRE_ROOM_ENTITY_SPAWN_FILTER]: cc.PreRoomEntitySpawnFilter,
  [ModCallbackCustom.PRE_TEAR_COLLISION_FILTER]: cc.PreTearCollisionFilter,
} as const satisfies Record<ModCallbackCustom, AnyClass>;

export type ModCallbackCustomToClass = {
  readonly [K in keyof typeof MOD_CALLBACK_CUSTOM_TO_CLASS]: InstanceType<
    (typeof MOD_CALLBACK_CUSTOM_TO_CLASS)[K]
  >;
};

export function getCallbacks(): ModCallbackCustomToClass {
  const instantiatedClasses: Record<number, unknown> = {};

  for (const modCallbackCustom of MOD_CALLBACK_CUSTOM_VALUES) {
    const constructor = MOD_CALLBACK_CUSTOM_TO_CLASS[modCallbackCustom];
    instantiatedClasses[modCallbackCustom] = new constructor();
  }

  return instantiatedClasses as unknown as ModCallbackCustomToClass;
}
