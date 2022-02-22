import { FAMILIARS_THAT_SHOOT_PLAYER_TEARS } from "../constants";
import { getEntities, removeEntities } from "./entity";

/**
 * Helper function to add and remove familiars based on the amount of associated collectibles that a
 * player has. Use this instead of the `EntityPlayer.CheckFamiliar` method so that the InitSeed of
 * the spawned familiar will be set properly.
 *
 * This function is meant to be called in the EvaluateCache callback (when the cache flag is equal
 * to `CacheFlag.CACHE_FAMILIARS`).
 *
 * Note that if you want your custom familiar to work properly with Box of Friends, you must keep
 * track of the number of times that it has been used per room and then pass that as the
 * `numTempFamiliars` argument.
 *
 * @param player The player that has the collectibles for this familiar.
 * @param collectibleType The collectible type of the collectible associated with this familiar.
 * @param numTempFamiliars The amount of extra familiars that should exist that are not associated
 * with a collectible. Usually, this should be 0. For example, if the player has one familiar and
 * has used Box of Friends once in the current room, then 1 should be passed (so that 2 total
 * familiars will be spawned).
 * @param familiarVariant The variant of the familiar to spawn or remove.
 * @param familiarSubType The sub-type of the familiar to spawn
 * @returns The amount of familiars that were added or removed. For example, the player has 0
 * collectibles and there were 2 familiars, this function would remove the 2 familiars and return
 * -2.
 */
export function checkFamiliar(
  player: EntityPlayer,
  collectibleType: int,
  numTempFamiliars: int,
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
  const numCollectibles = player.GetCollectibleNum(collectibleType);
  const numFamiliarsThatShouldExist = numCollectibles + numTempFamiliars;

  if (familiarsForThisPlayer.length === numFamiliarsThatShouldExist) {
    return 0;
  }

  if (familiarsForThisPlayer.length > numFamiliarsThatShouldExist) {
    const numFamiliarsToRemove =
      familiarsForThisPlayer.length - numFamiliarsThatShouldExist;
    for (let i = 0; i < numFamiliarsToRemove; i++) {
      const familiar = familiarsForThisPlayer[i];
      familiar.Remove();
    }

    return numFamiliarsToRemove * -1;
  }

  const numFamiliarsToSpawn =
    numFamiliarsThatShouldExist - familiarsForThisPlayer.length;
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
