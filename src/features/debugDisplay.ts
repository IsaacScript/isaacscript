import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { getEntityID } from "../functions/entity";
import { getGridEntityID } from "../functions/gridEntity";
import { isReflectionRender, printEnabled } from "../functions/utils";
import { saveDataManager } from "./saveDataManager/exports";

const textCallbacks = {
  player: defaultEntityDisplayCallback as (player: EntityPlayer) => string, // 1
  tear: defaultEntityDisplayCallback as (tear: EntityTear) => string, // 2
  familiar: defaultEntityDisplayCallback as (
    familiar: EntityFamiliar,
  ) => string, // 3
  bomb: defaultEntityDisplayCallback as (bomb: EntityBomb) => string, // 4
  pickup: defaultEntityDisplayCallback as (pickup: EntityPickup) => string, // 5
  slot: defaultEntityDisplayCallback as (familiar: Entity) => string, // 6
  laser: defaultEntityDisplayCallback as (laser: EntityLaser) => string, // 7
  knife: defaultEntityDisplayCallback as (knife: EntityKnife) => string, // 8
  projectile: defaultEntityDisplayCallback as (
    projectile: EntityProjectile,
  ) => string, // 9
  effect: defaultEntityDisplayCallback as (effect: EntityEffect) => string, // 1000
  npc: defaultEntityDisplayCallback as (effect: EntityNPC) => string,

  rock: defaultGridEntityDisplayCallback as (rock: GridEntityRock) => string, // 2 ??
  pit: defaultGridEntityDisplayCallback as (pit: GridEntityPit) => string, // 7
  spikes: defaultGridEntityDisplayCallback as (
    spikes: GridEntitySpikes,
  ) => string, // 8 ??
  tnt: defaultGridEntityDisplayCallback as (tnt: GridEntityTNT) => string, // 12
  poop: defaultGridEntityDisplayCallback as (poop: GridEntityPoop) => string, // 14
  door: defaultGridEntityDisplayCallback as (door: GridEntityDoor) => string, // 16
  pressurePlate: defaultGridEntityDisplayCallback as (
    pressurePlate: GridEntityPressurePlate,
  ) => string, // 20
};

function defaultEntityDisplayCallback(entity: Entity) {
  return getEntityID(entity);
}

function defaultGridEntityDisplayCallback(gridEntity: GridEntity) {
  return getGridEntityID(gridEntity);
}

const v = {
  run: {
    player: false, // 1
    tear: false, // 2
    familiar: false, // 3
    bomb: false, // 4
    pickup: false, // 5
    slot: false, // 6
    laser: false, // 7
    knife: false, // 8
    projectile: false, // 9
    effect: false, // 1000
    npc: false,

    rock: false, // 2 and others ??
    pit: false, // 7
    spikes: false, // 8 and others ??
    tnt: false, // 12
    poop: false, // 14
    door: false, // 16
    pressurePlate: false, // 20
  },
};

export function debugDisplayInit(mod: ModUpgraded): void {
  saveDataManager("debugDisplay", v, () => false);

  mod.AddCallback(ModCallback.POST_FAMILIAR_RENDER, postFamiliarRender); // 25
  mod.AddCallback(ModCallback.POST_NPC_RENDER, postNPCRender); // 28
  mod.AddCallback(ModCallback.POST_PLAYER_RENDER, postPlayerRender); // 32
  mod.AddCallback(ModCallback.POST_PICKUP_RENDER, postPickupRender); // 36
  mod.AddCallback(ModCallback.POST_TEAR_RENDER, postTearRender); // 41
  mod.AddCallback(ModCallback.POST_PROJECTILE_RENDER, postProjectileRender); // 45
  mod.AddCallback(ModCallback.POST_LASER_RENDER, postLaserRender); // 49
  mod.AddCallback(ModCallback.POST_KNIFE_RENDER, postKnifeRender); // 52
  mod.AddCallback(ModCallback.POST_EFFECT_RENDER, postEffectRender); // 56
  mod.AddCallback(ModCallback.POST_BOMB_RENDER, postBombRender); // 59
  mod.AddCallbackCustom(ModCallbackCustom.POST_SLOT_RENDER, postSlotRender);
  mod.AddCallbackCustom(ModCallbackCustom.POST_ROCK_RENDER, postRockRender);
  mod.AddCallbackCustom(ModCallbackCustom.POST_PIT_RENDER, postPitRender);
  mod.AddCallbackCustom(ModCallbackCustom.POST_SPIKES_RENDER, postSpikesRender);
  mod.AddCallbackCustom(ModCallbackCustom.POST_TNT_RENDER, postTNTRender);
  mod.AddCallbackCustom(ModCallbackCustom.POST_POOP_RENDER, postPoopRender);
  mod.AddCallbackCustom(ModCallbackCustom.POST_DOOR_RENDER, postDoorRender);
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PRESSURE_PLATE_RENDER,
    postPressurePlateRender,
  );
}

// EntityType.PLAYER (1)
export function togglePlayerDisplay(): void {
  v.run.player = !v.run.player;
  printEnabled(v.run.player, "player display");
}

// EntityType.TEAR (2)
export function toggleTearDisplay(): void {
  v.run.tear = !v.run.tear;
  printEnabled(v.run.tear, "tear display");
}

// EntityType.FAMILIAR (3)
export function toggleFamiliarDisplay(): void {
  v.run.familiar = !v.run.familiar;
  printEnabled(v.run.familiar, "familiar display");
}

// EntityType.BOMB (4)
export function toggleBombDisplay(): void {
  v.run.bomb = !v.run.bomb;
  printEnabled(v.run.bomb, "bomb display");
}

// EntityType.PICKUP (5)
export function togglePickupDisplay(): void {
  v.run.pickup = !v.run.pickup;
  printEnabled(v.run.pickup, "pickup display");
}

// EntityType.SLOT (6)
export function toggleSlotDisplay(): void {
  v.run.slot = !v.run.slot;
  printEnabled(v.run.slot, "slot display");
}

// EntityType.LASER (7)
export function toggleLaserDisplay(): void {
  v.run.laser = !v.run.laser;
  printEnabled(v.run.laser, "laser display");
}

// EntityType.KNIFE (8)
export function toggleKnifeDisplay(): void {
  v.run.knife = !v.run.knife;
  printEnabled(v.run.knife, "knife display");
}

// EntityType.PROJECTILE (9)
export function toggleProjectileDisplay(): void {
  v.run.projectile = !v.run.projectile;
  printEnabled(v.run.projectile, "projectile display");
}

// EntityType.EFFECT (1000)
export function toggleEffectDisplay(): void {
  v.run.effect = !v.run.effect;
  printEnabled(v.run.effect, "effect display");
}

export function toggleNPCDisplay(): void {
  v.run.npc = !v.run.npc;
  printEnabled(v.run.npc, "NPC display");
}

// GridEntityType.ROCK (2) ??
export function toggleRockDisplay(): void {
  v.run.rock = !v.run.rock;
  printEnabled(v.run.rock, "rock display");
}

// GridEntityType.PIT (7)
export function togglePitDisplay(): void {
  v.run.pit = !v.run.pit;
  printEnabled(v.run.pit, "pit display");
}

// GridEntityType.SPIKES (8) ??
export function toggleSpikesDisplay(): void {
  v.run.spikes = !v.run.spikes;
  printEnabled(v.run.spikes, "spikes display");
}

// GridEntityType.TNT (12)
export function toggleTNTDisplay(): void {
  v.run.tnt = !v.run.tnt;
  printEnabled(v.run.tnt, "TNT display");
}

// GridEntityType.POOP (14)
export function togglePoopDisplay(): void {
  v.run.poop = !v.run.poop;
  printEnabled(v.run.poop, "poop display");
}

// GridEntityType.DOOR (16)
export function toggleDoorDisplay(): void {
  v.run.door = !v.run.door;
  printEnabled(v.run.door, "door display");
}

// GridEntityType.PRESSURE_PLATE (20)
export function togglePressurePlateDisplay(): void {
  v.run.pressurePlate = !v.run.pressurePlate;
  printEnabled(v.run.pressurePlate, "pressure plate display");
}

// ModCallback.POST_FAMILIAR_RENDER (25)
function postFamiliarRender(familiar: EntityFamiliar) {
  if (!v.run.familiar) {
    return;
  }

  const text = textCallbacks.familiar(familiar);
  renderTextOnEntity(familiar, text);
}

// ModCallback.POST_NPC_RENDER (28)
function postNPCRender(npc: EntityNPC) {
  if (!v.run.npc) {
    return;
  }

  const text = textCallbacks.npc(npc);
  renderTextOnEntity(npc, text);
}

// ModCallback.POST_PLAYER_RENDER (32)
function postPlayerRender(player: EntityPlayer) {
  if (!v.run.player) {
    return;
  }

  const text = textCallbacks.player(player);
  renderTextOnEntity(player, text);
}

// ModCallback.POST_PICKUP_RENDER (36)
function postPickupRender(pickup: EntityPickup) {
  if (!v.run.pickup) {
    return;
  }

  const text = textCallbacks.pickup(pickup);
  renderTextOnEntity(pickup, text);
}

// ModCallback.POST_TEAR_RENDER (41)
function postTearRender(tear: EntityTear) {
  if (!v.run.tear) {
    return;
  }

  const text = textCallbacks.tear(tear);
  renderTextOnEntity(tear, text);
}

// ModCallback.POST_PROJECTILE_RENDER (45)
function postProjectileRender(projectile: EntityProjectile) {
  if (!v.run.projectile) {
    return;
  }

  const text = textCallbacks.projectile(projectile);
  renderTextOnEntity(projectile, text);
}

// ModCallback.POST_LASER_RENDER (49)
function postLaserRender(laser: EntityLaser) {
  if (!v.run.laser) {
    return;
  }

  const text = textCallbacks.laser(laser);
  renderTextOnEntity(laser, text);
}

// ModCallback.POST_KNIFE_RENDER (52)
function postKnifeRender(knife: EntityKnife) {
  if (!v.run.knife) {
    return;
  }

  const text = textCallbacks.knife(knife);
  renderTextOnEntity(knife, text);
}

// ModCallback.POST_EFFECT_RENDER (56)
function postEffectRender(effect: EntityEffect) {
  if (!v.run.effect) {
    return;
  }

  const text = textCallbacks.effect(effect);
  renderTextOnEntity(effect, text);
}

// ModCallback.POST_BOMB_RENDER (59)
function postBombRender(bomb: EntityBomb) {
  if (!v.run.bomb) {
    return;
  }

  const text = textCallbacks.bomb(bomb);
  renderTextOnEntity(bomb, text);
}

// ModCallbackCustom.POST_SLOT_RENDER
function postSlotRender(slot: Entity) {
  if (!v.run.slot) {
    return;
  }

  const text = textCallbacks.slot(slot);
  renderTextOnEntity(slot, text);
}

// ModCallbackCustom.POST_ROCK_RENDER
function postRockRender(rock: GridEntityRock) {
  if (!v.run.rock) {
    return;
  }

  const text = textCallbacks.rock(rock);
  renderTextOnEntity(rock, text);
}

// ModCallbackCustom.POST_PIT_RENDER
function postPitRender(pit: GridEntityPit) {
  if (!v.run.pit) {
    return;
  }

  const text = textCallbacks.pit(pit);
  renderTextOnEntity(pit, text);
}

// ModCallbackCustom.POST_SPIKES_RENDER
function postSpikesRender(spikes: GridEntitySpikes) {
  if (!v.run.spikes) {
    return;
  }

  const text = textCallbacks.spikes(spikes);
  renderTextOnEntity(spikes, text);
}

// ModCallbackCustom.POST_TNT_RENDER
function postTNTRender(tnt: GridEntityTNT) {
  if (!v.run.tnt) {
    return;
  }

  const text = textCallbacks.tnt(tnt);
  renderTextOnEntity(tnt, text);
}

// ModCallbackCustom.POST_POOP_RENDER
function postPoopRender(poop: GridEntityPoop) {
  if (!v.run.poop) {
    return;
  }

  const text = textCallbacks.poop(poop);
  renderTextOnEntity(poop, text);
}

// ModCallbackCustom.POST_DOOR_RENDER
function postDoorRender(door: GridEntityDoor) {
  if (!v.run.door) {
    return;
  }

  const text = textCallbacks.door(door);
  renderTextOnEntity(door, text);
}

// ModCallbackCustom.POST_PRESSURE_PLATE_RENDER
function postPressurePlateRender(pressurePlate: GridEntityPressurePlate) {
  if (!v.run.pressurePlate) {
    return;
  }

  const text = textCallbacks.pressurePlate(pressurePlate);
  renderTextOnEntity(pressurePlate, text);
}

function renderTextOnEntity(entity: Entity | GridEntity, text: string) {
  if (isReflectionRender()) {
    return;
  }

  const position = Isaac.WorldToScreen(entity.Position);
  Isaac.RenderText(text, position.X, position.Y, 1, 1, 1, 1);
}

/**
 * After using the "playerdisplay" console command, text will be drawn on each player for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setPlayerDisplay(
  textCallback: (player: EntityPlayer) => string,
): void {
  textCallbacks.player = textCallback;
}

/**
 * After using the "teardisplay" console command, text will be drawn on each tear for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setTearDisplay(
  textCallback: (tear: EntityTear) => string,
): void {
  textCallbacks.tear = textCallback;
}

/**
 * After using the "familiardisplay" console command, text will be drawn on each familiar for
 * debugging purposes. Use this function to specify a callback function that will returns the string
 * that should be drawn.
 */
export function setFamiliarDisplay(
  textCallback: (familiar: EntityFamiliar) => string,
): void {
  textCallbacks.familiar = textCallback;
}

/**
 * After using the "bombdisplay" console command, text will be drawn on each bomb for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setBombDisplay(
  textCallback: (bomb: EntityBomb) => string,
): void {
  textCallbacks.bomb = textCallback;
}

/**
 * After using the "pickupdisplay" console command, text will be drawn on each pickup for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setPickupDisplay(
  textCallback: (pickup: EntityPickup) => string,
): void {
  textCallbacks.pickup = textCallback;
}

/**
 * After using the "slotdisplay" console command, text will be drawn on each slot for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setSlotDisplay(textCallback: (slot: Entity) => string): void {
  textCallbacks.slot = textCallback;
}

/**
 * After using the "laserdisplay" console command, text will be drawn on each laser for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setLaserDisplay(
  textCallback: (laser: EntityLaser) => string,
): void {
  textCallbacks.laser = textCallback;
}

/**
 * After using the "knifedisplay" console command, text will be drawn on each knife for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setKnifeDisplay(
  textCallback: (knife: EntityKnife) => string,
): void {
  textCallbacks.knife = textCallback;
}

/**
 * After using the "projectiledisplay" console command, text will be drawn on each projectile for
 * debugging purposes. Use this function to specify a callback function that will returns the string
 * that should be drawn.
 */
export function setProjectileDisplay(
  textCallback: (projectile: EntityProjectile) => string,
): void {
  textCallbacks.projectile = textCallback;
}

/**
 * After using the "effectdisplay" console command, text will be drawn on each effect for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setEffectDisplay(
  textCallback: (effect: EntityEffect) => string,
): void {
  textCallbacks.effect = textCallback;
}

/**
 * After using the "npcdisplay" console command, text will be drawn on each NPC for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setNPCDisplay(textCallback: (npc: EntityNPC) => string): void {
  textCallbacks.npc = textCallback;
}
