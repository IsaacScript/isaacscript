import {
  CollectibleType,
  EntityType,
  NullItemID,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import {
  MAX_TAINTED_SAMSON_BERSERK_CHARGE,
  TAINTED_SAMSON_BERSERK_CHARGE_FROM_TAKING_DAMAGE,
} from "../core/constants";
import { MysteriousPaperEffect } from "../enums/MysteriousPaperEffect";
import { getCharacterDeathAnimationName } from "./characters";
import { onGameFrame } from "./frames";
import { getPlayerMaxHeartContainers } from "./playerHealth";
import { getPlayerNumHitsRemaining, hasLostCurse, isKeeper } from "./players";
import { getLastFrameOfAnimation } from "./sprites";
import { giveTrinketsBack, temporarilyRemoveTrinket } from "./trinketGive";
import { getMysteriousPaperEffectForFrame } from "./trinkets";

/**
 * Uses the player's current health and other miscellaneous things to determine if incoming damage
 * will be fatal.
 */
export function isDamageToPlayerFatal(
  player: EntityPlayer,
  amount: int,
  source: EntityRef,
  lastDamageGameFrame: int | undefined,
): boolean {
  const character = player.GetPlayerType();
  const effects = player.GetEffects();
  const isBerserk = effects.HasCollectibleEffect(CollectibleType.BERSERK);

  // If we are Tainted Jacob and the damage source is Dark Esau, this will not be fatal damage
  // (because we will transform into Tainted Jacob's lost form).
  if (
    character === PlayerType.JACOB_B &&
    source.Type === EntityType.DARK_ESAU
  ) {
    return false;
  }

  // If we are berserk, no damage is fatal. (The death is deferred until the end of the berserk
  // effect.)
  if (isBerserk) {
    return false;
  }

  // If we are playing Tainted Samson and the incoming hit will cause us to become Berserk, then
  // this will not be fatal damage.
  const berserkChargeAfterHit =
    player.SamsonBerserkCharge +
    TAINTED_SAMSON_BERSERK_CHARGE_FROM_TAKING_DAMAGE;
  if (
    character === PlayerType.SAMSON_B &&
    berserkChargeAfterHit >= MAX_TAINTED_SAMSON_BERSERK_CHARGE
  ) {
    return false;
  }

  // If Spirit Shackles is activated, no damage is fatal.
  if (willReviveFromSpiritShackles(player)) {
    return false;
  }

  // If we are Tainted Jacob in the Lost Form, we may have plenty of health left, but we will still
  // die in one hit to anything.
  if (character === PlayerType.JACOB_2_B) {
    return true;
  }

  // If we are in the "Lost Curse" form from touching a white fire, all damage will be fatal.
  if (hasLostCurse(player)) {
    return true;
  }

  const playerNumAllHearts = getPlayerNumHitsRemaining(player);
  if (amount < playerNumAllHearts) {
    return false;
  }

  // This will not be fatal damage if the player has Heartbreak and two slots open for broken
  // hearts.
  if (willReviveFromHeartbreak(player)) {
    return false;
  }

  // This will not be fatal damage if we have Glass Cannon and this is the second time we are taking
  // damage on the same frame.
  if (
    player.HasCollectible(CollectibleType.BROKEN_GLASS_CANNON) &&
    onGameFrame(lastDamageGameFrame)
  ) {
    return false;
  }

  // This will not be fatal damage if we have two different kinds of hearts. For example, a bomb
  // explosion deals 2 damage, but if the player has one half soul heart and one half red heart, the
  // game will only remove the soul heart.
  const hearts = player.GetHearts();
  const eternalHearts = player.GetEternalHearts();
  const soulHearts = player.GetSoulHearts();
  const boneHearts = player.GetBoneHearts();
  if (
    (hearts > 0 && soulHearts > 0) ||
    (hearts > 0 && boneHearts > 0) ||
    (soulHearts > 0 && boneHearts > 0) ||
    (soulHearts > 0 && eternalHearts > 0) ||
    boneHearts >= 2 // Two bone hearts and nothing else should not result in a death
  ) {
    return false;
  }

  return true;
}

/**
 * Assuming that we are on the frame of fatal damage, this function returns whether Mysterious Paper
 * would rotate to Missing Poster on the frame that the "Game Over" screen would appear (which would
 * subsequently save the player from fatal damage).
 *
 * Mysterious Paper rotates between the 4 items on every frame, in order. The formula for whether
 * Mysterious Paper be Missing Power is: `gameFrameCount % 4 === 3`
 */
export function willMysteriousPaperRevive(player: EntityPlayer): boolean {
  const sprite = player.GetSprite();

  // We want to explicitly check the length of the death animation because we might be playing on a
  // modded character that has a custom death animation.
  const character = player.GetPlayerType();
  const animation = getCharacterDeathAnimationName(character);
  const deathAnimationFrames = getLastFrameOfAnimation(sprite, animation);
  const frameOfDeath = player.FrameCount + deathAnimationFrames;

  const mysteriousPaperEffect = getMysteriousPaperEffectForFrame(
    player,
    frameOfDeath,
  );
  if (mysteriousPaperEffect === undefined) {
    return false;
  }

  return mysteriousPaperEffect === MysteriousPaperEffect.MISSING_POSTER;
}

/**
 * The `EntityPlayer.WillPlayerRevive` method does not properly account for Mysterious Paper, so use
 * this helper function instead for more robust revival detection.
 */
export function willPlayerRevive(player: EntityPlayer): boolean {
  const trinketSituation = temporarilyRemoveTrinket(
    player,
    TrinketType.MYSTERIOUS_PAPER,
  );

  const willRevive =
    player.WillPlayerRevive() ||
    (trinketSituation !== undefined && willMysteriousPaperRevive(player));

  giveTrinketsBack(player, trinketSituation);

  return willRevive;
}

/**
 * Helper function to determine if the player will be revived by the Heartbreak collectible if they
 * take fatal damage. This is contingent on the character that they are playing as and the amount of
 * broken hearts that they already have.
 */
export function willReviveFromHeartbreak(player: EntityPlayer): boolean {
  if (!player.HasCollectible(CollectibleType.HEARTBREAK)) {
    return false;
  }

  const maxHeartContainers = getPlayerMaxHeartContainers(player);
  const numBrokenHeartsThatWillBeAdded = isKeeper(player) ? 1 : 2;
  const brokenHearts = player.GetBrokenHearts();
  const numBrokenHeartsAfterRevival =
    numBrokenHeartsThatWillBeAdded + brokenHearts;

  return maxHeartContainers > numBrokenHeartsAfterRevival;
}

/**
 * Helper function to determine if the Spirit Shackles item is in an enabled state. (It can be
 * either enabled or disabled.)
 */
export function willReviveFromSpiritShackles(player: EntityPlayer): boolean {
  if (!player.HasCollectible(CollectibleType.SPIRIT_SHACKLES)) {
    return false;
  }

  const effects = player.GetEffects();

  const spiritShacklesEnabled = !effects.HasNullEffect(
    NullItemID.SPIRIT_SHACKLES_DISABLED,
  );
  const playerInSoulForm = effects.HasNullEffect(
    NullItemID.SPIRIT_SHACKLES_SOUL,
  );

  return spiritShacklesEnabled && !playerInSoulForm;
}
