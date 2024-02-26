/**
 * Callbacks for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export enum ModCallbackRepentogon {
  /**
   * Fires when a collectible is being added to a player. Return `CollectibleType` to override the
   * collectible given. Alternatively, you can return an array of parameters to further modify the
   * given collectible.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function preAddCollectible(
   *   collectible: CollectibleType,
   *   charge: int,
   *   firstTime: boolean,
   *   slot: ActiveSlot,
   *   varData: int,
   *   player: EntityPlayer
   * ): CollectibleType | [CollectibleType, int, boolean, ActiveSlot, int, EntityPlayer] | undefined {}
   * ```
   */
  PRE_ADD_COLLECTIBLE = 1004,

  /**
   * Fires after a collectible is added to a player.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function postAddCollectible(
   *   collectible: CollectibleType,
   *   charge: int,
   *   firstTime: boolean,
   *   slot: ActiveSlot,
   *   varData: int,
   *   player: EntityPlayer
   * ): void {}
   * ```
   */
  POST_ADD_COLLECTIBLE = 1005,

  /**
   * Fires after an entity takes damage.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postEntityTakeDmg(
   *   entity: Entity,
   *   damage: number,
   *   damageFlags: BitFlags<DamageFlag>,
   *   source: EntityRef,
   *   damageCountdown: int
   * ): void {}
   * ```
   */
  POST_ENTITY_TAKE_DMG = 1006,

  /**
   * Behaves like `ModCallback.ENTITY_TAKE_DMG` but with additional functionality. You can return an
   * array of parameters to override how the entity takes damage.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preEntityTakeDmg(
   *   entity: Entity,
   *   damage: number,
   *   damageFlags: BitFlags<DamageFlag>,
   *   source: EntityRef,
   *   damageCountdown: int
   * ): [int, BitFlags<DamageFlag>, int] | boolean | undefined {}
   * ```
   */
  PRE_ENTITY_TAKE_DMG = 1007,

  /**
   * Fires when a player is about to take damage. This callback fires earlier than
   * `ModCallback.ENTITY_TAKE_DAMAGE`.
   *
   * Return false to cancel the damage, which is useful for giving player invincibility that takes
   * precedence over other damage negation effects, such as Holy Mantle.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerTakeDmg(
   *   player: EntityPlayer,
   *   damage: number,
   *   damageFlags: BitFlags<DamageFlag>,
   *   source: EntityRef,
   *   damageCountdown: int,
   * ): false | undefined {}
   * ```
   */
  PRE_PLAYER_TAKE_DMG = 1008,

  /**
   * Fires after a rock GridEntity is destroyed.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridRockDestroy(
   *   rock: GridEntityRock,
   *   gridType: GridEntityType,
   *   immediate: boolean,
   * ): void {}
   * ```
   */
  POST_GRID_ROCK_DESTROY = 1011,

  /**
   * Fires when an entity is about to be hurt from a GridEntity. Return false to ignore damage.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridHurtDamage(
   *   gridEntity: GridEntity,
   *   tookDamage: Entity,
   *   damageAmount: int,
   *   damageFlags: BitFlags<DamageFlag>
   * ): boolean | undefined {}
   * ```
   */
  PRE_GRID_HURT_DAMAGE = 1012,

  /**
   * Fires after an entity is hurt from a GridEntity.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridHurtDamage(
   *   gridEntity: GridEntityRock,
   *   tookDamage: Entity,
   *   damageAmount: int,
   *   damageFlags: BitFlags<DamageFlag>
   * ): void {}
   * ```
   */
  POST_GRID_HURT_DAMAGE = 1013,

  /**
   * Fires when `HUD.Update()` is called. The game will always call the function every frame.
   *
   * ```ts
   * function hudUpdate(): void {}
   * ```
   */
  HUD_UPDATE = 1020,

  /**
   * Fires when `HUD.PostUpdate()` is called. The game will call the function after `HUD.Update()`
   * is called except for a few cases, such as the game being paused.
   *
   * ```ts
   * function hudPostUpdate(): void {}
   * ```
   */
  HUD_POST_UPDATE = 1021,

  /**
   * ```ts
   * function hudRender(): void {}
   * ```
   */
  HUD_RENDER = 1022,

  /**
   * Fires every frame the main menu is rendered.
   *
   * ```ts
   * function postMainMenuRender(): void {}
   * ```
   */
  POST_MAIN_MENU_RENDER = 1023,

  /**
   * ```ts
   * function postHudRender(): void {}
   * ```
   */
  POST_HUD_RENDER = 1024,

  /**
   * Fires when a sound effect is about to play. Return false to prevent the sound from playing.
   * Alternatively, return an array of parameters to modify the sound before it plays.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SoundEffect` provided.
   *
   * ```ts
   * function preSFXPlay(
   *   id: SoundEffect,
   *   volume: number,
   *   frameDelay: int,
   *   pitch: number,
   *   pan: number
   * ): boolean | [SoundEffect, number, int, number, number] | undefined {}
   * ```
   */
  PRE_SFX_PLAY = 1030,

  /**
   * Fires after a sound effect plays.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SoundEffect` provided.
   *
   * ```ts
   * function postSFXPlay(
   *   id: SoundEffect,
   *   volume: number,
   *   frameDelay: int,
   *   pitch: number,
   *   pan: number
   * ): void {}
   * ```
   */
  POST_SFX_PLAY = 1031,

  /**
   * Fires when a music track is about to play. This callback is fired for both
   * `MusicManager.Play()` and `MusicManager.CrossFade()`. Use the `isFade` parameter to
   * differentiate the two.
   *
   * Return false to prevent the music from playing. Alternatively, return `Music` to override the
   * track played without changing the volume or fade rate. Return an array of parameters to further
   * modify the music track.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Music` provided.
   *
   * ```ts
   * function preMusicPlay(
   *   id: Music,
   *   volumeOrFadeRate: number,
   *   isFade: boolean
   * ): Music | [Music, number] | boolean | undefined {}
   * ```
   */
  PRE_MUSIC_PLAY = 1034,

  /**
   * TODO: Add an enum for the layer.
   *
   * Fires when the currently playing music track is about to have its layer toggled. Return an
   * integer to override which layer is played. Return false to prevent the layer from being
   * toggled.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `int` provided.
   *
   * ```ts
   * function preMusicLayerToggle(
   *   layerId: int,
   *   currentState: boolean
   * ): int | boolean | undefined {}
   * ```
   */
  PRE_MUSIC_LAYER_TOGGLE = 1035,

  /**
   * Fires when the player's head is about to render. Return a Vector to override what position the
   * head renders at. Return false to prevent the head from rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preRenderPlayerHead(
   *   player: EntityPlayer,
   *   renderPosition: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_RENDER_PLAYER_HEAD = 1038,

  /**
   * Fires when the player's body is about to render. Return a Vector to override what position the
   * body renders at. Return false to prevent the body from rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preRenderPlayerBody(
   *   player: EntityPlayer,
   *   renderPosition: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_RENDER_PLAYER_BODY = 1039,

  /**
   * Fires when the player is about to throw an entity. Return a Vector to override the velocity of
   * the thrown entity.
   *
   * ```ts
   * function preEntityThrow(
   *   throwingPlayer: EntityPlayer,
   *   heldEntity: Entity,
   *   velocity: Vector
   * ): Vector | undefined {}
   * ```
   */
  PRE_ENTITY_THROW = 1040,

  /**
   * Fires the player throws an entity.
   *
   * ```ts
   * function postEntityThrow(
   *   throwingPlayer: EntityPlayer,
   *   heldEntity: Entity,
   *   velocity: Vector
   * ): void {}
   * ```
   */
  POST_ENTITY_THROW = 1041,

  /**
   * Fires when a player's special tear type is about to be initialized, such as Azazel's brimstone.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerLevelStatsInit(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_LEVEL_STATS_INIT = 1042,

  /**
   * Fires when the current room is about to be changed.
   *
   * The `newLevel` parameter is true when entering a new level or exiting a run, otherwise it's
   * false.
   *
   * ```ts
   * function preRoomExit(playerWhoExited: EntityPlayer, newLevel: boolean): void {}
   * ```
   */
  PRE_ROOM_EXIT = 1043,

  /**
   * Fires before a player gets a completion mark. Return false to prevent the mark from being
   * given.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preCompletionMarkGet(
   *   completionType: RepentogonCompletionMarkType,
   *   playerType: PlayerType
   * ): boolean | undefined {}
   * ```
   */
  PRE_COMPLETION_MARK_GET = 1047,

  /**
   * Fires after a player gets a completion mark.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postCompletionMarkGet(completionType: CompletionType, playerType: PlayerType): void {}
   * ```
   */
  POST_COMPLETION_MARK_GET = 1048,

  /**
   * Fires before a completion event is triggered. Return false to cancel the event, preventing all
   * marks and completion event related stuff to trigger for all players.
   *
   * ```ts
   * function preCompletionEvent(completionType: CompletionType): boolean | undefined {}
   * ```
   */
  PRE_COMPLETION_EVENT = 1049,

  /**
   * Fires right before the game over screen appears. Return false to cancel the death and revive
   * the player with half a heart.
   *
   * **Bug:** Much like the vanilla Revive function, this removes the current run's ability to save
   * and continue later.
   *
   * ```ts
   * function preTriggerPlayerDeath(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_TRIGGER_PLAYER_DEATH = 1050,

  /**
   * Fires when a level is about to be initialized.
   *
   * ```ts
   * function preLevelInit(): void {}
   * ```
   */
  PRE_LEVEL_INIT = 1060,

  /**
   * Fires when the current room is about to change. Return an array containing a room index and
   * dimension to override where the player ends up.
   *
   * ```ts
   * function preChangeRoom(targetRoomIdx: int, dimension: int): [int, int] | undefined {}
   * ```
   */
  PRE_CHANGE_ROOM = 1061,

  /**
   * Fires when a pickup has been purchased from the shop.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function postPickupShopPurchase(
   *   pickup: EntityPickup,
   *   player: EntityPlayer,
   *   moneySpent: int
   * ): void {}
   * ```
   */
  POST_PICKUP_SHOP_PURCHASE = 1062,

  /**
   * Fires when a familiar's follower priority is about to be assigned. Return `FollowerPriority` or
   * an integer to override the familiar's follow priority.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postPickupShopPurchase(
   *   familiar: EntityFamiliar
   * ): FollowerPriority | int | undefined {}
   * ```
   */
  GET_FOLLOWER_PRIORITY = 1063,

  /**
   * Fires when a shop is about to be restocked. Return false to cancel the restock, blocking shop
   * rerolls from restock machines or restocks from Restock altogether.
   *
   * This callback is fired for both `Room.ShopRestockFull` and `Room.ShopRestockPartial`. The
   * `partial` parameter is true if `Room.ShopRestockPartial` was called, otherwise it's false.
   *
   * ```ts
   * function preRestockShop(partial: boolean): boolean | undefined {}
   * ```
   */
  PRE_RESTOCK_SHOP = 1070,

  /**
   * Fires after a shop has been restocked.
   *
   * This callback is fired for both `Room.ShopRestockFull` and `Room.ShopRestockPartial`. The
   * `partial` parameter is true if `Room.ShopRestockPartial` was called, otherwise it's false.
   *
   * ```ts
   * function postRestockShop(partial: boolean): void {}
   * ```
   */
  POST_RESTOCK_SHOP = 1071,

  /**
   * Fires before a card is used. Return true to cancel the card from being used.
   *
   * ```ts
   * function preUseCard(
   *   card: CardType,
   *   player: EntityPlayer,
   *   useFlags: BitFlags<UseFlag>
   * ): boolean | undefined
   * ```
   */
  PRE_USE_CARD = 1064,

  /**
   * Fires before a pill is used. Return true to cancel the card from being used.
   *
   * ```ts
   * function preUsePill(
   *   pill: PillEffect,
   *   color: PillColor,
   *   player: EntityPlayer,
   *   useFlags: BitFlags<UseFlag>
   * ): boolean | undefined {}
   * ```
   */
  PRE_USE_PILL = 1065,

  /**
   * Fires before a shop item has its price assigned. Return an integer to override the price.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the integer provided.
   *
   * ```ts
   * function getShopItemPrice(
   *   variant: PickupVariant,
   *   subType: int,
   *   shopItemID: int,
   *   price: int
   * ): int | undefined {}
   * ```
   */
  GET_SHOP_ITEM_PRICE = 1066,

  /**
   * Fires when the player's health type is being loaded. Return `RepentogonHealthType` to override
   * the player's health type.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function playerGetHealthType(player: EntityPlayer): RepentogonHealthType | undefined {}
   * ```
   */
  PLAYER_GET_HEALTH_TYPE = 1067,

  /**
   * Fires before the room clear is triggered.
   *
   * ```ts
   * function preRoomTriggerClear(playSound: boolean): void {}
   * ```
   */
  PRE_ROOM_TRIGGER_CLEAR = 1068,

  /**
   * Fires before a player triggers the room clear. Return false to cancel the room clear effects.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerTriggerRoomClear(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_TRIGGER_ROOM_CLEAR = 1069,

  /**
   * Fires before a collectible belonging to a player has its max charges loaded. Return an integer
   * to override the item's chargebar.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function playerGetActiveMaxCharge(
   *   collectible: CollectibleType,
   *   player: EntityPlayer,
   *   varData: int
   * ): int | undefined {}
   * ```
   */
  PLAYER_GET_ACTIVE_MAX_CHARGE = 1072,

  /**
   * Fires before a collectible belonging to a player has its minimum usable charges loaded. If the
   * item has the minimum amount of charge, it will show the white outline around the chargebar
   * sprite.
   *
   * Return an integer to override the minimum charges.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function playerGetActiveMinUsableCharge(slot: ActiveSlot): int | undefined {}
   * ```
   */
  PLAYER_GET_ACTIVE_MIN_USABLE_CHARGE = 1073,

  /**
   * Fires every frame. Return an integer to override the player's heart limit.
   *
   * You can set the limit to any arbitrary amount but the game can only render up to 4 lines of
   * hearts in the HUD. However, even if they're not visible, the hearts still work properly.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function playerGetHeartLimit(
   *   player: EntityPlayer,
   *   heartLimit: int,
   *   isKeeper: boolean
   * ): int | undefined {}
   * ```
   */
  PLAYER_GET_HEART_LIMIT = 1074,

  /**
   * Returns every an item overlay is rendered.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `RepentogonGiantbookType` provided.
   *
   * ```ts
   * function postItemOverlayUpdate(): void {}
   * ```
   */
  POST_ITEM_OVERLAY_UPDATE = 1075,

  /**
   * Fires before an item overlay is shown. Return `GiantBookType` to override the overlay shown.
   * Alternatively, return true to cancel the item overlay.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `RepentogonGiantbookType` provided.
   *
   * ```ts
   * function preItemOverlayShow(
   *   giantbookType: RepentogonGiantbookType,
   *   delay: int,
   *   player: EntityPlayer
   * ): RepentogonGiantbookType | boolean | undefined {}
   * ```
   */
  PRE_ITEM_OVERLAY_SHOW = 1076,

  /**
   * TODO: Document me!
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerNewRoomTempEffects(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_NEW_ROOM_TEMP_EFFECTS = 1077,

  /**
   * TODO: Document me!
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function postPlayerNewLevel(player: EntityPlayer): void {}
   * ```
   */
  POST_PLAYER_NEW_LEVEL = 1078,

  /**
   * Fires after an active item is rendered on the screen.
   *
   * ```ts
   * function postPlayerHUDRenderActiveItem(
   *   player: EntityPlayer,
   *   slot: ActiveSlot,
   *   offset: Vector,
   *   alpha: number
   * ): void {}
   * ```
   */
  POST_PLAYER_HUD_RENDER_ACTIVE_ITEM = 1079,

  /**
   * Fires before a familiar renders. Return a Vector to modify the rendered sprite's offset.
   * Alternatively, return false to cancel rendering the familiar.
   *
   * Canceling this callback will not stop rendering of entity shadows. This is being investigated,
   * but in the meantime call `Entity.SetShadowSize(0)` on the entity in `ModCallback.POST_UPDATE`.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function preFamiliarRender(
   *   familiar: EntityFamiliar,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_FAMILIAR_RENDER = 1080,

  /**
   * Fires before a npc renders. Return a Vector to modify the rendered sprite's offset.
   * Alternatively, return false to cancel rendering the npc.
   *
   * Canceling this callback will not stop rendering of entity shadows. This is being investigated,
   * but in the meantime call `Entity.SetShadowSize(0)` on the entity in `ModCallback.POST_UPDATE`.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCRender(npc: EntityNPC, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_NPC_RENDER = 1081,

  /**
   * Fires before a player renders. Return a Vector to modify the rendered sprite's offset.
   * Alternatively, return false to cancel rendering the player.
   *
   * Canceling this callback will not stop rendering of entity shadows. This is being investigated,
   * but in the meantime call `Entity.SetShadowSize(0)` on the entity in `ModCallback.POST_UPDATE`.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerRender(player: EntityPlayer, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_PLAYER_RENDER = 1082,

  /**
   * Fires before a pickup renders. Return a Vector to modify the rendered sprite's offset.
   * Alternatively, return false to cancel rendering the pickup.
   *
   * Canceling this callback will not stop rendering of entity shadows. This is being investigated,
   * but in the meantime call `Entity.SetShadowSize(0)` on the entity in `ModCallback.POST_UPDATE`.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupRender(pickup: EntityPickup, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_PICKUP_RENDER = 1083,

  /**
   * Fires before a tear renders. Return a Vector to modify the rendered sprite's offset.
   * Alternatively, return false to cancel rendering the tear.
   *
   * Canceling this callback will not stop rendering of entity shadows. This is being investigated,
   * but in the meantime call `Entity.SetShadowSize(0)` on the entity in `ModCallback.POST_UPDATE`.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function preTearRender(tear: EntityTear, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_TEAR_RENDER = 1084,

  /**
   * Fires before a projectile renders. Return a Vector to modify the rendered sprite's offset.
   * Alternatively, return false to cancel rendering the projectile.
   *
   * Canceling this callback will not stop rendering of entity shadows. This is being investigated,
   * but in the meantime call `Entity.SetShadowSize(0)` on the entity in `ModCallback.POST_UPDATE`.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function preProjectileRender(
   *   projectile: ProjectileVariant,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_PROJECTILE_RENDER = 1085,

  /**
   * Fires before a knife renders. Return a Vector to modify the rendered sprite's offset.
   * Alternatively, return false to cancel rendering the knife.
   *
   * Canceling this callback will not stop rendering of entity shadows. This is being investigated,
   * but in the meantime call `Entity.SetShadowSize(0)` on the entity in `ModCallback.POST_UPDATE`.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   *
   * ```ts
   * function preKnifeRender(knife: EntityKnife, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_KNIFE_RENDER = 1086,

  /**
   * Fires before a effect renders. Return a Vector to modify the rendered sprite's offset.
   * Alternatively, return false to cancel rendering the effect.
   *
   * Canceling this callback will not stop rendering of entity shadows. This is being investigated,
   * but in the meantime call `Entity.SetShadowSize(0)` on the entity in `ModCallback.POST_UPDATE`.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EffectVariant` provided.
   *
   * ```ts
   * function preEffectRender(effect: EntityEffect, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_EFFECT_RENDER = 1087,

  /**
   * Fires before a bomb renders. Return a Vector to modify the rendered sprite's offset.
   * Alternatively, return false to cancel rendering the bomb.
   *
   * Canceling this callback will not stop rendering of entity shadows. This is being investigated,
   * but in the meantime call `Entity.SetShadowSize(0)` on the entity in `ModCallback.POST_UPDATE`.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function preBombRender(bomb: EntityBomb, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_BOMB_RENDER = 1088,

  /**
   * Fires before a slot renders. Return a Vector to modify the rendered sprite's offset.
   * Alternatively, return false to cancel rendering the slot.
   *
   * Canceling this callback will not stop rendering of entity shadows. This is being investigated,
   * but in the meantime call `Entity.SetShadowSize(0)` on the entity in `ModCallback.POST_UPDATE`.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotRender(slot: EntitySlot, offset: Vector): Vector | boolean | undefined {}
   * ```
   */
  PRE_SLOT_RENDER = 1089,

  /**
   * Fires after a slot renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotRender(slot: EntitySlot, offset: Vector): void {}
   * ```
   */
  POST_SLOT_RENDER = 1090,

  /**
   * Fires after the health HUD is rendered.
   *
   * ```ts
   * function postPlayerHUDRenderHearts(
   *   offset: Vector,
   *   heartsSprite: Sprite,
   *   position: Vector
   * ): void {}
   * ```
   */
  POST_PLAYER_HUD_RENDER_HEARTS = 1091,

  /**
   * TODO: Document me fully!
   *
   * ```ts
   * function prePlayerApplyInnateCollectibleNum(
   *   modCount: int,
   *   player: EntityPlayer,
   *   collectible: CollectibleType,
   *   onlyCountTrueItems: boolean
   * ): int | undefined {}
   * ```
   */
  PRE_PLAYER_APPLY_INNATE_COLLECTIBLE_NUM = 1092,

  /**
   * Fires before the jingle track plays. Return `Music` to change the track. Alternatively, return
   * false to prevent the track from playing.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `Music` provided.
   *
   * ```ts
   * function preMusicPlayJingle(id: Music): boolean | Music | undefined {}
   * ```
   */
  PRE_MUSIC_PLAY_JINGLE = 1094,

  /**
   * Fires after a collectible has been removed.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CollectibleType` provided.
   *
   * ```ts
   * function postTriggerCollectibleRemoved(
   *   player: EntityPlayer,
   *   collectible: CollectibleType
   * ): void {}
   * ```
   */
  POST_TRIGGER_COLLECTIBLE_REMOVED = 1095,

  /**
   * Fires after a trinket has been added to a player.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TrinketType` provided.
   *
   * ```ts
   * function postTriggerTrinketAdded(
   *   player: EntityPlayer,
   *   trinketType: TrinketType,
   *   firstTimePickingUp: boolean
   * ): void {}
   * ```
   */
  POST_TRIGGER_TRINKET_ADDED = 1096,

  /**
   * Fires after a trinket has been removed from a player.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TrinketType` provided.
   *
   * ```ts
   * function postTriggerTrinketRemoved(
   *   player: EntityPlayer,
   *   trinketType: TrinketType,
   * ): void {}
   * ```
   */
  POST_TRIGGER_TRINKET_REMOVED = 1097,

  /**
   * TODO: Document me!
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `WeaponType` provided.
   *
   * ```ts
   * function postTriggerWeaponFired(
   *   fireDirection: Vector,
   *   fireAmount: int,
   *   owner: Entity
   * ): void {}
   * ```
   */
  POST_TRIGGER_WEAPON_FIRED = 1098,

  /**
   * Fires after the level's layout has been generated. You can access the LevelGenerator class from
   * here.
   *
   * ```ts
   * function postLevelLayoutGenerated(levelGenerator: LevelGenerator): void {}
   * ```
   */
  POST_LEVEL_LAYOUT_GENERATED = 1099,

  /**
   * Behaves the same as `ModCallback.POST_USE_PILL` with the addition of PillColor being passed as
   * an argument.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PillEffect` provided.
   *
   * ```ts
   * function postUsePill(
   *   effect: PillEffect,
   *   player: EntityPlayer,
   *   flags: BitFlags<UseFlag>,
   *   color: PillColor
   * ): void {}
   * ```
   */
  POST_USE_PILL = 1001,

  /**
   * Fires before a GridEntity is spawned outside of room initialization. Return false to cancel
   * spawning the grid. Alternatively, return an array of parameters or a GridEntityDesc to override
   * the GridEntity spawned.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntitySpawn(
   *   gridEntityType: GridEntityType,
   *   variant: int,
   *   varData: int,
   *   gridIndex: int,
   *   spawnSeed: Seed,
   *   desc: GridEntityDesc
   * ): [GridEntityType, int, int, Seed] | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_SPAWN = 1100,

  /**
   * Fires after a GridEntity is spawned outside of room initialization.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntitySpawn(
   *   gridEntityType: GridEntityType,
   *   variant: int,
   *   varData: int,
   *   gridIndex: int,
   *   spawnSeed: Seed,
   *   desc: GridEntityDesc
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_SPAWN = 1101,

  /**
   * Fires every frame the nightmare scene is rendering.
   *
   * ```ts
   * function postNightmareSceneRender(): void {}
   * ```
   */
  POST_NIGHTMARE_SCENE_RENDER = 1102,

  /**
   * Fires when the nightmare scene is shown.
   *
   * ```ts
   * function postNightmareSceneShow(): void {}
   * ```
   */
  POST_NIGHTMARE_SCENE_SHOW = 1103,

  /**
   * Fires when the game selects which stage to load, usually when the player enters a trapdoor.
   * Return an array containing the LevelStage and StageType respectively to override which level
   * the player ends up on.
   *
   * ```ts
   * function preLevelSelect(
   *   level: LevelStage,
   *   stageType: StageType
   * ): [LevelStage?, StageType?] | undefined {}
   * ```
   */
  PRE_LEVEL_SELECT = 1104,

  /**
   * TODO: Document me!
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `WeaponType` provided.
   *
   * ```ts
   * function postWeaponFire(
   *   weapon: Weapon,
   *   fireDirection: Vector,
   *   isShooting: boolean,
   *   isInterpolated: boolean
   * ): void {}
   * ```
   */
  POST_WEAPON_FIRE = 1105,

  /**
   * Fires at the start of planetarium calculation. Before calculating, the game first checks if the
   * current floor is valid to spawn a planetarium. If the current floor is invalid, all further
   * calculation (and thus, all further callbacks) will be canceled.
   *
   * By default, planetariums cannot spawn past Depths 2, or Womb 2 with Telescope Lens.
   *
   * This callback can be used, for example, to add custom planetarium spawn rules on custom floors,
   * or to add new items like Telescope Lens which can augment the rules.
   *
   * Return false to bypass the stage penalty.
   *
   * ```ts
   * function prePlanetariumStagePenalty(): boolean | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_STAGE_PENALTY = 1110,

  /**
   * After `ModCallback.PRE_PLANETARIUM_APPLY_STAGE_PENALTY` is fired and the stage is valid for a
   * planetarium to generate, the callback checks if a planetarium has been entered before. If so,
   * the chance is locked at 1%, or 10% with Telescope Lens.
   *
   * Return false to bypass the planetarium enter penalty.
   *
   * This callback can be used, for example, to add custom planetarium spawn rules on custom floors,
   * or to add new items like Telescope Lens which can augment the rules.
   *
   * Return false to bypass the stage penalty.
   *
   * ```ts
   * function prePlanetariumApplyPlanetariumPenalty(): boolean | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_PLANETARIUM_PENALTY = 1111,

  /**
   * After ensuring planetariums haven't been entered before, the game then checks how many treasure
   * rooms entered is greater than or equal to the current stage number, the chance will be locked
   * at 1%, or 10% with Telescope Lens.
   *
   * If you're looking to add an item like Telescope Lens which modifies the base chance, look at
   * `ModCallback.PRE_PLANETARIUM_APPLY_TELESCOPE_LENS` instead.
   *
   * Return false to bypass the planetarium treasure room penalty entirely, meaning the game will
   * act as if no treasure rooms have been entered. Alternatively, return an integer to modify how
   * many treasure rooms the game will believe has been entered.
   *
   * ```ts
   * function prePlanetariumApplyTreasurePenalty(
   *   treasureRoomsEntered: int
   * ): boolean | int | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_TREASURE_PENALTY = 1112,

  /**
   * After checking the amount of treasure rooms entered, the game applies flat item chances. This
   * is where Crystal Ball, Magic 8 Ball, and Sausage's chances get added, as well as Telescope
   * Lens' additional 15% chance.
   *
   * If you're looking to add an item like Telescope Lens which modifies the base chance, have a
   * look at `ModCallback.PRE_PLANETARIUM_APPLY_TELESCOPE_LENS` instead.
   *
   * Return a number to modify the chance in this step of the calculation.
   *
   * ```ts
   * function prePlanetariumApplyItems(chance: number): number | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_ITEMS = 1113,

  /**
   * After all previous planetarium chance calculations callbacks fire, Telescope Lens adds an
   * additional 9% chance to the base chance, bringing the base generation chance at 10%.
   *
   * Return a number to modify the chance in this step of the calculation.
   *
   * ```ts
   * function prePlanetariumApplyTelescopeLens(chance: number): number | undefined {}
   * ```
   */
  PRE_PLANETARIUM_APPLY_TELESCOPE_LENS = 1114,

  /**
   * This will override all previous calculation values, ultimately dictating the planetarium
   * chance. Return a number to modify the chance.
   *
   * ```ts
   * function postPlanetariumCalculate(chance: number): number | undefined {}
   * ```
   */
  POST_PLANETARIUM_CALCULATE = 1115,

  /**
   * Fires before a spritesheet in a sprite is replaced.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the anm2 file name provided.
   *
   * ```ts
   * function preReplaceSpritesheet(layerId: int, fileName: string): string | undefined {}
   * ```
   */
  PRE_REPLACE_SPRITESHEET = 1116,

  /**
   * Fires after a spritesheet in a sprite is replaced.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the anm2 file name provided.
   *
   * ```ts
   * function postReplaceSpritesheet(layerId: int, fileName: string): void {}
   * ```
   */
  POST_REPLACE_SPRITESHEET = 1117,

  /**
   * Fires before the player's hearts render in the HUD.
   *
   * Return true to prevent the hearts from rendering. Alternatively, false to force the hearts to
   * render.
   *
   * ```ts
   * function prePlayerHudRenderHearts(
   *   offset: Vector,
   *   heartsSprite: Sprite,
   *   position: Vector,
   *   unknown: number,
   * ): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_HUD_RENDER_HEARTS = 1118,

  /**
   * Fires every time the console input changes whenever a function with the
   * `AutocompleteType.CUSTOM` enum is being entered into the console.
   *
   * You can return an array which can hold up to two strings, with the first string being the
   * parameter for the command's autocomplete and the second being a description. The description
   * can be used in autocomplete as well, however pressing the tab key will properly autocomplete
   * the ID, not the description (Think the `giveitem` command as an example; `c1` would be The Sad
   * Onion's "parameter" and "The Sad Onion" would be the description, and both work. Pressing the
   * tab key would turn the command into `give c1`).
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the string provided.
   *
   * ```ts
   * function consoleAutocomplete(command: string, params: string): [string, string?] {}
   * ```
   */
  CONSOLE_AUTOCOMPLETE = 1120,

  /**
   * Fires after an EntitySlot initializes.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotInit(slot: EntitySlot): void {}
   * ```
   */
  POST_SLOT_INIT = 1121,

  /**
   * Fires after an EntitySlot updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotUpdate(slot: EntitySlot): void {}
   * ```
   */
  POST_SLOT_UPDATE = 1122,

  /**
   * Fires before pickups are spawned from blowing up the slot. Return false to prevent the
   * collectibles from spawning.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotCreateExplosionDrops(slot: EntitySlot): boolean | undefined {}
   * ```
   */
  PRE_SLOT_CREATE_EXPLOSION_DROPS = 1123,

  /**
   * Fires after pickups are spawned from blowing up the slot.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotCreateExplosionDrops(slot: EntitySlot): void {}
   * ```
   */
  POST_SLOT_CREATE_EXPLOSION_DROPS = 1124,

  /**
   * Fires before the slot's prize collectible is set. This is used by Shell Game and Hell Game.
   *
   * Return a CollectibleType to override what the slot will pay out with.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotSetPrizeCollectible(slot: EntitySlot): Collectible | undefined {}
   * ```
   */
  PRE_SLOT_SET_PRIZE_COLLECTIBLE = 1125,

  /**
   * Fires after the slot's prize collectible is set. This is used by Shell Game and Hell Game.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotSetPrizeCollectible(slot: EntitySlot): void {}
   * ```
   */
  POST_SLOT_SET_PRIZE_COLLECTIBLE = 1126,

  /**
   * TODO: Document me!
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function playerInitPreLevelInitStates(player: EntityPlayer): void {}
   * ```
   */
  PLAYER_INIT_PRE_LEVEL_INIT_STATS = 1127,

  /**
   * Fires when the game starts to tally up vanilla items for devil deal calculation. This is called
   * before the stage penalty.
   *
   * Most items that affect devil deal chances perform their changes here.
   *
   * Return a number to modify the chance in this step of calculation.
   *
   * ```ts
   * function preDevilApplyItems(): number | undefined {}
   * ```
   */
  PRE_DEVIL_APPLY_ITEMS = 1130,

  /**
   * Fires after `RepentogonCallback.PRE_DEVIL_APPLY_ITEMS`, where the game calculates the stage
   * penalty.
   *
   * If a deal is spawned anywhere on the previous two floors, the game decays the resulting chance
   * by 50% or 25% depending on the amount of deals taken.
   *
   * Note that even though the game displays a value of ~66% or ~33% for the 50% and 25% chances
   * respectively, this is because devil chance is not clamped to a value between 0 and 1, and
   * "100%" without items generally means a value of ~133%.
   *
   * Return false to bypass the stage penalty.
   *
   * Return a number to modify the chance in this step of calculation.
   *
   * ```ts
   * function preDevilApplyStagePenalty(): boolean | undefined {}
   * ```
   */
  PRE_DEVIL_APPLY_STAGE_PENALTY = 1131,

  /**
   * Fires after `RepentogonCallback.PRE_DEVIL_APPLY_STAGE_PENALTY`, where the game calculates items
   * which bypass the stage penalty like Goat Head and Eucharist.
   *
   * Return a number to modify the chance in this step of the calculation.
   *
   * ```ts
   * function preDevilApplySpecialItems(): int | undefined {}
   * ```
   */
  PRE_DEVIL_APPLY_SPECIAL_ITEMS = 1132,

  /**
   * Fires after `RepentogonCallback.PRE_DEVIL_APPLY_SPECIAL_ITEMS`. This dictates the final devil
   * deal chance.
   *
   * Return a number to modify the chance.
   *
   * ```ts
   * function postDevilCalculate(): int | undefined {}
   * ```
   */
  POST_DEVIL_CALCULATE = 1133,

  /**
   * Fires after an item overlay is shown.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `RepentogonGiantbookType` provided.
   *
   * ```ts
   * function postItemOverlayShow(giantBook: RepentogonGiantbookType, delay: int, player: EntityPlayer): void {}
   * ```
   */
  POST_ITEM_OVERLAY_SHOW = 1134,

  /**
   * Fires before a room is placed onto the level. Return a room config to replace the room that
   * will be place. It must have the same shape and the new available door slots must be compatible
   * with the original room doors.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `RepentogonGiantbookType` provided.
   *
   * ```ts
   * function preLevelPlaceRoom(
   *   slot: LevelGeneratorRoom,
   *   roomConfig: RoomConfig,
   *   seed: Seed
   * ): void {}
   * ```
   */
  PRE_LEVEL_PLACE_ROOM = 1137,

  /**
   * Fires every frame. Return a number to modify the lighting's alpha. This is generally between 0
   * and 1 but you can technically go higher than this.
   *
   * ```ts
   * function preGetLightingAlpha(originalAlpha: number): number | undefined {}
   * ```
   */
  PRE_GET_LIGHTING_ALPHA = 1150,

  /**
   * TODO: Document me fully! Return a Vector to override the offset. Alternatively, return false to
   * stop the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preRenderGridLighting(
   *   gridEntity: GridEntity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_RENDER_GRID_LIGHTING = 1151,

  /**
   * TODO: Document me fully! Return a Vector to override the offset. Alternatively, return false to
   * stop the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preRenderEntityLighting(
   *   entity: Entity,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_RENDER_ENTITY_LIGHTING = 1152,

  /**
   * Fires before a npc is split, such as when the Meat Cleaver item is used. Return true to prevent
   * the split. Alternatively, false to allow the split even if the npc is normally blacklisted by
   * the game.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCSplit(npc: EntityNPC, isBlacklisted: boolean): boolean | undefined {}
   * ```
   */
  PRE_NPC_SPLIT = 1191,

  /**
   * Fires during room initialization when grid entities from the layout are being spawned.
   *
   * This does not fire for random decorations spawned by the game. Use
   * `ModCallback.PRE_GRID_ENTITY_SPAWN` for these.
   *
   * Return false to cancel spawning the grid entity. Alternatively, return an array containing the
   * GridEntityType, variant, var data, and spawn seed to override it.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preRoomGridEntitySpawn(
   *   gridEntityType: GridEntityType,
   *   variant: int,
   *   varData: int,
   *   gridIndex: int,
   *   spawnSeed: Seed
   * ): boolean | [GridEntityType, int, int, int, Seed] | undefined
   * ```
   */
  PRE_ROOM_GRID_ENTITY_SPAWN = 1192,

  /**
   * Fires before a new room is loaded.
   *
   * ```ts
   * function preNewRoom(room: Room, descriptor: RoomDescriptor): void {}
   * ```
   */
  PRE_NEW_ROOM = 1200,

  /**
   * Fires before the game forcefully ends upon defeating Mega Satan. Return true to prevent the
   * ending, guaranteeing a portal to the Void while retaining the completion marks.
   *
   * ```ts
   * function preMegaSatanEnding(): boolean | undefined {}
   * ```
   */
  PRE_MEGA_SATAN_ENDING = 1201,

  /**
   * Fires after all Lua scripts have been loaded.
   *
   * ```ts
   * function postModsLoaded(): void {}
   * ```
   */
  POST_MODS_LOADED = 1210,

  /**
   * Fires when a NPC is about to morph. Return an array of parameters to override what the NPC
   * morphs into. Return false to cancel the morph.
   *
   * ```ts
   * function preNPCMorph(
   *   entityType: EntityType,
   *   variant: int,
   *   subType: int,
   *   championColor: ChampionColor
   * ): [EntityType, int, int, ChampionColor] | boolean | undefined {}
   * ```
   */
  PRE_NPC_MORPH = 1212,

  /**
   * Fires when a pickup is about to morph. Return an array of parameters to override what the
   * pickup morphs to. Otherwise, return false to cancel the morph.
   *
   * ```ts
   * function prePickupMorph(
   *   pickup: EntityPickup,
   *   entityType: int,
   *   variant: int,
   *   subType: int,
   *   keepPrice: boolean,
   *   keepSeed: boolean,
   *   ignoreModifiers: boolean
   * ):
   *      [EntityType, int, int, boolean, boolean, boolean]
   *      | [EntityType, int, int]
   *      | boolean
   *      | undefined
   * {}
   * ```
   */
  PRE_PICKUP_MORPH = 1213,

  /**
   * Fires after a NPC morphs.
   *
   * ```ts
   * function postNPCMorph(
   *   previousType: EntityType,
   *   previousVariant: int,
   *   previousSubType: int
   * ): void {}
   * ```
   */
  POST_NPC_MORPH = 1214,

  /**
   * Fires after a pickup has been morphed.
   *
   * ```ts
   * function postPickupMorph(
   *   pickup: EntityPickup,
   *   previousType: EntityType,
   *   previousVariant: int,
   *   subType: int,
   *   keptPrice: boolean,
   *   keptSeed: int,
   *   ignoredModifiers: boolean
   * ): void {}
   * ```
   */
  POST_PICKUP_MORPH = 1215,

  /**
   * Fires before the completion marks paper is rendered. Return false to prevent the sprite from
   * rendering.
   *
   * ```ts
   * function preCompletionMarksRender(
   *   completionMarksSprite: Sprite,
   *   renderPos: Vector,
   *   renderScale: Vector,
   *   playerType: PlayerType
   * ): boolean | undefined {}
   * ```
   */
  PRE_COMPLETION_MARKS_RENDER = 1216,

  /**
   * Fires after the completion marks paper is rendered.
   *
   * ```ts
   * function preCompletionMarksRender(
   *   completionMarksSprite: Sprite,
   *   renderPos: Vector,
   *   renderScale: Vector,
   *   playerType: PlayerType
   * ): void {}
   * ```
   */
  POST_COMPLETION_MARKS_RENDER = 1217,

  /**
   * Fires before the pause screen renders. Return false to prevent the pause screen from rendering
   * and darkening the screen.
   *
   * ```ts
   * function prePauseScreenRender(pauseBody: Sprite, pauseStats: Sprite): boolean | undefined {}
   * ```
   */
  PRE_PAUSE_SCREEN_RENDER = 1218,

  /**
   * Fires after the pause screen renders.
   *
   * ```ts
   * function prePauseScreenRender(pauseBody: Sprite, pauseStats: Sprite): void {}
   * ```
   */
  POST_PAUSE_SCREEN_RENDER = 1219,

  /**
   * Fires before a player uses a bomb. Return false to stop the player from using a bomb.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerUseBomb(player: EntityPlayer): boolean | undefined {}
   * ```
   */
  PRE_PLAYER_USE_BOMB = 1220,

  /**
   * Fires after a player uses a bomb.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function postPlayerUseBomb(player: EntityPlayer, bomb: EntityBomb): void {}
   * ```
   */
  POST_PLAYER_USE_BOMB = 1221,

  /**
   * Fires before a NPC picks its target, such as when `EntityNPC.GetPlayerTarget()` is called.
   * Return an Entity to override what the NPC targets instead.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCPickTarget(
   *   npc: EntityNPC,
   *   currentTarget: Entity | undefined
   * ): Entity | undefined {}
   * ```
   */
  PRE_NPC_PICK_TARGET = 1222,

  /**
   * Acts like `ModCallback.PRE_PLAYER_COLLISION` except it supports returning a dictionary.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function prePlayerCollision(
   *   player: EntityPlayer,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide: boolean, SkipCollisionEffects: boolean } | undefined {}
   * ```
   */
  PRE_PLAYER_COLLISION = 1230,

  /**
   * Fires after the on-collision code of the entity was ran, assuming it wasn't skipped in its
   * pre-collision callback.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerVariant` provided.
   *
   * ```ts
   * function postPlayerCollision(player: EntityPlayer, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_PLAYER_COLLISION = 1231,

  /**
   * Acts like `ModCallback.PRE_TEAR_COLLISION` except it supports returning a dictionary.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function preTearCollision(
   *   tear: EntityTear,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide: boolean, SkipCollisionEffects: boolean } | undefined {}
   * ```
   */
  PRE_TEAR_COLLISION = 1232,

  /**
   * Fires after the on-collision code of the entity was ran, assuming it wasn't skipped in its
   * pre-collision callback.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TearVariant` provided.
   *
   * ```ts
   * function postTearCollision(tear: EntityTear, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_TEAR_COLLISION = 1233,

  /**
   * Acts like `ModCallback.PRE_FAMILIAR_COLLISION` except it supports returning a dictionary.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function preFamiliarCollision(
   *   familiar: EntityFamiliar,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide: boolean, SkipCollisionEffects: boolean } | undefined {}
   * ```
   */
  PRE_FAMILIAR_COLLISION = 1234,

  /**
   * Fires after the on-collision code of the entity was ran, assuming it wasn't skipped in its
   * pre-collision callback.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarCollision(familiar: EntityFamiliar, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_FAMILIAR_COLLISION = 1235,

  /**
   * Acts like `ModCallback.PRE_BOMB_COLLISION` except it supports returning a dictionary.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function preBombCollision(
   *   bomb: EntityBomb,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide: boolean, SkipCollisionEffects: boolean } | undefined {}
   * ```
   */
  PRE_BOMB_COLLISION = 1236,

  /**
   * Fires after the on-collision code of the entity was ran, assuming it wasn't skipped in its
   * pre-collision callback.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `BombVariant` provided.
   *
   * ```ts
   * function postBombCollision(bomb: EntityBomb, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_BOMB_COLLISION = 1237,

  /**
   * Acts like `ModCallback.PRE_PICKUP_COLLISION` except it supports returning a dictionary.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupCollision(
   *   pickup: EntityPickup,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide: boolean, SkipCollisionEffects: boolean } | undefined {}
   * ```
   */
  PRE_PICKUP_COLLISION = 1238,

  /**
   * Fires after the on-collision code of the entity was ran, assuming it wasn't skipped in its
   * pre-collision callback.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function postPickupCollision(pickup: EntityPickup, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_PICKUP_COLLISION = 1239,

  /**
   * Fires when the player collides with a slot.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function preSlotCollision(
   *   slot: EntitySlot,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide: boolean, SkipCollisionEffects: boolean } | undefined {}
   * ```
   */
  PRE_SLOT_COLLISION = 1240,

  /**
   * Fires after the on-collision code of the entity was ran, assuming it wasn't skipped in its
   * pre-collision callback.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `SlotVariant` provided.
   *
   * ```ts
   * function postSlotCollision(slot: EntitySlot, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_SLOT_COLLISION = 1241,

  /**
   * Acts like `ModCallback.PRE_KNIFE_COLLISION` except it supports returning a dictionary.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   *
   * ```ts
   * function preKnifeCollision(
   *   knife: EntityKnife,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide: boolean, SkipCollisionEffects: boolean } | undefined {}
   * ```
   */
  PRE_KNIFE_COLLISION = 1242,

  /**
   * Fires after the on-collision code of the entity was ran, assuming it wasn't skipped in its
   * pre-collision callback.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `KnifeVariant` provided.
   *
   * ```ts
   * function postKnifeCollision(knife: EntityKnife, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_KNIFE_COLLISION = 1243,

  /**
   * Acts like `ModCallback.PRE_PROJECTILE_COLLISION` except it supports returning a dictionary.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function preProjectileCollision(
   *   projectile: EntityProjectile,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide: boolean, SkipCollisionEffects: boolean } | undefined {}
   * ```
   */
  PRE_PROJECTILE_COLLISION = 1244,

  /**
   * Fires after the on-collision code of the entity was ran, assuming it wasn't skipped in its
   * pre-collision callback.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `ProjectileVariant` provided.
   *
   * ```ts
   * function postProjectileCollision(
   *   projectile: EntityProjectile,
   *   collider: Entity,
   *   low: boolean
   * ): void {}
   * ```
   */
  POST_PROJECTILE_COLLISION = 1245,

  /**
   * Acts like `ModCallback.PRE_NPC_COLLISION` except it supports returning a dictionary.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function preNPCCollision(
   *   npc: EntityNPC,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide: boolean, SkipCollisionEffects: boolean } | undefined {}
   * ```
   */
  PRE_NPC_COLLISION = 1246,

  /**
   * Fires after the on-collision code of the entity was ran, assuming it wasn't skipped in its
   * pre-collision callback.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `EntityType` provided.
   *
   * ```ts
   * function postNPCCollision(npc: EntityNPC, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_NPC_COLLISION = 1247,

  /**
   * Acts like `ModCallback.PRE_LASER_COLLISION` except it supports returning a dictionary.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   *
   * ```ts
   * function preLaserCollision(
   *   laser: EntityLaser,
   *   collider: Entity,
   *   low: boolean
   * ): boolean | { Collide: boolean, SkipCollisionEffects: boolean } | undefined {}
   * ```
   */
  PRE_LASER_COLLISION = 1248,

  /**
   * Fires after the on-collision code of the entity was ran, assuming it wasn't skipped in its
   * pre-collision callback.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `LaserVariant` provided.
   *
   * ```ts
   * function postLaserCollision(laser: EntityLaser, collider: Entity, low: boolean): void {}
   * ```
   */
  POST_LASER_COLLISION = 1249,

  /**
   * Fires before the player's amount of coins changes upon picking up a coin.
   *
   * Return an integer to modify the amount of coins given.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `CoinSubType` provided.
   *
   * ```ts
   * function getPickupCoinValue(pickup: EntityPickup): int | undefined {}
   * ```
   */
  GET_PICKUP_COIN_VALUE = 1250,

  /**
   * Fires every frame. Return a `MultiShotParams` object to change the properties of the player's
   * shooting behavior in regards to the MultiShotParams object.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function prePlayerGetMultiShotParams(player: EntityPlayer): MultiShotParams | undefined {}
   * ```
   */
  PRE_PLAYER_GET_MULTI_SHOT_PARAMS = 1251,

  /**
   * Fires after a familiar fires a projectile.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `FamiliarVariant` provided.
   *
   * ```ts
   * function postFamiliarFireProjectile(tear: EntityTear): void {}
   * ```
   */
  POST_FAMILIAR_FIRE_PROJECTILE = 1252,

  /**
   * Fires after a player fires a Dr. Fetus bomb.
   *
   * ```ts
   * function postFireBomb(bomb: EntityBomb): void {}
   * ```
   */
  POST_FIRE_BOMB = 1253,

  /**
   * Fires after a player fires The Forgotten's bone club.
   *
   * This is only called when the club is initially spawned, not when swung or charged and shot.
   *
   * ```ts
   * function postFireBoneClub(club: EntityKnife): void {}
   * ```
   */
  POST_FIRE_BONE_CLUB = 1254,

  /**
   * Fires after a player fires a brimstone laser. This is also fired for delayed brimstone.
   *
   * ```ts
   * function postFireBrimstone(brimstone: EntityLaser): void {}
   * ```
   */
  POST_FIRE_BRIMSTONE = 1255,

  /**
   * Fires after a player fires a brimstone ball.
   *
   * ```ts
   * function postFireBrimstoneBall(ball: EntityEffect): void {}
   * ```
   */
  POST_FIRE_BRIMSTONE_BALL = 1256,

  /**
   * Fires after a player fires a knife from Mom's Knife.
   *
   * This is only fired when the knife is initially spawned, not when charged and shot.
   *
   * ```ts
   * function postFireKnife(knife: EntityKnife): void {}
   * ```
   */
  POST_FIRE_KNIFE = 1257,

  /**
   * Fires after a player swings the Spirit Sword.
   *
   * ```ts
   * function postFireSword(sword: EntityKnife): void {}
   * ```
   */
  POST_FIRE_SWORD = 1258,

  /**
   * Fires after a player fires a Tech laser.
   *
   * ```ts
   * function postFireTechLaser(laser: EntityLaser): void {}
   * ```
   */
  POST_FIRE_TECH_LASER = 1259,

  /**
   * Fires after a player fires a Tech X laser.
   *
   * ```ts
   * function postFireTechXLaser(laser: EntityLaser): void {}
   * ```
   */
  POST_FIRE_TECH_X_LASER = 1260,

  /**
   * Fires after a familiar fires a brimstone laser.
   *
   * ```ts
   * function postFamiliarFireBrimstone(brimstone: EntityLaser): void {}
   * ```
   */
  POST_FAMILIAR_FIRE_BRIMSTONE = 1261,

  /**
   * Fires after a familiar fires a tech laser.
   *
   * ```ts
   * function postFamiliarFireTechLaser(laser: EntityLaser): void {}
   * ```
   */
  POST_FAMILIAR_FIRE_TECH_LASER = 1262,

  /**
   * TODO: Document me fully! Return true to allow the entity to respawn.
   *
   * ```ts
   * function getIsPersistentRoomEntity(
   *   entityType: EntityType,
   *   variant: int
   * ): boolean | undefined {}
   * ```
   */
  GET_IS_PERSISTENT_ROOM_ENTITY = 1263,

  /**
   * Fires before the trinket is rendered. Return an array containing the position and scale
   * respectively to override how the trinket hud is rendered. Alternatively, return true to prevent
   * it from rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `TrinketSlot` provided.
   *
   * ```ts
   * function prePlayerHudTrinketRender(
   *   slot: TrinketSlot,
   *   position: Vector,
   *   scale: number,
   *   player: EntityPlayer
   * ): [Vector, number] | boolean | undefined {}
   * ```
   */
  PRE_PLAYER_HUD_TRINKET_RENDER = 1264,

  /**
   * Fires when a pickup is consumed with the Void collectible or Black Rune.
   *
   * Return false to prevent the pickup from being consumed. Return true to force the pickup to be
   * consumed.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupVoided(pickup: EntityPickup, isBlackRune: boolean): boolean | undefined {}
   * ```
   */
  PRE_PICKUP_VOIDED = 1265,

  /**
   * Fires when a pickup is consumed with the Abyss collectible.
   *
   * Return false to prevent the pickup from being consumed. Return true to force the pickup to be
   * consumed.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupVoided(pickup: EntityPickup): boolean | undefined {}
   * ```
   */
  PRE_PICKUP_VOIDED_ABYSS = 1266,

  /**
   * Fires when a pickup is consumed with the Compost collectible.
   *
   * Return false to prevent the pickup from being consumed. Return true to force the pickup to be
   * consumed.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PickupVariant` provided.
   *
   * ```ts
   * function prePickupComposted(pickup: EntityPickup): boolean | undefined {}
   * ```
   */
  MC_PRE_PICKUP_COMPOSTED = 1267,

  /**
   * Fires before a custom character is selected on the menu. This callback does not fire for
   * vanilla characters.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `PlayerType` provided.
   *
   * ```ts
   * function preMenuCustomCharacterSelected(
   *   character: PlayerType,
   *   renderPos: Vector
   *   defaultSprite: Sprite
   * ): void {}
   * ```
   */
  MENU_CUSTOM_CHARACTER_SELECTED = 1333,

  /**
   * Fires before the decoration grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDecorationUpdate(
   *   decoration: GridEntityDecoration
   * ): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_DECORATION_UPDATE = 1400,

  /**
   * Fires after the decoration grid entity updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDecorationUpdate(decoration: GridEntityDecoration): void {}
   * ```
   */
  POST_GRID_ENTITY_DECORATION_UPDATE = 1401,

  /**
   * Fires before the door grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDoorUpdate(door: GridEntityDoor): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_DOOR_UPDATE = 1402,

  /**
   * Fires after the door grid entity updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDoorUpdate(door: GridEntityDoor): void {}
   * ```
   */
  POST_GRID_ENTITY_DOOR_UPDATE = 1403,

  /**
   * Fires before the fire grid entity updates. Return false to cancel the update.
   *
   * Fire grid entities are largely unused, and in most cases you'll want to target the EntityNPC
   * fireplaces.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityFireUpdate(fire: GridEntityFire): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_FIRE_UPDATE = 1404,

  /**
   * Fires after the fire grid entity updates.
   *
   * Fire grid entities are largely unused, and in most cases you'll want to target the EntityNPC
   * fireplaces.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityFireUpdate(fire: GridEntityFire): void {}
   * ```
   */
  POST_GRID_ENTITY_FIRE_UPDATE = 1405,

  /**
   * Fires before the gravity grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityGravityUpdate(gravity: GridEntityGravity): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_GRAVITY_UPDATE = 1406,

  /**
   * Fires after the gravity grid entity updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityGravityUpdate(gravity: GridEntityGravity): void {}
   * ```
   */
  POST_GRID_ENTITY_GRAVITY_UPDATE = 1407,

  /**
   * Fires before the lock grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityLockUpdate(lock: GridEntityLock): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_LOCK_UPDATE = 1408,

  /**
   * Fires after the lock grid entity updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityLockUpdate(lock: GridEntityLock): void {}
   * ```
   */
  POST_GRID_ENTITY_LOCK_UPDATE = 1409,

  /**
   * Fires before the pit grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPitUpdate(pit: GridEntityPit): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_PIT_UPDATE = 1410,

  /**
   * Fires after the pit grid entity updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPitUpdate(pit: GridEntityPit): void {}
   * ```
   */
  POST_GRID_ENTITY_PIT_UPDATE = 1411,

  /**
   * Fires before the poop grid entity updates. Return false to cancel the update.
   *
   * This callback does not include the EntityNPC poops used by Tainted Blue Baby.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPoopUpdate(poop: GridEntityPoop): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_POOP_UPDATE = 1412,

  /**
   * Fires after the poop grid entity updates.
   *
   * This callback does not include the EntityNPC poops used by Tainted Blue Baby.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPoopUpdate(poop: GridEntityPoop): void {}
   * ```
   */
  POST_GRID_ENTITY_POOP_UPDATE = 1413,

  /**
   * Fires before the pressure plate grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPressurePlateUpdate(
   *   pressurePlate: GridEntityPressurePlate
   * ): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_PRESSURE_PLATE_UPDATE = 1414,

  /**
   * Fires after the pressure plate grid entity updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPressurePlateUpdate(pressurePlate: GridEntityPressurePlate): void {}
   * ```
   */
  POST_GRID_ENTITY_PRESSURE_PLATE_UPDATE = 1415,

  /**
   * Fires before the rock grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityRockUpdate(rock: GridEntityRock): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_ROCK_UPDATE = 1416,

  /**
   * Fires after the rock grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityRockUpdate(rock: GridEntityRock): void {}
   * ```
   */
  POST_GRID_ENTITY_ROCK_UPDATE = 1417,

  /**
   * Fires before the spikes grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntitySpikesUpdate(spikes: GridEntitySpikes): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_SPIKES_UPDATE = 1418,

  /**
   * Fires after the spikes grid entity updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntitySpikesUpdate(spikes: GridEntitySpikes): void {}
   * ```
   */
  POST_GRID_ENTITY_SPIKES_UPDATE = 1419,

  /**
   * Fires before the staircase grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityStaircaseUpdate(stairCase: GridEntityStaircase): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_STAIRCASE_UPDATE = 1420,

  /**
   * Fires after the staircase grid entity updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityStaircaseUpdate(stairCase: GridEntityStaircase): void {}
   * ```
   */
  POST_GRID_ENTITY_STAIRCASE_UPDATE = 1421,

  /**
   * Fires before the statue grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityStatueUpdate(statue: GridEntityStatue): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_STATUE_UPDATE = 1422,

  /**
   * Fires after the statue grid entity updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityStatueUpdate(statue: GridEntityStatue): void {}
   * ```
   */
  POST_GRID_ENTITY_STATUE_UPDATE = 1423,

  /**
   * Fires before the teleporter grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTeleporterUpdate(
   *   teleporter: GridEntityTeleporter
   * ): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TELEPORTER_UPDATE = 1424,

  /**
   * Fires after the teleporter grid entity updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTeleporterUpdate(
   *   teleporter: GridEntityTeleporter
   * ): void {}
   * ```
   */
  POST_GRID_ENTITY_TELEPORTER_UPDATE = 1425,

  /**
   * Fires before the trapdoor grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTrapdoorUpdate(trapdoor: GridEntityTrapdoor): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TRAPDOOR_UPDATE = 1426,

  /**
   * Fires after the trapdoor grid entity updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTrapdoorUpdate(trapdoor: GridEntityTrapdoor): void {}
   * ```
   */
  POST_GRID_ENTITY_TRAPDOOR_UPDATE = 1427,

  /**
   * Fires before the web grid entity updates. Return false to cancel the update.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityWebUpdate(web: GridEntityWeb): boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_WEB_UPDATE = 1428,

  /**
   * Fires after the web grid entity updates.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityWebUpdate(web: GridEntityWeb): void {}
   * ```
   */
  POST_GRID_ENTITY_WEB_UPDATE = 1429,

  /**
   * Fires before the TNT grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTNTRender(
   *   grid: GridEntityTNT,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TNT_UPDATE = 1430,

  /**
   * Fires after the TNT grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTNTRender(grid: GridEntityTNT): void {}
   * ```
   */
  POST_GRID_ENTITY_TNT_UPDATE = 1431,

  /**
   * Fires before the spikes grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntitySpikesRender(
   *   grid: GridEntitySpikes,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_SPIKES_RENDER = 1432,

  /**
   * Fires after the spikes grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntitySpikesRender(grid: GridEntitySpikes): void {}
   * ```
   */
  POST_GRID_ENTITY_SPIKES_RENDER = 1433,

  /**
   * Fires before the web grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityWebRender(
   *   grid: GridEntityWeb,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_WEB_RENDER = 1434,

  /**
   * Fires after the web grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityWebRender(grid: GridEntityWeb): void {}
   * ```
   */
  POST_GRID_ENTITY_WEB_RENDER = 1435,

  /**
   * Fires after the TNT grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTNTRender(
   *   grid: GridEntityTNT,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TNT_RENDER = 1436,

  /**
   * Fires after the TNT grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTNTRender(grid: GridEntityTNT): void {}
   * ```
   */
  POST_GRID_ENTITY_TNT_RENDER = 1437,

  /**
   * Fires before the trapdoor grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTrapdoorRender(
   *   grid: GridEntityTrapdoor,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TRAPDOOR_RENDER = 1438,

  /**
   * Fires after the trapdoor grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTrapdoorRender(grid: GridEntityTrapdoor): void {}
   * ```
   */
  POST_GRID_ENTITY_TRAPDOOR_RENDER = 1439,

  /**
   * Fires before the staircase grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityStaircaseRender(
   *   grid: GridEntityStaircase,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_STAIRCASE_RENDER = 1440,

  /**
   * Fires after the staircase grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityStaircaseRender(grid: GridEntityStaircase): void {}
   * ```
   */
  POST_GRID_ENTITY_STAIRCASE_RENDER = 1441,

  /**
   * Fires before the decoration grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDecorationRender(
   *   grid: GridEntityDecoration,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_DECORATION_RENDER = 1444,

  /**
   * Fires after the decoration grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDecorationRender(grid: GridEntityDecoration): void {}
   * ```
   */
  POST_GRID_ENTITY_DECORATION_RENDER = 1445,

  /**
   * Fires before the door grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityDoorRender(
   *   grid: GridEntityDoor,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_DOOR_RENDER = 1446,

  /**
   * Fires after the door grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityDoorRender(grid: GridEntityDoor): void {}
   * ```
   */
  POST_GRID_ENTITY_DOOR_RENDER = 1447,

  /**
   * Fires before the staircase grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityFireRender(
   *   grid: GridEntityFire,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_FIRE_RENDER = 1448,

  /**
   * Fires after the staircase grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityFireRender(grid: GridEntityFire): void {}
   * ```
   */
  POST_GRID_ENTITY_FIRE_RENDER = 1449,

  /**
   * Fires before the lock grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityLockRender(
   *   grid: GridEntityLock,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_LOCK_RENDER = 1450,

  /**
   * Fires after the lock grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityLockRender(grid: GridEntityLock): void {}
   * ```
   */
  POST_GRID_ENTITY_LOCK_RENDER = 1451,

  /**
   * Fires before the teleporter grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityTeleporterRender(
   *   grid: GridEntityTeleporter,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_TELEPORTER_RENDER = 1452,

  /**
   * Fires after the teleporter grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityTeleporterRender(grid: GridEntityTeleporter): void {}
   * ```
   */
  POST_GRID_ENTITY_TELEPORTER_RENDER = 1453,

  /**
   * Fires before the pit grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPitRender(
   *   grid: GridEntityPit,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_PIT_RENDER = 1454,

  /**
   * Fires after the pit grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPitRender(grid: GridEntityPit): void {}
   * ```
   */
  POST_GRID_ENTITY_PIT_RENDER = 1455,

  /**
   * Fires before the poop grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPoopRender(
   *   grid: GridEntityPoop,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_POOP_RENDER = 1456,

  /**
   * Fires after the poop grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPoopRender(grid: GridEntityPoop): void {}
   * ```
   */
  POST_GRID_ENTITY_POOP_RENDER = 1457,

  /**
   * Fires before the rock grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityRockRender(
   *   grid: GridEntityRock,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_ROCK_RENDER = 1458,

  /**
   * Fires after the rock grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityRockRender(grid: GridEntityRock): void {}
   * ```
   */
  POST_GRID_ENTITY_ROCK_RENDER = 1459,

  /**
   * Fires before the pressure plate grid entity renders. Return a Vector to modify the render
   * offset. Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityPressurePlateRender(
   *   grid: GridEntityPressurePlate,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_PRESSURE_PLATE_RENDER = 1460,

  /**
   * Fires after the pressure plate grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function postGridEntityPressurePlateRender(grid: GridEntityPressurePlate): void {}
   * ```
   */
  POST_GRID_ENTITY_PRESSURE_PLATE_RENDER = 1461,

  /**
   * Fires before the wall grid entity renders. Return a Vector to modify the render offset.
   * Alternatively, return false to cancel the rendering.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityWallRender(
   *   grid: GridEntityWall,
   *   offset: Vector
   * ): Vector | boolean | undefined {}
   * ```
   */
  PRE_GRID_ENTITY_WALL_RENDER = 1462,

  /**
   * Fires after the wall grid entity renders.
   *
   * When registering the callback with the `addCallbackRepentogon` method:
   * - You can provide an optional third argument that will make the callback only fire if it
   *   matches the `GridEntityType` provided.
   *
   * ```ts
   * function preGridEntityWallRender(grid: GridEntityWall): void {}
   * ```
   */
  POST_GRID_ENTITY_WALL_RENDER = 1463,

  /**
   * Fires after a save slot is loaded by the game.
   *
   * - The `saveSlot` parameter is the slot you should care about.
   * - The `isSlotSelected` parameter indicates if the slot is being loaded has been actually
   *   selected from the save menu screen.
   * - The `rawSlot` parameter is the actual save slot the game uses, not the one the API uses since
   *   it can be 0!
   *
   * ```ts
   * function postSaveSlotLoad(saveSlot: int, isSlotSelected: boolean, rawSlot: int): void {}
   * ```
   */
  POST_SAVE_SLOT_LOAD = 1470,
}
