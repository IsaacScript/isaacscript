/*
eslint isaacscript/member-ordering: ["warn", {
  enums: {
    memberTypes: ["method", "field"],
    order: "alphabetically"
  },
}]
*/

/**
 * - The Isaac API offers a lot of callbacks, but a lot of times there isn't one for the specific
 *   thing that you are looking to do. So, `isaacscript-common` adds a bunch of new callbacks that
 *   you can use.
 * - The extra callbacks are efficient such that no code is executed until there is one or more
 *   subscriptions.
 * - You must upgrade your mod with the `upgradeMod` helper function before using a custom callback.
 */
export enum ModCallbackCustom {
  /**
   * Fires from the `POST_UPDATE` callback when a Challenge Room or Boss Rush is started.
   * Specifically, this happens on the first frame that `Room.IsAmbushDone` is true.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if for the `AmbushType` provided.
   *
   * ```ts
   * function postAmbushFinished(ambushType: AmbushType): void {}
   * ```
   */
  POST_AMBUSH_FINISHED,

  /**
   * Fires from the `POST_UPDATE` callback when a Challenge Room or Boss Rush is completed.
   * Specifically, this happens on the first frame that `Room.IsAmbushActive` is true.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if for the `AmbushType` provided.
   *
   * ```ts
   * function postAmbushStarted(ambushType: AmbushType): void {}
   * ```
   */
  POST_AMBUSH_STARTED,

  /**
   * Fires on the `POST_BOMB_UPDATE` callback that it explodes.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the bomb variant matches the `BombVariant` provided.
   *
   * ```ts
   * function postBombDetonated(bomb: EntityBomb): void {}
   * ```
   */
  POST_BOMB_EXPLODED,

  /**
   * Fires on the first `POST_BOMB_UPDATE` frame for each bomb.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_BOMB_INIT` callback.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the bomb variant matches the `BombVariant` provided.
   *
   * ```ts
   * function postBombInitLate(bomb: EntityBomb): void {}
   * ```
   */
  POST_BOMB_INIT_LATE,

  /**
   * Fires from the `POST_RENDER` callback when one of Forgotten's bone clubs is swung or thrown.
   *
   * ```ts
   * function postBoneSwing(boneClub: EntityKnife): void {}
   * ```
   */
  POST_BONE_SWING,

  /**
   * Fires from the `POST_PICKUP_UPDATE` callback when a collectible goes from a non-zero sub-type
   * to `CollectibleType.NULL` (i.e. an "empty" pedestal).
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the collectible type changed from the `CollectibleType` provided.
   *
   * ```ts
   * function postCollectibleEmpty(
   *   collectible: EntityPickupCollectible,
   *   oldCollectibleType: CollectibleType,
   * ): void {}
   * ```
   */
  POST_COLLECTIBLE_EMPTY,

  /**
   * Fires from the `POST_PICKUP_INIT` callback on the first time that a player has seen the
   * respective collectible on the run. For more details on how this is calculated, see the
   * documentation for the `getCollectibleIndex` helper function.
   *
   * This callback is useful because collectibles will despawn upon leaving the room and respawn
   * upon re-entering the room. Additionally, when playing as Tainted Isaac, the `POST_PICKUP_INIT`
   * callback will fire every time the item shifts.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the collectible type matches the `CollectibleType` provided.
   *
   * ```ts
   * function postCollectibleInitLate(collectible: EntityPickup): void {}
   * ```
   */
  POST_COLLECTIBLE_INIT_FIRST,

  /**
   * Fires from the `POST_PLAYER_RENDER` callback on the first frame that the "TeleportUp" animation
   * begins playing after a player triggers a Cursed Eye teleport or a Cursed Skull teleport. (Both
   * of these have the same effect in causing Isaac to be teleported to a random room.)
   *
   * ```ts
   * function postCursedTeleport(player: EntityPlayer): void {}
   * ```
   */
  POST_CURSED_TELEPORT,

  /**
   * Fires from the `POST_PEFFECT_UPDATE` callback when a player enters the loading zone of a custom
   * door created with the `spawnCustomDoor` helper function.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `DoorVariant` provided.
   *
   * ```ts
   * function postCustomDoorEnter(
   *   player: EntityPlayer,
   *   effectVariant: int,
   *   doorSlot: DoorSlot,
   *   direction: Direction,
   * ): void {}
   * ```
   */
  POST_CUSTOM_DOOR_ENTER,

  /**
   * Fires from the `POST_PLAYER_UPDATE` callback after the player has finished the death animation,
   * has teleported to the previous room, and is ready to play the animation for the modded revival
   * item. The `revivalType` will match the value returned from the `PRE_CUSTOM_REVIVE` callback.
   *
   * In this callback, you must play an animation with something along the lines of
   * `player.AnimateCollectible(CollectibleTypeCustom.COLLECTIBLE_MY_REVIVAL_ITEM);`, otherwise the
   * animation for a 1-Up will play.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the revival type matches the one provided.
   *
   * ```ts
   * function postCustomRevive(player: EntityPlayer, revivalType: int): void {}
   * ```
   */
  POST_CUSTOM_REVIVE,

  /**
   * Fires from the `EFFECT_POST_UPDATE` callback after a player has entered the range of a Dice
   * Room floor.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the `DiceFloorSubType` type matches the one provided.
   *
   * ```ts
   * function postDiceRoomActivated(
   *   player: EntityPlayer,
   *   diceFloorSubType: DiceFloorSubType,
   * ): void {}
   * ```
   */
  POST_DICE_ROOM_ACTIVATED,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a door exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postDoorRender(door: GridEntityDoor): void {}
   * ```
   */
  POST_DOOR_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a door exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postDoorUpdate(door: GridEntityDoor): void {}
   * ```
   */
  POST_DOOR_UPDATE,

  /**
   * Fires on the first `POST_EFFECT_UPDATE` frame for each effect.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_EFFECT_INIT` callback.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the effect variant matches the `EffectVariant` provided.
   *
   * ```ts
   * function postEffectInitLate(effect: EntityEffect): void {}
   * ```
   */
  POST_EFFECT_INIT_LATE,

  /**
   * Fires from the `POST_EFFECT_UPDATE` callback when an effect's state has changed from what it
   * was on the previous frame.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `EffectVariant` provided.
   *
   * ```ts
   * function postEffectStateChanged(
   *   effect: EntityEffect,
   *   previousState: int,
   *   currentState: int,
   * ): void {}
   * ```
   */
  POST_EFFECT_STATE_CHANGED,

  /**
   * Fires one `POST_UPDATE` frame after the player has used the Esau Jr. item. (The player is not
   * updated to the new character until a game frame has passed.)
   *
   * ```ts
   * function postEsauJr(player: EntityPlayer): void {}
   * ```
   */
  POST_ESAU_JR,

  /**
   * Fires on the first `FAMILIAR_UPDATE` frame for each familiar.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_TEAR_INIT` callback.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the familiar variant matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarInitLate(familiar: EntityFamiliar): void {}
   * ```
   */
  POST_FAMILIAR_INIT_LATE,

  /**
   * Fires from the `POST_FAMILIAR_UPDATE` callback when a familiar's state has changed from what it
   * was on the previous frame.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarStateChanged(
   *   familiar: EntityFamiliar,
   *   previousState: int,
   *   currentState: int,
   * ): void {}
   * ```
   */
  POST_FAMILIAR_STATE_CHANGED,

  /**
   * Fires one `POST_UPDATE` frame after the player has first used the Esau Jr. item. (The player is
   * not updated to the new character until a game frame has passed.)
   *
   * This callback is useful because there is no way to get access to the Esau Jr. character entity
   * before the player has actually used the Esau Jr. item.
   *
   * ```ts
   * function postFirstEsauJr(player: EntityPlayer): void {}
   * ```
   */
  POST_FIRST_ESAU_JR,

  /**
   * Fires after the player has used the Flip item for the first time. Unlike the vanilla `USE_ITEM`
   * callback, this callback will return the player object for the new Lazarus (not the one who used
   * the Flip item).
   *
   * This callback is useful because there is no way to get access to the "flipped" character entity
   * before the player has actually used the Flip item.
   *
   * ```ts
   * function postFirstFlip(newLazarus: EntityPlayer, oldLazarus: EntityPlayer): void {}
   * ```
   */
  POST_FIRST_FLIP,

  /**
   * Fires after the player has used the Flip item. Unlike the vanilla `USE_ITEM` callback, this
   * callback will return the player object for the new Lazarus (not the one who used the Flip
   * item).
   *
   * This callback is useful because there is no way to get access to the "flipped" character entity
   * before the player has actually used the Flip item.
   *
   * ```ts
   * function postFlip(newLazarus: EntityPlayer, oldLazarus: EntityPlayer): void {}
   * ```
   */
  POST_FLIP,

  /**
   * Similar to the vanilla callback of the same name, but fires in the correct order with respect
   * to the `POST_NEW_LEVEL` and the `POST_NEW_ROOM` callbacks:
   *
   * `POST_GAME_STARTED_REORDERED` --> `POST_NEW_LEVEL_REORDERED` --> `POST_NEW_ROOM_REORDERED`
   *
   * ```ts
   * function postGameStartedReordered(isContinued: boolean): void {}
   * ```
   */
  POST_GAME_STARTED_REORDERED,

  /**
   * Fires from the `POST_UPDATE` callback when the Greed Mode wave increases.
   *
   * ```ts
   * function postGreedModeWave(oldWave: int, newWave: int): void {}
   * ```
   */
  POST_GREED_MODE_WAVE,

  /**
   * Fires from the `POST_UPDATE` callback when a grid entity changes to a state that corresponds to
   * the broken state for the respective grid entity type.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityBroken(gridEntity: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_BROKEN,

  /**
   * Fires from the `POST_UPDATE` callback when a new entity collides with a grid entity.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityCollision(
   *   gridEntity: GridEntity,
   *   entity: Entity,
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_COLLISION,

  /**
   * Fires from the `POST_UPDATE` callback when a grid entity created with the
   * `spawnCustomGridEntity` helper function is hit by an explosion.
   *
   * In most cases, you will want to remove the grid entity inside of this callback in order to
   * prevent further "broken" callbacks from firing. (This would not be the case if you were trying
   * to emulate a super tinted rock that takes multiple explosions to destroy, for example.)
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityCustomBroken(
   *   gridEntity: GridEntity,
   *   gridEntityTypeCustom: GridEntityType,
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_CUSTOM_BROKEN,

  /**
   * Fires from the `POST_UPDATE` callback a new entity collides with a grid entity created with the
   * `spawnCustomGridEntity` helper function.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityCustomRender(
   *   gridEntity: GridEntity,
   *   gridEntityTypeCustom: GridEntityType,
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_CUSTOM_COLLISION,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a grid entity created with the
   * `spawnCustomGridEntity` helper function exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityCustomRender(
   *   gridEntity: GridEntity,
   *   gridEntityTypeCustom: GridEntityType,
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_CUSTOM_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a grid entity created with the
   * `spawnCustomGridEntity` helper function exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityCustomUpdate(
   *   gridEntity: GridEntity,
   *   gridEntityTypeCustom: GridEntityType,
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_CUSTOM_UPDATE,

  /**
   * Fires when a new grid entity is initialized. Specifically, this is either:
   *
   * - in the `POST_NEW_ROOM` callback (firing every time a room is entered, even if the entity was
   *   previously there on a previous room entry)
   * - in the `POST_UPDATE` callback (if the entity appeared mid-way through the room, like when the
   *   trapdoor appears after defeating It Lives!)
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityInit(gridEntity: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_INIT,

  /**
   * Fires from the `POST_UPDATE` callback when a new grid entity is removed. Specifically, this on
   * the frame after it no longer exists (where it did exist a frame ago).
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityRemove(
   *   gridIndex: int,
   *   gridEntityType: GridEntityType,
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_REMOVE,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a grid entity exists.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if it matches the `GridEntityType` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if it matches the variant provided.
   *
   * ```ts
   * function postGridEntityRender(gridEntity: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback when a grid entity changes its state.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityStateChanged(
   *   gridEntity: GridEntity,
   *   oldState: int,
   *   newState: int,
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_STATE_CHANGED,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a grid entity exists.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if it matches the `GridEntityType` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if it matches the variant provided.
   *
   * ```ts
   * function postGridEntityUpdate(gridEntity: GridEntity): void {}
   * ```
   */
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

  /**
   * Fires from `POST_PEFFECT_UPDATE` callback when the player loses charge on their active
   * collectible item, implying that the item was just used.
   *
   * This callback is useful because the `USE_ITEM` callback does not fire when The Candle, Red
   * Candle, and Bob's Rotten Brain are discharged.
   *
   * Note that this callback will not fire if the active item is both discharged and swapped for
   * another item / discharged on the same frame, like in the case of Alabaster Box.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `CollectibleType` provided.
   *
   * ```ts
   * function postItemDischarge(
   *   player: EntityPlayer,
   *   collectibleType: CollectibleType,
   *   activeSlot: ActiveSlot,
   * ): void {}
   * ```
   */
  POST_ITEM_DISCHARGE,

  /**
   * Fires from the `POST_PEFFECT_UPDATE` callback when an item is no longer queued (i.e. when the
   * animation of the player holding the item above their head is finished and the item is actually
   * added to the player's inventory).
   *
   * Note that this callback will only fire once per Forgotten/Soul pair.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if it matches the `ItemType` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the `CollectibleType` or the `TrinketType` matches the sub-type provided.
   *
   * ```ts
   * function postItemPickup(
   *   player: EntityPlayer,
   *   pickingUpItem: PickingUpItem,
   * ): void {}
   * ```
   */
  POST_ITEM_PICKUP,

  /**
   * Fires on the first `POST_KNIFE_UPDATE` frame for each knife.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_KNIFE_INIT` callback.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the knife variant matches the `KnifeVariant` provided.
   *
   * ```ts
   * function postKnifeInitLate(knife: EntityKnife): void {}
   * ```
   */
  POST_KNIFE_INIT_LATE,

  /**
   * Fires on the first `POST_LASER_UPDATE` frame for each laser.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_LASER_INIT` callback.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the laser variant matches the `LaserVariant` provided.
   *
   * ```ts
   * function postLaserInitLate(laser: EntityLaser): void {}
   * ```
   */
  POST_LASER_INIT_LATE,

  /**
   * The same as the vanilla callback of the same name, but fires in the correct order with respect
   * to the `POST_GAME_STARTED` and the `POST_NEW_ROOM` callbacks:
   *
   * `POST_GAME_STARTED_REORDERED` --> `POST_NEW_LEVEL_REORDERED` --> `POST_NEW_ROOM_REORDERED`
   *
   * If some specific cases, mods can change the current level during run initialization (on the 0th
   * frame). However, due to how the callback reordering works, the custom
   * `POST_NEW_LEVEL_REORDERED` callback will never fire on the 0th frame. To get around this, call
   * the `forceNewLevelCallback()` function before changing levels to temporarily force the callback
   * to fire.
   *
   * ```ts
   * function postNewLevelReordered(): void {}
   * ```
   */
  POST_NEW_LEVEL_REORDERED,

  /**
   * Fires on the first `POST_NEW_ROOM` or `PRE_ENTITY_SPAWN` callback where being in a new room is
   * detected. This is useful because the vanilla `POST_NEW_ROOM` callback fires only after entities
   * in the room have been initialized and updated once, which means that it is possible for
   * entity-related code to run before room-related-initialization has been performed.
   *
   * ```ts
   * function postNewRoomEarly(): void {}
   * ```
   */
  POST_NEW_ROOM_EARLY,

  /**
   * The same as the vanilla callback of the same name, but fires in the correct order with respect
   * to the `POST_GAME_STARTED` and the `POST_NEW_LEVEL` callbacks:
   *
   * `POST_GAME_STARTED_REORDERED` --> `POST_NEW_LEVEL_REORDERED` --> `POST_NEW_ROOM_REORDERED`
   *
   * If some specific cases, mods can change the current room during run initialization (on the 0th
   * frame). However, due to how the callback reordering works, the custom `POST_NEW_ROOM_REORDERED`
   * callback will never fire on the 0th frame. To get around this, call the
   * `forceNewRoomCallback()` function before changing levels to temporarily force the callback to
   * fire.
   *
   * ```ts
   * function postNewRoomReordered(): void {}
   * ```
   */
  POST_NEW_ROOM_REORDERED,

  /**
   * Fires on the first `NPC_UPDATE` frame for each NPC.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_NPC_INIT` callback.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the NPC's entity type matches the entity type provided.
   *
   * ```ts
   * function postNPCInitLate(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_INIT_LATE,

  /**
   * Fires from the `POST_NPC_UPDATE` callback when an NPC's state has changed from what it was on
   * the previous frame.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if it matches the `EntityType` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if it matches the variant provided.
   *
   * ```ts
   * function postNPCStateChanged(
   *   npc: EntityNPC,
   *   previousState: int,
   *   currentState: int,
   * ): void {}
   * ```
   */
  POST_NPC_STATE_CHANGED,

  /**
   * Similar to the vanilla callback of the same name, but fires after the `POST_GAME_STARTED`
   * callback fires (if the player is being updated on the 0th game frame of the run).
   *
   * This callback is useful for two reasons:
   *
   * 1. Normally, `POST_PEFFECT_UPDATE` fires before `POST_GAME_STARTED`. Since mod variables are
   *    often initialized at the beginning of the `POST_GAME_STARTED` callback, this can cause
   *    problems.
   * 1. Some functions do not work (or crash the game) when called before the `POST_NEW_ROOM`
   *    callback. For example, since the level is not generated yet, you will not be able to access
   *    any rooms.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if the player matches the `PlayerVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the player matches the `PlayerType` provided.
   *
   * ```ts
   * function postPEffectUpdateReordered(player: EntityPlayer): void {}
   * ```
   */
  POST_PEFFECT_UPDATE_REORDERED,

  /**
   * Fires on the first `POST_RENDER` frame that a pickup plays the "Collect" animation.
   *
   * Use this callback to know when a pickup is added to the player's inventory or health.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the pickup variant matches the `PickupVariant` provided.
   *
   * ```ts
   * function postPickupCollect(pickup: EntityPickup, player: EntityPlayer): void {}
   * ```
   */
  POST_PICKUP_COLLECT,

  /**
   * Fires from the `POST_PICKUP_INIT` callback on the first time that a player has seen the
   * respective pickup on the run.
   *
   * This callback is useful because pickups will despawn upon leaving the room and respawn upon
   * re-entering the room.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the collectible type matches the `PickupVariant` provided.
   *
   * ```ts
   * function postPickupInitFirst(pickup: EntityPickup): void {}
   * ```
   */
  POST_PICKUP_INIT_FIRST,

  /**
   * Fires on the first `POST_PICKUP_UPDATE` frame for each pickup.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_PICKUP_INIT` callback.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the pickup variant matches the `PickupVariant` provided.
   *
   * ```ts
   * function postPickupInitLate(pickup: EntityPickup): void {}
   * ```
   */
  POST_PICKUP_INIT_LATE,

  /**
   * Fires from the `POST_PICKUP_UPDATE` callback when a pickup's state has changed from what it was
   * on the previous frame.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `PickupVariant` provided.
   *
   * ```ts
   * function postPickupStateChanged(
   *   pickup: EntityPickup,
   *   previousState: int,
   *   currentState: int,
   * ): void {}
   * ```
   */
  POST_PICKUP_STATE_CHANGED,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a pit exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postPitRender(pit: GridEntityPit): void {}
   * ```
   */
  POST_PIT_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a pit exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postPitUpdate(pit: GridEntityPit): void {}
   * ```
   */
  POST_PIT_UPDATE,

  /**
   * Fires from the `POST_PEFFECT_UPDATE` callback when a player's health (i.e. hearts) is different
   * than what it was on the previous frame. For more information, see the `PlayerHealth` enum.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if the player matches the `PlayerVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the player matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerChangeHealth(
   *   player: EntityPlayer,
   *   healthType: HealthType,
   *   difference: int,
   *   oldValue: int,
   *   newValue: int,
   * ): void {}
   * ```
   */
  POST_PLAYER_CHANGE_HEALTH,

  /**
   * Fires from the `POST_PEFFECT_UPDATE` callback when one of the player's stats change from what
   * they were on the previous frame.
   *
   * The type of `oldValue` and `newValue` will depend on what kind of stat it is. For example,
   * `StatType.FLYING` will be a boolean. (You can use the "Types" helper functions to narrow the
   * type.)
   *
   * For `StatType.TEAR_FLAG`, `StatType.TEAR_COLOR`, `StatType.FLYING`, and `StatType.SIZE`, the
   * `difference` argument will always be a value of 0, since the type of these stats are not
   * numbers. (For these cases, you should examine the `oldValue` and `newValue` arguments
   * accordingly.)
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if the player matches the `PlayerVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the player matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerChangeStat(
   *   player: EntityPlayer,
   *   statType: StatType,
   *   difference: int,
   *   oldValue: number | boolean | BitFlags<TearFlag> | Color | Vector,
   *   newValue: number | boolean | BitFlags<TearFlag> | Color | Vector,
   * ): void {}
   * ```
   */
  POST_PLAYER_CHANGE_STAT,

  /**
   * Fires from the `POST_PEFFECT_UPDATE` callback when a player entity changes its player type
   * (i.e. character) from what it was on the previous frame. For example, it will fire after using
   * Clicker, after dying with the Judas' Shadow collectible, etc.
   *
   * Notably, it does not fire after the player uses the Flip item or the Esau Jr. item, because
   * those items cause separate player entities to be created. Use the `POST_FLIP` and
   * `POST_ESAU_JR` callbacks to handle those situations.
   *
   * ```ts
   * function postPlayerChangeType(
   *   player: EntityPlayer,
   *   oldCharacter: PlayerType,
   *   newCharacter: PlayerType,
   * ): void {}
   * ```
   */
  POST_PLAYER_CHANGE_TYPE,

  /**
   * Fires from the `POST_PEFFECT_UPDATE` callback when a player's collectible count is higher than
   * what it was on the previous frame.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the collectible matches the `CollectibleType` provided.
   *
   * ```ts
   * function postPlayerCollectibleAdded(
   *   player: EntityPlayer,
   *   collectibleType: CollectibleType,
   * ): void {}
   * ```
   */
  POST_PLAYER_COLLECTIBLE_ADDED,

  /**
   * Fires from the `POST_PEFFECT_UPDATE` callback when a player's collectible count is lower than
   * what it was on the previous frame.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the collectible matches the `CollectibleType` provided.
   *
   * ```ts
   * function postPlayerCollectibleRemoved(
   *   player: EntityPlayer,
   *   collectibleType: CollectibleType,
   * ): void {}
   * ```
   */
  POST_PLAYER_COLLECTIBLE_REMOVED,

  /**
   * Fires from the `ENTITY_TAKE_DMG` callback when a player takes fatal damage. Return false to
   * prevent the fatal damage.
   *
   * Note that this function does properly take into account Guppy's Collar, Broken Ankh, Spirit
   * Shackles, and Mysterious Paper. It also takes into account using The Bible on Satan.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if the player matches the `PlayerVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the player matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerFatalDamage(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  POST_PLAYER_FATAL_DAMAGE,

  /**
   * Fires on the first `POST_PEFFECT_UPDATE_REORDERED` frame for each player, similar to the
   * `POST_PLAYER_INIT_LATE` callback, with two changes:
   *
   * - This will not fire for "child" players (e.g. non-real players like the Strawman Keeper).
   * - This will fire when the player enters a Genesis room and all of their items are taken away.
   *
   * You should use this callback for any player-related initialization logic, like giving the
   * character their starting items for the run. (You do not want to use the vanilla
   * `POST_PLAYER_INIT` callback for this because it fires when a run is continued.)
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if the player matches the `PlayerVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the player matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerInitFirst(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_INIT_FIRST,

  /**
   * Fires on the first `POST_PEFFECT_UPDATE_REORDERED` frame for each player.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_PLAYER_INIT` callback.
   *
   * For initializing a player with custom items and so forth, use the `POST_PLAYER_INIT_FIRST`
   * callback instead to handle the case of a Genesis room.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if the player matches the `PlayerVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the player matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerInitLate(pickup: EntityPickup): void {}
   * ```
   */
  POST_PLAYER_INIT_LATE,

  /**
   * Similar to the vanilla callback of the same name, but fires after the `POST_GAME_STARTED`
   * callback fires (if the player is spawning on the 0th game frame of the run).
   *
   * This callback is useful for two reasons:
   *
   * 1. Normally, `POST_PLAYER_RENDER` fires before `POST_GAME_STARTED`. Since mod variables are
   *    often initialized at the beginning of the `POST_GAME_STARTED` callback, this can cause
   *    problems.
   * 1. Some functions do not work (or crash the game) when called before the `POST_NEW_ROOM`
   *    callback. For example, since the level is not generated yet, you will not be able to access
   *    any rooms.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if the player matches the `PlayerVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the player matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerRenderReordered(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_RENDER_REORDERED,

  /**
   * Similar to the vanilla callback of the same name, but fires after the `POST_GAME_STARTED`
   * callback fires (if the player is being updated on the 0th game frame of the run).
   *
   * This callback is useful for two reasons:
   *
   * 1. Normally, `POST_PLAYER_UPDATE` fires before `POST_GAME_STARTED`. Since mod variables are
   *    often initialized at the beginning of the `POST_GAME_STARTED` callback, this can cause
   *    problems.
   * 1. Some functions do not work (or crash the game) when called before the `POST_NEW_ROOM`
   *    callback. For example, since the level is not generated yet, you will not be able to access
   *    any rooms.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if the player matches the `PlayerVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the player matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerUpdateReordered(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_UPDATE_REORDERED,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a poop exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postPoopRender(poop: GridEntityPoop): void {}
   * ```
   */
  POST_POOP_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a poop exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postPoopUpdate(poop: GridEntityPoop): void {}
   * ```
   */
  POST_POOP_UPDATE,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a pressure plate exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postPressurePlateRender(pressurePlate: GridEntityPressurePlate): void {}
   * ```
   */
  POST_PRESSURE_PLATE_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a pressure plate exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postPressurePlateUpdate(pressurePlate: GridEntityPressurePlate): void {}
   * ```
   */
  POST_PRESSURE_PLATE_UPDATE,

  /**
   * Fires on the first `POST_PROJECTILE_UPDATE` frame for each projectile.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_PROJECTILE_INIT` callback.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the projectile variant matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function postProjectileInitLate(projectile: EntityProjectile): void {}
   * ```
   */
  POST_PROJECTILE_INIT_LATE,

  /**
   * Fires from the `POST_PEFFECT_UPDATE` callback when a player first picks up a new item. The
   * pickup returned in the callback is assumed to be the first pickup that no longer exists.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if it matches the `PickupVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if it matches the sub-type provided.
   *
   * ```ts
   * function postPurchase(player: EntityPlayer, pickup: EntityPickup): void {}
   * ```
   */
  POST_PURCHASE,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a rock exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postRockRender(rock: GridEntityRock): void {}
   * ```
   */
  POST_ROCK_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a rock exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postRockUpdate(rock: GridEntityRock): void {}
   * ```
   */
  POST_ROCK_UPDATE,

  /**
   * Fires from the `POST_UPDATE` callback when the clear state of a room changes.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the room clear state matches the boolean provided.
   *
   * ```ts
   * function postRoomClearChanged(roomClear: boolean): void {}
   * ```
   */
  POST_ROOM_CLEAR_CHANGED,

  /**
   * Fires from the `ENTITY_TAKE_DMG` callback when a player takes damage from spikes in a Sacrifice
   * Room.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if the player matches the `PlayerVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the player matches the `PlayerType` provided.
   *
   * ```ts
   * function postSacrifice(player: EntityPlayer, numSacrifices: int): void {}
   * ```
   */
  POST_SACRIFICE,

  /**
   * Fires from the `POST_RENDER` callback when a slot entity's animation changes.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotAnimationChanged(slot: Entity): void {}
   * ```
   */
  POST_SLOT_ANIMATION_CHANGED,

  /**
   * Fires from the `POST_RENDER` callback when a slot plays the animation that indicates that it
   * has broken.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if it matches the `SlotVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the destruction type matches the `SlotDestructionType` provided.
   *
   * ```ts
   * function postSlotDestroyed(slot: Entity, slotDestructionType: SlotDestructionType): void {}
   * ```
   */
  POST_SLOT_DESTROYED,

  /**
   * Fires when a new slot entity is initialized. Specifically, this is either:
   *
   * - in the `POST_NEW_ROOM` callback (firing every time a room is entered, even if the entity was
   *   previously there on a previous room entry)
   * - in the `POST_UPDATE` callback (if the entity appeared mid-way through the room, like when a
   *   Wheel of Fortune card is used)
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotInit(slot: Entity): void {}
   * ```
   */
  POST_SLOT_INIT,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a slot entity exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotRender(slot: Entity): void {}
   * ```
   */
  POST_SLOT_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a slot entity exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotUpdate(slot: Entity): void {}
   * ```
   */
  POST_SLOT_UPDATE,

  /**
   * Fires from the `POST_RENDER` callback on every frame that spikes exist.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postSpikesRender(spikes: GridEntitySpikes): void {}
   * ```
   */
  POST_SPIKES_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that spikes exist.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postSpikesUpdate(spikes: GridEntitySpikes): void {}
   * ```
   */
  POST_SPIKES_UPDATE,

  /**
   * Fires on the first `POST_TEAR_UPDATE` frame for each tear (which is when
   * `EntityTear.FrameCount` is equal to 0).
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_TEAR_INIT` callback.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the tear variant matches the `TearVariant` provided.
   *
   * ```ts
   * function postTearInitLate(tear: EntityTear): void {}
   * ```
   */
  POST_TEAR_INIT_LATE,

  /**
   * Fires on the second `POST_TEAR_UPDATE` frame for each tear (which is when
   * `EntityTear.FrameCount` is equal to 1).
   *
   * This callback is useful because Incubus tears are not distinguishable until the second frame.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if the tear variant matches the `TearVariant` provided.
   *
   * ```ts
   * function postTearInitVeryLate(tear: EntityTear): void {}
   * ```
   */
  POST_TEAR_INIT_VERY_LATE,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a TNT exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postTNTRender(tnt: GridEntityTNT): void {}
   * ```
   */
  POST_TNT_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a TNT exists.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the variant provided.
   *
   * ```ts
   * function postTNTUpdate(tnt: GridEntityTNT): void {}
   * ```
   */
  POST_TNT_UPDATE,

  /**
   * Fires from the `POST_PEFFECT_UPDATE` callback when a player gains or loses a new
   * transformation.
   *
   * Note that this callback will only fire once per Forgotten/Soul pair.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `PlayerForm` provided.
   *
   * ```ts
   * function postTransformation(
   *   player: EntityPlayer,
   *   playerForm: PlayerForm,
   *   hasForm: boolean,
   * ): void {}
   * ```
   */
  POST_TRANSFORMATION,

  /**
   * Fires from `ENTITY_TAKE_DMG` callback when a Wishbone or a Walnut breaks.
   *
   * When registering the callback, takes an optional second argument that will make the callback
   * only fire if it matches the `TrinketType` provided.
   *
   * ```ts
   * function postTrinketBreak(
   *   player: EntityPlayer,
   *   trinketType: TrinketType,
   * ): void {}
   * ```
   */
  POST_TRINKET_BREAK,

  /**
   * Fires from the `POST_PEFFECT_UPDATE` callback on the frame before a Berserk effect ends when
   * the player is predicted to die (e.g. they currently have no health left or they took damage in
   * a "Lost" form).
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if the player matches the `PlayerVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the player matches the `PlayerType` provided.
   *
   * ```ts
   * function preBerserkDeath(player: EntityPlayer): void {}
   * ```
   */
  PRE_BERSERK_DEATH,

  /**
   * Fires from the `POST_PLAYER_FATAL_DAMAGE` callback when a player is about to die. If you want
   * to initiate a custom revival, return an integer that corresponds to the item or type of revival
   * that you are doing. Otherwise, return undefined to continue the fatal damage.
   *
   * This callback is useful because reviving the player after the game things that player should
   * have died will result in the save data for the run getting deleted.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if the player matches the `PlayerVariant` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the player matches the `PlayerType` provided.
   *
   * ```ts
   * function preCustomRevive(player: EntityPlayer): int | undefined {}
   * ```
   */
  PRE_CUSTOM_REVIVE,

  /**
   * Fires from the `POST_PEFFECT_UPDATE` callback when an item becomes queued (i.e. when the player
   * begins to hold the item above their head).
   *
   * Note that this callback will only fire once per Forgotten/Soul pair.
   *
   * - When registering the callback, takes an optional second argument that will make the callback
   *   only fire if it matches the `ItemType` provided.
   * - When registering the callback, takes an optional third argument that will make the callback
   *   only fire if the `CollectibleType` or the `TrinketType` matches the ID provided.
   *
   * ```ts
   * function preItemPickup(
   *   player: EntityPlayer,
   *   pickingUpItem: PickingUpItem,
   * ): void {}
   * ```
   */
  PRE_ITEM_PICKUP,

  /**
   * Fires on the `POST_RENDER` frame before the player is taken to a new floor. Only fires when a
   * player jumps into a trapdoor or enters a heaven door (beam of light). Does not fire on the
   * first floor of the run. Does not fire when the player reloads/reseeds the current floor (i.e.
   * Forget Me Now, 5-pip dice room).
   *
   * This callback passes the `EntityPlayer` object for the player who jumped into the trapdoor or
   * entered the heaven door, if needed.
   *
   * ```ts
   * function preNewLevel(player: EntityPlayer): void {}
   * ```
   */
  PRE_NEW_LEVEL,
}
