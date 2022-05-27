import {
  toggleBombDisplay,
  toggleDoorDisplay,
  toggleEffectDisplay,
  toggleFamiliarDisplay,
  toggleKnifeDisplay,
  toggleLaserDisplay,
  toggleNPCDisplay,
  togglePickupDisplay,
  togglePitDisplay,
  togglePlayerDisplay,
  togglePoopDisplay,
  togglePressurePlateDisplay,
  toggleProjectileDisplay,
  toggleRockDisplay,
  toggleSlotDisplay,
  toggleSpikesDisplay,
  toggleTearDisplay,
  toggleTNTDisplay,
} from "../debugDisplay/exports";

/**
 * Toggles custom text to appear next to every bomb. Useful for debugging.
 *
 * By default, the entity ID will be displayed. Use the `setBombDisplay` helper function to assign
 * the text that you want to appear.
 */
export function bombDisplay(): void {
  toggleBombDisplay();
}

/** Alias for the "bombDisplay" command. */
export function bombsDisplay(): void {
  bombDisplay();
}

/**
 * Toggles custom text to appear next to every door. Useful for debugging.
 *
 * By default, the grid entity ID will be displayed. Use the `setDoorDisplay` helper function to
 * assign the text that you want to appear.
 */
export function doorDisplay(): void {
  toggleDoorDisplay();
}

/** Alias for the "doorDisplay" command. */
export function doorsDisplay(): void {
  doorDisplay();
}

/**
 * Toggles custom text to appear next to every effect. Useful for debugging.
 *
 * By default, the entity ID will be displayed. Use the `setEffectDisplay` helper function to assign
 * the text that you want to appear.
 */
export function effectDisplay(): void {
  toggleEffectDisplay();
}

/** Alias for the "effectDisplay" command. */
export function effectsDisplay(): void {
  effectDisplay();
}

/**
 * Toggles custom text to appear next to every familiar. Useful for debugging.
 *
 * By default, the entity ID will be displayed. Use the `setFamiliarDisplay` helper function to
 * assign the text that you want to appear.
 */
export function familiarDisplay(): void {
  toggleFamiliarDisplay();
}

/** Alias for the "familiarDisplay" command. */
export function familiarsDisplay(): void {
  familiarDisplay();
}

/**
 * Toggles custom text to appear next to every knife. Useful for debugging.
 *
 * By default, the entity ID will be displayed. Use the `setKnifeDisplay` helper function to assign
 * the text that you want to appear.
 */
export function knifeDisplay(): void {
  toggleKnifeDisplay();
}

/** Alias for the "knifeDisplay" command. */
export function knivesDisplay(): void {
  knifeDisplay();
}

/**
 * Toggles custom text to appear next to every laser. Useful for debugging.
 *
 * By default, the entity ID will be displayed. Use the `setLaserDisplay` helper function to assign
 * the text that you want to appear.
 */
export function laserDisplay(): void {
  toggleLaserDisplay();
}

/** Alias for the "laserDisplay" command. */
export function lasersDisplay(): void {
  laserDisplay();
}

/**
 * Toggles custom text to appear next to every NPC. Useful for debugging.
 *
 * By default, the entity ID will be displayed. Use the `setNPCDisplay` helper function to assign
 * the text that you want to appear.
 */
export function npcDisplay(): void {
  toggleNPCDisplay();
}

/** Alias for the "npcDisplay" command. */
export function npcsDisplay(): void {
  npcDisplay();
}

/**
 * Toggles custom text to appear next to every pickup. Useful for debugging.
 *
 * By default, the entity ID will be displayed. Use the `setPickupDisplay` helper function to assign
 * the text that you want to appear.
 */
export function pickupDisplay(): void {
  togglePickupDisplay();
}

/** Alias for the "pickupDisplay" command. */
export function pickupsDisplay(): void {
  pickupDisplay();
}

/**
 * Toggles custom text to appear next to every pit. Useful for debugging.
 *
 * By default, the grid entity ID will be displayed. Use the `setPitDisplay` helper function to
 * assign the text that you want to appear.
 */
export function pitDisplay(): void {
  togglePitDisplay();
}

/** Alias for the "pitDisplay" command. */
export function pitsDisplay(): void {
  pitDisplay();
}

/**
 * Toggles custom text to appear next to every player. Useful for debugging.
 *
 * By default, the entity ID will be displayed. Use the `setPlayerDisplay` helper function to assign
 * the text that you want to appear.
 */
export function playerDisplay(): void {
  togglePlayerDisplay();
}

/** Alias for the "playerDisplay" command. */
export function playersDisplay(): void {
  playerDisplay();
}

/**
 * Toggles custom text to appear next to every poop. Useful for debugging.
 *
 * By default, the grid entity ID will be displayed. Use the `setPoopDisplay` helper function to
 * assign the text that you want to appear.
 */
export function poopDisplay(): void {
  togglePoopDisplay();
}

/** Alias for the "poopDisplay" command. */
export function poopsDisplay(): void {
  poopDisplay();
}

/**
 * Toggles custom text to appear next to every pressure plate. Useful for debugging.
 *
 * By default, the grid entity ID will be displayed. Use the `setPressurePlateDisplay` helper
 * function to assign the text that you want to appear.
 */
export function pressurePlateDisplay(): void {
  togglePressurePlateDisplay();
}

/** Alias for the "pressurePlateDisplay" command. */
export function pressurePlatesDisplay(): void {
  pressurePlateDisplay();
}

/**
 * Toggles custom text to appear next to every projectile. Useful for debugging.
 *
 * By default, the entity ID will be displayed. Use the `setProjectileDisplay` helper function to
 * assign the text that you want to appear.
 */
export function projectileDisplay(): void {
  toggleProjectileDisplay();
}

/** Alias for the "projectileDisplay" command. */
export function projectilesDisplay(): void {
  projectileDisplay();
}

/**
 * Toggles custom text to appear next to every rock. Useful for debugging.
 *
 * By default, the grid entity ID will be displayed. Use the `setRockDisplay` helper function to
 * assign the text that you want to appear.
 */
export function rockDisplay(): void {
  toggleRockDisplay();
}

/** Alias for the "rockDisplay" command. */
export function rocksDisplay(): void {
  rockDisplay();
}

/**
 * Toggles custom text to appear next to every slot. Useful for debugging.
 *
 * By default, the entity ID will be displayed. Use the `setSlotDisplay` helper function to assign
 * the text that you want to appear.
 */
export function slotDisplay(): void {
  toggleSlotDisplay();
}

/** Alias for the "slotDisplay" command. */
export function slotsDisplay(): void {
  slotDisplay();
}

/** Alias for the "spikesDisplay" command. */
export function spikeDisplay(): void {
  spikesDisplay();
}

/**
 * Toggles custom text to appear next to every spikes. Useful for debugging.
 *
 * By default, the grid entity ID will be displayed. Use the `setSpikesDisplay` helper function to
 * assign the text that you want to appear.
 */
export function spikesDisplay(): void {
  toggleSpikesDisplay();
}

/**
 * Toggles custom text to appear next to every tear. Useful for debugging.
 *
 * By default, the entity ID will be displayed. Use the `setTearDisplay` helper function to assign
 * the text that you want to appear.
 */
export function tearDisplay(): void {
  toggleTearDisplay();
}

/** Alias for the "tearDisplay" command. */
export function tearsDisplay(): void {
  tearDisplay();
}

/**
 * Toggles custom text to appear next to every TNT. Useful for debugging.
 *
 * By default, the grid entity ID will be displayed. Use the `setTNTDisplay` helper function to
 * assign the text that you want to appear.
 */
export function tntDisplay(): void {
  toggleTNTDisplay();
}

/** Alias for the "tntDisplay" command. */
export function tntsDisplay(): void {
  tntDisplay();
}
