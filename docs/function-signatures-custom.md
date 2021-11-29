---
title: Function Signatures (Custom)
---

The [`isaacscript-common`](https://isaacscript.github.io/isaacscript-common/) package provides access to some custom callbacks, which are listed below.

In order to use custom callbacks, you must first invoke the [`upgradeMod`](https://isaacscript.github.io/isaacscript-common/modules/upgradeMod.html) function.

<br />

### MC_POST_GAME_STARTED_REORDERED

Similar to the vanilla callback of the same name, but fires in the correct order with respect to the PostNewLevel and the PostNewRoom callbacks:

PostGameStarted --> PostNewLevel --> PostNewRoom

```ts
function postGameStartedReordered(isContinued: boolean): void {}
```

### MC_POST_NEW_LEVEL_REORDERED

The same as the vanilla callback of the same name, but fires in the correct order with respect to the PostGameStarted and the PostNewRoom callbacks:

PostGameStarted --> PostNewLevel --> PostNewRoom

If some specific cases, mods can change the current level during run initialization (on the 0th frame). However, due to how the callback reordering works, the custom PostNewLevel callback will never fire on the 0th frame. To get around this, call the `forceNewLevelCallback()` function before changing levels to temporarily force the callback to fire.

```ts
function postNewLevelReordered(): void {}
```

### MC_POST_NEW_ROOM_REORDERED

The same as the vanilla callback of the same name, but fires in the correct order with respect to the PostGameStarted and the PostNewLevel callbacks:

PostGameStarted --> PostNewLevel --> PostNewRoom

If some specific cases, mods can change the current room during run initialization (on the 0th frame). However, due to how the callback reordering works, the custom PostNewRoom callback will never fire on the 0th frame. To get around this, call the `forceNewRoomCallback()` function before changing levels to temporarily force the callback to fire.

```ts
function postNewRoomReordered(): void {}
```

### MC_POST_PLAYER_INIT_REORDERED

Similar to the vanilla callback of the same name, but fires after the PostGameStarted callback fires (if the player is spawning on the 0th game frame of the run).

This callback is useful for two reasons:

1. Normally, PostPlayerUpdate fires before PostGameStarted. Since mod variables are often initialized at the beginning of the PostGameStarted callback, this can cause problems.
1. Some functions do not work (or crash the game) when called before the PostNewRoom callback. For example, since the level is not generated yet, you will not be able to access any rooms.

When registering the callback, takes an optional second argument that will make the callback only fire if the player matches the `PlayerVariant` provided.

```ts
function postPlayerInitReordered(player: EntityPlayer): void {}
```

### MC_POST_PLAYER_UPDATE_REORDERED

Similar to the vanilla callback of the same name, but fires after the PostGameStarted callback fires (if the player is being updated on the 0th game frame of the run).

This callback is useful for two reasons:

1. Normally, PostPlayerUpdate fires before PostGameStarted. Since mod variables are often initialized at the beginning of the PostGameStarted callback, this can cause problems.
1. Some functions do not work (or crash the game) when called before the PostNewRoom callback. For example, since the level is not generated yet, you will not be able to access any rooms.

When registering the callback, takes an optional second argument that will make the callback only fire if the player matches the `PlayerVariant` provided.

```ts
function postPlayerUpdateReordered(player: EntityPlayer): void {}
```

### MC_POST_NEW_ROOM_EARLY

Fires on the first `MC_POST_NEW_ROOM` or `MC_PRE_ENTITY_SPAWN` callback where being in a new room is detected. This is useful because the vanilla `MC_POST_NEW_ROOM` callback fires only after entities in the room have been initialized and updated once, which is counterintuitive. This means that it is possible for entity-related code to run before room-related-initialized has been performed. Run such initialization code in this callback instead.

```ts
function postNewRoomEarly(): void {}
```

### MC_POST_PLAYER_INIT_LATE

Fires on the first MC_POST_PLAYER_UPDATE frame for each player.

This callback is useful because many attributes cannot be set or retrieved properly in the normal MC_POST_PLAYER_INIT callback.

When registering the callback, takes an optional second argument that will make the callback only fire if the player variant matches the `PlayerVariant` provided.

```ts
function postPlayerInitLate(pickup: EntityPickup): void {}
```

### MC_POST_TEAR_INIT_LATE

Fires on the first MC_POST_TEAR_UPDATE frame for each tear.

This callback is useful because many attributes cannot be set or retrieved properly in the normal MC_POST_TEAR_INIT callback.

When registering the callback, takes an optional second argument that will make the callback only fire if the tear variant matches the `TearVariant` provided.

```ts
function postTearInitLate(tear: EntityTear): void {}
```

### MC_POST_FAMILIAR_INIT_LATE

Fires on the first MC_FAMILIAR_UPDATE frame for each familiar.

This callback is useful because many attributes cannot be set or retrieved properly in the normal MC_POST_TEAR_INIT callback.

When registering the callback, takes an optional second argument that will make the callback only fire if the familiar variant matches the `FamiliarVariant` provided.

```ts
function postTearInitLate(familiar: EntityFamiliar): void {}
```

### MC_POST_BOMB_INIT_LATE

Fires on the first MC_POST_BOMB_UPDATE frame for each bomb.

This callback is useful because many attributes cannot be set or retrieved properly in the normal MC_POST_BOMB_INIT callback.

When registering the callback, takes an optional second argument that will make the callback only fire if the bomb variant matches the `BombVariant` provided.

```ts
function postBombInitLate(bomb: EntityBomb): void {}
```

### MC_POST_PICKUP_INIT_LATE

Fires on the first MC_POST_PICKUP_UPDATE frame for each pickup.

This callback is useful because many attributes cannot be set or retrieved properly in the normal MC_POST_PICKUP_INIT callback.

When registering the callback, takes an optional second argument that will make the callback only fire if the pickup variant matches the `PickupVariant` provided.

```ts
function postPickupInitLate(pickup: EntityPickup): void {}
```

### MC_POST_LASER_INIT_LATE

Fires on the first MC_POST_LASER_UPDATE frame for each laser.

This callback is useful because many attributes cannot be set or retrieved properly in the normal MC_POST_LASER_INIT callback.

When registering the callback, takes an optional second argument that will make the callback only fire if the laser variant matches the `LaserVariant` provided.

```ts
function postLaserInitLate(laser: EntityLaser): void {}
```

### MC_POST_KNIFE_INIT_LATE

Fires on the first MC_POST_KNIFE_UPDATE frame for each knife.

This callback is useful because many attributes cannot be set or retrieved properly in the normal MC_POST_KNIFE_INIT callback.

When registering the callback, takes an optional second argument that will make the callback only fire if the knife variant matches the `KnifeVariant` provided.

```ts
function postKnifeInitLate(knife: EntityKnife): void {}
```

### MC_POST_PROJECTILE_INIT_LATE

Fires on the first MC_POST_PROJECTILE_UPDATE frame for each projectile.

This callback is useful because many attributes cannot be set or retrieved properly in the normal MC_POST_PROJECTILE_INIT callback.

When registering the callback, takes an optional second argument that will make the callback only fire if the projectile variant matches the `ProjectileVariant` provided.

```ts
function postProjectileInitLate(projectile: EntityProjectile): void {}
```

### MC_POST_NPC_INIT_LATE

Fires on the first MC_NPC_UPDATE frame for each NPC.

This callback is useful because many attributes cannot be set or retrieved properly in the normal MC_POST_NPC_INIT callback.

When registering the callback, takes an optional second argument that will make the callback only fire if the NPC's entity type matches the entity type provided.

```ts
function postNPCInitLate(npc: EntityNPC): void {}
```

### MC_POST_EFFECT_INIT_LATE

Fires on the first MC_POST_EFFECT_UPDATE frame for each effect.

This callback is useful because many attributes cannot be set or retrieved properly in the normal MC_POST_EFFECT_INIT callback.

When registering the callback, takes an optional second argument that will make the callback only fire if the effect variant matches the `EffectVariant` provided.

```ts
function postEffectInitLate(npc: EntityEffect): void {}
```

### MC_POST_PICKUP_COLLECT

Fires on the first MC_POST_RENDER frame that a pickup plays the "Collect" animation.

Use this callback to know when a pickup is added to the player's inventory or health.

When registering the callback, takes an optional second argument that will make the callback only fire if the pickup variant matches the `PickupVariant` provided.

```ts
function postPickupCollect(pickup: EntityPickup, player: EntityPlayer): void {}
```

### MC_PRE_ITEM_PICKUP

Fires on the first frame that an item becomes queued (i.e. when Isaac begins to hold the item above his head).

- When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `ItemType` provided.
- When registering the callback, takes an optional third argument that will make the callback only fire if the `CollectibleType` or the `TrinketType` matches the ID provided.

```ts
function preItemPickup(
  player: EntityPlayer,
  pickingUpItem: PickingUpItem,
): void {}
```

### MC_POST_ITEM_PICKUP

Fires on the first frame that an item is no longer queued (i.e. when the animation of Isaac holding the item above his head is finished and the item is actually added to the player's inventory).

- When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `ItemType` provided.
- When registering the callback, takes an optional third argument that will make the callback only fire if the `CollectibleType` or the `TrinketType` matches the ID provided.

```ts
function postItemPickup(
  player: EntityPlayer,
  pickingUpItem: PickingUpItem,
): void {}
```

### MC_POST_PLAYER_CHANGE_TYPE

Fires when a player entity changes its player type (i.e. character). For example, it will fire after using Clicker, after dying with the Judas' Shadow item, etc.

Notably, it does not fire after the player uses the Flip item or the Esau Jr. item, because those items cause separate player entities to be created. Use the `MC_POST_FLIP` and `MC_POST_ESAU_JR` callbacks to handle those situations.

```ts
function postPlayerChangeType(player: EntityPlayer) {}
```

### MC_POST_PLAYER_CHANGE_HEALTH

Fires on the MC_POST_UPDATE frame when a player entity gains or loses any health (i.e. hearts).

When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `PlayerVariant` provided.

```ts
function postPlayerChangeHealth(player: EntityPlayer, healthType: HealthType, amount: int) {}
```

### MC_POST_PLAYER_FATAL_DAMAGE

Fires from the MC_ENTITY_TAKE_DMG callback when a player takes fatal damage. Return false to prevent the fatal damage.

Note that this function does properly take into account Guppy's Collar, Broken Ankh, and Mysterious Paper. It does not take into account Spirit Shackles, since that isn't a "real" revival item. For detecting Spirit Shackles, use the `willReviveFromSpiritShackles()` helper function.

When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `PlayerVariant` provided.

```ts
function postPlayerFatalDamage(player: EntityPlayer) {}
```

### MC_PRE_CUSTOM_REVIVE

Fires from the MC_POST_PLAYER_FATAL_DAMAGE callback. If you want to initiate a custom revival, return an integer that corresponds to the item or type of revival that you are doing. Otherwise, return undefined to continue the fatal damage.

This callback is useful because reviving the player after the game things that player should have died will result in the save data for the run getting deleted.

```ts
function preCustomRevive(player: EntityPlayer) {}
```

### MC_POST_CUSTOM_REVIVE

Fires from the MC_POST_PLAYER_UPDATE callback after the player has finished the death animation, has teleported to the previous room, and is ready to play the animation for the modded revival item. The `revivalType` will match the value returned from the `MC_PRE_CUSTOM_REVIVE` callback.

In this callback, you must play an animation with something along the lines of `player.AnimateCollectible(CollectibleTypeCustom.COLLECTIBLE_MY_REVIVAL_ITEM);`, otherwise the animation for a 1-Up will play.

When registering the callback, takes an optional second argument that will make the callback only fire if the revival type matches the one provided.

```ts
function postCustomRevive(player: EntityPlayer, revivalType: int) {}
```

### MC_POST_FLIP

Fires after the player has used the Flip item. Unlike the vanilla MC_USE_ITEM callback, this callback will return the player object for the new Lazarus (not the one who used the Flip item).

This callback is useful because there is no way to get access to the "flipped" character entity before the player has actually used the Flip item.

```ts
function postFlip(player: EntityPlayer): void {}
```

### MC_POST_FIRST_FLIP

Fires after the player has used the Flip item for the first time. Unlike the vanilla MC_USE_ITEM callback, this callback will return the player object for the new Lazarus (not the one who used the Flip item).

This callback is useful because there is no way to get access to the "flipped" character entity before the player has actually used the Flip item.

```ts
function postFirstFlip(player: EntityPlayer): void {}
```

### MC_POST_ESAU_JR

Fires one game frame after the player has used the Esau Jr. item. (The player is not updated to the new character until a game frame has passed.)

```ts
function postEsauJr(player: EntityPlayer): void {}
```

### MC_POST_FIRST_ESAU_JR

Fires one game frame after the player has first used the Esau Jr. item. (The player is not updated to the new character until a game frame has passed.)

This callback is useful because there is no way to get access to the Esau Jr. character entity before the player has actually used the Esau Jr. item.

```ts
function postFirstEsauJr(player: EntityPlayer): void {}
```

### MC_POST_TRANSFORMATION

Fires on the frame that a player gains or loses a new transformation.

When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `PlayerForm` provided.

```ts
function postTransformation(player: EntityPlayer, playerForm: PlayerForm, hasForm: boolean): void {}
```

### MC_POST_PURCHASE

Fires on the MC_POST_UPDATE frame that a pickup with a price disappears. The player who purchased it is assumed to be the player that was not holding anything on the previous frame but is holding something now.

- When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `PickupVariant` provided.
- When registering the callback, takes an optional third argument that will make the callback only fire if it matches the subtype provided.

```ts
function postPurchase(
  player: EntityPlayer,
  pickupVariant: PickupVariant,
  pickupSubType: int,
  pickupPrice: int,
): void {}
```

### MC_POST_SACRIFICE

Fires on the frame that a player takes damage from spikes in a Sacrifice Room.

```ts
function postSacrifice(player: EntityPlayer, numSacrifices: int): void {}
```

### MC_POST_CURSED_TELEPORT

Fires on the first frame that the "TeleportUp" animation begins playing after a player triggers a Cursed Eye teleport or a Cursed Skull teleport. (Both of these have the same effect in causing Isaac to be teleported to a random room.)

```ts
function postCursedTeleport(player: EntityPlayer): void {}
```

### MC_POST_SLOT_INIT

Fires when a new slot entity is initialized. Specifically, this is either:
- in the MC_POST_NEW_ROOM callback (firing every time a room is entered, even if the entity was previously there on a previous room entry)
- in the MC_POST_UPDATE callback (if the entity appeared midway through the room, like when a Wheel of Fortune card is used)

When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `SlotVariant` provided.

```ts
function postSlotInit(slot: Entity): void {}
```

### MC_POST_SLOT_UPDATE

Fires on every MC_POST_UPDATE frame that a slot entity exists.

When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `SlotVariant` provided.

```ts
function postSlotUpdate(slot: Entity): void {}
```

### MC_POST_SLOT_RENDER

Fires on every MC_POST_RENDER frame that a slot entity exists.

When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `SlotVariant` provided.

```ts
function postSlotRender(slot: Entity): void {}
```

### MC_POST_SLOT_DESTROYED

Fires on the first MC_POST_RENDER frame that a slot plays the animation that indicates that it has broken.

When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `SlotVariant` provided.

```ts
function postSlotDestroyed(slot: Entity): void {}
```

### MC_POST_GRID_ENTITY_INIT

Fires when a new grid entity is initialized. Specifically, this is either:
- in the MC_POST_NEW_ROOM callback (firing every time a room is entered, even if the entity was previously there on a previous room entry)
- in the MC_POST_UPDATE callback (if the entity appeared midway through the room, like when the trapdoor appears after defeating It Lives!)

When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `GridEntityType` provided.

```ts
function postGridEntityInit(gridEntity: GridEntity): void {}
```

### MC_POST_GRID_ENTITY_UPDATE

Fires on every MC_POST_UPDATE frame that a grid entity exists.

When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `GridEntityType` provided.

```ts
function postGridEntityUpdate(gridEntity: GridEntity): void {}
```

### MC_POST_GRID_ENTITY_REMOVE

Fires when a new grid entity is removed. Specifically, this on the MC_POST_UPDATE frame after a grid entity no longer exists (where it did exist a frame ago).

When registering the callback, takes an optional second argument that will make the callback only fire if it matches the `GridEntityType` provided.

```ts
function postGridEntityRemove(gridIndex: int, gridEntityType: GridEntityType): void {}
```
