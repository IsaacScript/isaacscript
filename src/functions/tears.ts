/**
 * - Converts the specified amount of tears stat into MaxFireDelay and adds it to the player.
 * - This function should only be used inside the EvaluateCache callback.
 * - In this context, the "tears stat" represents what is shown on the in-game stat UI.
 */
export function addTearsStat(player: EntityPlayer, tearsStat: float): void {
  const existingTearsStat = getTearsStat(player.MaxFireDelay);
  const newTearsStat = existingTearsStat + tearsStat;
  const newMaxFireDelay = getFireDelay(newTearsStat);
  player.MaxFireDelay = newMaxFireDelay;
}

/**
 * - The `EntityPlayer` object stores a player's tear rate in the `MaxFireDelay` attribute. This is
 *   equivalent to how many tears the player can shoot per frame.
 * - If you already have a "tears" stat and you want to convert it back to MaxFireDelay, then use
 *   this function.
 * - In this context, the "tears stat" represents what is shown on the in-game stat UI.
 */
export function getFireDelay(tearsStat: float): float {
  return math.max(30 / tearsStat - 1, -0.9999);
}

/**
 * - The `EntityPlayer` object stores a player's tear rate in the `MaxFireDelay` attribute. This is
 *   equivalent to how many tears the player can shoot per frame.
 * - If you want to convert this to the "tears" stat that is shown on the in-game stat UI, then use
 *   this function.
 */
export function getTearsStat(fireDelay: float): float {
  return 30 / (fireDelay + 1);
}
