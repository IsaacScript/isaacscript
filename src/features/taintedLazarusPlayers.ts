// This feature provides a way for end-users to get the `EntityPlayer` object for the other Tainted
// Lazarus

import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "Tainted Lazarus entity finder";

const v = {
  run: {
    queuedTaintedLazarus: [] as EntityPtr[],
    queuedDeadTaintedLazarus: [] as EntityPtr[],

    /**
     * The PostPlayerInit callback fires for Dead Tainted Lazarus at the beginning of the run.
     * However, the player index for the Dead Tainted Lazarus player object at that time does not
     * actually correspond to the player index for the real player once Flip has been used. Thus, we
     * revert to using PtrHash as an index for our map, which is consistent between the Dead Tainted
     * Lazarus object in the PostPlayerInit callback and the "real" Dead Tainted Lazarus.
     */
    subPlayerMap: new Map<PtrHash, EntityPtr>(),
  },
};

/** @internal */
export function taintedLazarusPlayersInit(mod: Mod): void {
  saveDataManager("taintedLazarusPlayers", v, () => false);

  mod.AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit);
}

// ModCallbacks.MC_POST_PLAYER_INIT (9)
function postPlayerInit(player: EntityPlayer) {
  const entityPtr = EntityPtr(player);
  const character = player.GetPlayerType();

  if (character === PlayerType.PLAYER_LAZARUS_B) {
    v.run.queuedTaintedLazarus.push(entityPtr);
  } else if (character === PlayerType.PLAYER_LAZARUS2_B) {
    v.run.queuedDeadTaintedLazarus.push(entityPtr);
  } else {
    return;
  }

  checkDequeue();
}

/**
 * When starting a run, the PostPlayerInit callback will fire first for Dead Tainted Lazarus, then
 * for Tainted Lazarus. When continuing a run, the PostPlayerInit callback will fire first for the
 * character that is currently active. Thus, since the order of the characters is not certain, we
 * insert each of their pointers into a queue, and then only populate the map when we have one
 * Tainted Lazarus and one Dead Tainted Lazarus.
 */
function checkDequeue() {
  if (
    v.run.queuedTaintedLazarus.length === 0 ||
    v.run.queuedDeadTaintedLazarus.length === 0
  ) {
    return;
  }

  const taintedLazarusPtr = v.run.queuedTaintedLazarus.shift();
  const deadTaintedLazarusPtr = v.run.queuedDeadTaintedLazarus.shift();

  if (taintedLazarusPtr === undefined || deadTaintedLazarusPtr === undefined) {
    return;
  }

  const taintedLazarus = taintedLazarusPtr.Ref;
  const deadTaintedLazarus = deadTaintedLazarusPtr.Ref;

  if (taintedLazarus === undefined || deadTaintedLazarus === undefined) {
    return;
  }

  const taintedLazarusPtrHash = GetPtrHash(taintedLazarus);
  const deadTaintedLazarusPtrHash = GetPtrHash(deadTaintedLazarus);

  v.run.subPlayerMap.set(taintedLazarusPtrHash, deadTaintedLazarusPtr);
  v.run.subPlayerMap.set(deadTaintedLazarusPtrHash, taintedLazarusPtr);
}

/**
 * Helper function to get the other version of Tainted Lazarus.
 *
 * - On Tainted Lazarus, returns the player object for Dead Tainted Lazarus.
 * - On Dead Tainted Lazarus, returns the player object for Tainted Lazarus.
 * - Returns undefined if player object retrieval failed for any reason.
 *
 * If you call the `EntityPlayer.Exists` method on the returned object, it will return false.
 * However, you can still call the other methods like you normally would (e.g.
 * `EntityPlayer.AddCollectible`).
 */
export function getTaintedLazarusSubPlayer(
  player: EntityPlayer,
): EntityPlayer | undefined {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const ptrHash = GetPtrHash(player);
  const entityPtr = v.run.subPlayerMap.get(ptrHash);
  if (entityPtr === undefined) {
    return undefined;
  }

  const entity = entityPtr.Ref;
  if (entity === undefined) {
    return undefined;
  }

  return entity.ToPlayer();
}
