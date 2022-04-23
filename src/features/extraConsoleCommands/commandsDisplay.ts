import {
  toggleBombDisplay,
  toggleEffectDisplay,
  toggleFamiliarDisplay,
  toggleKnifeDisplay,
  toggleLaserDisplay,
  toggleNPCDisplay,
  togglePickupDisplay,
  togglePlayerDisplay,
  toggleProjectileDisplay,
  toggleSlotDisplay,
  toggleTearDisplay,
} from "../debugDisplay";

/**
 * Toggles custom text to appear next to every bomb. Useful for debugging.
 *
 * By default, the entity ID will be displayed. Use the `setBombDisplay` helper function to assign
 * the text that you want to appear.
 */
export function bombDisplay(): void {
  toggleBombDisplay();
}

/** Alias for the "bombdisplay" command. */
export function bombsDisplay(): void {
  bombDisplay();
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

/** Alias for the "effectdisplay" function. */
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

/** Alias for the "familiardisplay" command. */
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

/** Alias for the "knifedisplay" command. */
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

/** Alias for the "laserdisplay" command. */
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

/** Alias for the "npcdisplay" command. */
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

/** Alias for the "pickupdisplay" command. */
export function pickupsDisplay(): void {
  pickupDisplay();
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

/** Alias for the "playerdisplay" command. */
export function playersDisplay(): void {
  playerDisplay();
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

/** Alias for the "projectiledisplay" command. */
export function projectilesDisplay(): void {
  projectileDisplay();
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

/** Alias for the "slotdisplay" command. */
export function slotsDisplay(): void {
  slotDisplay();
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

/** Alias for the "teardisplay" command. */
export function tearsDisplay(): void {
  tearDisplay();
}
