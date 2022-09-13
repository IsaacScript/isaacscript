/**
 * - Converts the specified amount of tears stat into the format of `EntityPlayer.MaxFireDelay` and
 *   adds it to the player.
 * - This function should only be used inside the `EVALUATE_CACHE` callback.
 * - In this context, the "tears stat" represents what is shown on the in-game stat UI.
 */
export function addTearsStat(player: EntityPlayer, tearsStat: float): void {
  const existingTearsStat = getTearsStat(player.MaxFireDelay);
  const newTearsStat = existingTearsStat + tearsStat;
  const newMaxFireDelay = getFireDelay(newTearsStat);
  player.MaxFireDelay = newMaxFireDelay;
}

/**
 * - The `EntityPlayer` object stores a player's tear rate in the `MaxFireDelay` field. This is
 *   equivalent to how many tears the player can shoot per frame.
 * - If you already have a "tears" stat and you want to convert it back to MaxFireDelay, then use
 *   this function.
 * - In this context, the "tears stat" represents what is shown on the in-game stat UI.
 */
export function getFireDelay(tearsStat: float): float {
  return math.max(30 / tearsStat - 1, -0.9999);
}

/**
 * - The `EntityPlayer` object stores a player's tear rate in the `MaxFireDelay` field. This is
 *   equivalent to how many tears the player can shoot per frame.
 * - If you want to convert this to the "tears" stat that is shown on the in-game stat UI, then use
 *   this function.
 */
export function getTearsStat(fireDelay: float): float {
  return 30 / (fireDelay + 1);
}

/**
 * Helper function to check if a given tear is from a familiar (as opposed to e.g. a player). This
 * is determined by looking at the parent.
 *
 * For the special case of Incubus and Blood Babies, the spawner entity of the tear is always the
 * player. The parent of the tear is the player on frames 0 and 1 and it is the familiar on frames 2
 * and onwards. For this reason, you can only use this function in the `POST_TEAR_INIT_VERY_LATE`
 * callback or on frame 2+.
 *
 * If this function is called on frame 0 or frame 1, it will throw a run-time error.
 */
export function isTearFromFamiliar(tear: EntityTear): boolean {
  if (tear.FrameCount === 0 || tear.FrameCount === 1) {
    error(
      `Failed to check if the given tear was from a player since the tear's frame count was equal to ${tear.FrameCount}. (The "isTearFromFamiliar" function must only be used in the "POST_TEAR_INIT_VERY_LATE" callback or on frame 2 and onwards.)`,
    );
  }

  // Normally, all tears have a parent, which is either the player or the familiar.
  if (tear.Parent === undefined) {
    return false;
  }

  const familiar = tear.Parent.ToFamiliar();
  return familiar !== undefined;
}

/**
 * Helper function to check if a given tear is from a player (as opposed to e.g. a familiar). This
 * is determined by looking at the parent.
 *
 * For the special case of Incubus and Blood Babies, the spawner entity of the tear is always the
 * player. The parent of the tear is the player on frames 0 and 1 and it is the familiar on frames 2
 * and onwards. For this reason, you can only use this function in the `POST_TEAR_INIT_VERY_LATE`
 * callback or on frame 2+.
 *
 * If this function is called on frame 0 or frame 1, it will throw a run-time error.
 */
export function isTearFromPlayer(tear: EntityTear): boolean {
  if (tear.FrameCount === 0 || tear.FrameCount === 1) {
    error(
      `Failed to check if the given tear was from a player since the tear's frame count was equal to ${tear.FrameCount}. (The "isTearFromPlayer" function must only be used in the "POST_TEAR_INIT_VERY_LATE" callback or on frame 2 and onwards.)`,
    );
  }

  // Normally, all tears have a parent, which is either the player or the familiar.
  if (tear.Parent === undefined) {
    return false;
  }

  const player = tear.Parent.ToPlayer();
  return player !== undefined;
}
