---
title: Function Signatures
---

For reference, this is a handy list of all possible callback functions.

<br />

### MC_NPC_UPDATE (0)

```typescript
function NPCUpdate(npc: EntityNPC): void {}
```

### MC_POST_UPDATE (1)

```typescript
function postUpdate(): void {}
```

### MC_POST_RENDER (2)

```typescript
function postRender(): void {}
```

### MC_USE_ITEM (3)

```typescript
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

```typescript
function postPEffectUpdate(player: EntityPlayer): void {}
```

### MC_USE_CARD (5)

```typescript
function useCard(card: Card | int, player: EntityPlayer, useFlags: int): void {}
```

### MC_FAMILIAR_UPDATE (6)

```typescript
function familiarUpdate(familiar: EntityFamiliar): void {}
```

### MC_FAMILIAR_INIT (7)

```typescript
function familiarInit(familiar: EntityFamiliar): void {}
```

### MC_EVALUATE_CACHE (8)

```typescript
function evaluateCache(player: EntityPlayer, cacheFlag: CacheFlag): void {}
```

### MC_POST_PLAYER_INIT (9)

```typescript
function postPlayerInit(player: EntityPlayer): void {}
```

### MC_USE_PILL (10)

```typescript
function usePill(
  pillEffect: PillEffect | int,
  player: EntityPlayer,
  useFlags: int,
): void {}
```

### MC_ENTITY_TAKE_DMG (11)

```typescript
function entityTakeDmg(
  tookDamage: Entity,
  damageAmount: float,
  damageFlags: DamageFlag,
  damageSource: EntityRef,
  damageCountdownFrames: int,
): boolean | void {}
```

### MC_POST_CURSE_EVAL (12)

```typescript
function postCurseEval(curses: LevelCurse | int): LevelCurse | int | void {}
```

### MC_INPUT_ACTION (13)

```typescript
function inputAction(
  player: EntityPlayer,
  inputHook: InputHook,
  buttonAction: ButtonAction,
): boolean | float | void {}
```

### MC_POST_GAME_STARTED (14)

```typescript
function postGameStarted(isContinued: boolean): void {}
```

### MC_POST_GAME_END (15)

```typescript
function postGameEnd(isGameOver: boolean): void {}
```

### MC_PRE_GAME_EXIT (16)

```typescript
function preGameExit(shouldSave: boolean): void {}
```

### MC_POST_NEW_LEVEL (17)

```typescript
function postNewLevel(): void {}
```

### MC_POST_NEW_ROOM (18)

```typescript
function postNewRoom(): void {}
```

### MC_GET_CARD (20)

```typescript
function getCard(
  rng: RNG,
  card: Card | int,
  includePlayingCards: boolean,
  includeRunes: boolean,
  onlyRunes: boolean,
): Card | int | void {}
```

### MC_GET_SHADER_PARAMS (21)

```typescript
function getShaderParams(shaderName: string): Record<string, unknown> {}
```

### MC_EXECUTE_CMD (22)

```typescript
function executeCmd(command: string, parameters: string): void {}
```

### MC_PRE_USE_ITEM (23)

```typescript
function preUseItem(
  collectibleType: CollectibleType | int,
  rng: RNG,
): boolean | void {}
```

### MC_PRE_ENTITY_SPAWN (24)

```typescript
function preEntitySpawn(
  entityType: EntityType | int,
  variant: EntityVariantForAC,
  subType: int,
  position: Vector,
  velocity: Vector,
  spawner: Entity,
  initSeed: int,
): [EntityType | int, int, int, int] | void {}
```

### MC_POST_FAMILIAR_RENDER (25)

```typescript
function postFamiliarRender(
  entityFamiliar: EntityFamiliar,
  renderOffset: Vector,
): void {}
```

### MC_PRE_FAMILIAR_COLLISION (26)

```typescript
function preFamiliarCollision(
  familiar: EntityFamiliar,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_NPC_INIT (27)

```typescript
function postNPCInit(npc: EntityNPC): void {}
```

### MC_POST_NPC_RENDER (28)

```typescript
function postNPCRender(npc: EntityNPC, renderOffset: Vector): void {}
```

### MC_POST_NPC_DEATH (29)

```typescript
function postNPCDeath(npc: EntityNPC): void {}
```

### MC_PRE_NPC_COLLISION (30)

```typescript
function preNPCCollision(
  npc: EntityNPC,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_PLAYER_UPDATE (31)

```typescript
function postPlayerUpdate(player: EntityPlayer): void {}
```

### MC_POST_PLAYER_RENDER (32)

```typescript
function postPlayerRender(player: EntityPlayer, renderOffset: Vector): void {}
```

### MC_PRE_PLAYER_COLLISION (33)

```typescript
function prePlayerCollision(
  player: EntityPlayer,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_PICKUP_INIT (34)

```typescript
function postPickupInit(pickup: EntityPickup): void {}
```

### MC_POST_PICKUP_UPDATE (35)

```typescript
function postPickupUpdate(pickup: EntityPickup): void {}
```

### MC_POST_PICKUP_RENDER (36)

```typescript
function postPickupRender(pickup: EntityPickup, renderOffset: Vector): void {}
```

### MC_POST_PICKUP_SELECTION (37)

```typescript
function postPickupSelection(
  pickup: EntityPickup,
  variant: PickupVariant | int,
  subType: int,
): [PickupVariant | int, int] | void {}
```

### MC_PRE_PICKUP_COLLISION (38)

```typescript
function prePickupCollision(
  pickup: EntityPickup,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_TEAR_INIT (39)

```typescript
function postTearInit(tear: EntityTear): void {}
```

### MC_POST_TEAR_UPDATE (40)

```typescript
function postTearUpdate(tear: EntityTear): void {}
```

### MC_POST_TEAR_RENDER (41)

```typescript
function postTearRender(tear: EntityTear, renderOffset: Vector): void {}
```

### MC_PRE_TEAR_COLLISION (42)

```typescript
function preTearCollision(
  tear: EntityTear,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_PROJECTILE_INIT (43)

```typescript
function postProjectileInit(projectile: EntityProjectile): void {}
```

### MC_POST_PROJECTILE_UPDATE (44)

```typescript
function postProjectileUpdate(projectile: EntityProjectile): void {}
```

### MC_POST_PROJECTILE_RENDER (45)

```typescript
function postProjectileRender(
  projectile: EntityProjectile,
  renderOffset: Vector,
): void {}
```

### MC_PRE_PROJECTILE_COLLISION (46)

```typescript
function preProjectileCollision(
  projectile: EntityProjectile,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_LASER_INIT (47)

```typescript
function postLaserInit(laser: EntityLaser): void {}
```

### MC_POST_LASER_UPDATE (48)

```typescript
function postLaserUpdate(laser: EntityLaser): void {}
```

### MC_POST_LASER_RENDER (49)

```typescript
function postLaserRender(laser: EntityLaser, renderOffset: Vector): void {}
```

### MC_POST_KNIFE_INIT (50)

```typescript
function postKnifeInit(knife: EntityKnife): void {}
```

### MC_POST_KNIFE_UPDATE (51)

```typescript
function postKnifeUpdate(knife: EntityKnife): void {}
```

### MC_POST_KNIFE_RENDER (52)

```typescript
function postKnifeRender(knife: EntityKnife, renderOffset: Vector): void {}
```

### MC_PRE_KNIFE_COLLISION (53)

```typescript
function preKnifeCollision(
  knife: EntityKnife,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_EFFECT_INIT (54)

```typescript
function postEffectInit(effect: EntityEffect): void {}
```

### MC_POST_EFFECT_UPDATE (55)

```typescript
function postEffectUpdate(effect: EntityEffect): void {}
```

### MC_POST_EFFECT_RENDER (56)

```typescript
function postEffectRender(effect: EntityEffect, renderOffset: Vector): void {}
```

### MC_POST_BOMB_INIT (57)

```typescript
function postBombInit(bomb: EntityBomb): void {}
```

### MC_POST_BOMB_UPDATE (58)

```typescript
function postBombUpdate(bomb: EntityBomb): void {}
```

### MC_POST_BOMB_RENDER (59)

```typescript
function postBombRender(bomb: EntityBomb, renderOffset: Vector): void {}
```

### MC_PRE_BOMB_COLLISION (60)

```typescript
function preBombCollision(
  bomb: EntityBomb,
  collider: Entity,
  low: boolean,
): boolean | void {}
```

### MC_POST_FIRE_TEAR (61)

```typescript
function postFireTear(tear: EntityTear): void {}
```

### MC_PRE_GET_COLLECTIBLE (62)

```typescript
function preGetCollectible(
  itemPoolType: ItemPoolType,
  decrease: boolean,
  seed: int,
): CollectibleType | int | void {}
```

### MC_POST_GET_COLLECTIBLE (63)

```typescript
function postGetCollectible(
  collectibleType: CollectibleType | int,
  itemPoolType: ItemPoolType,
  decrease: boolean,
  seed: int,
): CollectibleType | int | void {}
```

### MC_GET_PILL_COLOR (64)

```typescript
function getPillColor(seed: int): PillColor | int | void {}
```

### MC_GET_PILL_EFFECT (65)

```typescript
function getPillEffect(
  pillEffect: PillEffect | int,
  pillColor: PillColor | int,
): PillEffect | int | void {}
```

### MC_GET_TRINKET (66)

```typescript
function getTrinket(
  trinketType: TrinketType | int,
  rng: RNG,
): TrinketType | int | void {}
```

### MC_POST_ENTITY_REMOVE (67)

```typescript
function postEntityRemove(entity: Entity): void {}
```

### MC_POST_ENTITY_KILL (68)

```typescript
function postEntityKill(entity: Entity): void {}
```

### MC_PRE_NPC_UPDATE (69)

```typescript
function preNPCUpdate(entity: Entity): boolean | void {}
```

### MC_PRE_SPAWN_CLEAN_AWARD (70)

```typescript
function preSpawnClearAward(rng: RNG, spawnPosition: Vector): void {}
```

### MC_PRE_ROOM_ENTITY_SPAWN (71)

```typescript
function preRoomEntitySpawn(
  entityType: EntityType | int,
  variant: EntityVariantForAC,
  subType: int,
  gridIndex: int,
  seed: int,
): [EntityType | int, int, int] | void {}
```
