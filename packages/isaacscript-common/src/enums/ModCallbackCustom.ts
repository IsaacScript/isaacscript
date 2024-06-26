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
   * The exact same thing as the vanilla `ENTITY_TAKE_DMG` callback, except this callback allows you
   * to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function entityTakeDmgFilter(
   *   entity: Entity,
   *   amount: float,
   *   damageFlags: BitFlags<DamageFlag>,
   *   source: EntityRef,
   *   countdownFrames: int,
   * ): boolean | undefined {}
   * ```
   */
  ENTITY_TAKE_DMG_FILTER,

  /**
   * The exact same thing as the vanilla `ENTITY_TAKE_DMG` callback, except this callback
   * automatically filters for `EntityType.ENTITY_PLAYER` and casts the `Entity` object to a
   * `EntityPlayer`.
   *
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function entityTakeDmgPlayer(
   *   player: EntityPlayer,
   *   amount: float,
   *   damageFlags: BitFlags<DamageFlag>,
   *   source: EntityRef,
   *   countdownFrames: int,
   * ): boolean | undefined {}
   * ```
   */
  ENTITY_TAKE_DMG_PLAYER,

  /**
   * The exact same thing as the vanilla `INPUT_ACTION` callback, except this callback allows you to
   * specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `InputHook` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `ButtonAction` provided.
   *
   * ```ts
   * function inputActionFilter(
   *   entity: Entity | undefined,
   *   inputHook: InputHook,
   *   buttonAction: ButtonAction,
   * ): boolean | undefined {}
   * ```
   */
  INPUT_ACTION_FILTER,

  /**
   * The exact same thing as the vanilla `INPUT_ACTION` callback, except this callback automatically
   * filters for `EntityType.ENTITY_PLAYER` and casts the `Entity` object to a `EntityPlayer`. It
   * also allows you to specify extra arguments for additional filtration.
   *
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the `InputHook` provided.
   * - You can provide an optional sixth argument that will make the callback only fire if it
   *   matches the `ButtonAction` provided.
   *
   * ```ts
   * function inputActionPlayer(
   *   player: EntityPlayer,
   *   inputHook: InputHook,
   *   buttonAction: ButtonAction,
   * ): boolean | undefined {}
   * ```
   */
  INPUT_ACTION_PLAYER,

  /**
   * Fires from the `POST_UPDATE` callback when a Challenge Room or Boss Rush is started.
   * Specifically, this happens on the first frame that `Room.IsAmbushDone` is true.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `AmbushType` provided.
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `AmbushType` provided.
   *
   * ```ts
   * function postAmbushStarted(ambushType: AmbushType): void {}
   * ```
   */
  POST_AMBUSH_STARTED,

  /**
   * Fires on the `POST_BOMB_UPDATE` callback that it explodes.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   * - You can provide an optional forth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postBombDetonated(bomb: EntityBomb): void {}
   * ```
   */
  POST_BOMB_EXPLODED,

  /**
   * The exact same thing as the vanilla `POST_BOMB_INIT` callback, except this callback allows you
   * to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postBombInitFilter(bomb: EntityBomb): void {}
   * ```
   */
  POST_BOMB_INIT_FILTER,

  /**
   * Fires on the first `POST_BOMB_UPDATE` frame for each bomb.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_BOMB_INIT` callback.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   * - You can provide an optional forth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postBombInitLate(bomb: EntityBomb): void {}
   * ```
   */
  POST_BOMB_INIT_LATE,

  /**
   * The exact same thing as the vanilla `POST_BOMB_RENDER` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postBombRenderFilter(bomb: EntityBomb, renderOffset: Vector): void {}
   * ```
   */
  POST_BOMB_RENDER_FILTER,

  /**
   * The exact same thing as the vanilla `POST_BOMB_UPDATE` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postBombUpdateFilter(bomb: EntityBomb): void {}
   * ```
   */
  POST_BOMB_UPDATE_FILTER,

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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if the
   *   pedestal changed from the `CollectibleType` provided.
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
   * Fires from the `POST_PLAYER_RENDER` callback on the first frame that the "TeleportUp" animation
   * begins playing after a player triggers a Cursed Eye teleport or a Cursed Skull teleport. (Both
   * of these have the same effect in causing Isaac to be teleported to a random room.)
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postCursedTeleport(player: EntityPlayer): void {}
   * ```
   */
  POST_CURSED_TELEPORT,

  /**
   * Fires from the `POST_PLAYER_UPDATE` callback after the player has finished the death animation,
   * has teleported to the previous room, and is ready to play the animation for the modded revival
   * item. The `revivalType` will match the value returned from the `PRE_CUSTOM_REVIVE` callback.
   *
   * In this callback, you must play an animation with something along the lines of
   * `player.AnimateCollectible(CollectibleTypeCustom.COLLECTIBLE_MY_REVIVAL_ITEM);`, otherwise the
   * animation for a 1-Up will play.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if the
   *   revival type matches the one provided.
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `DiceFloorSubType` provided.
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postDoorRender(door: GridEntityDoor): void {}
   * ```
   */
  POST_DOOR_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a door exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postDoorUpdate(door: GridEntityDoor): void {}
   * ```
   */
  POST_DOOR_UPDATE,

  /**
   * The exact same thing as the vanilla `POST_EFFECT_INIT` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EffectVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postEffectInitFilter(effect: EntityEffect): void {}
   * ```
   */
  POST_EFFECT_INIT_FILTER,

  /**
   * Fires on the first `POST_EFFECT_UPDATE` frame for each effect.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_EFFECT_INIT` callback.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EffectVariant` provided.
   * - You can provide an optional forth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postEffectInitLate(effect: EntityEffect): void {}
   * ```
   */
  POST_EFFECT_INIT_LATE,

  /**
   * The exact same thing as the vanilla `POST_EFFECT_RENDER` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EffectVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postEffectRenderFilter(effect: EntityEffect, renderOffset: Vector): void {}
   * ```
   */
  POST_EFFECT_RENDER_FILTER,

  /**
   * Fires from the `POST_EFFECT_UPDATE` callback when an effect's state has changed from what it
   * was on the previous frame. (In this context, "state" refers to the `EntityEffect.State` field.)
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EffectVariant` provided.
   * - You can provide an optional forth argument that will make the callback only fire if it
   *   matches the sub-type provided.
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
   * The exact same thing as the vanilla `POST_EFFECT_UPDATE` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EffectVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postEffectUpdateFilter(effect: EntityEffect): void {}
   * ```
   */
  POST_EFFECT_UPDATE_FILTER,

  /**
   * The exact same thing as the vanilla `POST_ENTITY_KILL` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postEntityKillFilter(entity: Entity): void {}
   * ```
   */
  POST_ENTITY_KILL_FILTER,

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
   * The exact same thing as the vanilla `POST_FAMILIAR_INIT` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postFamiliarInitFilter(familiar: EntityFamiliar): void {}
   * ```
   */
  POST_FAMILIAR_INIT_FILTER,

  /**
   * Fires on the first `FAMILIAR_UPDATE` frame for each familiar.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_TEAR_INIT` callback.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   * - You can provide an optional forth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postFamiliarInitLate(familiar: EntityFamiliar): void {}
   * ```
   */
  POST_FAMILIAR_INIT_LATE,

  /**
   * The exact same thing as the vanilla `POST_FAMILIAR_RENDER` callback, except this callback
   * allows you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postFamiliarRenderFilter(familiar: EntityFamiliar, renderOffset: Vector): void {}
   * ```
   */
  POST_FAMILIAR_RENDER_FILTER,

  /**
   * Fires from the `POST_FAMILIAR_UPDATE` callback when a familiar's state has changed from what it
   * was on the previous frame. (In this context, "state" refers to the `EntityFamiliar.State`
   * field.)
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   * - You can provide an optional forth argument that will make the callback only fire if it
   *   matches the sub-type provided.
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
   * The exact same thing as the vanilla `POST_FAMILIAR_UPDATE` callback, except this callback
   * allows you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postFamiliarUpdateFilter(familiar: EntityFamiliar): void {}
   * ```
   */
  POST_FAMILIAR_UPDATE_FILTER,

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
   * The exact same thing as the vanilla `POST_GAME_END` callback, except this callback allows you
   * to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `isGameOver` value provided.
   *
   * ```ts
   * function postGameEndFilter(isGameOver: boolean): void {}
   * ```
   */
  POST_GAME_END_FILTER,

  /**
   * Similar to the vanilla callback of the same name, but fires in the correct order with respect
   * to the `POST_NEW_LEVEL` and the `POST_NEW_ROOM` callbacks:
   *
   * `POST_GAME_STARTED_REORDERED` --> `POST_NEW_LEVEL_REORDERED` --> `POST_NEW_ROOM_REORDERED`
   *
   * - You must provide a third argument:
   *   - Pass true if you want the callback to only fire if the run is continued.
   *   - Pass false if you want the callback to only fire when the run is not continued.
   *   - Pass undefined if you want the callback to fire in both situations.
   *
   * (The third argument for this callback is mandatory in order to prevent users from shooting
   * themselves in the foot with respect to logic unexpectedly being executed on continued runs.)
   *
   * ```ts
   * function postGameStartedReordered(isContinued: boolean): void {}
   * ```
   */
  POST_GAME_STARTED_REORDERED,

  /**
   * Similar to the `POST_GAME_STARTED_REORDERED` callback, but fires after all of the subscribed
   * callbacks have finished firing. Thus, you can use this callback to do perform things after a
   * new run has started (or continued), but you can be sure that all new-run-related initialization
   * has been completed.
   *
   * - You must provide a third argument:
   *   - Pass true if you want the callback to only fire if the run is continued.
   *   - Pass false if you want the callback to only fire when the run is not continued.
   *   - Pass undefined if you want the callback to fire in both situations.
   *
   * (The third argument for this callback is mandatory in order to prevent users from shooting
   * themselves in the foot with respect to logic unexpectedly being executed on continued runs.)
   *
   * ```ts
   * function postGameStartedReorderedLast(isContinued: boolean): void {}
   * ```
   */
  POST_GAME_STARTED_REORDERED_LAST,

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
   * the broken state for the respective grid entity type. (For example, this will fire for a
   * `GridEntityType.ROCK` (2) when its state changes to `RockState.BROKEN` (2).)
   *
   * For grid entities created with `spawnCustomGridEntity`, use the
   * `POST_GRID_ENTITY_CUSTOM_BROKEN` callback instead.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postGridEntityBroken(gridEntity: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_BROKEN,

  /**
   * Fires from the `POST_UPDATE` callback when a new entity collides with a grid entity. (After
   * this, the callback will not continue to fire. It will only fire again once the entity moves out
   * of range and then moves back into range.)
   *
   * For grid entities created with `spawnCustomGridEntity`, use the
   * `POST_GRID_ENTITY_CUSTOM_COLLISION` callback instead.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided (for the grid entity).
   * - You can provide an optional fifth argument that will make the callback only fire if the
   *   colliding entity matches the `EntityType` provided.
   * - You can provide an optional sixth argument that will make the callback only fire if the
   *   colliding entity matches the variant provided.
   * - You can provide an optional seventh argument that will make the callback only fire if the
   *   colliding entity matches the sub-type provided.
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
   * The same as the `POST_GRID_ENTITY_BROKEN` callback, but only fires for grid entities created
   * with the `spawnCustomGridEntity` helper function.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the custom `GridEntityType` provided. (Custom grid entities do not have variants, so
   *   there is no need for an optional argument to filter by variant.)
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
   * The same as the `POST_GRID_ENTITY_COLLISION` callback, but only fires for grid entities created
   * with the `spawnCustomGridEntity` helper function.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the custom `GridEntityType` provided. (Custom grid entities do not have variants, so
   *   there is no need for an optional argument to filter by variant.)
   * - You can provide an optional fourth argument that will make the callback only fire if the
   *   colliding entity matches the `EntityType` provided.
   * - You can provide an optional fifth argument that will make the callback only fire if the
   *   colliding entity matches the variant provided.
   * - You can provide an optional sixth argument that will make the callback only fire if the
   *   colliding entity matches the sub-type provided.
   *
   * ```ts
   * function postGridEntityCustomCollision(
   *   gridEntity: GridEntity,
   *   gridEntityTypeCustom: GridEntityType,
   *   entity: Entity,
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_CUSTOM_COLLISION,

  /**
   * The same as the `POST_GRID_ENTITY_INIT` callback, but only fires for grid entities created with
   * the `spawnCustomGridEntity` helper function.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the custom `GridEntityType` provided. (Custom grid entities do not have variants, so
   *   there is no need for an optional argument to filter by variant.)
   *
   * ```ts
   * function postGridEntityCustomInit(
   *   gridEntity: GridEntity,
   *   gridEntityTypeCustom: GridEntityType,
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_CUSTOM_INIT,

  /**
   * The same as the `POST_GRID_ENTITY_REMOVE` callback, but only fires for grid entities created
   * with the `spawnCustomGridEntity` helper function.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the custom `GridEntityType` provided. (Custom grid entities do not have variants, so
   *   there is no need for an optional argument to filter by variant.)
   *
   * ```ts
   * function postGridEntityCustomRemove(
   *   gridIndex: int,
   *   gridEntityTypeCustom: GridEntityType,
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_CUSTOM_REMOVE,

  /**
   * The same as the `POST_GRID_ENTITY_RENDER` callback, but only fires for grid entities created
   * with the `spawnCustomGridEntity` helper function.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the custom `GridEntityType` provided. (Custom grid entities do not have variants, so
   *   there is no need for an optional argument to filter by variant.)
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
   * The same as the `POST_GRID_ENTITY_STATE_CHANGED` callback, but only fires for grid entities
   * created with the `spawnCustomGridEntity` helper function.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the custom `GridEntityType` provided. (Custom grid entities do not have variants, so
   *   there is no need for an optional argument to filter by variant.)
   *
   * ```ts
   * function postGridEntityCustomStateChanged(
   *   gridEntity: GridEntity,
   *   gridEntityTypeCustom: GridEntityType,
   *   oldState: int,
   *   newState: int,
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_CUSTOM_STATE_CHANGED,

  /**
   * The same as the `POST_GRID_ENTITY_UPDATE` callback, but only fires for grid entities created
   * with the `spawnCustomGridEntity` helper function.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the custom `GridEntityType` provided. (Custom grid entities do not have variants, so
   *   there is no need for an optional argument to filter by variant.)
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
   * - in the `POST_NEW_ROOM_REORDERED` callback (firing every time a room is entered, even if the
   *   entity was previously there on a previous room entry)
   * - in the `POST_UPDATE` callback (if the entity appeared mid-way through the room, like when the
   *   trapdoor appears after defeating It Lives)
   *
   * For grid entities created with `spawnCustomGridEntity`, use the `POST_GRID_ENTITY_CUSTOM_INIT`
   * callback instead.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
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
   * (Leaving a room with a grid entity does not count as "removing" it.)
   *
   * This will fire when a Polty/Kineti picks up a grid entity.
   *
   * For grid entities created with `spawnCustomGridEntity`, use the
   * `POST_GRID_ENTITY_CUSTOM_REMOVE` callback instead.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
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
   * For grid entities created with `spawnCustomGridEntity`, use the
   * `POST_GRID_ENTITY_CUSTOM_RENDER` callback instead.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postGridEntityRender(gridEntity: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback when a grid entity changes its state. (In this context,
   * "state" refers to the `GridEntity.State` field.)
   *
   * For grid entities created with `spawnCustomGridEntity`, use the
   * `POST_GRID_ENTITY_CUSTOM_STATE_CHANGED` callback instead.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
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
   * For grid entities created with `spawnCustomGridEntity`, use the
   * `POST_GRID_ENTITY_CUSTOM_UPDATE` callback instead.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postGridEntityUpdate(gridEntity: GridEntity): void {}
   * ```
   */
  POST_GRID_ENTITY_UPDATE,

  /**
   * Fires from the `POST_PEFFECT_UPDATE_REORDERED` callback when the player loses a Holy Mantle
   * temporary collectible effect.
   *
   * This callback is useful because you might want to have code that happens when the player is hit
   * from an enemy. Normally, you would accomplish this via the `ENTITY_TAKE_DMG` callback, but that
   * callback never fires if the player has a Holy Mantle shield.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
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
   * Fires from `POST_PEFFECT_UPDATE_REORDERED` callback when the player loses charge on their
   * active collectible item, implying that the item was just used.
   *
   * This callback is useful because the `USE_ITEM` callback does not fire when The Candle, Red
   * Candle, and Bob's Rotten Brain are discharged.
   *
   * Note that this callback will not fire if the active item is both discharged and swapped for
   * another item / discharged on the same frame, like in the case of Alabaster Box.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
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
   * Fires from the `POST_PEFFECT_UPDATE_REORDERED` callback when an item is no longer queued (i.e.
   * when the animation of the player holding the item above their head is finished and the item is
   * actually added to the player's inventory).
   *
   * Note that this callback will only fire once per Forgotten/Soul pair.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ItemType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if the
   *   sub-type matches the `CollectibleType` or the `TrinketType` provided.
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
   * Fires on the first `POST_RENDER` frame after a key on the keyboard has been pressed or
   * released. (In other words, the callback only fires when the "pressed" status is different than
   * what it was on the previous frame.)
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Keyboard` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the pressed state provided. (`true` for pressed, `false` for released.)
   *
   * ```ts
   * function postKeyboardChanged(keyboard: Keyboard, pressed: boolean): void {}
   * ```
   */
  POST_KEYBOARD_CHANGED,

  /**
   * The exact same thing as the vanilla `POST_KNIFE_INIT` callback, except this callback allows you
   * to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postKnifeInitFilter(knife: EntityKnife): void {}
   * ```
   */
  POST_KNIFE_INIT_FILTER,

  /**
   * Fires on the first `POST_KNIFE_UPDATE` frame for each knife.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_KNIFE_INIT` callback.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   * - You can provide an optional forth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postKnifeInitLate(knife: EntityKnife): void {}
   * ```
   */
  POST_KNIFE_INIT_LATE,

  /**
   * The exact same thing as the vanilla `POST_KNIFE_RENDER` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postKnifeRenderFilter(knife: EntityKnife, renderOffset: Vector): void {}
   * ```
   */
  POST_KNIFE_RENDER_FILTER,

  /**
   * The exact same thing as the vanilla `POST_KNIFE_UPDATE` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postKnifeUpdateFilter(knife: EntityKnife): void {}
   * ```
   */
  POST_KNIFE_UPDATE_FILTER,

  /**
   * The exact same thing as the vanilla `POST_LASER_INIT` callback, except this callback allows you
   * to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postLaserInitFilter(laser: EntityLaser): void {}
   * ```
   */
  POST_LASER_INIT_FILTER,

  /**
   * Fires on the first `POST_LASER_UPDATE` frame for each laser.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_LASER_INIT` callback.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   * - You can provide an optional forth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postLaserInitLate(laser: EntityLaser): void {}
   * ```
   */
  POST_LASER_INIT_LATE,

  /**
   * The exact same thing as the vanilla `POST_LASER_RENDER` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postLaserRenderFilter(laser: EntityLaser, renderOffset: Vector): void {}
   * ```
   */
  POST_LASER_RENDER_FILTER,

  /**
   * The exact same thing as the vanilla `POST_LASER_UPDATE` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postLaserUpdateFilter(laser: EntityLaser): void {}
   * ```
   */
  POST_LASER_UPDATE_FILTER,

  /**
   * The same as the vanilla callback of the same name, but fires in the correct order with respect
   * to the `POST_GAME_STARTED` and the `POST_NEW_ROOM` callbacks:
   *
   * `POST_GAME_STARTED_REORDERED` --> `POST_NEW_LEVEL_REORDERED` --> `POST_NEW_ROOM_REORDERED`
   *
   * Additionally, this callback will pass the `LevelStage` as the first callback argument and the
   * `StageType` as the second callback argument.
   *
   * Note that similar to the vanilla `POST_NEW_LEVEL` callback, this callback will not fire when a
   * player resumes a saved run. (In that case, only the `POST_GAME_STARTED_REORDERED` and the
   * `POST_NEW_ROOM_REORDERED` callbacks will fire, in that order).
   *
   * If some specific cases, mods can change the current level during run initialization (on the 0th
   * frame). However, due to how the callback reordering works, the custom
   * `POST_NEW_LEVEL_REORDERED` callback will never fire on the 0th frame. To get around this, call
   * the `forceNewLevelCallback()` function before changing levels to temporarily force the callback
   * to fire.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LevelStage` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `StageType` provided.
   *
   * ```ts
   * function postNewLevelReordered(stage: LevelStage, stageType: StageType): void {}
   * ```
   */
  POST_NEW_LEVEL_REORDERED,

  /**
   * Fires on the first `POST_NEW_ROOM` or `PRE_ENTITY_SPAWN` callback where being in a new room is
   * detected. This is useful because the vanilla `POST_NEW_ROOM` callback fires only after entities
   * in the room have been initialized and updated once, which means that it is possible for
   * entity-related code to run before room-related-initialization has been performed.
   *
   * Additionally, this callback will pass the `RoomType` as the first callback argument.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `RoomType` provided.
   *
   * ```ts
   * function postNewRoomEarly(roomType: RoomType): void {}
   * ```
   */
  POST_NEW_ROOM_EARLY,

  /**
   * The same as the vanilla callback of the same name, but fires in the correct order with respect
   * to the `POST_GAME_STARTED` and the `POST_NEW_LEVEL` callbacks:
   *
   * `POST_GAME_STARTED_REORDERED` --> `POST_NEW_LEVEL_REORDERED` --> `POST_NEW_ROOM_REORDERED`
   *
   * Additionally, this callback will pass the `RoomType` as the first callback argument.
   *
   * If some specific cases, mods can change the current room during run initialization (on the 0th
   * frame). However, due to how the callback reordering works, the custom `POST_NEW_ROOM_REORDERED`
   * callback will never fire on the 0th frame. To get around this, call the
   * `forceNewRoomCallback()` function before changing levels to temporarily force the callback to
   * fire.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `RoomType` provided.
   *
   * ```ts
   * function postNewRoomReordered(roomType: RoomType): void {}
   * ```
   */
  POST_NEW_ROOM_REORDERED,

  /**
   * The exact same thing as the vanilla `POST_NPC_DEATH` callback, except this callback allows you
   * to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postNPCDeathFilter(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_DEATH_FILTER,

  /**
   * The exact same thing as the vanilla `POST_NPC_INIT` callback, except this callback allows you
   * to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postNPCInitFilter(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_INIT_FILTER,

  /**
   * Fires on the first `NPC_UPDATE` frame for each NPC.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_NPC_INIT` callback.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postNPCInitLate(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_INIT_LATE,

  /**
   * The exact same thing as the vanilla `POST_NPC_RENDER` callback, except this callback allows you
   * to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postNPCRenderFilter(npc: EntityNPC, renderOffset: Vector): void {}
   * ```
   */
  POST_NPC_RENDER_FILTER,

  /**
   * Fires from the `POST_NPC_UPDATE` callback when an NPC's state has changed from what it was on
   * the previous frame. (In this context, "state" refers to the `EntityNPC.State` field.)
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the sub-type provided.
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
   * The exact same thing as the vanilla `POST_NPC_UPDATE` callback, except this callback allows you
   * to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postNPCUpdateFilter(npc: EntityNPC): void {}
   * ```
   */
  POST_NPC_UPDATE_FILTER,

  /**
   * Similar to the vanilla callback of the same name, but fires after the
   * `POST_GAME_STARTED_REORDERED` callback fires (if the player is being updated on the 0th game
   * frame of the run).
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPEffectUpdateReordered(player: EntityPlayer): void {}
   * ```
   */
  POST_PEFFECT_UPDATE_REORDERED,

  /**
   * Fires from the `POST_PICKUP_UPDATE` callback when a pickup has a different variant or sub-type
   * than what it was on the previous frame.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if the new
   *   pickup matches the `PickupVariant` provided.
   * - You can provide an optional third argument that will make the callback only fire if the new
   *   pickup matches the sub-type provided.
   *
   * ```ts
   * function postPickupChanged(
   *   pickup: EntityPickup,
   *   oldVariant: PickupVariant,
   *   oldSubType: int,
   *   newVariant: PickupVariant,
   *   newSubType: int,
   * ): void {}
   * ```
   */
  POST_PICKUP_CHANGED,

  /**
   * Fires on the first `POST_RENDER` frame that a pickup plays the "Collect" animation.
   *
   * Use this callback to know when a pickup is added to the player's inventory or health.
   *
   * Note that this will not fire when the player takes a collectible; use either the
   * `POST_PLAYER_COLLECTIBLE_ADDED` or the `PRE_ITEM_PICKUP` callback for that.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postPickupCollect(pickup: EntityPickup, player: EntityPlayer): void {}
   * ```
   */
  POST_PICKUP_COLLECT,

  /**
   * The exact same thing as the vanilla `POST_PICKUP_INIT` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postPickupInitFilter(pickup: EntityPickup): void {}
   * ```
   */
  POST_PICKUP_INIT_FILTER,

  /**
   * Fires from the `POST_PICKUP_INIT` callback on the first time that a player has seen the
   * respective pickup on the run.
   *
   * This callback is useful because pickups will despawn upon leaving the room and respawn upon
   * re-entering the room.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postPickupInitLate(pickup: EntityPickup): void {}
   * ```
   */
  POST_PICKUP_INIT_LATE,

  /**
   * The exact same thing as the vanilla `POST_PICKUP_RENDER` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postPickupRenderFilter(pickup: EntityPickup, renderOffset: Vector): void {}
   * ```
   */
  POST_PICKUP_RENDER_FILTER,

  /**
   * The exact same thing as the vanilla `POST_PICKUP_SELECTION` callback, except this callback
   * allows you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postPickupSelectionFilter(
   *   pickup: EntityPickup,
   *   variant: PickupVariant,
   *   subType: int,
   * ): [pickupVariant: PickupVariant, subType: int] | undefined {}
   * ```
   */
  POST_PICKUP_SELECTION_FILTER,

  /**
   * Fires from the `POST_PICKUP_UPDATE` callback when a pickup's state has changed from what it was
   * on the previous frame. (In this context, "state" refers to the `EntityPickup.State` field.)
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
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
   * The exact same thing as the vanilla `POST_PICKUP_UPDATE` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postPickupUpdateFilter(pickup: EntityPickup): void {}
   * ```
   */
  POST_PICKUP_UPDATE_FILTER,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a pit exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postPitRender(pit: GridEntityPit): void {}
   * ```
   */
  POST_PIT_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a pit exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postPitUpdate(pit: GridEntityPit): void {}
   * ```
   */
  POST_PIT_UPDATE,

  /**
   * Fires from the `POST_PEFFECT_UPDATE_REORDERED` callback when a player's health (i.e. hearts) is
   * different than what it was on the previous frame. For more information, see the `PlayerHealth`
   * enum.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
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
   * Fires from the `POST_PEFFECT_UPDATE_REORDERED` callback when one of the player's stats change
   * from what they were on the previous frame.
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerChangeStat<T extends StatType>(
   *   player: EntityPlayer,
   *   statType: T,
   *   difference: int,
   *   oldValue: StatTypeType[T],
   *   newValue: StatTypeType[T],
   * ) => void {}
   * ```
   */
  POST_PLAYER_CHANGE_STAT,

  /**
   * Fires from the `POST_PEFFECT_UPDATE_REORDERED` callback when a player entity changes its player
   * type
   * (i.e. character) from what it was on the previous frame. For example, it will fire after using
   * Clicker, after dying with the Judas' Shadow collectible, etc.
   *
   * Notably, it does not fire after the player uses the Flip item or the Esau Jr. item, because
   * those items cause separate player entities to be created. Use the `POST_FLIP` and
   * `POST_ESAU_JR` callbacks to handle those situations.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
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
   * Fires from the `POST_PEFFECT_UPDATE_REORDERED` callback when a player's collectible count is
   * higher than what it was on the previous frame, or when the active items change, or when the
   * build is rerolled.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if the
   *   collectible matches the `CollectibleType` provided.
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
   * Fires from the `POST_PEFFECT_UPDATE_REORDERED` callback when a player's collectible count is
   * lower than what it was on the previous frame, or when the active items change, or when the
   * build is rerolled.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if the
   *   collectible matches the `CollectibleType` provided.
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
   * Fires from the `ENTITY_TAKE_DMG` callback when a player takes fatal damage. You can optionally
   * return false to prevent the fatal damage.
   *
   * Note that this function does properly take into account Guppy's Collar, Broken Ankh, Spirit
   * Shackles, and Mysterious Paper. It also takes into account using The Bible on Satan.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerRenderReordered(player: EntityPlayer, renderOffset: Vector): void {}
   * ```
   */
  POST_PLAYER_RENDER_REORDERED,

  /**
   * Similar to the vanilla callback of the same name, but fires after the
   * `POST_GAME_STARTED_REORDERED` callback fires (if the player is being updated on the 0th game
   * frame of the run).
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerUpdateReordered(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_UPDATE_REORDERED,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a poop exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postPoopRender(poop: GridEntityPoop): void {}
   * ```
   */
  POST_POOP_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a poop exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postPoopUpdate(poop: GridEntityPoop): void {}
   * ```
   */
  POST_POOP_UPDATE,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a pressure plate exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postPressurePlateRender(pressurePlate: GridEntityPressurePlate): void {}
   * ```
   */
  POST_PRESSURE_PLATE_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a pressure plate exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postPressurePlateUpdate(pressurePlate: GridEntityPressurePlate): void {}
   * ```
   */
  POST_PRESSURE_PLATE_UPDATE,

  /**
   * The exact same thing as the vanilla `POST_PROJECTILE_INIT` callback, except this callback
   * allows you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postProjectileInitFilter(projectile: EntityProjectile): void {}
   * ```
   */
  POST_PROJECTILE_INIT_FILTER,

  /**
   * Fires on the first `POST_PROJECTILE_UPDATE` frame for each projectile.
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_PROJECTILE_INIT` callback.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if matches
   *   the `ProjectileVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postProjectileInitLate(projectile: EntityProjectile): void {}
   * ```
   */
  POST_PROJECTILE_INIT_LATE,

  /**
   * Fires when the provided projectile is removed after colliding with an entity or grid entity.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postProjectileKill(projectile: EntityProjectile): void {}
   * ```
   */
  POST_PROJECTILE_KILL,

  /**
   * The exact same thing as the vanilla `POST_PROJECTILE_RENDER` callback, except this callback
   * allows you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postProjectileRenderFilter(projectile: EntityProjectile, renderOffset: Vector): void {}
   * ```
   */
  POST_PROJECTILE_RENDER_FILTER,

  /**
   * The exact same thing as the vanilla `POST_PROJECTILE_INIT` callback, except this callback
   * allows you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postProjectileUpdateFilter(projectile: EntityProjectile): void {}
   * ```
   */
  POST_PROJECTILE_UPDATE_FILTER,

  /**
   * Fires from the `POST_PEFFECT_UPDATE_REORDERED` callback when a player first picks up a new
   * item. The pickup returned in the callback is assumed to be the first pickup that no longer
   * exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postPurchase(player: EntityPlayer, pickup: EntityPickup): void {}
   * ```
   */
  POST_PURCHASE,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a rock exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postRockRender(rock: GridEntityRock): void {}
   * ```
   */
  POST_ROCK_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a rock exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postRockUpdate(rock: GridEntityRock): void {}
   * ```
   */
  POST_ROCK_UPDATE,

  /**
   * Fires from the `POST_UPDATE` callback when the clear state of a room changes (as according to
   * the `Room.IsClear` method).
   *
   * For example, this callback fires when you defeat all the enemies in a room (clear --> not
   * clear) or when you bomb an angel statue (not clear --> clear). This callback does not fire when
   * you travel between a cleared room and an uncleared room.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if the room
   *   clear state matches the boolean provided.
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postSacrifice(player: EntityPlayer, numSacrifices: int): void {}
   * ```
   */
  POST_SACRIFICE,

  /**
   * Fires from the `POST_RENDER` callback when a slot entity's animation changes.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postSlotAnimationChanged(
   *   slot: Entity,
   *   previousAnimation: string,
   *   currentAnimation: string,
   * ): void {}
   * ```
   */
  POST_SLOT_ANIMATION_CHANGED,

  /**
   * Fires from the `PRE_PLAYER_COLLISION` callback when when a player collides with a slot entity.
   * (It will not fire if any other type of entity collides with the slot entity.)
   *
   * When a player runs into a slot entity, this callback will continually fire, since the player is
   * colliding with it on every frame. Thus, you should only perform actions in this callback under
   * certain conditions, like if the slot entity is playing the "Idle" animation, and so on.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   * - (Only players will cause this callback to fire, so there is no need for an optional argument
   *   to filter by `EntityType`.)
   *
   * ```ts
   * function postSlotCollision(
   *   slot: EntitySlot,
   *   entity: Entity,
   * ): void {}
   * ```
   */
  POST_SLOT_COLLISION,

  /**
   * Fires from the `POST_SLOT_UPDATE` or the `POST_ENTITY_REMOVE` callback when a slot machine is
   * destroyed or a beggar is removed.
   *
   * This callback will fire in four different kinds of situations:
   *
   * 1. When slot machine entities (e.g. `SlotVariant.SLOT_MACHINE` and
   *    `SlotVariant.BLOOD_DONATION_MACHINE`) are destroyed with an explosion. When this happens,
   *    they typically stay in the room and can be pushed around. This state is detected via a
   *    change in the `GridCollisionClass`.
   * 2. When slot machine entities pay out with a collectible item. When this happens, they
   *    immediately despawn without playing any special animation.
   * 3. When beggar entities (e.g. `SlotVariant.BEGGAR` and `SlotVariant.SHELL_GAME`) are destroyed
   *    with an explosion. When this happens, they immediately despawn without playing any special
   *    animation.
   * 4. When beggar entities pay out with a collectible item. When this happens, they despawn after
   *    playing the "Teleport" animation. (This is not technically a "destruction" event, but the
   *    callback will fire for this to remain consistent with the other types of slot entities.)
   *
   * Depending on the specific types of slot removal that you need to detect, you can filter using:
   *
   * 1. The `isSlotMachine` helper function to differentiate between slot machines and beggars.
   * 2. The passed callback argument of `SlotDestructionType` to differentiate between bombed slots
   *    and slots that paid out with a collectible item.
   *
   * Note that when a Crane Game explodes after paying out three collectibles, the
   * `SlotDestructionType` will be equal to `SlotDestructionType.NORMAL` instead of
   * `SlotDestructionType.COLLECTIBLE_PAYOUT` like you might expect. (This is because it only
   * explodes after a short delay, and when doing so, it produces rewards in the same way that would
   * happen if you bombed it.)
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postSlotDestroyed(slot: Entity, slotDestructionType: SlotDestructionType): void {}
   * ```
   */
  POST_SLOT_DESTROYED,

  /**
   * Fires when a new slot entity is initialized. Specifically, this is either:
   *
   * - in the `POST_NEW_ROOM_REORDERED` callback (firing every time a room is entered, even if the
   *   entity was previously there on a previous room entry)
   * - in the `POST_UPDATE` callback (if the entity appeared mid-way through the room, like when a
   *   Wheel of Fortune card is used)
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postSlotInit(slot: Entity): void {}
   * ```
   */
  POST_SLOT_INIT,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a slot entity exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postSlotRender(slot: Entity): void {}
   * ```
   */
  POST_SLOT_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a slot entity exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postSlotUpdate(slot: Entity): void {}
   * ```
   */
  POST_SLOT_UPDATE,

  /**
   * Fires from the `POST_RENDER` callback on every frame that spikes exist.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postSpikesRender(spikes: GridEntitySpikes): void {}
   * ```
   */
  POST_SPIKES_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that spikes exist.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postSpikesUpdate(spikes: GridEntitySpikes): void {}
   * ```
   */
  POST_SPIKES_UPDATE,

  /**
   * The exact same thing as the vanilla `POST_TEAR_INIT` callback, except this callback allows you
   * to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postTearInitFilter(tear: EntityTear): void {}
   * ```
   */
  POST_TEAR_INIT_FILTER,

  /**
   * Fires on the first `POST_TEAR_UPDATE` frame for each tear (which is when
   * `EntityTear.FrameCount` is equal to 0).
   *
   * This callback is useful because many attributes cannot be set or retrieved properly in the
   * normal `POST_TEAR_INIT` callback.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postTearInitVeryLate(tear: EntityTear): void {}
   * ```
   */
  POST_TEAR_INIT_VERY_LATE,

  /**
   * Fires when the provided tear is removed after colliding with an entity or grid entity.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postTearKill(tear: EntityTear): void {}
   * ```
   */
  POST_TEAR_KILL,

  /**
   * The exact same thing as the vanilla `POST_TEAR_RENDER` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postTearRenderFilter(tear: EntityTear, renderOffset: Vector): void {}
   * ```
   */
  POST_TEAR_RENDER_FILTER,

  /**
   * The exact same thing as the vanilla `POST_TEAR_INIT` callback, except this callback allows you
   * to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function postTearUpdateFilter(tear: EntityTear): void {}
   * ```
   */
  POST_TEAR_UPDATE_FILTER,

  /**
   * Fires from the `POST_RENDER` callback on every frame that a TNT exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postTNTRender(tnt: GridEntityTNT): void {}
   * ```
   */
  POST_TNT_RENDER,

  /**
   * Fires from the `POST_UPDATE` callback on every frame that a TNT exists.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the variant provided.
   *
   * ```ts
   * function postTNTUpdate(tnt: GridEntityTNT): void {}
   * ```
   */
  POST_TNT_UPDATE,

  /**
   * Fires from the `POST_PEFFECT_UPDATE_REORDERED` callback when a player gains or loses a new
   * transformation.
   *
   * Note that this callback will only fire once per Forgotten/Soul pair.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerForm` provided.
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
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TrinketType` provided.
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
   * The same thing as the vanilla `POST_USE_PILL` callback, except this callback passes the
   * `PillColor` of the used pill as the final argument. It allows you to filter by the `PillColor`.
   *
   * In order to accomplish this, this callback tracks the held pills of the player on every frame.
   * If a matching `PillColor` could not be found, this callback passes `PillColor.NULL` (0).
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PillEffect` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PillColor` provided.
   *
   * ```ts
   * function postUsePillFilter(
   *   pillEffect: PillEffect,
   *   pillColor: PillColor,
   *   player: EntityPlayer,
   *   useFlags: BitFlags<UseFlag>,
   * ): void {}
   * ```
   */
  POST_USE_PILL_FILTER,

  /**
   * Fires from the `POST_PEFFECT_UPDATE_REORDERED` callback on the frame before a Berserk effect
   * ends when the player is predicted to die (e.g. they currently have no health left or they took
   * damage in a "Lost" form).
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preBerserkDeath(player: EntityPlayer): void {}
   * ```
   */
  PRE_BERSERK_DEATH,

  /**
   * The exact same thing as the vanilla `PRE_BOMB_COLLISION` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function preBombCollisionFilter(
   *   bomb: EntityBomb,
   *   collider: Entity,
   *   low: boolean,
   * ): void {}
   * ```
   */
  PRE_BOMB_COLLISION_FILTER,

  /**
   * Fires from the `POST_PLAYER_FATAL_DAMAGE` callback when a player is about to die. If you want
   * to initiate a custom revival, return an integer that corresponds to the item or type of revival
   * that you are doing. Otherwise, return undefined to continue the fatal damage.
   *
   * This callback is useful because reviving the player after the game things that player should
   * have died will result in the save data for the run getting deleted.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preCustomRevive(player: EntityPlayer): int | undefined {}
   * ```
   */
  PRE_CUSTOM_REVIVE,

  /**
   * The exact same thing as the vanilla `PRE_ENTITY_SPAWN` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function preEntitySpawnFilter(
   *   entityType: EntityType,
   *   variant: int,
   *   subType: int,
   *   position: Vector,
   *   velocity: Vector,
   *   spawner: Entity | undefined,
   *   initSeed: Seed,
   * ): [entityType: EntityType, variant: int, subType: int, initSeed: Seed] | undefined {}
   * ```
   */
  PRE_ENTITY_SPAWN_FILTER,

  /**
   * The exact same thing as the vanilla `PRE_FAMILIAR_COLLISION` callback, except this callback
   * allows you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function preFamiliarCollisionFilter(
   *   familiar: EntityFamiliar,
   *   collider: Entity,
   *   low: boolean,
   * ): void {}
   * ```
   */
  PRE_FAMILIAR_COLLISION_FILTER,

  /**
   * Fires from the `PRE_PICKUP_COLLISION` callback when a player touches a collectible pedestal and
   * meets all of the conditions to pick it up.
   *
   * The return values of this callback are the same as the `PRE_PICKUP_COLLISION` callback. For
   * example, you can prevent a player from picking up the collectible by returning false. (However,
   * note that this callback will continue to fire for every frame that the player touches the
   * pedestal, so you would need to continue returning false.)
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preGetPedestal(player: EntityPlayer, collectible: EntityPickupCollectible): void {}
   * ```
   */
  PRE_GET_PEDESTAL,

  /**
   * Fires from the `POST_PEFFECT_UPDATE_REORDERED` callback when an item becomes queued (i.e. when
   * the player begins to hold the item above their head). You can optionally return false if you
   * want the item to not be granted to the player.
   *
   * Note that this callback will only fire once per Forgotten/Soul pair.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ItemType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if the
   *   sub-type matches the `CollectibleType` or the `TrinketType` provided.
   *
   * ```ts
   * function preItemPickup(
   *   player: EntityPlayer,
   *   pickingUpItem: PickingUpItem,
   * ): boolean | undefined {}
   * ```
   */
  PRE_ITEM_PICKUP,

  /**
   * The exact same thing as the vanilla `PRE_KNIFE_COLLISION` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function preKnifeCollisionFilter(
   *   knife: EntityKnife,
   *   collider: Entity,
   *   low: boolean,
   * ): void {}
   * ```
   */
  PRE_KNIFE_COLLISION_FILTER,

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

  /**
   * The exact same thing as the vanilla `PRE_NPC_COLLISION` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function preNPCCollisionFilter(
   *   npc: EntityNPC,
   *   collider: Entity,
   *   low: boolean,
   * ): boolean | undefined {}
   * ```
   */
  PRE_NPC_COLLISION_FILTER,

  /**
   * The exact same thing as the vanilla `PRE_NPC_UPDATE` callback, except this callback allows you
   * to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function preNPCUpdateFilter(entity: Entity): boolean | undefined {}
   * ```
   */
  PRE_NPC_UPDATE_FILTER,

  /**
   * The exact same thing as the vanilla `PRE_PROJECTILE_COLLISION` callback, except this callback
   * allows you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function preProjectileCollisionFilter(
   *   tear: EntityTear,
   *   collider: Entity,
   *   low: boolean,
   * ): void {}
   * ```
   */
  PRE_PROJECTILE_COLLISION_FILTER,

  /**
   * The exact same thing as the vanilla `PRE_ROOM_ENTITY_SPAWN` callback, except this callback
   * allows you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` or `GridEntityXMLType` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the variant provided.
   * - You can provide an optional fifth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * You can use the `isGridEntityXMLType` helper function to convert the
   * `entityTypeOrGridEntityXMLType` argument to an `EntityType` or `GridEntityXMLType`, if needed.
   *
   * ```ts
   * function preRoomEntitySpawnFilter(
   *   entityTypeOrGridEntityXMLType: EntityType | GridEntityXMLType,
   *   variant: int,
   *   subType: int,
   *   gridIndex: int,
   *   seed: Seed,
   * ): [type: EntityType | GridEntityXMLType, variant: int, subType: int] | undefined {}
   * ```
   */
  PRE_ROOM_ENTITY_SPAWN_FILTER,

  /**
   * The exact same thing as the vanilla `PRE_TEAR_COLLISION` callback, except this callback allows
   * you to specify extra arguments for additional filtration.
   *
   * When registering the callback with the `ModUpgraded.AddCallbackCustom` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   * - You can provide an optional fourth argument that will make the callback only fire if it
   *   matches the sub-type provided.
   *
   * ```ts
   * function preTearCollisionFilter(
   *   tear: EntityTear,
   *   collider: Entity,
   *   low: boolean,
   * ): void {}
   * ```
   */
  PRE_TEAR_COLLISION_FILTER,
}
