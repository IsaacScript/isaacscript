import { printEnabled } from "../../functions/utils";
import v, { errorIfDebugDisplayNotInitialized } from "./v";

// ----------------
// Toggle Functions
// ----------------

/**
 * Toggles the debug display for players. This is the function that runs when you use the
 * "playerDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function togglePlayerDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.player = !v.run.player;
  printEnabled(v.run.player, "player display");
}

/**
 * Toggles the debug display for tears. This is the function that runs when you use the
 * "tearDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleTearDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.tear = !v.run.tear;
  printEnabled(v.run.tear, "tear display");
}

/**
 * Toggles the debug display for familiars. This is the function that runs when you use the
 * "familiarDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleFamiliarDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.familiar = !v.run.familiar;
  printEnabled(v.run.familiar, "familiar display");
}

/**
 * Toggles the debug display for bombs. This is the function that runs when you use the
 * "bombDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleBombDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.bomb = !v.run.bomb;
  printEnabled(v.run.bomb, "bomb display");
}

/**
 * Toggles the debug display for pickups. This is the function that runs when you use the
 * "pickupDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function togglePickupDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.pickup = !v.run.pickup;
  printEnabled(v.run.pickup, "pickup display");
}

/**
 * Toggles the debug display for slots. This is the function that runs when you use the
 * "slotDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleSlotDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.slot = !v.run.slot;
  printEnabled(v.run.slot, "slot display");
}

/**
 * Toggles the debug display for lasers. This is the function that runs when you use the
 * "laserDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleLaserDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.laser = !v.run.laser;
  printEnabled(v.run.laser, "laser display");
}

/**
 * Toggles the debug display for knives. This is the function that runs when you use the
 * "knifeDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleKnifeDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.knife = !v.run.knife;
  printEnabled(v.run.knife, "knife display");
}

/**
 * Toggles the debug display for projectiles. This is the function that runs when you use the
 * "projectileDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleProjectileDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.projectile = !v.run.projectile;
  printEnabled(v.run.projectile, "projectile display");
}

/**
 * Toggles the debug display for effects. This is the function that runs when you use the
 * "effectDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleEffectDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.effect = !v.run.effect;
  printEnabled(v.run.effect, "effect display");
}

/**
 * Toggles the debug display for NPCs. This is the function that runs when you use the "npcDisplay"
 * custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleNPCDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.npc = !v.run.npc;
  printEnabled(v.run.npc, "NPC display");
}

/**
 * Toggles the debug display for rocks. This is the function that runs when you use the
 * "rockDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleRockDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.rock = !v.run.rock;
  printEnabled(v.run.rock, "rock display");
}

/**
 * Toggles the debug display for pits. This is the function that runs when you use the "pitDisplay"
 * custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function togglePitDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.pit = !v.run.pit;
  printEnabled(v.run.pit, "pit display");
}

/**
 * Toggles the debug display for spikes. This is the function that runs when you use the
 * "spikesDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleSpikesDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.spikes = !v.run.spikes;
  printEnabled(v.run.spikes, "spikes display");
}

/**
 * Toggles the debug display for TNT. This is the function that runs when you use the "tntDisplay"
 * custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleTNTDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.tnt = !v.run.tnt;
  printEnabled(v.run.tnt, "TNT display");
}

/**
 * Toggles the debug display for poop. This is the function that runs when you use the "poopDisplay"
 * custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function togglePoopDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.poop = !v.run.poop;
  printEnabled(v.run.poop, "poop display");
}

/**
 * Toggles the debug display for doors. This is the function that runs when you use the
 * "doorDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function toggleDoorDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.door = !v.run.door;
  printEnabled(v.run.door, "door display");
}

/**
 * Toggles the debug display for pressure plates. This is the function that runs when you use the
 * "pressurePlateDisplay" custom console command.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this feature to work.
 */
export function togglePressurePlateDisplay(): void {
  errorIfDebugDisplayNotInitialized();
  v.run.pressurePlate = !v.run.pressurePlate;
  printEnabled(v.run.pressurePlate, "pressure plate display");
}
