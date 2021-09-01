/**
 * Converts the specified amount of tears stat into MaxFireDelay and adds it to the player. This
 * function should only be used inside the EvaluateCache callback.
 */
export function addTearsStat(player: EntityPlayer, tearsStat: float): void {
  const fireDelay = getFireDelay(tearsStat);
  player.MaxFireDelay -= fireDelay;
}

/**
 * The `EntityPlayer` object stores a player's tear rate in the `MaxFireDelay` attribute. This is
 * equivalent to how many tears the player can shoot per frame. If you already have a "tears" stat
 * and you want to convert it back to MaxFireDelay, then use this function.
 */
export function getFireDelay(tearsStat: float): float {
  return math.max(30 / tearsStat - 1, -0.9999);
}

/**
 * The `EntityPlayer` object stores a player's tear rate in the `MaxFireDelay` attribute. This is
 * equivalent to how many tears the player can shoot per frame. If you want to convert this to the
 * "tears" stat that is referred to on the wiki and so forth, then use this function.
 */
export function getTearsStat(fireDelay: float): float {
  return 30 / (fireDelay + 1);
}
