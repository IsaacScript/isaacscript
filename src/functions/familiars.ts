import { FAMILIARS_THAT_SHOOT_PLAYER_TEARS } from "../constants";
import { getEntities, removeEntities } from "./entity";

/**
 * Helper function to add and remove familiars based on a target amount that you specify. Use this
 * instead of the `EntityPlayer.CheckFamiliar` method so that the InitSeed of the spawned familiar
 * will be set properly. Note that when using this function, you need to automatically account for
 * Box of Friends.
 *
 * This function is meant to be called in the EvaluateCache callback (when the cache flag is equal
 * to `CacheFlag.CACHE_FAMILIARS`).
 *
 * Note that this function is only meant to be used in special circumstances. For general purpose
 * usage, please use the `checkFamiliarFromCollectibles` helper function instead.
 *
 * @param player The player that owns the familiars.
 * @param collectibleType The collectible type of the collectible associated with this familiar.
 * @param numTargetFamiliars The number of familiars that should exist. This function will add or
 * remove familiars until it matches the target count.
 * @param familiarVariant The variant of the familiar to spawn or remove.
 * @param familiarSubType Optional. The sub-type of the familiar to spawn or remove. If not
 * specified, it will search for existing familiars of all sub-types, and spawn new familiars with a
 * sub-type of 0.
 * @returns The amount of familiars that were added or removed. For example, the player has 0
 * collectibles and there were 2 familiars, this function would remove the 2 familiars and return
 * -2.
 */
export function checkFamiliar(
  player: EntityPlayer,
  collectibleType: int,
  numTargetFamiliars: int,
  familiarVariant: int,
  familiarSubType?: int,
): int {
  const game = Game();

  const familiarSubTypeToSearchFor =
    familiarSubType === undefined ? -1 : familiarSubType;
  const playerPtrHash = GetPtrHash(player);
  const familiars = getFamiliars(familiarVariant, familiarSubTypeToSearchFor);
  const familiarsForThisPlayer = familiars.filter(
    (familiar) => GetPtrHash(familiar.Player) === playerPtrHash,
  );

  if (familiarsForThisPlayer.length === numTargetFamiliars) {
    return 0;
  }

  if (familiarsForThisPlayer.length > numTargetFamiliars) {
    const numFamiliarsToRemove =
      familiarsForThisPlayer.length - numTargetFamiliars;
    for (let i = 0; i < numFamiliarsToRemove; i++) {
      const familiar = familiarsForThisPlayer[i];
      familiar.Remove();
    }

    return numFamiliarsToRemove * -1;
  }

  const numFamiliarsToSpawn =
    numTargetFamiliars - familiarsForThisPlayer.length;
  const collectibleRNG = player.GetCollectibleRNG(collectibleType);
  const familiarSubTypeToUse =
    familiarSubType === undefined ? 0 : familiarSubType;
  for (let i = 0; i < numFamiliarsToSpawn; i++) {
    collectibleRNG.Next();
    const familiar = game
      .Spawn(
        EntityType.ENTITY_FAMILIAR,
        familiarVariant,
        player.Position,
        Vector.Zero,
        player,
        familiarSubTypeToUse,
        collectibleRNG.GetSeed(),
      )
      .ToFamiliar();
    if (familiar !== undefined) {
      familiar.Player = player;
    }
  }

  return numFamiliarsToSpawn;
}

/**
 * Helper function to add and remove familiars based on the amount of associated collectibles that a
 * player has. Use this instead of the `EntityPlayer.CheckFamiliar` method so that the InitSeed of
 * the spawned familiar will be set properly and Box of Friends functions correctly.
 *
 * This function is meant to be called in the EvaluateCache callback (when the cache flag is equal
 * to `CacheFlag.CACHE_FAMILIARS`).
 *
 * Use this function when the amount of familiars should be equal to the amount of associated
 * collectibles that the player has (plus any extras from having used Box of Friends). If you
 * instead need to have a custom amount of familiars, use the `checkFamiliars` function instead.
 *
 * @param player The player that owns the familiars and collectibles.
 * @param collectibleType The collectible type of the collectible associated with this familiar.
 * @param familiarVariant The variant of the familiar to spawn or remove.
 * @param familiarSubType Optional. The sub-type of the familiar to spawn or remove. If not
 * specified, it will search for existing familiars of all sub-types, and spawn new familiars with a
 * sub-type of 0.
 * @returns The amount of familiars that were added or removed. For example, the player has 0
 * collectibles and there were 2 familiars, this function would remove the 2 familiars and return
 * -2.
 */
export function checkFamiliarFromCollectibles(
  player: EntityPlayer,
  collectibleType: int,
  familiarVariant: int,
  familiarSubType?: int,
): int {
  const numCollectibles = player.GetCollectibleNum(collectibleType);
  const effects = player.GetEffects();
  const numBoxOfFriendsUses = effects.GetCollectibleEffectNum(
    CollectibleType.COLLECTIBLE_BOX_OF_FRIENDS,
  );
  const numTargetFamiliars = numCollectibles * (numBoxOfFriendsUses + 1);

  return checkFamiliar(
    player,
    collectibleType,
    numTargetFamiliars,
    familiarVariant,
    familiarSubType,
  );
}

/**
 * Helper function to get all of the familiars in the room.
 *
 * Example:
 * ```
 * // Make all of the familiars in the room invisible
 * for (const familiar of getFamiliars()) {
 *   familiar.Visible = false;
 * }
 * ```
 */
export function getFamiliars(
  matchingVariant: FamiliarVariant | int = -1,
  matchingSubType = -1,
): EntityFamiliar[] {
  const entities = getEntities(
    EntityType.ENTITY_FAMILIAR,
    matchingVariant,
    matchingSubType,
  );

  const familiars: EntityFamiliar[] = [];
  for (const entity of entities) {
    const familiar = entity.ToFamiliar();
    if (familiar !== undefined) {
      familiars.push(familiar);
    }
  }

  return familiars;
}

export function isFamiliarThatShootsPlayerTears(
  familiar: EntityFamiliar,
): boolean {
  return FAMILIARS_THAT_SHOOT_PLAYER_TEARS.has(familiar.Type);
}

/**
 * Helper function to remove all of the familiars in the room.
 *
 * @param variant Optional. If specified, will only remove familiars that match this variant.
 * @param subType Optional. If specified, will only remove familiars that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of familiars.
 * @returns True if one or more familiars was removed, false otherwise.
 */
export function removeAllFamiliars(
  variant?: FamiliarVariant | int,
  subType?: int,
  cap?: int,
): boolean {
  const familiars = getFamiliars(variant, subType);
  return removeEntities(familiars, cap);
}
