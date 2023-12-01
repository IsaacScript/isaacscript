import type {
  CollectibleType,
  FamiliarVariant,
} from "isaac-typescript-definitions";
import { EntityType } from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";
import { FAMILIARS_THAT_SHOOT_PLAYER_TEARS_SET } from "../sets/familiarsThatShootPlayerTearsSet";
import { getEntities } from "./entities";
import { getFamiliars } from "./entitiesSpecific";
import { newRNG } from "./rng";

/**
 * Instead of generating a new RNG object every time we need to spawn a new familiar, we instead
 * re-use the same RNG object. This makes it less likely that the `InitSeed` of the familiar will
 * overlap, since we are "nexting" instead of doing a fresh reroll.
 */
const familiarGenerationRNG = newRNG();

/**
 * Helper function to add and remove familiars based on a target amount that you specify.
 *
 * This is a convenience wrapper around the `EntityPlayer.CheckFamiliar` method. Use this helper
 * function instead so that you do not have to retrieve the `ItemConfigItem` and so that you do not
 * specify an incorrect RNG object. (The vanilla method is bugged in that it does not increment the
 * RNG object; see the documentation of the method for more details.)
 *
 * This function is meant to be called in the `EVALUATE_CACHE` callback (when the cache flag is
 * equal to `CacheFlag.FAMILIARS`).
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
  collectibleType: CollectibleType,
  targetCount: int,
  familiarVariant: FamiliarVariant,
  familiarSubType?: int,
): void {
  familiarGenerationRNG.Next();

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  player.CheckFamiliar(
    familiarVariant,
    targetCount,
    familiarGenerationRNG,
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
 * This function is meant to be called in the `EVALUATE_CACHE` callback (when the cache flag is
 * equal to `CacheFlag.FAMILIARS`).
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
  collectibleType: CollectibleType,
  familiarVariant: FamiliarVariant,
  familiarSubType?: int,
): void {
  // We need to include non-real collectibles (like Lilith's Incubus), so we omit the second
  // argument.
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

/** Helper function to get only the familiars that belong to a specific player. */
export function getPlayerFamiliars(
  player: EntityPlayer,
): readonly EntityFamiliar[] {
  const playerPtrHash = GetPtrHash(player);
  const familiars = getFamiliars();
  return familiars.filter((familiar) => {
    const familiarPlayerPtrHash = GetPtrHash(familiar.Player);
    return familiarPlayerPtrHash === playerPtrHash;
  });
}

/**
 * Helper function to get the corresponding "Siren Helper" entity for a stolen familiar.
 *
 * When The Siren boss "steals" your familiars, a hidden "Siren Helper" entity is spawned to control
 * each familiar stolen. (Checking for the presence of this entity seems to be the only way to
 * detect when the Siren steals a familiar.)
 *
 * @param familiar The familiar to be checked.
 * @returns Returns the hidden "Siren Helper" entity corresponding to the given familiar, if it
 *          exists. Returns undefined otherwise.
 */
export function getSirenHelper(familiar: EntityFamiliar): Entity | undefined {
  const familiarPtrHash = GetPtrHash(familiar);

  const sirenHelpers = getEntities(EntityType.SIREN_HELPER);
  return sirenHelpers.find(
    (sirenHelper) =>
      sirenHelper.Target !== undefined &&
      GetPtrHash(sirenHelper.Target) === familiarPtrHash,
  );
}

/**
 * Helper function to detect if the given familiar is "stolen" by The Siren boss.
 *
 * This function is useful because some familiars may need to behave differently when under The
 * Siren's control (e.g. if they auto-target enemies).
 */
export function isFamiliarStolenBySiren(familiar: EntityFamiliar): boolean {
  const sirenHelper = getSirenHelper(familiar);
  return sirenHelper !== undefined;
}

/**
 * Helper function to check if a familiar is the type that shoots tears that mimic the players
 * tears, like Incubus, Fate's Reward, Sprinkler, and so on.
 */
export function isFamiliarThatShootsPlayerTears(
  familiar: EntityFamiliar,
): boolean {
  return FAMILIARS_THAT_SHOOT_PLAYER_TEARS_SET.has(familiar.Variant);
}
