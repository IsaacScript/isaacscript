import { printEnabled } from "../../functions/utils";
import v, {
  debugDisplayTextCallbacks,
  errorIfDebugDisplayNotInitialized,
} from "./v";

// -------------
// Set Functions
// -------------

/**
 * After using the "playerDisplay" console command, text will be drawn on each player for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setPlayerDisplay(
  textCallback: (player: EntityPlayer) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.player = textCallback;
}

/**
 * After using the "tearDisplay" console command, text will be drawn on each tear for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setTearDisplay(
  textCallback: (tear: EntityTear) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.tear = textCallback;
}

/**
 * After using the "familiarDisplay" console command, text will be drawn on each familiar for
 * debugging purposes. Use this function to specify a callback function that will returns the string
 * that should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setFamiliarDisplay(
  textCallback: (familiar: EntityFamiliar) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.familiar = textCallback;
}

/**
 * After using the "bombDisplay" console command, text will be drawn on each bomb for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setBombDisplay(
  textCallback: (bomb: EntityBomb) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.bomb = textCallback;
}

/**
 * After using the "pickupDisplay" console command, text will be drawn on each pickup for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setPickupDisplay(
  textCallback: (pickup: EntityPickup) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.pickup = textCallback;
}

/**
 * After using the "slotDisplay" console command, text will be drawn on each slot for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setSlotDisplay(textCallback: (slot: Entity) => string): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.slot = textCallback;
}

/**
 * After using the "laserDisplay" console command, text will be drawn on each laser for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setLaserDisplay(
  textCallback: (laser: EntityLaser) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.laser = textCallback;
}

/**
 * After using the "knifeDisplay" console command, text will be drawn on each knife for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setKnifeDisplay(
  textCallback: (knife: EntityKnife) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.knife = textCallback;
}

/**
 * After using the "projectileDisplay" console command, text will be drawn on each projectile for
 * debugging purposes. Use this function to specify a callback function that will returns the string
 * that should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setProjectileDisplay(
  textCallback: (projectile: EntityProjectile) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.projectile = textCallback;
}

/**
 * After using the "effectDisplay" console command, text will be drawn on each effect for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setEffectDisplay(
  textCallback: (effect: EntityEffect) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.effect = textCallback;
}

/**
 * After using the "npcDisplay" console command, text will be drawn on each NPC for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setNPCDisplay(textCallback: (npc: EntityNPC) => string): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.npc = textCallback;
}

/**
 * After using the "rockDisplay" console command, text will be drawn on each rock for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setRockDisplay(
  textCallback: (rock: GridEntityRock) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.rock = textCallback;
}

/**
 * After using the "pitDisplay" console command, text will be drawn on each pit for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setPitDisplay(
  textCallback: (pit: GridEntityPit) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.pit = textCallback;
}

/**
 * After using the "spikesDisplay" console command, text will be drawn on each spikes for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setSpikesDisplay(
  textCallback: (spikes: GridEntitySpikes) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.spikes = textCallback;
}

/**
 * After using the "tntDisplay" console command, text will be drawn on each TNT for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setTNTDisplay(
  textCallback: (tnt: GridEntityTNT) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.tnt = textCallback;
}

/**
 * After using the "poopDisplay" console command, text will be drawn on each poop for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setPoopDisplay(
  textCallback: (poop: GridEntityPoop) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.poop = textCallback;
}

/**
 * After using the "poopDisplay" console command, text will be drawn on each poop for debugging
 * purposes. Use this function to specify a callback function that will returns the string that
 * should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setDoorDisplay(
  textCallback: (door: GridEntityDoor) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.door = textCallback;
}

/**
 * After using the "pressurePlateDisplay" console command, text will be drawn on each pressure plate
 * for debugging purposes. Use this function to specify a callback function that will returns the
 * string that should be drawn.
 *
 * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of your
 * mod in order for this console command to work.
 */
export function setPressurePlateDisplay(
  textCallback: (pressurePlate: GridEntityPressurePlate) => string,
): void {
  errorIfDebugDisplayNotInitialized();
  debugDisplayTextCallbacks.pressurePlate = textCallback;
}

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
