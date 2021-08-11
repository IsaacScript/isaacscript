import { MaxFlagShift } from "../enums";
import { hasFlag } from "./flag";

/**
 * Helper function to avoid typing out `Isaac.DebugString()`.
 */
export function log(msg: string): void {
  Isaac.DebugString(msg);
}

/**
 * Helper function for printing out every damage flag that is turned on. Helpful when debugging.
 */
export function logAllDamageFlags(flags: int): void {
  logAllFlags(flags, MaxFlagShift.DAMAGE, "damage");
}

/**
 * Helper function for printing out every entity flag that is turned on. Helpful when debugging.
 */
export function logAllEntityFlags(flags: int): void {
  logAllFlags(flags, MaxFlagShift.ENTITY, "entity");
}

/**
 * Helper function for printing out every flag that is turned on. Helpful when debugging.
 */
export function logAllFlags(flags: int, maxShift: int, description = ""): void {
  if (description !== "") {
    description += " ";
  }
  log(`Logging all ${description}flags:`);
  for (let i = 0; i <= maxShift; i++) {
    if (hasFlag(flags, 1 << i)) {
      log(`- Has flag: ${i}`);
    }
  }
}

/**
 * Helper function for printing out every projectile flag that is turned on. Helpful when debugging.
 */
export function logAllProjectileFlags(flags: int): void {
  logAllFlags(flags, MaxFlagShift.PROJECTILE, "projectile");
}

/**
 * Helper function for printing out every use flag that is turned on. Helpful when debugging.
 */
export function logAllUseFlags(flags: int): void {
  logAllFlags(flags, MaxFlagShift.USE, "use");
}
