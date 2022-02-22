import { getUpgradeErrorMsg } from "../errors";
import { getFamiliars } from "../functions/familiars";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "check familiar";

let initialized = false;

const v = {
  room: {
    numBoxOfFriendsUses: 0,
  },
};

/** @internal */
export function checkFamiliarInit(mod: Mod): void {
  initialized = true;
  saveDataManager("checkFamiliar", v);

  mod.AddCallback(
    ModCallbacks.MC_USE_ITEM,
    useItemBoxOfFriends,
    CollectibleType.COLLECTIBLE_BOX_OF_FRIENDS,
  );
}

// ModCallbacks.MC_USE_ITEM (3)
// CollectibleType.COLLECTIBLE_BOX_OF_FRIENDS (357)
function useItemBoxOfFriends() {
  v.room.numBoxOfFriendsUses += 1;
}

/**
 * Helper function to add and remove familiars based on the amount of associated collectibles that a
 * player has. Use this instead of the `EntityPlayer.CheckFamiliar` method so that the InitSeed of
 * the spawned familiar will be set properly and Box of Friends functions correctly.
 *
 * This function is meant to be called in the EvaluateCache callback (when the cache flag is equal
 * to `CacheFlag.CACHE_FAMILIARS`).
 *
 * @param player The player that has the collectibles for this familiar.
 * @param collectibleType The collectible type of the collectible associated with this familiar.
 * @param familiarVariant The variant of the familiar to spawn or remove.
 * @param familiarSubType The sub-type of the familiar to spawn
 * @returns The amount of familiars that were added or removed. For example, the player has 0
 * collectibles and there were 2 familiars, this function would remove the 2 familiars and return
 * -2.
 */
export function checkFamiliar(
  player: EntityPlayer,
  collectibleType: int,
  familiarVariant: int,
  familiarSubType?: int,
): int {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  const game = Game();

  const familiarSubTypeToSearchFor =
    familiarSubType === undefined ? -1 : familiarSubType;
  const playerPtrHash = GetPtrHash(player);
  const familiars = getFamiliars(familiarVariant, familiarSubTypeToSearchFor);
  const familiarsForThisPlayer = familiars.filter(
    (familiar) => GetPtrHash(familiar.Player) === playerPtrHash,
  );
  const numCollectibles = player.GetCollectibleNum(collectibleType);
  const numFamiliarsThatShouldExist =
    numCollectibles * (v.room.numBoxOfFriendsUses + 1);

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
