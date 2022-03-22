import { game } from "../cachedClasses";
import { saveDataManager } from "../features/saveDataManager/exports";
import { mapGetPlayer, mapSetPlayer } from "../functions/playerDataStructures";
import { isChildPlayer } from "../functions/playerIndex";
import { isDamageToPlayerFatal, willPlayerRevive } from "../functions/revive";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPlayerFatalDamageFire,
  postPlayerFatalDamageHasSubscriptions,
} from "./subscriptions/postPlayerFatalDamage";

const v = {
  run: {
    /** Needed to detect if Glass Cannon will kill the player or not. */
    playersLastDamageGameFrame: new Map<PlayerIndex, int>(),
  },
};

/** @internal */
export function postPlayerFatalDamageCallbackInit(mod: Mod): void {
  saveDataManager("postPlayerFatalDamage", v);

  mod.AddCallback(
    ModCallbacks.MC_ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.ENTITY_PLAYER,
  );
}

function hasSubscriptions() {
  return postPlayerFatalDamageHasSubscriptions();
}

// ModCallbacks.MC_ENTITY_TAKE_DMG (11)
// EntityType.ENTITY_PLAYER (1)
function entityTakeDmgPlayer(
  tookDamage: Entity,
  damageAmount: float,
  damageFlags: int,
  damageSource: EntityRef,
  damageCountdownFrames: int,
): boolean | void {
  if (!hasSubscriptions()) {
    return undefined;
  }

  const player = tookDamage.ToPlayer();
  if (player === undefined) {
    return undefined;
  }

  // This callback should not trigger for the Strawman Keeper and other players that are "child"
  // players
  if (isChildPlayer(player)) {
    return undefined;
  }

  const gameFrameCount = game.GetFrameCount();
  const lastDamageGameFrame = mapGetPlayer(
    v.run.playersLastDamageGameFrame,
    player,
  );
  mapSetPlayer(v.run.playersLastDamageGameFrame, player, gameFrameCount);

  // If the player has a revival item such as Dead Cat, this will not be fatal damage
  if (willPlayerRevive(player)) {
    return undefined;
  }

  // Note that this can fail in the edge-case of Tainted Samson taking damage that activates his
  // Berserk state
  // TODO: update this after the next vanilla patch
  if (
    !isDamageToPlayerFatal(
      player,
      damageAmount,
      damageSource,
      lastDamageGameFrame,
    )
  ) {
    return undefined;
  }

  const shouldSustainDeath = postPlayerFatalDamageFire(
    player,
    damageAmount,
    damageFlags,
    damageSource,
    damageCountdownFrames,
  );
  if (shouldSustainDeath !== undefined) {
    return shouldSustainDeath;
  }

  return undefined;
}
