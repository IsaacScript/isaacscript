---
title: Function Signatures
---

For reference, this is a handy list of all possible callback functions.

- [Vanilla Callbacks](#vanilla-callbacks)
- [Custom Callbacks](#custom-callbacks)

<br />

## Vanilla Callbacks

### MC_NPC_UPDATE (0)

```ts
function NPCUpdate(npc: EntityNPC): void {}
```

### MC_POST_UPDATE (1)

```ts
function postUpdate(): void {}
```

### MC_POST_RENDER (2)

```ts
function postRender(): void {}
```

### MC_USE_ITEM (3)

```ts
function useItem(
  collectibleType: CollectibleType | int,
  rng: RNG,
  player: EntityPlayer,
  useFlags: int,
  activeSlot: int,
  customVarData: int,
): boolean | { Discharge: boolean; Remove: boolean; ShowAnim: boolean } | void;
```

### MC_POST_PEFFECT_UPDATE (4)

```ts
function postPEffectUpdate(player: EntityPlayer): void {}
```

### MC_USE_CARD (5)

```ts
function useCard(card: Card | int, player: EntityPlayer, useFlags: int): void {}
```

### MC_FAMILIAR_UPDATE (6)

```ts
function familiarUpdate(familiar: EntityFamiliar): void {}
```

### MC_FAMILIAR_INIT (7)

```ts
function familiarInit(familiar: EntityFamiliar): void {}
```

### MC_EVALUATE_CACHE (8)

```ts
function evaluateCache(player: EntityPlayer, cacheFlag: CacheFlag): void {}
```

### MC_POST_PLAYER_INIT (9)

```ts
function postPlayerInit(player: EntityPlayer): void {}
```

### MC_USE_PILL (10)

```ts
function usePill(
  pillEffect: PillEffect | int,
  player: EntityPlayer,
  useFlags: int,
): void {}
```

### MC_ENTITY_TAKE_DMG (11)

```ts
function entityTakeDmg(
  tookDamage: Entity,
  damageAmount: float,
  damageFlags: DamageFlag,
  damageSource: EntityRef,
  damageCountdownFrames: int,
): boolean | void {}
```

### MC_POST_CURSE_EVAL (12)

```ts
function postCurseEval(curses: LevelCurse | int): LevelCurse | int | void {}
```

### MC_INPUT_ACTION (13)

```ts
function inputAction(
  entity: Entity | null,
  inputHook: InputHook,
  buttonAction: ButtonAction,
): boolean | float | void {}
```

### MC_POST_GAME_STARTED (14)

```ts
function postGameStarted(isContinued: boolean): void {}
```

### MC_POST_GAME_END (15)

```ts
function postGameEnd(isGameOver: boolean): void {}
```

### MC_PRE_GAME_EXIT (16)

```ts
function preGameExit(shouldSave: boolean): void {}
```

### MC_POST_NEW_LEVEL (17)

```ts
function postNewLevel(): void {}
```

### MC_POST_NEW_ROOM (18)

```ts
function postNewRoom(): void {}
```

### MC_GET_CARD (20)

```ts
function getCard(
  rng: RNG,
  card: Card | int,
  includePlayingCards: boolean,
  includeRunes: boolean,
  onlyRunes: boolean,
): Card | int | void {}
```

### MC_GET_SHADER_PARAMS (21)

```ts
function getShaderParams(shaderName: string): Record<string, unknown> {}
```

### MC_EXECUTE_CMD (22)

```ts
function executeCmd(command: string, parameters: string): void {}
```

### MC_PRE_USE_ITEM (23)

```ts
function preUseItem(
  collectibleType: CollectibleType | int,
  rng: RNG,
): boolean | void {}
```

### MC_PRE_ENTITY_SPAWN (24)

```ts
function preEntitySpawn(
  entityType: EntityType | int,
  variant: int,
  subType: int,
  position: Vector,
  velocity: Vector,
  spawner: Entity,
  initSeed: int,
): [EntityType | int, int, int, int] | void {}
```

### MC_POST_FAMILIAR_RENDER (25)

```ts
function postFamiliarRender(
  entityFamiliar: EntityFamiliar,
  renderOffset: Vector,
): void {}
```

### MC_PRE_FAMILIAR_COLLISION (26)

```ts
function preFamiliarCollision(
  familiar: EntityFamiliar,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_NPC_INIT (27)

```ts
function postNPCInit(npc: EntityNPC): void {}
```

### MC_POST_NPC_RENDER (28)

```ts
function postNPCRender(npc: EntityNPC, renderOffset: Vector): void {}
```

### MC_POST_NPC_DEATH (29)

```ts
function postNPCDeath(npc: EntityNPC): void {}
```

### MC_PRE_NPC_COLLISION (30)

```ts
function preNPCCollision(
  npc: EntityNPC,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_PLAYER_UPDATE (31)

```ts
function postPlayerUpdate(player: EntityPlayer): void {}
```

### MC_POST_PLAYER_RENDER (32)

```ts
function postPlayerRender(player: EntityPlayer, renderOffset: Vector): void {}
```

### MC_PRE_PLAYER_COLLISION (33)

```ts
function prePlayerCollision(
  player: EntityPlayer,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_PICKUP_INIT (34)

```ts
function postPickupInit(pickup: EntityPickup): void {}
```

### MC_POST_PICKUP_UPDATE (35)

```ts
function postPickupUpdate(pickup: EntityPickup): void {}
```

### MC_POST_PICKUP_RENDER (36)

```ts
function postPickupRender(pickup: EntityPickup, renderOffset: Vector): void {}
```

### MC_POST_PICKUP_SELECTION (37)

```ts
function postPickupSelection(
  pickup: EntityPickup,
  variant: PickupVariant | int,
  subType: int,
): [PickupVariant | int, int] | void {}
```

### MC_PRE_PICKUP_COLLISION (38)

```ts
function prePickupCollision(
  pickup: EntityPickup,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_TEAR_INIT (39)

```ts
function postTearInit(tear: EntityTear): void {}
```

### MC_POST_TEAR_UPDATE (40)

```ts
function postTearUpdate(tear: EntityTear): void {}
```

### MC_POST_TEAR_RENDER (41)

```ts
function postTearRender(tear: EntityTear, renderOffset: Vector): void {}
```

### MC_PRE_TEAR_COLLISION (42)

```ts
function preTearCollision(
  tear: EntityTear,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_PROJECTILE_INIT (43)

```ts
function postProjectileInit(projectile: EntityProjectile): void {}
```

### MC_POST_PROJECTILE_UPDATE (44)

```ts
function postProjectileUpdate(projectile: EntityProjectile): void {}
```

### MC_POST_PROJECTILE_RENDER (45)

```ts
function postProjectileRender(
  projectile: EntityProjectile,
  renderOffset: Vector,
): void {}
```

### MC_PRE_PROJECTILE_COLLISION (46)

```ts
function preProjectileCollision(
  projectile: EntityProjectile,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_LASER_INIT (47)

```ts
function postLaserInit(laser: EntityLaser): void {}
```

### MC_POST_LASER_UPDATE (48)

```ts
function postLaserUpdate(laser: EntityLaser): void {}
```

### MC_POST_LASER_RENDER (49)

```ts
function postLaserRender(laser: EntityLaser, renderOffset: Vector): void {}
```

### MC_POST_KNIFE_INIT (50)

```ts
function postKnifeInit(knife: EntityKnife): void {}
```

### MC_POST_KNIFE_UPDATE (51)

```ts
function postKnifeUpdate(knife: EntityKnife): void {}
```

### MC_POST_KNIFE_RENDER (52)

```ts
function postKnifeRender(knife: EntityKnife, renderOffset: Vector): void {}
```

### MC_PRE_KNIFE_COLLISION (53)

```ts
function preKnifeCollision(
  knife: EntityKnife,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_EFFECT_INIT (54)

```ts
function postEffectInit(effect: EntityEffect): void {}
```

### MC_POST_EFFECT_UPDATE (55)

```ts
function postEffectUpdate(effect: EntityEffect): void {}
```

### MC_POST_EFFECT_RENDER (56)

```ts
function postEffectRender(effect: EntityEffect, renderOffset: Vector): void {}
```

### MC_POST_BOMB_INIT (57)

```ts
function postBombInit(bomb: EntityBomb): void {}
```

### MC_POST_BOMB_UPDATE (58)

```ts
function postBombUpdate(bomb: EntityBomb): void {}
```

### MC_POST_BOMB_RENDER (59)

```ts
function postBombRender(bomb: EntityBomb, renderOffset: Vector): void {}
```

### MC_PRE_BOMB_COLLISION (60)

```ts
function preBombCollision(
  bomb: EntityBomb,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_FIRE_TEAR (61)

```ts
function postFireTear(tear: EntityTear): void {}
```

### MC_PRE_GET_COLLECTIBLE (62)

```ts
function preGetCollectible(
  itemPoolType: ItemPoolType,
  decrease: boolean,
  seed: int,
): CollectibleType | int | void {}
```

### MC_POST_GET_COLLECTIBLE (63)

```ts
function postGetCollectible(
  collectibleType: CollectibleType | int,
  itemPoolType: ItemPoolType,
  decrease: boolean,
  seed: int,
): CollectibleType | int | void {}
```

### MC_GET_PILL_COLOR (64)

```ts
function getPillColor(seed: int): PillColor | int | void {}
```

### MC_GET_PILL_EFFECT (65)

```ts
function getPillEffect(
  pillEffect: PillEffect | int,
  pillColor: PillColor | int,
): PillEffect | int | void {}
```

### MC_GET_TRINKET (66)

```ts
function getTrinket(
  trinketType: TrinketType | int,
  rng: RNG,
): TrinketType | int | void {}
```

### MC_POST_ENTITY_REMOVE (67)

```ts
function postEntityRemove(entity: Entity): void {}
```

### MC_POST_ENTITY_KILL (68)

```ts
function postEntityKill(entity: Entity): void {}
```

### MC_PRE_NPC_UPDATE (69)

```ts
function preNPCUpdate(entity: Entity): boolean | void {}
```

### MC_PRE_SPAWN_CLEAN_AWARD (70)

```ts
function preSpawnClearAward(rng: RNG, spawnPosition: Vector): boolean | void {}
```

### MC_PRE_ROOM_ENTITY_SPAWN (71)

```ts
function preRoomEntitySpawn(
  entityType: EntityType | int,
  variant: int,
  subType: int,
  gridIndex: int,
  seed: int,
): [EntityType | int, int, int] | void {}
```

<br />

## Custom Callbacks

### MC_POST_GAME_STARTED

Similar to the vanilla callback of the same name, but fires in the correct order with respect to the PostNewLevel and the PostNewRoom callbacks:

PostGameStarted --> PostNewLevel --> PostNewRoom

```ts
function postGameStarted(): void {}
```

### MC_POST_NEW_LEVEL

Similar to the vanilla callback of the same name, but fires in the correct order with respect to the PostNewLevel and the PostNewRoom callbacks:

PostGameStarted --> PostNewLevel --> PostNewRoom

```ts
function postNewLevel(): void {}
```

### MC_POST_NEW_ROOM

Similar to the vanilla callback of the same name, but fires in the correct order with respect to the PostNewLevel and the PostNewRoom callbacks:

PostGameStarted --> PostNewLevel --> PostNewRoom

```ts
function postNewRoom(): void {}
```

### MC_PRE_ITEM_PICKUP

Fires on the first frame that an item becomes queued (i.e. when Isaac begins to hold the item above his head).

```ts
function preItemPickup(
  player: EntityPlayer,
  pickingUpItem: PickingUpItem,
): void {}
```

### MC_POST_ITEM_PICKUP

Fires on the first frame that an item is no longer queued (i.e. when the animation of Isaac holding the item above his head is finished and the item is actually added to the player's inventory).

```ts
function postItemPickup(
  player: EntityPlayer,
  pickingUpItem: PickingUpItem,
): void {}
```
