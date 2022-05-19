import { itemConfig } from "../cachedClasses";
import { FAMILIARS_THAT_SHOOT_PLAYER_TEARS_SET } from "../sets/familiarsThatShootPlayerTearsSet";

/**
 * Helper function to add and remove familiars based on a target amount that you specify.
 *
 * This is a convenience wrapper around the `EntityPlayer.CheckFamiliar` method. Use this helper
 * function instead so that you do not have to retrieve the `ItemConfigItem` and so that you do not
 * specify an incorrect RNG object. (The vanilla method is bugged in that it does not increment the
 * RNG object; see the documentation of the method for more details.)
 *
 * This function is meant to be called in the EvaluateCache callback (when the cache flag is equal
 * to `CacheFlag.FAMILIARS`).
 *
 * Note that this function is only meant to be used in special circumstances where the familiar
 * count is completely custom and does not correspond to the amount of collectibles. For the general
 * case, use the `checkFamiliarFromCollectibles` helper function instead.
 *
 * Note that this will spawn familiars with a completely random `InitSeed`. When calculating random
 * events for this familiar, you should use a data structure that maps familiar `InitSeed` to RNG
 * objects that are initialized based on the seed from
 * `EntityPlayer.GetCollectibleRNG(collectibleType)`.
 *
 * @param player The player that owns the familiars.
 * @param collectibleType The collectible type of the collectible associated with this familiar.
 * @param targetCount The number of familiars that should exist. This function will add or remove
 *                    familiars until it matches the target count.
 * @param familiarVariant The variant of the familiar to spawn or remove.
 * @param familiarSubType Optional. The sub-type of the familiar to spawn or remove. If not
 *                        specified, it will search for existing familiars of all sub-types, and
 *                        spawn new familiars with a sub-type of 0.
 */
export function checkFamiliar(
  player: EntityPlayer,
  collectibleType: int,
  targetCount: int,
  familiarVariant: int,
  familiarSubType?: int,
): void {
  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  player.CheckFamiliar(
    familiarVariant,
    targetCount,
    RNG(),
    itemConfigItem,
    familiarSubType,
  );
}

/**
 * Helper function to add and remove familiars based on the amount of associated collectibles that a
 * player has.
 *
 * Use this helper function instead of invoking the `EntityPlayer.CheckFamiliar` method directly so
 * that the target count is handled automatically.
 *
 * This function is meant to be called in the EvaluateCache callback (when the cache flag is equal
 * to `CacheFlag.FAMILIARS`).
 *
 * Use this function when the amount of familiars should be equal to the amount of associated
 * collectibles that the player has (plus any extras from having used Box of Friends or Monster
 * Manual). If you instead need to have a custom amount of familiars, use the `checkFamiliars`
 * function instead.
 *
 * Note that this will spawn familiars with a completely random `InitSeed`. When calculating random
 * events for this familiar, you should use a data structure that maps familiar `InitSeed` to RNG
 * objects that are initialized based on the seed from
 * `EntityPlayer.GetCollectibleRNG(collectibleType)`.
 *
 * @param player The player that owns the familiars and collectibles.
 * @param collectibleType The collectible type of the collectible associated with this familiar.
 * @param familiarVariant The variant of the familiar to spawn or remove.
 * @param familiarSubType Optional. The sub-type of the familiar to spawn or remove. If not
 *                        specified, it will search for existing familiars of all sub-types, and
 *                        spawn new familiars with a sub-type of 0.
 */
export function checkFamiliarFromCollectibles(
  player: EntityPlayer,
  collectibleType: int,
  familiarVariant: int,
  familiarSubType?: int,
): void {
  const numCollectibles = player.GetCollectibleNum(collectibleType);
  const effects = player.GetEffects();

  // Whenever Box of Friends or Monster Manual is used, it will automatically increment the number
  // of collectible effects for this familiar.
  const numCollectibleEffects =
    effects.GetCollectibleEffectNum(collectibleType);
  const targetCount = numCollectibles + numCollectibleEffects;

  checkFamiliar(
    player,
    collectibleType,
    targetCount,
    familiarVariant,
    familiarSubType,
  );
}

export function isFamiliarThatShootsPlayerTears(
  familiar: EntityFamiliar,
): boolean {
  return FAMILIARS_THAT_SHOOT_PLAYER_TEARS_SET.has(familiar.Variant);
}
