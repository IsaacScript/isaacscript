import { getDeathAnimationName } from "./player";
import { getFinalFrameOfAnimation } from "./sprite";
import { giveTrinketsBack, temporarilyRemoveTrinkets } from "./trinketGive";

/**
 * The `EntityPlayer.WillPlayerRevive()` function does not properly account for Mysterious Paper,
 * so use this helper function instead for more robust revival detection.
 */
export function willPlayerRevive(player: EntityPlayer): boolean {
  const trinketSituation = temporarilyRemoveTrinkets(
    player,
    TrinketType.TRINKET_MYSTERIOUS_PAPER,
  );

  const willRevive =
    player.WillPlayerRevive() ||
    (trinketSituation !== undefined && willMysteriousPaperRevive(player));

  giveTrinketsBack(player, trinketSituation);

  return willRevive;
}

/**
 * Assuming that we are on the frame of fatal damage, this function returns whether or not
 * Mysterious Paper would rotate to Missing Poster on the frame that the "Game Over" screen would
 * appear (which would subsequently save the player from fatal damage).
 *
 * Mysterious Paper rotates between the 4 items on every frame, in order. The formula for whether
 * Mysterious Paper be Missing Power is: `gameFrameCount % 4 === 3`
 */
export function willMysteriousPaperRevive(player: EntityPlayer): boolean {
  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const sprite = player.GetSprite();

  // We want to explicitly check the length of the death animation because we might be playing on a
  // modded character that has a custom death animation
  const animation = getDeathAnimationName(player);
  const deathAnimationFrames = getFinalFrameOfAnimation(sprite, animation);
  const frameOfDeath = gameFrameCount + deathAnimationFrames + 1;
  // (we add 1 because it takes one frame for the death animation to begin)

  return frameOfDeath % 4 === 3;
}

/**
 * Helper function to determine if the Spirit Shackles item is in an enabled state. (It can be
 * either enabled or disabled.)
 */
export function willReviveFromSpiritShackles(player: EntityPlayer): boolean {
  if (!player.HasCollectible(CollectibleType.COLLECTIBLE_SPIRIT_SHACKLES)) {
    return false;
  }

  const effects = player.GetEffects();

  const spiritShacklesEnabled = !effects.HasNullEffect(
    NullItemID.ID_SPIRIT_SHACKLES_DISABLED,
  );
  const playerInSoulForm = effects.HasNullEffect(
    NullItemID.ID_SPIRIT_SHACKLES_SOUL,
  );

  return spiritShacklesEnabled && !playerInSoulForm;
}
