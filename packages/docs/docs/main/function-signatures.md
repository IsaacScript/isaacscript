---
title: Function Signatures (Vanilla)
---

For reference, this is a handy list of all possible callback functions.

For the list of custom callbacks, see [this page](/isaacscript-common/other/enums/ModCallbackCustom.md).

<br />

### POST_NPC_UPDATE (0)

```ts
function postNPCUpdate(npc: EntityNPC): void {}
```

### POST_UPDATE (1)

```ts
function postUpdate(): void {}
```

### POST_RENDER (2)

```ts
function postRender(): void {}
```

### USE_ITEM (3)

```ts
function useItem(
  collectibleType: CollectibleType,
  rng: RNG,
  player: EntityPlayer,
  useFlags: BitFlags<UseFlag>,
  activeSlot: int,
  customVarData: int,
):
  | boolean
  | { Discharge: boolean; Remove: boolean; ShowAnim: boolean }
  | undefined;
```

### POST_PEFFECT_UPDATE (4)

```ts
function postPEffectUpdate(player: EntityPlayer): void {}
```

### POST_USE_CARD (5)

```ts
function postUseCard(
  card: Card,
  player: EntityPlayer,
  useFlags: BitFlags<UseFlag>,
): void {}
```

### POST_FAMILIAR_UPDATE (6)

```ts
function postFamiliarUpdate(familiar: EntityFamiliar): void {}
```

### POST_FAMILIAR_INIT (7)

```ts
function postFamiliarInit(familiar: EntityFamiliar): void {}
```

### EVALUATE_CACHE (8)

```ts
function evaluateCache(player: EntityPlayer, cacheFlag: CacheFlag): void {}
```

### POST_PLAYER_INIT (9)

```ts
function postPlayerInit(player: EntityPlayer): void {}
```

### POST_USE_PILL (10)

```ts
function postUsePill(
  pillEffect: PillEffect,
  player: EntityPlayer,
  useFlags: BitFlags<UseFlag>,
): void {}
```

### ENTITY_TAKE_DMG (11)

```ts
function entityTakeDmg(
  tookDamage: Entity,
  damageAmount: float,
  damageFlags: BitFlags<DamageFlag>,
  damageSource: EntityRef,
  damageCountdownFrames: int,
): boolean | undefined {}
```

### POST_CURSE_EVAL (12)

```ts
function postCurseEval(curses: int): int | undefined {}
```

### INPUT_ACTION (13)

```ts
function inputAction(
  entity: Entity | undefined,
  inputHook: InputHook,
  buttonAction: ButtonAction,
): boolean | float | undefined {}
```

### POST_GAME_STARTED (14)

```ts
function postGameStarted(isContinued: boolean): void {}
```

### POST_GAME_END (15)

```ts
function postGameEnd(isGameOver: boolean): void {}
```

### PRE_GAME_EXIT (16)

```ts
function preGameExit(shouldSave: boolean): void {}
```

### POST_NEW_LEVEL (17)

```ts
function postNewLevel(): void {}
```

### POST_NEW_ROOM (18)

```ts
function postNewRoom(): void {}
```

### GET_CARD (20)

```ts
function getCard(
  rng: RNG,
  card: Card,
  includePlayingCards: boolean,
  includeRunes: boolean,
  onlyRunes: boolean,
): Card | undefined {}
```

### GET_SHADER_PARAMS (21)

```ts
function getShaderParams(shaderName: string): Record<string, unknown> {}
```

### EXECUTE_CMD (22)

```ts
function executeCmd(
  command: string,
  parameters: string,
  player: EntityPlayer,
): void {}
```

### PRE_USE_ITEM (23)

```ts
function preUseItem(
  collectibleType: CollectibleType,
  rng: RNG,
): boolean | undefined {}
```

### PRE_ENTITY_SPAWN (24)

```ts
function preEntitySpawn(
  entityType: EntityType,
  variant: int,
  subType: int,
  position: Vector,
  velocity: Vector,
  spawner: Entity,
  initSeed: int,
): [EntityType, int, int, int] | undefined {}
```

### POST_FAMILIAR_RENDER (25)

```ts
function postFamiliarRender(
  entityFamiliar: EntityFamiliar,
  renderOffset: Vector,
): void {}
```

### PRE_FAMILIAR_COLLISION (26)

```ts
function preFamiliarCollision(
  familiar: EntityFamiliar,
  collider: Entity,
  low: boolean,
): boolean | undefined {}
```

### POST_NPC_INIT (27)

```ts
function postNPCInit(npc: EntityNPC): void {}
```

### POST_NPC_RENDER (28)

```ts
function postNPCRender(npc: EntityNPC, renderOffset: Vector): void {}
```

### POST_NPC_DEATH (29)

```ts
function postNPCDeath(npc: EntityNPC): void {}
```

### PRE_NPC_COLLISION (30)

```ts
function preNPCCollision(
  npc: EntityNPC,
  collider: Entity,
  low: boolean,
): boolean | undefined {}
```

### POST_PLAYER_UPDATE (31)

```ts
function postPlayerUpdate(player: EntityPlayer): void {}
```

### POST_PLAYER_RENDER (32)

```ts
function postPlayerRender(player: EntityPlayer, renderOffset: Vector): void {}
```

### PRE_PLAYER_COLLISION (33)

```ts
function prePlayerCollision(
  player: EntityPlayer,
  collider: Entity,
  low: boolean,
): boolean | undefined {}
```

### POST_PICKUP_INIT (34)

```ts
function postPickupInit(pickup: EntityPickup): void {}
```

### POST_PICKUP_UPDATE (35)

```ts
function postPickupUpdate(pickup: EntityPickup): void {}
```

### POST_PICKUP_RENDER (36)

```ts
function postPickupRender(pickup: EntityPickup, renderOffset: Vector): void {}
```

### POST_PICKUP_SELECTION (37)

```ts
function postPickupSelection(
  pickup: EntityPickup,
  variant: PickupVariant,
  subType: int,
): [PickupVariant, int] | undefined {}
```

### PRE_PICKUP_COLLISION (38)

```ts
function prePickupCollision(
  pickup: EntityPickup,
  collider: Entity,
  low: boolean,
): boolean | undefined {}
```

### POST_TEAR_INIT (39)

```ts
function postTearInit(tear: EntityTear): void {}
```

### POST_TEAR_UPDATE (40)

```ts
function postTearUpdate(tear: EntityTear): void {}
```

### POST_TEAR_RENDER (41)

```ts
function postTearRender(tear: EntityTear, renderOffset: Vector): void {}
```

### PRE_TEAR_COLLISION (42)

```ts
function preTearCollision(
  tear: EntityTear,
  collider: Entity,
  low: boolean,
): boolean | undefined {}
```

### POST_PROJECTILE_INIT (43)

```ts
function postProjectileInit(projectile: EntityProjectile): void {}
```

### POST_PROJECTILE_UPDATE (44)

```ts
function postProjectileUpdate(projectile: EntityProjectile): void {}
```

### POST_PROJECTILE_RENDER (45)

```ts
function postProjectileRender(
  projectile: EntityProjectile,
  renderOffset: Vector,
): void {}
```

### PRE_PROJECTILE_COLLISION (46)

```ts
function preProjectileCollision(
  projectile: EntityProjectile,
  collider: Entity,
  low: boolean,
): boolean | undefined {}
```

### POST_LASER_INIT (47)

```ts
function postLaserInit(laser: EntityLaser): void {}
```

### POST_LASER_UPDATE (48)

```ts
function postLaserUpdate(laser: EntityLaser): void {}
```

### POST_LASER_RENDER (49)

```ts
function postLaserRender(laser: EntityLaser, renderOffset: Vector): void {}
```

### POST_KNIFE_INIT (50)

```ts
function postKnifeInit(knife: EntityKnife): void {}
```

### POST_KNIFE_UPDATE (51)

```ts
function postKnifeUpdate(knife: EntityKnife): void {}
```

### POST_KNIFE_RENDER (52)

```ts
function postKnifeRender(knife: EntityKnife, renderOffset: Vector): void {}
```

### PRE_KNIFE_COLLISION (53)

```ts
function preKnifeCollision(
  knife: EntityKnife,
  collider: Entity,
  low: boolean,
): boolean | undefined {}
```

### POST_EFFECT_INIT (54)

```ts
function postEffectInit(effect: EntityEffect): void {}
```

### POST_EFFECT_UPDATE (55)

```ts
function postEffectUpdate(effect: EntityEffect): void {}
```

### POST_EFFECT_RENDER (56)

```ts
function postEffectRender(effect: EntityEffect, renderOffset: Vector): void {}
```

### POST_BOMB_INIT (57)

```ts
function postBombInit(bomb: EntityBomb): void {}
```

### POST_BOMB_UPDATE (58)

```ts
function postBombUpdate(bomb: EntityBomb): void {}
```

### POST_BOMB_RENDER (59)

```ts
function postBombRender(bomb: EntityBomb, renderOffset: Vector): void {}
```

### PRE_BOMB_COLLISION (60)

```ts
function preBombCollision(
  bomb: EntityBomb,
  collider: Entity,
  low: boolean,
): boolean | undefined {}
```

### POST_FIRE_TEAR (61)

```ts
function postFireTear(tear: EntityTear): void {}
```

### PRE_GET_COLLECTIBLE (62)

```ts
function preGetCollectible(
  itemPoolType: ItemPoolType,
  decrease: boolean,
  seed: int,
): CollectibleType | undefined {}
```

### POST_GET_COLLECTIBLE (63)

```ts
function postGetCollectible(
  collectibleType: CollectibleType,
  itemPoolType: ItemPoolType,
  decrease: boolean,
  seed: int,
): CollectibleType | undefined {}
```

### GET_PILL_COLOR (64)

```ts
function getPillColor(seed: int): PillColor | undefined {}
```

### GET_PILL_EFFECT (65)

```ts
function getPillEffect(
  pillEffect: PillEffect,
  pillColor: PillColor,
): PillEffect | undefined {}
```

### GET_TRINKET (66)

```ts
function getTrinket(
  trinketType: TrinketType,
  rng: RNG,
): TrinketType | undefined {}
```

### POST_ENTITY_REMOVE (67)

```ts
function postEntityRemove(entity: Entity): void {}
```

### POST_ENTITY_KILL (68)

```ts
function postEntityKill(entity: Entity): void {}
```

### PRE_NPC_UPDATE (69)

```ts
function preNPCUpdate(entity: Entity): boolean | undefined {}
```

### PRE_SPAWN_CLEAN_AWARD (70)

```ts
function preSpawnClearAward(
  rng: RNG,
  spawnPosition: Vector,
): boolean | undefined {}
```

### PRE_ROOM_ENTITY_SPAWN (71)

```ts
function preRoomEntitySpawn(
  entityType: EntityType,
  variant: int,
  subType: int,
  gridIndex: int,
  seed: int,
): [EntityType, int, int] | undefined {}
```
