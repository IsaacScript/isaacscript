/**
 * These are the custom callbacks available for use once the mod object has been upgraded. Also see
 * the [[`upgradeMod`]] function.
 */
export enum ModCallbackCustom {
  POST_BOMB_INIT_LATE,
  POST_BONE_SWING,
  POST_COLLECTIBLE_INIT_FIRST,
  POST_CURSED_TELEPORT,
  POST_CUSTOM_DOOR_ENTER,
  POST_CUSTOM_REVIVE,
  POST_EFFECT_INIT_LATE,
  POST_EFFECT_STATE_CHANGED,
  POST_ESAU_JR,
  POST_FAMILIAR_INIT_LATE,
  POST_FAMILIAR_STATE_CHANGED,
  POST_FIRST_ESAU_JR,
  POST_FIRST_FLIP,
  POST_FLIP,
  POST_GAME_STARTED_REORDERED,

  /**
   * Fires from the `POST_UPDATE` callback when the Greed Mode wave increases.
   *
   * ```ts
   * function postGreedModeWave(oldWave: int, newWave: int) {}
   * ```
   */
  POST_GREED_MODE_WAVE,

  POST_GRID_ENTITY_BROKEN,
  POST_GRID_ENTITY_COLLISION,
  POST_GRID_ENTITY_INIT,
  POST_GRID_ENTITY_REMOVE,
  POST_GRID_ENTITY_STATE_CHANGED,
  POST_GRID_ENTITY_UPDATE,

  /**
   * Fires from the `POST_PEFFECT_UPDATE` callback when the player loses a Holy Mantle temporary
   * collectible effect.
   *
   * This callback is useful because you might want to have code that happens when the player is hit
   * from an enemy. Normally, you would accomplish this via the `ENTITY_TAKE_DMG` callback, but that
   * callback never fires if the player has a Holy Mantle shield.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if the player matches the `PlayerVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the player matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerInitReordered(
   *   player: EntityPlayer,
   *   oldNumHolyMantles: int,
   *   newNumHolyMantles: int,
   * ): void {}
   * ```
   */
  POST_HOLY_MANTLE_REMOVED,

  POST_ITEM_DISCHARGE,
  POST_ITEM_PICKUP,
  POST_KNIFE_INIT_LATE,
  POST_LASER_INIT_LATE,
  POST_NEW_LEVEL_REORDERED,
  POST_NEW_ROOM_EARLY,
  POST_NEW_ROOM_REORDERED,
  POST_NPC_INIT_LATE,
  POST_NPC_STATE_CHANGED,
  POST_PEFFECT_UPDATE_REORDERED,
  POST_PICKUP_COLLECT,
  POST_PICKUP_INIT_LATE,
  POST_PICKUP_STATE_CHANGED,
  POST_PLAYER_CHANGE_HEALTH,
  POST_PLAYER_CHANGE_TYPE,
  POST_PLAYER_FATAL_DAMAGE,
  POST_PLAYER_INIT_LATE,
  POST_PLAYER_INIT_REORDERED,
  POST_PLAYER_RENDER_REORDERED,
  POST_PLAYER_UPDATE_REORDERED,
  POST_PROJECTILE_INIT_LATE,
  POST_PURCHASE,
  POST_ROOM_CLEAR_CHANGED,
  POST_SACRIFICE,
  POST_SLOT_ANIMATION_CHANGED,
  POST_SLOT_DESTROYED,
  POST_SLOT_INIT,
  POST_SLOT_RENDER,
  POST_SLOT_UPDATE,
  POST_TEAR_INIT_LATE,
  POST_TEAR_INIT_VERY_LATE,
  POST_TRANSFORMATION,
  POST_TRINKET_BREAK,
  PRE_BERSERK_DEATH,
  PRE_CUSTOM_REVIVE,
  PRE_ITEM_PICKUP,
  PRE_NEW_LEVEL,
}
