/* eslint-disable sort-exports/sort-exports */

import { printEnabled } from "../../functions/utils";
import v, { debugDisplayTextCallbacks } from "./v";

// -------------
// Set Functions
// -------------

/**
 * After using the "playerdisplay" console command, text will be drawn on each player for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setPlayerDisplay(
  textCallback: (player: EntityPlayer) => string,
): void {
  debugDisplayTextCallbacks.player = textCallback;
}

/**
 * After using the "teardisplay" console command, text will be drawn on each tear for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setTearDisplay(
  textCallback: (tear: EntityTear) => string,
): void {
  debugDisplayTextCallbacks.tear = textCallback;
}

/**
 * After using the "familiardisplay" console command, text will be drawn on each familiar for
 * debugging purposes. Use this function to specify a callback function that will returns the string
 * that should be drawn.
 */
export function setFamiliarDisplay(
  textCallback: (familiar: EntityFamiliar) => string,
): void {
  debugDisplayTextCallbacks.familiar = textCallback;
}

/**
 * After using the "bombdisplay" console command, text will be drawn on each bomb for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setBombDisplay(
  textCallback: (bomb: EntityBomb) => string,
): void {
  debugDisplayTextCallbacks.bomb = textCallback;
}

/**
 * After using the "pickupdisplay" console command, text will be drawn on each pickup for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setPickupDisplay(
  textCallback: (pickup: EntityPickup) => string,
): void {
  debugDisplayTextCallbacks.pickup = textCallback;
}

/**
 * After using the "slotdisplay" console command, text will be drawn on each slot for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setSlotDisplay(textCallback: (slot: Entity) => string): void {
  debugDisplayTextCallbacks.slot = textCallback;
}

/**
 * After using the "laserdisplay" console command, text will be drawn on each laser for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setLaserDisplay(
  textCallback: (laser: EntityLaser) => string,
): void {
  debugDisplayTextCallbacks.laser = textCallback;
}

/**
 * After using the "knifedisplay" console command, text will be drawn on each knife for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setKnifeDisplay(
  textCallback: (knife: EntityKnife) => string,
): void {
  debugDisplayTextCallbacks.knife = textCallback;
}

/**
 * After using the "projectiledisplay" console command, text will be drawn on each projectile for
 * debugging purposes. Use this function to specify a callback function that will returns the string
 * that should be drawn.
 */
export function setProjectileDisplay(
  textCallback: (projectile: EntityProjectile) => string,
): void {
  debugDisplayTextCallbacks.projectile = textCallback;
}

/**
 * After using the "effectdisplay" console command, text will be drawn on each effect for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setEffectDisplay(
  textCallback: (effect: EntityEffect) => string,
): void {
  debugDisplayTextCallbacks.effect = textCallback;
}

/**
 * After using the "npcdisplay" console command, text will be drawn on each NPC for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setNPCDisplay(textCallback: (npc: EntityNPC) => string): void {
  debugDisplayTextCallbacks.npc = textCallback;
}

/**
 * After using the "rockdisplay" console command, text will be drawn on each rock for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setRockDisplay(
  textCallback: (rock: GridEntityRock) => string,
): void {
  debugDisplayTextCallbacks.rock = textCallback;
}

/**
 * After using the "pitdisplay" console command, text will be drawn on each pit for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setPitDisplay(
  textCallback: (pit: GridEntityPit) => string,
): void {
  debugDisplayTextCallbacks.pit = textCallback;
}

/**
 * After using the "spikesdisplay" console command, text will be drawn on each spikes for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setSpikesDisplay(
  textCallback: (spikes: GridEntitySpikes) => string,
): void {
  debugDisplayTextCallbacks.spikes = textCallback;
}

/**
 * After using the "tntdisplay" console command, text will be drawn on each TNT for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setTNTDisplay(
  textCallback: (tnt: GridEntityTNT) => string,
): void {
  debugDisplayTextCallbacks.tnt = textCallback;
}

/**
 * After using the "poopdisplay" console command, text will be drawn on each poop for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setPoopDisplay(
  textCallback: (poop: GridEntityPoop) => string,
): void {
  debugDisplayTextCallbacks.poop = textCallback;
}

/**
 * After using the "poopdisplay" console command, text will be drawn on each poop for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 */
export function setDoorDisplay(
  textCallback: (door: GridEntityDoor) => string,
): void {
  debugDisplayTextCallbacks.door = textCallback;
}

/**
 * After using the "pressureplatedisplay" console command, text will be drawn on each pressure plate
 * for debugging purposes. Use this function to specify a callback function that will returns the
 * string that should be drawn.
 */
export function setPressurePlateDisplay(
  textCallback: (pressurePlate: GridEntityPressurePlate) => string,
): void {
  debugDisplayTextCallbacks.pressurePlate = textCallback;
}

// ----------------
// Toggle Functions
// ----------------

/**
 * Toggles the debug display for players. This is the function that runs when you use the
 * "playerdisplay" custom console command.
 */
export function togglePlayerDisplay(): void {
  v.run.player = !v.run.player;
  printEnabled(v.run.player, "player display");
}

/**
 * Toggles the debug display for tears. This is the function that runs when you use the
 * "teardisplay" custom console command.
 */
export function toggleTearDisplay(): void {
  v.run.tear = !v.run.tear;
  printEnabled(v.run.tear, "tear display");
}

/**
 * Toggles the debug display for familiars. This is the function that runs when you use the
 * "familiardisplay" custom console command.
 */
export function toggleFamiliarDisplay(): void {
  v.run.familiar = !v.run.familiar;
  printEnabled(v.run.familiar, "familiar display");
}

/**
 * Toggles the debug display for bombs. This is the function that runs when you use the
 * "bombdisplay" custom console command.
 */
export function toggleBombDisplay(): void {
  v.run.bomb = !v.run.bomb;
  printEnabled(v.run.bomb, "bomb display");
}

/**
 * Toggles the debug display for pickups. This is the function that runs when you use the
 * "pickupdisplay" custom console command.
 */
export function togglePickupDisplay(): void {
  v.run.pickup = !v.run.pickup;
  printEnabled(v.run.pickup, "pickup display");
}

/**
 * Toggles the debug display for slots. This is the function that runs when you use the
 * "slotdisplay" custom console command.
 */
export function toggleSlotDisplay(): void {
  v.run.slot = !v.run.slot;
  printEnabled(v.run.slot, "slot display");
}

/**
 * Toggles the debug display for lasers. This is the function that runs when you use the
 * "laserdisplay" custom console command.
 */
export function toggleLaserDisplay(): void {
  v.run.laser = !v.run.laser;
  printEnabled(v.run.laser, "laser display");
}

/**
 * Toggles the debug display for knives. This is the function that runs when you use the
 * "knifedisplay" custom console command.
 */
export function toggleKnifeDisplay(): void {
  v.run.knife = !v.run.knife;
  printEnabled(v.run.knife, "knife display");
}

/**
 * Toggles the debug display for projectiles. This is the function that runs when you use the
 * "projectiledisplay" custom console command.
 */
export function toggleProjectileDisplay(): void {
  v.run.projectile = !v.run.projectile;
  printEnabled(v.run.projectile, "projectile display");
}

/**
 * Toggles the debug display for effects. This is the function that runs when you use the
 * "effectdisplay" custom console command.
 */
export function toggleEffectDisplay(): void {
  v.run.effect = !v.run.effect;
  printEnabled(v.run.effect, "effect display");
}

/**
 * Toggles the debug display for NPCs. This is the function that runs when you use the "npcdisplay"
 * custom console command.
 */
export function toggleNPCDisplay(): void {
  v.run.npc = !v.run.npc;
  printEnabled(v.run.npc, "NPC display");
}

/**
 * Toggles the debug display for rocks. This is the function that runs when you use the
 * "rockdisplay" custom console command.
 */
export function toggleRockDisplay(): void {
  v.run.rock = !v.run.rock;
  printEnabled(v.run.rock, "rock display");
}

/**
 * Toggles the debug display for pits. This is the function that runs when you use the "pitdisplay"
 * custom console command.
 */
export function togglePitDisplay(): void {
  v.run.pit = !v.run.pit;
  printEnabled(v.run.pit, "pit display");
}

/**
 * Toggles the debug display for spikes. This is the function that runs when you use the
 * "spikesdisplay" custom console command.
 */
export function toggleSpikesDisplay(): void {
  v.run.spikes = !v.run.spikes;
  printEnabled(v.run.spikes, "spikes display");
}

/**
 * Toggles the debug display for TNT. This is the function that runs when you use the "tntdisplay"
 * custom console command.
 */
export function toggleTNTDisplay(): void {
  v.run.tnt = !v.run.tnt;
  printEnabled(v.run.tnt, "TNT display");
}

/**
 * Toggles the debug display for poop. This is the function that runs when you use the "poopdisplay"
 * custom console command.
 */
export function togglePoopDisplay(): void {
  v.run.poop = !v.run.poop;
  printEnabled(v.run.poop, "poop display");
}

/**
 * Toggles the debug display for doors. This is the function that runs when you use the
 * "doordisplay" custom console command.
 */
export function toggleDoorDisplay(): void {
  v.run.door = !v.run.door;
  printEnabled(v.run.door, "door display");
}

/**
 * Toggles the debug display for pressure plates. This is the function that runs when you use the
 * "pressureplatedisplay" custom console command.
 */
export function togglePressurePlateDisplay(): void {
  v.run.pressurePlate = !v.run.pressurePlate;
  printEnabled(v.run.pressurePlate, "pressure plate display");
}
